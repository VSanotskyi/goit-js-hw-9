// import
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// refs
const refs = {
  dataInput: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

// flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Не правельна дата');
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
      Notiflix.Notify.success('Правельна дата');
    }
  },
};
flatpickr(refs.dataInput, options);

// class Timer
class Timer {
  constructor({ onTick }) {
    this.onTick = onTick;
    this.intervalId = null;
  }

  start() {
    const countdownDate = new Date(refs.dataInput.value);

    this.intervalId = setInterval(() => {
      const currentDate = Date.now();
      const deltaTime = countdownDate - currentDate;

      if(deltaTime < 900) {
        clearInterval(this.intervalId);
        const time = this.convertMs(0);
        this.onTick(time);
        return;
      }

      const time = this.convertMs(deltaTime);
      this.onTick(time);
    }, 1000);
  }

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.pad(Math.floor(ms / day));
    const hours = this.pad(Math.floor((ms % day) / hour));
    const minutes = this.pad(Math.floor(((ms % day) % hour) / minute));
    const seconds = this.pad(
      Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }
}

// new timer
const timer = new Timer({
  onTick: updateTime,
});

// addEventListener
refs.btnStart.addEventListener('click', timer.start.bind(timer));

// update html
function updateTime({ days, hours, minutes, seconds }) {
  refs.btnStart.disabled = true;
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

