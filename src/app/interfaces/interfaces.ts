export interface RettangoloBorder {
    x: number;
    y: number;
    width: number;
    height: number;
    fillColor: string;
    strokeColor: string;
    context: CanvasRenderingContext2D;
}

export interface CerchioBorder {
    x: number;
    y: number;
    radius: number;
    fillColor: string;
    strokeColor: string;
    context: CanvasRenderingContext2D;
}

export interface MatrixButton {
    x: number;
    y: number;
    width: number;
    height: number;
    rows: number;
    cols: number;
}

export interface ButtonParams {
    clicked: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    fillColor: string;
    strokeColor: string;
    text: string;
    context: CanvasRenderingContext2D;
    isToggle: boolean;
    toggleText: string;
    callback: () => void;
}

export interface RectInterface {
    x: number;
    y: number;
    width: number;
    height: number;
}

