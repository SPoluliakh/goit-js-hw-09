import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.form'),
  delayEl: document.querySelector('input[name="delay"]'),
  stepEl: document.querySelector('input[name="step"]'),
  amountEl: document.querySelector('input[name="amount"]'),
};

refs.formEl.addEventListener('submit', onFormEl);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function onFormEl(e) {
  e.preventDefault();
  let delValue = +refs.delayEl.value;
  let delStep = +refs.stepEl.value;

  for (let i = 0; i < refs.amountEl.value; i += 1) {
    let delayValue = delValue + delStep * i;
    createPromise(i + 1, delayValue)
      .then(({ position, delay }) => {
        return Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) =>
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
  }
}
