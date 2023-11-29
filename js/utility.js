const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

const createRandomMassive = (min, max, length) => {
  const massive = [];
  for (let i = 0; i < length; i++){
    let currentValue = getRandomInteger(min, max);
    while(massive.includes(currentValue)){
      currentValue = getRandomInteger(min, max);
    }
    massive.push(currentValue);
  }
  return massive;
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const isEscape = (evt) => evt.key === 'Escape';

export { createRandomMassive, isEscape, debounce};
