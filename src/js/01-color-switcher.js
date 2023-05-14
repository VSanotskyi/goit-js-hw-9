const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let intervalId = null;

refs.btnStart.addEventListener('click', onClickStart);
refs.btnStop.addEventListener('click', onClickStop);

function onClickStart(e) {
  e.target.disabled = 'true';

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 100);
}

function onClickStop(e) {
  refs.btnStart.disabled = false;

  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
