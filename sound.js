// 8-bit Sound Effects & Music (Web Audio API — no external files needed)

let audioContext;
let isSfxOn = localStorage.getItem("sfxEnabled") !== "false";
let isBgmOn = false;
let bgmOscillators = [];

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

function isSfxEnabled() { return isSfxOn; }
function setSfxEnabled(val) { isSfxOn = val; localStorage.setItem("sfxEnabled", val); }

// Play simple beep/sfx
function playSfx(type = "click") {
  if (!isSfxOn) return;

  const ctx = getAudioContext();
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.connect(gain);
  gain.connect(ctx.destination);

  const frequencies = {
    click: 600,
    success: 800,
    error: 300,
    boot: 1200,
    pop: 900,
  };

  const durations = {
    click: 0.05,
    success: 0.15,
    error: 0.1,
    boot: 0.3,
    pop: 0.08,
  };

  osc.frequency.setValueAtTime(frequencies[type] || 600, now);
  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.01, now + (durations[type] || 0.1));

  osc.start(now);
  osc.stop(now + (durations[type] || 0.1));
}

// Toggle background music (looping 8-bit melody)
function toggleBgm() {
  if (isBgmOn) {
    stopBgm();
    return false;
  } else {
    playBgm();
    return true;
  }
}

function playBgm() {
  if (isBgmOn) return;
  isBgmOn = true;

  const ctx = getAudioContext();
  const now = ctx.currentTime;

  // Simple 8-bit melody (C major scale)
  const melody = [
    { freq: 262, duration: 0.25 }, // C4
    { freq: 330, duration: 0.25 }, // E4
    { freq: 392, duration: 0.25 }, // G4
    { freq: 494, duration: 0.25 }, // B4
    { freq: 392, duration: 0.25 }, // G4
    { freq: 330, duration: 0.25 }, // E4
    { freq: 262, duration: 0.5 },  // C4
  ];

  let time = now;
  const playMelody = () => {
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square"; // 8-bit sound
      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.frequency.setValueAtTime(note.freq, time);
      gain.gain.setValueAtTime(0.15, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + note.duration * 0.9);

      osc.start(time);
      osc.stop(time + note.duration);

      time += note.duration;
      bgmOscillators.push(osc);
    });

    // Loop
    if (isBgmOn) {
      setTimeout(playMelody, (time - now) * 1000);
    }
  };

  playMelody();
}

function stopBgm() {
  isBgmOn = false;
  bgmOscillators.forEach((osc) => {
    try { osc.stop(); } catch (e) {}
  });
  bgmOscillators = [];
}

// Expose globally
window.playSfx = playSfx;
window.isSfxEnabled = isSfxEnabled;
window.setSfxEnabled = setSfxEnabled;
window.toggleBgm = toggleBgm;
