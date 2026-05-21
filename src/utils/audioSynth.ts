// Web Audio API Synthesizer for Peanuts/Snoopy-style sound effects and background music.
class AudioSynth {
  private ctx: AudioContext | null = null;
  private backgroundNodes: { oscs: OscillatorNode[]; gain: GainNode }[] = [];
  private activeThemeTimer: any = null;

  private initCtx() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // Play a single Peanuts "Wah-Wah" teacher voice
  public playTeacherWah(duration = 1.5) {
    this.initCtx();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    // Create an oscillator
    const osc = ctx.createOscillator();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(110, now); // Low pitch A2

    // Bandpass filter with moving frequency to get the "wah" sound
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.Q.setValueAtTime(8, now);
    filter.frequency.setValueAtTime(100, now);
    
    // Animate the wah-wah filter frequency
    filter.frequency.exponentialRampToValueAtTime(800, now + 0.2);
    filter.frequency.exponentialRampToValueAtTime(150, now + 0.45);
    filter.frequency.exponentialRampToValueAtTime(700, now + 0.7);
    filter.frequency.exponentialRampToValueAtTime(100, now + 0.95);
    filter.frequency.exponentialRampToValueAtTime(500, now + 1.2);
    filter.frequency.exponentialRampToValueAtTime(80, now + duration);

    // Gain node for envelope
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Connections
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    // Start and Stop
    osc.start(now);
    osc.stop(now + duration);
  }

