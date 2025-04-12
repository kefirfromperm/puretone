let audioContext;
let oscillator;
let gainNode;

function isFragmentValid() {
  return window.location.hash.match('#\\d{2,4}(\\.\\d{1,2})?');
}

function fixFragment() {
  window.location.hash = '#440'
}

$(document).ready(function () {
  const $freqSlider = $('#freq-slider');
  const $freqDisplay = $('#freq-display');
  const $gainSlider = $('#gain-slider');

  if (!isFragmentValid()) {
    fixFragment();
  }

  // Initial frequency
  const initialFreq = frequency();
  $freqSlider.val(initialFreq);
  $freqDisplay.text(initialFreq);

  $('#play-button').click(function () {
    if (!isPlaying()) {
      play()
    } else {
      pause()
    }
  })

  // Update frequency by hash
  $(window).on("hashchange", function () {
    if (isFragmentValid()) {
      const newFreq = frequency();
      $freqSlider.val(newFreq);
      $freqDisplay.text(newFreq);
      if (oscillator !== undefined) {
        oscillator.frequency.setTargetAtTime(newFreq, audioContext.currentTime, 0.01)
      }
    } else {
      fixFragment()
    }
    play()
  })

  // Update hash by slider
  $freqSlider.on('input', function () {
    const val = $(this).val();
    window.location.hash = `#${val}`;
    $freqDisplay.text(val);
  });

  // Volume
  $gainSlider.on('input', function () {
    const val = $(this).val();
    if (gainNode) {
      gainNode.gain.setTargetAtTime(val / 100, audioContext.currentTime, 0.01);
    }
  });
})

function isPlaying() {
  return audioContext !== undefined && audioContext.state !== 'suspended'
}

function play() {
  if (audioContext === undefined) {
    audioContext = new AudioContext()

    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();

    oscillator.type = 'sine'
    oscillator.frequency.value = frequency()
    gainNode.gain.value = $('#gain-slider').val() / 100

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.start()
  }

  if (audioContext.state === 'suspended') {
    audioContext.resume()
  }

  $('#play-button-icon').removeClass('bi-play-fill').addClass('bi-pause-fill')
  $('#play-button-text').text('Pause')
}

function pause() {
  audioContext.suspend()
  $('#play-button-icon').removeClass('bi-pause-fill').addClass('bi-play-fill')
  $('#play-button-text').text('Play')
}

function frequency() {
  if (isFragmentValid()) {
    return parseFloat(window.location.hash.substring(1))
  } else {
    return 440
  }
}