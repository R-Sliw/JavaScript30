/* Get Our Elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

/* Build out functions */

function togglePlayer() {
  const method = video.paused ? "play" : "pause";

  video[method]();
  /*if (video.paused)
	{
		video.play();
	} else {video.pause()}*/
}

function updateButton() {
  const icon = this.paused ? "►" : "❚ ❚";
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
  console.log(this.dataset.skip);
  //const skok = button.date
  video.currentTime = video.currentTime + parseFloat(this.dataset.skip);
}

function handelRangeUpdate() {
  video[this.name] = this.value;
  console.log(this.name);
  console.log(this.value);
}

function timeBarChange() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function barPlace(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}

/* Hook up the event listeners */

video.addEventListener("click", togglePlayer);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", timeBarChange);

toggle.addEventListener("click", togglePlayer);

skipButtons.forEach((button) => button.addEventListener("click", skip));

ranges.forEach((range) => range.addEventListener("change", handelRangeUpdate));

progress.addEventListener("click", barPlace);

let mousedown = false;

progress.addEventListener("mousemove", (e) => mousedown && barPlace(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
