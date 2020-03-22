import store from 'store';

export default function randomChanger(changers) {
  let newValue;

  // Check already used changers from store
  let usedValues = store.get('changers') || [];

  if (Object.keys(changers).length === usedValues.length) {
    usedValues = [];
  }

  do {
    newValue = Math.floor(Math.random() * (Object.keys(changers).length - 1 + 1) + 0);
  } while (usedValues.includes(newValue));

  usedValues.push(newValue);

  store.set('changers', usedValues);

  return newValue;
}
