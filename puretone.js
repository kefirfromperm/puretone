let audioContext;
let oscillator;

function isFragmentValid() {
  return window.location.hash.match('#\\d{2,4}(\\.\\d{1,2})?');
}

function fixFragment() {
  window.location.hash = '#440'
}

$(document).ready(function () {
  if (!isFragmentValid()) {
    fixFragment();
  }

  $('#play-button').click(function () {
    if (audioContext === undefined) {
      audioContext = new AudioContext();
      oscillator = audioContext.createOscillator();
      oscillator.frequency.value = frequency()
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

  $(window).on("hashchange", function () {
    console.log(window.location.hash)

    if (isFragmentValid()) {
      if (oscillator !== undefined) {
        oscillator.frequency.value = frequency()
      }
    } else {
      fixFragment()
    }
  })
})

function frequency() {
  if (isFragmentValid()) {
    return parseFloat(window.location.hash.substring(1))
  } else {
    return 440
  }
}