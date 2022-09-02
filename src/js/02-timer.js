import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  startBtnEl: document.querySelector('[data-start]'),
  inputEl: document.querySelector('input#datetime-picker'),
};

refs.startBtnEl.disabled = true;
const currentDate = Date.now();

console.log(currentDate);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtnEl.disabled = true;
    } else {
      refs.startBtnEl.disabled = false;
    }
    console.log(selectedDates[0]);
  },
};
console.log(Number(options.defaultDate));

const fp = flatpickr('input#datetime-picker', options);

console.log(fp);
