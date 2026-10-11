// Web Audio API ambient romantic music generator
// Synthesizes soothing, gentle acoustic harp/piano chords and peaceful melodic arpeggios

class RomanticAudioPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timer: number | null = null;
  private currentTrackIndex = 0;
  private volume = 0.35;
  private onStateChange: ((isPlaying: boolean, trackName: string) => void) | null = null;

  public tracks = [
    { name: "لحن العشاق", mood: "بيانو هادئ وتناغمات دافئة", bpm: 72 },
    { name: "شمس الأصيل", mood: "أنغام وترية دافئة", bpm: 64 },
    { name: "تهويدة تحت النجوم", mood: "هارب حالم في سكون الليل", bpm: 58 }
  ];

  // Note frequency helper
  private noteToFreq(note: string): number {
    const notes: Record<string, number> = {
      'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
      'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
      'C5': 523.25, 'D5': 587.33, 'E5': 659.25, 'F5': 698.46, 'G5': 783.99, 'A5': 880.00, 'B5': 987.77,
      'E2': 82.41, 'A2': 110.00, 'F2': 87.31, 'G2': 98.00
    };
    return notes[note] || 440.00;
  }

  // Chord progressions per track
  private chordProgressions = [
    // Track 1: C - G - Am - F (Romantic classic)
    [
      ['C3', 'G3', 'C4', 'E4', 'G4'],
      ['G2', 'D3', 'G3', 'B3', 'D4'],
      ['A2', 'E3', 'A3', 'C4', 'E4'],
      ['F2', 'C3', 'F3', 'A3', 'C4']
    ],
    // Track 2: Dm - G - C - Am
    [
      ['D3', 'A3', 'D4', 'F4', 'A4'],
      ['G2', 'D3', 'G3', 'B3', 'F4'],
      ['C3', 'G3', 'E4', 'G4', 'C5'],
      ['A2', 'E3', 'C4', 'E4', 'A4']
    ],
    // Track 3: F - G - Em - Am (Twilight dreamy)
    [
      ['F2', 'C3', 'A3', 'C4', 'E4'],
      ['G2', 'D3', 'B3', 'D4', 'G4'],
      ['E2', 'B2', 'G3', 'B3', 'E4'],
      ['A2', 'E3', 'C4', 'E4', 'G4']
    ]
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (isPlaying: boolean, trackName: string) => void) {
    this.onStateChange = cb;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
  }

  public getVolume() {
    return this.volume;
  }

  public getCurrentTrack() {
    return this.tracks[this.currentTrackIndex];
  }

  private playTone(freq: number, startTime: number, duration: number, gainValue = 0.15) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Gentle warm acoustic tone
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, startTime);
    filter.frequency.exponentialRampToValueAtTime(400, startTime + duration);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(gainValue * this.volume, startTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.1);
  }

  private step = 0;
  private loopMelody() {
    if (!this.isPlaying || !this.ctx) return;

    const progression = this.chordProgressions[this.currentTrackIndex];
    const chord = progression[Math.floor(this.step / 4) % progression.length];
    const note = chord[this.step % chord.length];
    const freq = this.noteToFreq(note);

    const now = this.ctx.currentTime;
    this.playTone(freq, now, 1.8, 0.22);

    // Occasional gentle bass root
    if (this.step % 4 === 0) {
      const bassNote = chord[0];
      this.playTone(this.noteToFreq(bassNote) / 2, now, 2.8, 0.18);
    }

    this.step++;
    const track = this.tracks[this.currentTrackIndex];
    const interval = (60 / track.bpm) * 750; // ms per beat

    this.timer = window.setTimeout(() => {
      this.loopMelody();
    }, interval);
  }

  public togglePlay(): boolean {
    this.init();
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
    return this.isPlaying;
  }

  public play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.loopMelody();
    if (this.onStateChange) {
      this.onStateChange(true, this.tracks[this.currentTrackIndex].name);
    }
  }

  public pause() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.onStateChange) {
      this.onStateChange(false, this.tracks[this.currentTrackIndex].name);
    }
  }

  public nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
    this.step = 0;
    if (this.isPlaying) {
      if (this.timer) clearTimeout(this.timer);
      this.loopMelody();
    }
    if (this.onStateChange) {
      this.onStateChange(this.isPlaying, this.tracks[this.currentTrackIndex].name);
    }
  }

  public prevTrack() {
    this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
    this.step = 0;
    if (this.isPlaying) {
      if (this.timer) clearTimeout(this.timer);
      this.loopMelody();
    }
    if (this.onStateChange) {
      this.onStateChange(this.isPlaying, this.tracks[this.currentTrackIndex].name);
    }
  }
}

export const romanticAudio = new RomanticAudioPlayer();
