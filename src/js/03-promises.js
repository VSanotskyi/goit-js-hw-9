import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();

  /*const {
   elements: { delay, step, amount },
   } = e.target;*/
  let delay = + e.target.elements.delay.value;
  const step = + e.target.elements.step.value;
  const amount = e.target.elements.amount.value;

  if(delay < 0 || step < 0 || amount < 1) {
    Notiflix.Notify.failure('Values must be positive');
    return;
  }

  for(let i = 0; i < amount; i += 1) {
    createPromise(i, delay).then(onRes).catch(onRej);
    delay += step;
  }

  form.reset();
}


function createPromise(position, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if(shouldResolve) {
        res(` Fulfilled promise ${position} in ${delay}ms`);
      } else {
        rej(` Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);

  });
}

function onRes(res) {
  Notiflix.Notify.success(res);
  console.log(res);
}

function onRej(err) {
  Notiflix.Notify.failure(err);
  console.log(err);
}