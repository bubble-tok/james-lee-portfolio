(function setupScoresPage() {
  let checkReady = setInterval(() => {
    const waveform = document.getElementById("waveform");
    const trackList = document.getElementById("trackList");
    const playBtn = document.getElementById("playPauseBtn");

    if (waveform && trackList && playBtn) {
      clearInterval(checkReady);
      initializePlayer(waveform, trackList, playBtn);
    }
  }, 50);

  function initializePlayer(waveform, trackList, playBtn) {
    if (window.wavesurfer) {
      window.wavesurfer.destroy();
    }

    trackList.innerHTML = "";

    const tracks = [
      { title: "Above the Sky", src: "/music/Above the Sky.wav", duration: "5:08" },
      { title: "Coming Back to the Glory", src: "/music/Coming back to the glory.wav", duration: "4:10" },
      { title: "Falling into Water", src: "/music/Falling into Water.wav", duration: "5:02" },
      { title: "Impossible Mission", src: "/music/Impossible Mission.wav", duration: "2:26" },
      { title: "Life of Tree", src: "/music/Life of Tree.wav", duration: "3:22" },
      { title: "Mori", src: "/music/mori.wav", duration: "3:06" },
      { title: "Opening 1", src: "/music/Opening 1.wav", duration: "1:32" },
      { title: "Skyland", src: "/music/Skyland.wav", duration: "3:24" },
      { title: "The Final", src: "/music/The final.wav", duration: "3:20" },
      { title: "The Survivor", src: "/music/The Survivor.wav", duration: "2:56" },
      { title: "To the New Island", src: "/music/To the new island.wav", duration: "2:24" }
    ];

    const wavesurfer = WaveSurfer.create({
      container: '#waveform',
      waveColor: '#c0c0c0',
      progressColor: '#111',
      cursorColor: '#5ba8ff',
      barWidth: 2,
      barRadius: 3,
      height: 100,
      responsive: true
    });

    window.wavesurfer = wavesurfer;

    const trackTitle = document.getElementById("track-title");
    const currentTime = document.getElementById("currentTime");
    const totalTime = document.getElementById("totalTime");

    function formatTime(seconds) {
      const m = Math.floor(seconds / 60);
      const s = Math.floor(seconds % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    }

    function loadTrack(index) {
      const track = tracks[index];
      wavesurfer.empty();
      wavesurfer.unAll();
      wavesurfer.load(track.src);
      trackTitle.innerText = track.title;
      playBtn.classList.remove("pause");

      wavesurfer.on('ready', () => {
        totalTime.innerText = formatTime(wavesurfer.getDuration());
        wavesurfer.play();
        playBtn.classList.add("pause");
      });

      wavesurfer.on('audioprocess', () => {
        currentTime.innerText = formatTime(wavesurfer.getCurrentTime());
      });

      wavesurfer.on('seek', () => {
        currentTime.innerText = formatTime(wavesurfer.getCurrentTime());
      });
    }

    tracks.forEach((track, index) => {
      const li = document.createElement("li");
      li.innerHTML = `<span>${track.title}</span><span class="duration">${track.duration}</span>`;
      li.addEventListener("click", () => loadTrack(index));
      trackList.appendChild(li);
    });

    playBtn.onclick = () => {
      if (wavesurfer.isPlaying()) {
        wavesurfer.pause();
        playBtn.classList.remove("pause");
      } else {
        wavesurfer.play();
        playBtn.classList.add("pause");
      }
    };
  }
})();
