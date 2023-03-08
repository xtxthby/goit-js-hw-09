// const refs = {
//   startBtn: document.querySelector('button[data-start]'),
//   stopBtn: document.querySelector('button[data-stop]'),
//   bodyRef: document.querySelector('body'),
// };

// let timerId = null;
// // запускаємо таймер
// refs.startBtn.addEventListener('click', onStart);
// // зупиняємо таймер
// refs.stopBtn.addEventListener('click', onStop);

// let isActive = false;
// function onStart() {
//     // перевіряемо, якщо заруще вийдемо ,якщо ні то включемо 
//     if (isActive) {
//       return;
//     }
//     isActive = true;
//     // запускаємо зміну кольру на боді
//     timerId = setInterval(getBgColor, 1000);

// }
// function onStop() {
//     clearInterval(timerId);
// }

// function getRandomHexColor() {
//   return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// }
// function getBgColor() {
//     // вішаемо на боді зміну кольору
//   refs.bodyRef.style.backgroundColor = getRandomHexColor();
// }



// варіант два


const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  bodyRef: document.querySelector('body'),
};

let timerId = null;
// запускаємо таймер
refs.startBtn.addEventListener('click', onStart);
// зупиняємо таймер
refs.stopBtn.addEventListener('click', onStop);

function onStart() {
    timerId = setInterval(getBgColor, 1000);

    refs.startBtn.toggleAttribute('disabled');

}
function onStop() {
    clearInterval(timerId);

    refs.startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function getBgColor() {
    // вішаемо на боді зміну кольору
  refs.bodyRef.style.backgroundColor = getRandomHexColor();
}