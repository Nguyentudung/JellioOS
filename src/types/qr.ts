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
    isGradient: boolean;
    color1: string;
    color2: string;
    bgColor: string;
    logo: string | null;
    margin: number;
    logoMargin: number;
}
