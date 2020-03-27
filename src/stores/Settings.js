import { action, autorun, computed, decorate, observable } from 'mobx';
import store from 'store';

import random from '../utils/random';

const initialRange = type => {
  const savedPoints = store.get('points');

  if (savedPoints) {
    return savedPoints[type];
  }

  return [-50, 50];
};

const initialRule = rule => {
  const savedRules = store.get('rules');

  if (savedRules) {
    return savedRules[rule];
  }

  return false;
};

export class Settings {
  bigHole = initialRange('big');
  smallHole = initialRange('small');
  miss = initialRange('miss');

  avoidNull = initialRule('avoidNull');
  notSameNumber = initialRule('notSameNumber');

  currentPoints = [0, 0, 0];

  constructor() {
    autorun(() => [this.bigHole, this.smallHole, this.miss, this.currentPoints]);
  }

  updatePoints = points => {
    store.set('points', points);

    this.bigHole = points.big;
    this.smallHole = points.small;
    this.miss = points.miss;
  };

  updateRules = rules => {
    store.set('rules', rules);

    this.avoidNull = rules.avoidNull;
    this.notSameNumber = rules.notSameNumber;
  };

  // Todo: Clean this up
  randomize = () => {
    const big = random(this.bigHole, this.currentPoints[0], this.rules);
    const small = random(this.smallHole, this.currentPoints[1], this.rules);
    const miss = random(this.miss, this.currentPoints[2], this.rules);

    this.currentPoints = [big, small, miss];
  };

  get currentit() {
    return this.currentPoints;
  }

  get pointRanges() {
    return {
      big: this.bigHole,
      small: this.smallHole,
      miss: this.miss
    };
  }

  get rules() {
    return {
      avoidNull: this.avoidNull,
      notSameNumber: this.notSameNumber
    };
  }
}

decorate(Settings, {
  currentPoints: observable,
  bigHole: observable,
  smallHole: observable,
  miss: observable,
  currentit: computed,
  pointRanges: computed,
  rules: computed,
  updatePoint: action,
  updatePoints: action,
  updateRules: action,
  randomize: action
});
