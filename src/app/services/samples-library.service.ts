import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SamplesLibraryService {
  
  public buffers:AudioBuffer[] = [];
  constructor(private _audioContext: AudioContext) {
      this.loadSounds('./assets/wav/kick27.wav');//src\assets\wav\kick27.wav
  }

  private loadSounds(path: string): void {
      const request = new XMLHttpRequest();
      request.open('GET', path, true);
      request.responseType = 'arraybuffer';
      const context = this._audioContext;
      request.onload = () => {
          context.decodeAudioData(
              request.response,
              buffer => {
                  if (!buffer) {
                      alert('error decoding file data: ' + path);
                      return;
                  }
                  this.buffers.push(buffer);
              },
              error => {
                  console.error('decodeAudioData error', error);
              }

          );
      };
      request.onerror = () => {
          alert('BufferLoader: XHR error');
      };
      request.send();
  }
}