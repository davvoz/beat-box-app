const LOOP_LENGTH = 32;
export class TimerScheduler {

    bpm: number;
    callbackList: any;
    isStarted: boolean;
    audioContext: AudioContext;
    requestId: number;
    rhythmIndex: number;
    noteTime: number;
    startTime: number;
    contextPlayTime: number;
    constructor(bpm: number, callbackList: any, audioContextIn: AudioContext) {
        this.bpm = bpm;
        this.callbackList = callbackList;
        this.isStarted = false;
        this.audioContext = audioContextIn;
        this.requestId = 0;
        this.rhythmIndex = 0;
        this.noteTime = 0.0;
        this.startTime = 0.0;
        this.contextPlayTime = 0.0;
    }
    public isRunning(): boolean {
        return this.isStarted;
    }

    public start() {
        this.isStarted = true;
        this.handlePlay();
    }
    
    public stop() {
        this.isStarted = false;
        this.handleStop();
    }

    private action() {
        this.callbackList.forEach((callback: () => void) => {
            callback();
        });
    }

    private handlePlay() {
        console.log("Starting");
        this.noteTime = 0.0;
        this.startTime = this.audioContext.currentTime + 0.005;
        this.rhythmIndex = 0;
        this.schedule();
    }

    private handleStop() {
        console.log("Stopping");
        cancelAnimationFrame(this.requestId);
    }

    private schedule() {
        // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
        var currentTime = this.audioContext.currentTime - this.startTime;

        while (this.noteTime < currentTime + 0.200) {
            this.contextPlayTime = this.noteTime + this.startTime;
            this.action();
            this.advanceNote();
        }
        this.requestId = requestAnimationFrame(this.schedule.bind(this));

    }

    private advanceNote() {
        // Setting tempo to 60 BPM just for now
        var secondsPerBeat = 60.0 / this.bpm;
        this.rhythmIndex++;
        if (this.rhythmIndex == LOOP_LENGTH) {
            this.rhythmIndex = 0;
        }
        //0.25 because each square is a 16th note
        this.noteTime += 0.25 * secondsPerBeat;
    }
}