  // Play a quick Woodstock Chirp (high sweep)
  public playWoodstockChirp() {
    this.initCtx();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1500, now);
    osc.frequency.exponentialRampToValueAtTime(3200, now + 0.12);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);

    // Second chirp right after
    const osc2 = ctx.createOscillator();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(1600, now + 0.15);
    osc2.frequency.exponentialRampToValueAtTime(3500, now + 0.28);

    const gain2 = ctx.createGain();
    gain2.gain.setValueAtTime(0.12, now + 0.15);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    osc2.start(now + 0.15);
    osc2.stop(now + 0.3);
  }

  // Play a retro Vince Guaraldi-style jazz piano chord progression
  public startJazzPianoLoop(volume = 0.5) {
    this.stopBackgroundSound();
    this.initCtx();
    if (!this.ctx) return;

    const ctx = this.ctx;
    let barIndex = 0;

    // Jazz chords: Fmaj7 -> Bb13 -> Am7 -> D7b9 -> Gm7 -> C7
    const chords = [
      [174.61, 261.63, 329.63, 392.00], // Fmaj7 (F3, C4, E4, G4)
      [116.54, 233.08, 293.66, 349.23, 440.00], // Bb13 (Bb2, Bb3, D4, F4, A4)
      [220.00, 329.63, 392.00, 440.00, 523.25], // Am7 (A3, E4, G4, A4, C5)
      [146.83, 293.66, 349.23, 415.30, 493.88], // D7b9 (D3, D4, F4, Ab4, B4)
      [196.00, 293.66, 349.23, 392.00, 466.16], // Gm7 (G3, D4, F4, G4, Bb4)
      [130.81, 261.63, 311.13, 392.00, 493.88]  // C7 (C3, C4, Eb4, G4, B4)
    ];

    const playChord = (chordFreqs: number[], time: number, duration: number) => {
      const chordGain = ctx.createGain();
      chordGain.gain.setValueAtTime(0.001, time);
      chordGain.gain.linearRampToValueAtTime(0.12 * volume, time + 0.05);
      chordGain.gain.exponentialRampToValueAtTime(0.001, time + duration - 0.05);
      chordGain.connect(ctx.destination);

      const oscs = chordFreqs.map(freq => {
        const osc = ctx.createOscillator();
        // Warm triangle wave sounds a bit like a soft Rhodes/Wurlitzer
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, time);
        
        // Add subtle vibrato
        const vibrato = ctx.createOscillator();
        const vibratoGain = ctx.createGain();
        vibrato.frequency.value = 5.5; // 5.5Hz vibrato
        vibratoGain.gain.value = freq * 0.006; // vibrato depth
        
        vibrato.connect(vibratoGain);
        vibratoGain.connect(osc.frequency);
        
        osc.connect(chordGain);
        
        vibrato.start(time);
        osc.start(time);
        
        vibrato.stop(time + duration);
        osc.stop(time + duration);

        return osc;
      });

      this.backgroundNodes.push({ oscs, gain: chordGain });
    };

    const beatDuration = 0.8; // 75 BPM

    const scheduleChords = () => {
      const now = ctx.currentTime;
      
      // Let's schedule 4 beats
      const currentChord = chords[barIndex % chords.length];
      
      // Beat 1: Chord plays
      playChord(currentChord, now, beatDuration * 1.8);

      // Beat 3: Bass note plays
      const bassNote = currentChord[0] * 0.5; // lower octave
      const bassOsc = ctx.createOscillator();
      bassOsc.type = "sine";
      bassOsc.frequency.setValueAtTime(bassNote, now + beatDuration * 2);
      
      const bassGain = ctx.createGain();
      bassGain.gain.setValueAtTime(0.001, now + beatDuration * 2);
      bassGain.gain.linearRampToValueAtTime(0.18 * volume, now + beatDuration * 2 + 0.05);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + beatDuration * 2.8);
      
      bassOsc.connect(bassGain);
      bassGain.connect(ctx.destination);
      bassOsc.start(now + beatDuration * 2);
      bassOsc.stop(now + beatDuration * 2.8);

      barIndex++;
      this.activeThemeTimer = setTimeout(scheduleChords, beatDuration * 4 * 1000);
    };

    scheduleChords();
  }

  // Play background ambient playground sound
  public startPlaygroundAmbient(volume = 0.5) {
    this.stopBackgroundSound();
    this.initCtx();
    if (!this.ctx) return;

    const ctx = this.ctx;
    
    // Create soft wind noise + random birds/laughs
    // Generate pinkish noise
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11; // normalise
      b6 = white * 0.115926;
    }

    const noiseNode = ctx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Filter to make it warm and low-frequency
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(350, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08 * volume, ctx.currentTime);

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noiseNode.start();

    // Store references to shut down later
    const oscWrapper = [noiseNode as any];
    this.backgroundNodes.push({ oscs: oscWrapper, gain });

    // Schedule random laughs/chirps
    const triggerRandomSound = () => {
      const randDelay = Math.random() * 3000 + 1500;
      this.activeThemeTimer = setTimeout(() => {
        if (Math.random() > 0.5) {
          this.playWoodstockChirp();
        } else {
          // Play a quick synth laugh
          this.playCuteSynthLaugh();
        }
        triggerRandomSound();
      }, randDelay);
    };

    triggerRandomSound();
  }

  // Play a quick cute laugh sound
  public playCuteSynthLaugh() {
    this.initCtx();
    if (!this.ctx) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, now);
    
    // Laugh vibration
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.setValueAtTime(800, now + 0.08);
    osc.frequency.setValueAtTime(600, now + 0.16);
    osc.frequency.setValueAtTime(800, now + 0.24);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Play ambient night crickets sound
  public startNightAmbient(volume = 0.5) {
    this.stopBackgroundSound();
    this.initCtx();
    if (!this.ctx) return;

    const ctx = this.ctx;

    // Fast pulse high-pitched sound for crickets
    const cricketOsc = ctx.createOscillator();
    cricketOsc.type = "sine";
    cricketOsc.frequency.setValueAtTime(4500, ctx.currentTime);

    // LFO to modulate cricket volume
    const lfo = ctx.createOscillator();
    lfo.type = "sawtooth";
    lfo.frequency.setValueAtTime(12, ctx.currentTime); // 12 chirps per sec

    const lfoGain = ctx.createGain();
    lfoGain.gain.setValueAtTime(0.05 * volume, ctx.currentTime);

    const mainGain = ctx.createGain();
    mainGain.gain.setValueAtTime(0.005 * volume, ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(mainGain.gain);

    cricketOsc.connect(mainGain);
    mainGain.connect(ctx.destination);

    lfo.start();
    cricketOsc.start();

    const oscWrapper = [cricketOsc, lfo];
    this.backgroundNodes.push({ oscs: oscWrapper, gain: mainGain });
  }

  // Stop whatever is playing in the background
  public stopBackgroundSound() {
    if (this.activeThemeTimer) {
      clearTimeout(this.activeThemeTimer);
      this.activeThemeTimer = null;
    }
    this.backgroundNodes.forEach(node => {
      node.oscs.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // already stopped
        }
      });
      try {
        node.gain.disconnect();
      } catch (e) {}
    });
    this.backgroundNodes = [];
  }
}

export const audioSynth = new AudioSynth();
