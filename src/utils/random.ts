import { SettingsStore, Rules } from '../stores/Settings';

function random([min, max]: number[], current: number, rules: Rules): number {
  let newValue;

  if (min === max) {
    return min;
  }

  if (rules.avoidNull || rules.notSameNumber) {
    do {
      newValue = Math.floor(Math.random() * (max - min + 1) + min);
    } while ((newValue === current && rules.notSameNumber) || (rules.avoidNull && newValue === 0));
  } else {
    newValue = Math.floor(Math.random() * (max - min + 1) + min);
  }

  return newValue;
}

export function randomBig(store: SettingsStore) {
  return random(store.bigHoleRange, store.randomizedPoints[0], store.rules);
}

export function randomSmall(store: SettingsStore) {
  return random(store.smallHoleRange, store.randomizedPoints[1], store.rules);
}

export function randomMiss(store: SettingsStore) {
  return random(store.missRange, store.randomizedPoints[2], store.rules);
}
