import { ButtonParams, RectInterface } from "../interfaces/interfaces";

/**
 * The Context defines the interface of interest to clients.
 */
export class Button {

    /**
     * @type {StrategyDrawing} The StrategyDrawing maintains a reference to one of the Strategy
     * objects. The StrategyDrawing does not know the concrete class of a strategy. It
     * should work with all strategies via the StrategyDrawing interface.
     */
    private strategyDrawing: StrategyDrawing;
    private params: ButtonParams;
    private actualeConfig: ButtonParams;
    isClicked = false;

    constructor(strategy: StrategyDrawing, params: ButtonParams) {
        this.strategyDrawing = strategy;
        this.params = params;
        this.actualeConfig = params;
    }

    public getRectInterface(): RectInterface {
        return {
            x: this.params.x,
            y: this.params.y,
            width: this.params.width,
            height: this.params.height
        }

    }
    public setStrategyDrawing(strategy: StrategyDrawing) {
        this.strategyDrawing = strategy;
    }

    public getStrategyDrawing(): StrategyDrawing {
        return this.strategyDrawing;
    }

    public draw(): void {
        this.strategyDrawing.draw(this.actualeConfig);
    }

    public click(): void {
        this.isClicked = this.isClicked ? false : true;
        this.actualeConfig = {
            ...this.params,
            clicked: this.isClicked,
            fillColor: this.isClicked ? this.params.strokeColor : this.params.fillColor,
            text: this.isClicked ? this.params.toggleText : this.params.text
        }
        this.draw();
        this.params.callback();
    }
}


export interface StrategyDrawing {
    draw(params: ButtonParams): void;
    isInside(shape: RectInterface, mouseCoordinates: { x: number, y: number }): boolean;
}

export class StrategyRect implements StrategyDrawing {

    isInside(shape: RectInterface, mouseCoordinates: { x: number; y: number; }): boolean {
        return mouseCoordinates.x > shape.x && mouseCoordinates.x < shape.x + shape.width &&
            mouseCoordinates.y > shape.y && mouseCoordinates.y < shape.y + shape.height;
    }

    draw(params: ButtonParams): void {
        //disegna un rettangolo 
        params.context.beginPath();
        params.context.rect(params.x, params.y, params.width, params.height);
        params.context.fillStyle = params.fillColor;
        params.context.fill();
        params.context.lineWidth = 1;
        params.context.strokeStyle = params.strokeColor;
        params.context.stroke();
        params.context.closePath();
        //disegna il testo mettendolo al centro del rettangolo e dividilo in righe
        writeText(params);

    }

}

export class StrategyCircle implements StrategyDrawing {

    isInside(shape: RectInterface, mouseCoordinates: { x: number; y: number; }): boolean {
        const radius = shape.width / 2;
        const x = shape.x + radius;
        const y = shape.y + radius;
        return Math.sqrt(Math.pow(x - mouseCoordinates.x, 2) + Math.pow(y - mouseCoordinates.y, 2)) < radius;
    }

    draw(params: ButtonParams): void {
        //disegna il cerchio , params.x e y sono le coordinate del quadrato che inscrive il cerchio
        const radius = params.width / 2;
        const x = params.x + radius;
        const y = params.y + radius;
        params.context.beginPath();
        params.context.arc(x, y, radius, 0, 2 * Math.PI);
        params.context.fillStyle = params.fillColor;
        params.context.fill();
        params.context.lineWidth = 1;
        params.context.strokeStyle = params.strokeColor;
        params.context.stroke();
        params.context.closePath();


        //disegna il testo mettendolo al centro del cerchio e dividilo in righe
        writeText(params);
    }
}


function writeText(params: ButtonParams) {
    const text = params.text.split('\n');
    const fontSize = params.height / text.length;
    params.context.font = `${fontSize}px  Impact`;
    params.context.fillStyle = '#ffffff';
    params.context.textAlign = 'center';
    params.context.textBaseline = 'middle';
    for (let i = 0; i < text.length; i++) {
        params.context.fillText(text[i], params.x + params.width / 2, params.y + params.height / 2 + fontSize * i - fontSize * text.length / 2 + fontSize / 2);
    }
}

