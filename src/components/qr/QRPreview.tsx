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
                    color: state.color1,
                    type: state.dots as any,
                },
                backgroundOptions: {
                    color: state.bgColor,
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

            const options: Options = {
                data: state.data,
                image: state.logo || undefined,
                margin: state.margin,
                dotsOptions: {
                    type: state.dots as any,
                    color: state.color1,
                    gradient: state.isGradient
                        ? {
                              type: "linear",
                              rotation: 45,
                              colorStops: [
                                  { offset: 0, color: state.color1 },
                                  { offset: 1, color: state.color2 },
                              ],
                          }
                        : undefined,
                },
                cornersSquareOptions: {
                    type: state.corners as any,
                    color: state.color1,
                },
                cornersDotOptions: {
                    type: "dot",
                    color: state.color1,
                },
                backgroundOptions: {
                    color: state.bgColor,
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
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black shadow-lg whitespace-nowrap tracking-widest uppercase">
                    jellioOS Preview
                </div>
            </div>
        );
    },
);

QRPreview.displayName = "QRPreview";
