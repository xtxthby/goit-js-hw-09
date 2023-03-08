// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const refs = {
  imputDatePicker: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  seconds: document.querySelector('[data-seconds]'),
  minutes: document.querySelector('[data-minutes]'),
};

// початкове значення
let timeDifference = 0;
let timerId = null;
let formatDate = null;
// кнопка не активна
refs.btnStart.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    // обробка дати обрану користувачем
    //  Параметр selectedDates
    // - це масив обраних дат, тому ми беремо перший елемент.
    currentDifferenceDate(selectedDates[0]);
  },
};
// підключаємо бібліотеку до поля інпут з дата атрибутом
flatpickr(refs.imputDatePicker, options);

refs.btnStart.addEventListener('click', onBtnStart);

function convertMs(ms) {
  // Кількість мілісекунд на одиницю часу
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Решта днів
  const days = Math.floor(ms / day);
  // Решта годин
  const hours = Math.floor((ms % day) / hour);
  // Решта хвилин
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Решта секунд
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// перевірка дати та відображення різниці дат
function currentDifferenceDate(selectedDates) {
  // встановлюємо поточну дату
  const currentDate = Date.now();
  // Якщо користувач вибрав дату в минулому
  if (selectedDates < currentDate) {
    refs.btnStart.setAttribute('disabled', true);
    return window.alert('Please choose a date in the future');
  }
  // якщо вибрав час правильно, то відніми поточний
  timeDifference = selectedDates.getTime() - currentDate;
  // convert-msце пакет для перетворення мс у людський час (години, хвилини, секунди).
  formatDate = convertMs(timeDifference);

  renderDate(formatDate);
  // знімаємо блокування
  refs.btnStart.removeAttribute('disabled');
}

function onBtnStart() {
  timerId = setInterval(startTimer, 1000);
}
// Timer
function startTimer() {
  // блокуемо старт кнопку
  refs.btnStart.setAttribute('disabled', true); 
  // блокуемо інпут після старту лічильника
  refs.imputDatePicker.setAttribute('disabled', true);

  timeDifference -= 1000;
  // якщо ми дійшли до 0 то виключи таймер
  if (refs.seconds.textContent <= 0 && refs.minutes.textContent <= 0) {
    clearInterval(timerId);
  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  }
}
function renderDate(formatDate) {
  refs.seconds.textContent = formatDate.seconds;
  refs.minutes.textContent = formatDate.minutes;
  refs.hours.textContent = formatDate.hours;
  refs.days.textContent = formatDate.days;
}
// Скинути таймер на btn за допомогою клавіши Esc
window.addEventListener('keydown', e => {
  if (e.code === 'Escape' && timerId) {
    clearInterval(timerId);
    // розблокувати інпут
    refs.imputDatePicker.removeAttribute('disabled');
    // заблокувати старт
    refs.btnStart.setAttribute('disabled', true);

    refs.seconds.textContent = '00';
    refs.minutes.textContent = '00';
    refs.hours.textContent = '00';
    refs.days.textContent = '00';
  }
});












