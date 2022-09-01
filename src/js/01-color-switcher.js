const refs = {
  startBtnEl: document.querySelector('[data-start]'),
  stopBtnEl: document.querySelector('[data-stop]'),
};
refs.stopBtnEl.disabled = true;
let intervalId = null;

refs.startBtnEl.addEventListener('click', changeColor);
refs.stopBtnEl.addEventListener('click', stopChangeColor);

function changeColor() {
  refs.stopBtnEl.disabled = false;
  refs.startBtnEl.disabled = true;

  intervalId = setInterval(() => {
    return (document.body.style.backgroundColor = getRandomHexColor());
  }, 1000);
}

function stopChangeColor() {
  refs.stopBtnEl.disabled = true;
  refs.startBtnEl.disabled = false;
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
