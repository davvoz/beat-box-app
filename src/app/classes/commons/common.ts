export class Common {

    static createButton(text: any, callback: any, documentIn: { createElement: (arg0: string) => any; }) {
        let button = documentIn.createElement('button');
        button.innerText = text;
        button.onclick = callback;
        return button;
    }
    static getMousePos(canvasIn: { getBoundingClientRect: () => any; }, evt: { clientX: number; clientY: number; }) {
        const rect = canvasIn.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    static animazione(callbackList: any[]) {
        requestAnimationFrame(() => {
            Common.animazione(callbackList);
        });
        callbackList.forEach((callback: () => void) => {
            callback();
        });
    }
    static draw(shape: string | any[], color: any, contextIn: { fillStyle: any; beginPath: () => void; moveTo: (arg0: any, arg1: any) => void; lineTo: (arg0: any, arg1: any) => void; closePath: () => void; fill: () => void; }) {
        contextIn.fillStyle = color;
        contextIn.beginPath();
        contextIn.moveTo(shape[0][0], shape[0][1]);
        for (var i = 1; i < shape.length; i++) {
            contextIn.lineTo(shape[i][0], shape[i][1]);
        }
        contextIn.closePath();
        contextIn.fill();
    }
    /* funzione disegna una forma quadrata */
    static drawSquare(x: any, y: any, size: any) {
        return [[x, y], [x + size, y], [x + size, y + size], [x, y + size]];
    }
    /* funzione disegna poligono regolare con n lati */
    static getRegularPolygon(x: number, y: number, radius: number, n: number) {
        var shape = [];
        for (var i = 0; i < n; i++) {
            shape.push([x + radius * Math.cos(2 * Math.PI * i / n), y + radius * Math.sin(2 * Math.PI * i / n)]);
        }
        return shape;
    }
    /*funzione disegna una forma rettangolare */
    static drawRectangle(x: any, y: any, width: any, height: any) {
        return [[x, y], [x + width, y], [x + width, y + height], [x, y + height]];
    }

    /* funzione disegna triangolo */
    static drawTriangle(x: any, y: any, size: any) {
        return Common.getRegularPolygon(x, y, size, 3);
    }
    /* disegna un triangolo rettangolo */
    static drawRightTriangle(x: any, y: any, size: any) {
        return [[x, y], [x + size, y], [x, y + size]];
    }
    /* rileva tutti i tipi di collsioni */
    static collisionDetection(shape1: any[], shape2: any[]) {
        return shape1.some((point1: any[]) => {
            return shape2.some((point2: any[]) => {
                return point1[0] === point2[0] && point1[1] === point2[1];
            });
        });
    }
    /* lancia una funzione random tra drawTriangle,drawRightTriangle,drawRegularPolygon,drawSquare */
    static randomShape(x: any, y: any, size: any) {
        const shape = [Common.drawTriangle(x, y, size), Common.drawRightTriangle(x, y, size), Common.getRegularPolygon(x, y, size, 5), Common.drawSquare(x, y, size)];
        return shape[Math.floor(Math.random() * shape.length)];
    }
    /* random color */
    static randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    /*canvas button*/
    static noteToFrequency(note: string) {
        //converti da lettere a frequenza
        const noteInLettereConDiesis = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const noteInFrequenza = [16.35, 17.32, 18.35, 19.45, 20.60, 21.83, 23.12, 24.50, 25.96, 27.50, 29.14, 30.87];
        return noteInFrequenza[noteInLettereConDiesis.indexOf(note)];
    }
    //disegna bottone su canvas
    static drawButton(configIn:
        {
            x: any; y: any; width: any; height: any;
            text: any; color: any; font: any; fontSize: any; fontColor: any;
            borderColor: any; borderWidth: any;
        }, contextIn:
            {
                fillStyle: any;
                fillRect: (arg0: any, arg1: any, arg2: any, arg3: any) => void;
                font: string;
                measureText: (arg0: any) => { (): any; new(): any; width: number; };
                textAlign:
                string; fillText: (arg0: any, arg1: any, arg2: any) => void;
                strokeStyle: any;
                strokeText: (arg0: any, arg1: any, arg2: any) => void;
            }) {
        const { x, y, width, height, text, color, font, fontSize, fontColor, borderColor } = configIn;
        contextIn.fillStyle = color;
        contextIn.fillRect(x, y, width, height);
        contextIn.fillStyle = fontColor;
        contextIn.font = `${fontSize}px ${font}`;
        if (contextIn.measureText(text).width > width) {
            const textLines = text.split('\n');
            contextIn.textAlign = 'left';
            textLines.forEach((textLine: any, index: number) => {
                contextIn.fillText(textLine, x, y + fontSize * (index + 1));
                contextIn.strokeStyle = borderColor;
                contextIn.strokeText(textLine, x, y + fontSize * (index + 1));

            });
        } else {
            contextIn.font = `${fontSize}px ${font}`;
            contextIn.fillText(text, x + (width - contextIn.measureText(text).width) / 2, y + (height - fontSize) / 2 + fontSize);
        }
    }

    static getRandom(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //dra w rect x: 0, y: 0,width: canvas.width,height: canvas.height,color: '#000',borderColor: '#fff',borderWidth: 2
    static drawRect(configIn: { x: any; y: any; width: any; height: any; color: any; borderColor: any; borderWidth: any; }, contextIn: { fillStyle: any; fillRect: (arg0: any, arg1: any, arg2: any, arg3: any) => void; strokeStyle: any; lineWidth: any; strokeRect: (arg0: any, arg1: any, arg2: any, arg3: any) => void; }) {
        const { x, y, width, height, color, borderColor, borderWidth } = configIn;
        contextIn.fillStyle = color;
        contextIn.fillRect(x, y, width, height);
        contextIn.strokeStyle = borderColor;
        contextIn.lineWidth = borderWidth;
        contextIn.strokeRect(x, y, width, height);
    }
    //function isInside(e.offsetX, e.offsetY, oggetto))
    static isInside(x: number, y: number, rect: { x: number; width: any; y: number; height: any; }) {
        return x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
    }
    static spostaRandomicamenteGliElementiDiUnArray(array: string | any[], maxLength: number) {
        const newArray = [];
        for (let i = 0; i < maxLength / 2; i++) {
            let indice = Math.floor(Math.random() * array.length);
            newArray.push(array[indice]);
        }
        return newArray.concat(newArray);
    }

  

}

