import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeatBoxComponentComponent } from './beat-box-component/beat-box-component.component';
import { SamplesLibraryService } from './services/samples-library.service';
import { TimerService } from './services/timer.service';

@NgModule({
  declarations: [
    AppComponent,
    BeatBoxComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SamplesLibraryService,AudioContext,TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
