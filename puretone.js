let audioContext;
let oscillator;
let gainNode;

function isFragmentValid() {
  return window.location.hash.match('#\\d{2,4}(\\.\\d{1,2})?');
}

function fixFragment() {
  window.location.hash = '#440'
}

function updateTitle(newFreq) {
  $('title').html(`${newFreq} Hz &mdash; Pure Tone Online`);
}

function updateSlider(newFreq) {
  $('#freq-slider').val(Math.log10(newFreq / 2));
}

$(document).ready(function () {
  const $freqDisplay = $('#freq-display');
  const $gainSlider = $('#gain-slider');

  // Initial frequency
  const initialFreq = frequency();
  updateSlider(initialFreq);
  $freqDisplay.text(initialFreq);
  updateTitle(initialFreq);


  if (!isFragmentValid()) {
    fixFragment();
  }

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
      const newFreq = frequency()
      updateSlider(newFreq);
      $freqDisplay.text(newFreq);
      updateTitle(newFreq);
      if (oscillator !== undefined) {
        oscillator.frequency.value = newFreq
      }
    } else {
      fixFragment()
    }
  })

  // Update hash by slider
  $('#freq-slider').on('input', function () {
    const val = Math.round(2 * 10 ** $(this).val() * 100) / 100
    window.location.hash = `#${val}`;
    $freqDisplay.text(val);
    play()
  });

  // Volume
  $gainSlider.on('input', function () {
    const val = $(this).val();
    if (gainNode) {
      gainNode.gain.value = val / 100
    }
    play()
  });

  $('.note-button').click(function () {
    window.location = $(this).attr('href')
    play();
  })

  // Share buttons click handler
  $('.share-btn').on('click', function () {
    // Get current URL including the hash part (frequency value)
    const pageUrl = window.location.href;
    const pageTitle = document.title;
    const platform = $(this).data('platform');

    let shareUrl;
    const windowOptions = 'width=600,height=400,resizable=yes,scrollbars=yes,status=yes';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;
        break;
      case 'telegram':
        shareUrl = `https://telegram.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(pageTitle + ' ' + pageUrl)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, 'share', windowOptions);
  });
})

function isPlaying() {
  return audioContext !== undefined && audioContext.state === 'running'
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