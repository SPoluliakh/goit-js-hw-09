const refs = {
  startBtnEl: document.querySelector('[data-start]'),
  stopBtnEl: document.querySelector('[data-stop]'),
  bodyEl: document.body,
};
let intervalId = null;

refs.startBtnEl.addEventListener('click', changeColor);
refs.stopBtnEl.addEventListener('click', stopChangeColor);

function changeColor() {
  toActiveStopBtn();
  toDisabledSartBtn();
  intervalId = setInterval(() => {
    let color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return (refs.bodyEl.style.backgroundColor = color);
  }, 1000);
}

function stopChangeColor() {
  toDisabledStopBtn();
  toActiveStartBtn();
  clearInterval(intervalId);
}

function toActiveStopBtn() {
  refs.stopBtnEl.removeAttribute('disabled');
}
function toDisabledStopBtn() {
  refs.stopBtnEl.setAttribute('disabled', 'true');
}
function toActiveStartBtn() {
  refs.startBtnEl.removeAttribute('disabled');
}
function toDisabledSartBtn() {
  refs.startBtnEl.setAttribute('disabled', 'true');
}
