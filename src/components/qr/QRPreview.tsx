import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
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

export const QRPreview = forwardRef<QRPreviewHandle, QRPreviewProps>(
    ({ state }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const qrCode = useRef<QRCodeStyling | null>(null);

        useImperativeHandle(ref, () => ({
            download: (extension, size) => {
                if (!qrCode.current) return;
                qrCode.current.update({ width: size, height: size });
                qrCode.current.download({ name: "qr-jellio-os", extension });
                // Revert size
                qrCode.current.update({ width: 300, height: 300 });
            },
        }));

        useEffect(() => {
            // Initialize
            const qr = new QRCodeStyling({
                width: 300,
                height: 300,
                type: "svg",
                data: state.data,
                dotsOptions: {
                    color: state.qrColors[0],
                    type: state.dots as any,
                },
                backgroundOptions: {
                    color: state.bgColors[0],
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    margin: state.logoMargin,
                },
            });

            if (containerRef.current) {
                containerRef.current.innerHTML = "";
                qr.append(containerRef.current);
            }
            qrCode.current = qr;
        }, []);

        useEffect(() => {
            if (!qrCode.current) return;

            const getGradient = (
                colors: string[],
                type: "linear" | "radial",
                rotation: number,
            ) => {
                if (colors.length <= 1) return undefined;
                return {
                    type: type,
                    rotation: (rotation * Math.PI) / 180, // Convert deg to rad
                    colorStops: colors.map((color, index) => ({
                        offset: index / (colors.length - 1),
                        color: color,
                    })),
                };
            };

            const options: Options = {
                data: state.data,
                image: state.logo || undefined,
                margin: state.margin,
                dotsOptions: {
                    type: state.dots as any,
                    color: state.qrColors[0],
                    gradient: getGradient(
                        state.qrColors,
                        state.qrGradientType,
                        state.qrRotation,
                    ),
                },
                cornersSquareOptions: {
                    type: state.corners as any,
                    color: state.qrColors[0], // Use first color for corners for now, or match gradient?
                    // qr-code-styling corners can take gradient? Maybe. But let's stick to simple solid match for now to avoid complexity unless user asked (they didn't explicitly).
                    // Actually, let's try to pass the same gradient if possible, but the types might be strict.
                    // Usually corners match the main style.
                },
                cornersDotOptions: {
                    type: "dot",
                    color: state.qrColors[0],
                },
                backgroundOptions: {
                    color: state.bgColors[0],
                    gradient: getGradient(
                        state.bgColors,
                        state.bgGradientType,
                        state.bgRotation,
                    ),
                },
                imageOptions: {
                    margin: state.logoMargin,
                },
            };
            qrCode.current.update(options);
        }, [state]);

        return (
            <div className="relative bg-white dark:bg-slate-900 p-8 rounded-[3rem] shadow-2xl border border-white/50 dark:border-slate-700 animate-pop transition-all duration-300">
                <div
                    ref={containerRef}
                    className="rounded-2xl overflow-hidden shadow-inner bg-white p-2"
                />
            </div>
        );
    },
);

QRPreview.displayName = "QRPreview";
