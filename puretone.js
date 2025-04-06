let audioContext;
let oscillator;
let isPlay = false;

$(document).ready(function () {
  $('#play-button').click(function () {
    if (audioContext === undefined) {
      audioContext = new AudioContext();
      oscillator = audioContext.createOscillator();
      oscillator.connect(audioContext.destination)
      oscillator.start()
    } else {
      if (audioContext.state === 'suspended') {
        audioContext.resume()
      } else {
        audioContext.suspend()
      }
    }
  })
})

