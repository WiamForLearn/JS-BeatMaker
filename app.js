class DrumKit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playbtn = document.querySelector(".play");
    this.currentKick = "./sound/allSounds/kick-classic.wav";
    this.currentSnare = "./sound/allSounds/snare-acoustic01.wav";
    this.currentHihat = "./sound/allSounds/hihat-acoustic01.wav";
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.soundSelect = document.querySelectorAll("select");
    this.muteBtn = document.querySelectorAll(".mute");
    this.index = 0;
    this.bpm = 500;
    this.isPlaying = null;
    this.tempo = document.querySelector(".tempo-slider");
  }
  activePad() {
    this.classList.toggle("active");
  }
  repeat() {
    let step = this.index % 8;
    const activebar = document.querySelectorAll(`.b${step}`);
    activebar.forEach((bar) => {
      bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });

    this.index++;
  }
  start() {
    const interval = (60 / this.bpm) * 1000;
    this.updateBtn();
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.index = 0;
    }
  }
  updateBtn() {
    if (this.isPlaying) {
      this.playbtn.classList.remove("started");
      this.playbtn.innerText = "Play";
    } else {
      this.playbtn.classList.add("started");
      this.playbtn.innerText = "Stop";
    }
  }
  changeSound(e) {
    const selectValue = e.target.value;
    const selectName = e.target.name;
    console.log(selectName, selectValue);
    switch (selectName) {
      case "kick-select":
        this.kickAudio.src = selectValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectValue;
        break;
      default:
        this.kickAudio.src = this.currentKick;
        this.snareAudio.src = this.currentSnare;
        this.hihatAudio.src = this.currentHihat;
    }
  }
  changeTempo(e) {
    const tempo = e.target.value;
    const tempoNumber = document.querySelector(".tempo-number");
    tempoNumber.innerText = tempo;
    this.bpm = tempo;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if (this.playbtn.classList.contains("started")) {
      this.start();
    }
  }
  muteSound(e) {
    const selectMute = e.target.getAttribute("data-track");
    const mutebtnn = e.target;
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (selectMute) {
        case "0":
          mutebtnn.innerHTML = '<i class="fas fa-volume-mute"></i>';
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          mutebtnn.innerHTML = '<i class="fas fa-volume-mute"></i>';
          break;
        case "2":
          this.hihatAudio.volume = 0;
          mutebtnn.innerHTML = '<i class="fas fa-volume-mute"></i>';
          break;
      }
    } else {
      switch (selectMute) {
        case "0":
          this.kickAudio.volume = 1;
          mutebtnn.innerHTML = '<i class="fas fa-volume-up"></i>';
          break;
        case "1":
          this.snareAudio.volume = 1;
          mutebtnn.innerHTML = '<i class="fas fa-volume-up"></i>';
          break;
        case "2":
          this.hihatAudio.volume = 1;
          mutebtnn.innerHTML = '<i class="fas fa-volume-up"></i>';
          break;
      }
    }
  }
}

const drumKit = new DrumKit();
drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.activePad);
  pad.addEventListener("animationend", function () {
    pad.style.animation = "";
  });
});

drumKit.playbtn.addEventListener("click", function () {
  drumKit.start();
});

drumKit.soundSelect.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.changeSound(e);
  });
});

drumKit.muteBtn.forEach((mute) => {
  mute.addEventListener("click", function (e) {
    drumKit.muteSound(e);
  });
});

drumKit.tempo.addEventListener("input", function (e) {
  drumKit.changeTempo(e);
});
