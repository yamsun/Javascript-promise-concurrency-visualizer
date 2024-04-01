const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');

const timeOne = document.getElementById('timeOne');
const timeTwo = document.getElementById('timeTwo');
const timeThree = document.getElementById('timeThree');
const timeResult = document.getElementById('timeResult');

const result = document.getElementById('result');

const startBtn = document.getElementById('start');
const clearBtn = document.getElementById('clear');
const resetBtn = document.getElementById('reset');

const explain = document.getElementById('explain');
const promiseVerdict = document.getElementById('promise-verdict');

const promiseExplanations = {
  all: `<code>Promise.all()</code>
  <p>Fulfills when all of the promises fulfill; rejects when any of the promises rejects.</p>`,
  allSettled: `<code>Promise.allSettled()</code>
  <p>Fulfills when all promises settle.</p>`,
  any: `<code>Promise.any()</code>
  <p>Fulfills when any of the promises fulfills; rejects when all of the promises reject.</p>`,
  race: `<code>Promise.race()</code>
  <p>Settles when any of the promises settles. In other words, fulfills when any of the promises fulfills; rejects when any of the promises rejects.</p>`,
};

let promiseType = document.getElementById('promiseType');
explain.innerHTML = promiseExplanations[promiseType.value];

promiseType.addEventListener('change', (e) => {
  let newType = e.target.value;
  explain.innerHTML = promiseExplanations[newType];
});

console.log({ promiseType });

const clear = () => {
  [one, two, three, timeOne, timeTwo, timeThree, timeResult, result].map(
    (i) => (i.innerHTML = '')
  );
};
clearBtn.addEventListener('click', clear);

const reset = () => {
  location.reload();
};
resetBtn.addEventListener('click', reset);

startBtn.addEventListener('click', () => {
  clear();
  // one.innerHTML = '';
  // two.innerHTML = '';
  // three.innerHTML = '';

  let delay1 = parseInt(document.getElementById('delay1').value);
  let delay2 = parseInt(document.getElementById('delay2').value);
  let delay3 = parseInt(document.getElementById('delay3').value);

  let promiseType = document.getElementById('promiseType').value;

  let status1 = document.querySelector(
    "input[type='radio'][name='status1']:checked"
  ).value;
  let status2 = document.querySelector(
    "input[type='radio'][name='status2']:checked"
  ).value;
  let status3 = document.querySelector(
    "input[type='radio'][name='status3']:checked"
  ).value;

  console.log({ delay1, delay2, delay3, promiseType });

  console.log({
    status1,
    status2,
    status3,
  });

  const getP1 = () => {
    return new Promise((resolve, reject) => {
      let time = 0;
      let timer = setInterval(() => {
        one.innerHTML += '/';
        time++;
      }, 100);

      setTimeout(() => {
        clearInterval(timer);
        timeOne.innerHTML = `${time / 10} sec`;
        if (status1 === 'resolve') {
          resolve('one resolved');
        } else {
          reject('one rejected');
        }
      }, delay1 * 1000);
    });
  };

  const getP2 = () => {
    return new Promise((resolve, reject) => {
      let time = 0;
      let timer = setInterval(() => {
        two.innerHTML += '/';
        time++;
      }, 100);

      setTimeout(() => {
        clearInterval(timer);
        timeTwo.innerHTML = `${time / 10} sec`;
        if (status2 === 'resolve') {
          resolve('two resolved');
        } else {
          reject('two rejected');
        }
      }, delay2 * 1000);
    });
  };

  const getP3 = () => {
    return new Promise((resolve, reject) => {
      let time = 0;
      let timer = setInterval(() => {
        three.innerHTML += '/';
        time++;
      }, 100);

      setTimeout(() => {
        clearInterval(timer);
        timeThree.innerHTML = ` ${time / 10} sec`;
        if (status3 === 'resolve') {
          resolve('three resolved');
        } else {
          reject('three rejected');
        }
      }, delay3 * 1000);
    });
  };

  let resultTime = 0;
  let resultTimer = setInterval(() => {
    resultTime++;
  }, 100);

  promiseVerdict.innerText = '<pending>';

  const promise1 = getP1();
  const promise2 = getP2();
  const promise3 = getP3();

  let promiseFunction;

  switch (promiseType) {
    case 'any':
      promiseFunction = Promise.any([promise1, promise2, promise3]);
      break;
    case 'race':
      promiseFunction = Promise.race([promise1, promise2, promise3]);
      break;
    case 'allSettled':
      promiseFunction = Promise.allSettled([promise1, promise2, promise3]);
      break;
    default:
      promiseFunction = Promise.all([promise1, promise2, promise3]);
  }

  console.log(promiseFunction, typeof promiseFunction);

  promiseFunction
    .then((res) => {
      console.log(' res', res);
      clearInterval(resultTimer);
      result.innerText = JSON.stringify(res);
      result.style.color = 'green';
      promiseVerdict.innerText = '<resolved>';
    })
    .catch((err) => {
      console.log(' err', err, typeof err);
      clearInterval(resultTimer);
      result.innerText = err;
      console.log('JSON.stringify(err)', JSON.stringify(err));
      result.style.color = 'tomato';
      promiseVerdict.innerText = '<rejected>';
    })
    .finally(() => {
      timeResult.innerHTML = `${resultTime / 10} sec`;
      promiseVerdict.innerText += ' -- settled';
    });
});

let a = 'all';

// console.log({ k });
