// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  const voiceSelect = document.getElementById('voice-select');
  const button = document.querySelector('button');

  // Load all avaliable voices that can be used for SpeachSynthesiser API into
  // voice select
  populateVoiceList(voiceSelect);

  // Add event listener to button
  button.addEventListener('click', () => {
    speachButtonClickListener(voiceSelect);
  });
}

function populateVoiceList(select) {
  speechSynthesis.getVoices().forEach((voice) => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.textContent = `${voice.name} (${voice.lang})`;
    select.appendChild(option);
  });
}

function speachButtonClickListener(select) {
  // Don't do anything if no voice is selected
  if (select.value === 'select') { return; }

  const text = document.getElementById('text-to-speak').value;
  const utterance = new SpeechSynthesisUtterance(text);
  const voice = select.value;

  // Get selected voice
  speechSynthesis.getVoices().forEach((v) => {
    if (v.name === voice) {
      utterance.voice = v;
    }
  });

  // Speak text and change image to smiling-open.png
  const img = document.querySelector('img');
  img.src = 'assets/images/smiling-open.png';
  speechSynthesis.speak(utterance);

  // Change image to smiling.png when speech is done
  utterance.addEventListener('end', () => {
    img.src = 'assets/images/smiling.png';
  });
}
