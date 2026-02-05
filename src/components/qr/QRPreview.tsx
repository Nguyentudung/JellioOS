import {
    useEffect,
    useRef,
    useImperativeHandle,
    forwardRef,
    memo,
    useState,
} from "react";
import QRCodeStyling, { type Options } from "qr-code-styling";
import type { QRState } from "../../types/qr";

interface QRPreviewProps {
    state: QRState;
}

export interface QRPreviewHandle {
    download: (
        extension: "png" | "svg" | "jpeg" | "webp",
        size: number,
    ) => void;
}

export const QRPreview = memo(
    forwardRef<QRPreviewHandle, QRPreviewProps>(({ state }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const qrCode = useRef<QRCodeStyling | null>(null);
        const [isGenerating, setIsGenerating] = useState(false);
        const [isUpdating, setIsUpdating] = useState(false);

        const getGradient = (
            colors: string[],
            type: "linear" | "radial",
            rotation: number,
        ) => {
            if (colors.length <= 1) return undefined;
            return {
                type: type,
                rotation: (rotation * Math.PI) / 180,
                colorStops: colors.map((color, index) => ({
                    offset: index / (colors.length - 1),
                    color: color,
                })),
            };
        };

        const getOptions = (
            currentState: QRState,
            size: number = 300,
        ): Options => ({
            width: size,
            height: size,
            type: "svg",
            data: currentState.data,
            image: currentState.logo || undefined,
            margin: currentState.margin,
            dotsOptions: {
                type: currentState.dots as any,
                color: currentState.qrColors[0],
                gradient: getGradient(
                    currentState.qrColors,
                    currentState.qrGradientType,
                    currentState.qrRotation,
                ),
            },
            cornersSquareOptions: {
                type: currentState.corners as any,
                color: currentState.qrColors[0],
            },
            cornersDotOptions: {
                type: "dot",
                color: currentState.qrColors[0],
            },
            backgroundOptions: {
                color: currentState.bgColors[0],
                gradient: getGradient(
                    currentState.bgColors,
                    currentState.bgGradientType,
                    currentState.bgRotation,
                ),
                round: currentState.bgCornerRadius,
            },
            imageOptions: {
                crossOrigin: "anonymous",
                margin: currentState.logoMargin,
            },
        });

        useImperativeHandle(ref, () => ({
            download: async (extension, size) => {
                setIsGenerating(true);
                try {
                    const exportOptions = getOptions(state, size);
                    const tempQr = new QRCodeStyling(exportOptions);
                    await new Promise((resolve) => setTimeout(resolve, 50));
                    await tempQr.download({
                        name: "qr-jellio-os",
                        extension,
                    });
                } finally {
                    setIsGenerating(false);
                }
            },
        }));

        useEffect(() => {
            const qr = new QRCodeStyling(getOptions(state));
            if (containerRef.current) {
                containerRef.current.innerHTML = "";
                qr.append(containerRef.current);
            }
            qrCode.current = qr;
        }, []);

        useEffect(() => {
            if (!qrCode.current) return;

            // Hiệu ứng loading khi sửa
            setIsUpdating(true);
            const timer = setTimeout(() => {
                qrCode.current?.update(getOptions(state));
                setIsUpdating(false);
            }, 50); // Delay nhẹ để thấy hiệu ứng kính mờ

            return () => clearTimeout(timer);
        }, [state]);

        const isLoading = isGenerating || isUpdating;

        return (
            <div className="relative bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-2xl border border-white/50 dark:border-slate-700 animate-pop transition-all duration-300 overflow-hidden">
                <div
                    ref={containerRef}
                    className="p-0 rounded-none overflow-visible transition-all duration-300"
                />

                {isLoading && (
                    <div className="absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-sm z-50 animate-in fade-in duration-200" />
                )}
            </div>
        );
    }),
);

QRPreview.displayName = "QRPreview";
