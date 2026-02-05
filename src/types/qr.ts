export type QRDotsType =
    | "rounded"
    | "dots"
    | "classy"
    | "classy-rounded"
    | "square"
    | "extra-rounded";
export type QRCornersType = "square" | "extra-rounded" | "dot";
export type QRExtension = "png" | "svg" | "jpeg" | "webp";

export interface QRState {
    data: string;
    dots: QRDotsType;
    corners: QRCornersType;

    // QR Colors (Dots)
    qrColors: string[];
    qrGradientType: "linear" | "radial";
    qrRotation: number;

    // Background Colors
    bgColors: string[];
    bgGradientType: "linear" | "radial";
    bgRotation: number;
    bgCornerRadius: number;

    logo: string | null;
    margin: number;
    logoMargin: number;
}
