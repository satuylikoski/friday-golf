import { action, autorun, computed, decorate, observable } from 'mobx';
import store from 'store';

const defaultPoints = type => {
  const savedPoints = store.get('points');

  if (savedPoints) {
    return savedPoints[type];
  }

  return [-50, 50];
};

const defaultRule = rule => {
  const savedRules = store.get('rules');

  if (savedRules) {
    return savedRules[rule];
  }

  return false;
};

export class Settings {
  bigHole = defaultPoints('big');
  smallHole = defaultPoints('small');
  miss = defaultPoints('miss');

  avoidNull = defaultRule('avoidNull');
  notSameNumber = defaultRule('notSameNumber');

  constructor() {
    autorun(() => [this.bigHole, this.smallHole, this.miss]);
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

  get points() {
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
  bigHole: observable,
  smallHole: observable,
  miss: observable,
  points: computed,
  rules: computed,
  updatePoint: action,
  updatePoints: action,
  updateRules: action,
  componentDidMount: action.bound
});
