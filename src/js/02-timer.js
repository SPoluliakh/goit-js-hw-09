import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtnEl: document.querySelector('[data-start]'),
  inputEl: document.querySelector('input#datetime-picker'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  timerEl: document.querySelector('.timer'),
};

refs.startBtnEl.disabled = true;
let intervalId = null;

refs.startBtnEl.addEventListener('click', onStartBtn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtnEl.disabled = true;
    } else {
      refs.startBtnEl.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};

flatpickr(refs.inputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function onStartBtn() {
  refs.startBtnEl.disabled = true;
  intervalId = setInterval(() => {
    let countdown = new Date(refs.inputEl.value) - Date.now();

    if (countdown >= 0) {
      const { days, hours, minutes, seconds } = convertMs(countdown);
      refs.daysEl.textContent = addLeadingZero(days);
      refs.hoursEl.textContent = addLeadingZero(hours);
      refs.minutesEl.textContent = addLeadingZero(minutes);
      refs.secondsEl.textContent = addLeadingZero(seconds);
      if (countdown <= 60000) {
        refs.timerEl.style.color = 'tomato';
      }
    } else {
      refs.timerEl.style.color = 'black';
      Notiflix.Notify.success('Countdown finished');
      clearInterval(intervalId);
    }
  }, 1000);
}
