import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, NgZone, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Button, StrategyCircle, StrategyRect } from '../classes/Button';
import { ButtonParams, MatrixButton } from '../interfaces/interfaces';
import { SamplesLibraryService } from '../services/samples-library.service';
import { TimerService } from '../services/timer.service';

@Component({
  selector: 'app-beat-box-component',
  templateUrl: './beat-box-component.component.html',
  styleUrls: ['./beat-box-component.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeatBoxComponentComponent implements AfterViewInit {
  @ViewChild('canvas', { static: false })
  canvas!: ElementRef<HTMLCanvasElement>;
  audioContext: AudioContext = new AudioContext();
  //timerScheduler!: TimerScheduler;
  scelte = ['a', 'b', 'c'];
  buttonGroupRect: Button[] = [];
  playStopToggle!: Button;
  context!: CanvasRenderingContext2D;
  matrixButton: Button[] = [];
  audioBuffers: AudioBuffer[] = [];
  //dichiara un subscribe per il timer
  subscribe!: Subscription;


  //radioButtons!: RadioButtonGroup;
  constructor(private tickZone: NgZone, public samplesLibrary: SamplesLibraryService, public timer: TimerService) {
    const kick = this.samplesLibrary.buffers[0];
    this.subscribe = timer.tick.subscribe(() => {
      this.tickZone.runOutsideAngular(() => {
        this.tick();
      });
    });

  }

  ngAfterViewInit(): void {

    this.canvas.nativeElement.width = window.innerWidth;
    this.canvas.nativeElement.height = window.innerHeight;
    const res = this.canvas.nativeElement.getContext('2d');
    if (!res || !(res instanceof CanvasRenderingContext2D)) {
      throw new Error('Failed to get 2d context.');
    }
    this.context = res;
    //this.timerScheduler = new TimerScheduler(120, [this.tick], this.audioContext);

    const playStopButtonConfig: ButtonParams = {
      toggleText: 'Stop\nthis\nshit',
      isToggle: true,
      clicked: false,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      fillColor: '#00ff30',
      strokeColor: '#02aa0f',
      text: 'Play\nthis\nshit',
      context: this.context,
      callback: () => {
        if (!this.playStopToggle.isClicked) {
          this.timer.stop();
        }
        else {
          this.timer.start();
        }
      }
    };
    this.playStopToggle = new Button(new StrategyCircle(), playStopButtonConfig);
    this.playStopToggle.draw();


    this.canvas.nativeElement.addEventListener('click', (event: MouseEvent) => {

      if (this.playStopToggle.getStrategyDrawing().isInside(this.playStopToggle.getRectInterface(), { x: event.clientX, y: event.clientY })) {
        //se sei dentro clicchi , vedrà poi l'interfaccia cosa fare
        this.playStopToggle.click();
      }

    }, false);

  }

  suonaSample(buffer: AudioBuffer) {
    const sampler = this.audioContext.createBufferSource();
    sampler.buffer = buffer;
    sampler.connect(this.audioContext.destination);
    sampler.start();
  }

  tick(): void {
    console.log('tick');
    this.context.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.playStopToggle.draw();
    this.suonaSample(this.samplesLibrary.buffers[0]);

  }

  isInsideARect(x: number, y: number, width: number, height: number): boolean {
    return x > 0 && x < width && y > 0 && y < height;
  }

  isInsideACircle(x: number, y: number, radius: number): boolean {
    return Math.sqrt(Math.pow(x - radius, 2) + Math.pow(y - radius, 2)) < radius;
  }

  configurateMatrixButtons(mb: MatrixButton): Button[] {
    const buttonGroup: Button[] = [];
    for (let i = 0; i < mb.cols; i++) {
      for (let j = 0; j < mb.rows; j++) {
        const buttonConfig: ButtonParams = {
          toggleText: 'x',
          isToggle: true,
          clicked: false,
          x: mb.x + i * mb.width,
          y: mb.y + j * mb.height,
          width: mb.width,
          height: mb.height,
          fillColor: '#00ff30',
          strokeColor: '#02aa00',
          text: '0',
          context: this.context,
          callback: () => {
            this.cellCallback(i, j);
          }
        };
        buttonGroup.push(new Button(new StrategyRect(), buttonConfig));
      }
    }
    return buttonGroup;
  }
  cellCallback(i: number, j: number) {
    console.log(`${i}${j}`);
  }





}

