// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  // Add confetti canvas element
  addConfettiCanvas();

  // Add event listener for horn selection
  const hornSelect = document.getElementById('horn-select');
  hornSelect.addEventListener('change', hornChange);

  // Add event listener for volume slider
  const volumeSlider = document.getElementById('volume');
  volumeSlider.addEventListener('input', volumeChange);

  // Add event listener for play button
  const playButton = document.querySelector('button');
  playButton.addEventListener('click', playSound);
}

function addConfettiCanvas() {
  const canvas = document.createElement('canvas');
  canvas.id = 'confetti-canvas';
  canvas.style = 'position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 1000; pointer-events: none;';
  canvas.width = 1673;
  canvas.height = 536;
  document.body.appendChild(canvas);
}

function hornChange() {
  // Change image and audio source
  const hornSelect = document.getElementById('horn-select');
  const hornImage = document.querySelector('header + img');
  const hornAudio = document.querySelector('audio');
  hornImage.src = 'assets/images/' + hornSelect.value + '.svg';
  hornAudio.src = 'assets/audio/' + hornSelect.value + '.mp3';

  // Change volume icon
  const volumeIcon = document.querySelector('div img');
  const volumeSlider = document.getElementById('volume');
  if (volumeSlider.value == 0) {
    volumeIcon.src = 'assets/icons/volume-level-0.svg';
  } else if (volumeSlider.value < 33) {
    volumeIcon.src = 'assets/icons/volume-level-1.svg';
  } else if (volumeSlider.value < 67) {
    volumeIcon.src = 'assets/icons/volume-level-2.svg';
  } else {
    volumeIcon.src = 'assets/icons/volume-level-3.svg';
  }
}

function volumeChange() {
  // Change volume icon
  const volumeIcon = document.querySelector('div img');
  const volumeSlider = document.getElementById('volume');
  if (volumeSlider.value == 0) {
    volumeIcon.src = 'assets/icons/volume-level-0.svg';
  } else if (volumeSlider.value < 33) {
    volumeIcon.src = 'assets/icons/volume-level-1.svg';
  } else if (volumeSlider.value < 67) {
    volumeIcon.src = 'assets/icons/volume-level-2.svg';
  } else {
    volumeIcon.src = 'assets/icons/volume-level-3.svg';
  }
}

function playSound() {
  // Play sound
  const hornAudio = document.querySelector('audio');
  hornAudio.volume = document.getElementById('volume').value / 100;
  hornAudio.play();

  // Change image
  const hornSelect = document.getElementById('horn-select');
  if (hornSelect.value == 'party-horn') {
    const canvas = document.getElementById('confetti-canvas');
    const jsConfetti = new JSConfetti({ canvas })
    jsConfetti.addConfetti({
      emojis: ['💀', '🦴', '💩'],
      emojiSize: 30,
      confettiNumber: 1000,
    });
  }
}

