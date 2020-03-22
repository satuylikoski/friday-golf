import { useContext } from 'react';
import { action, computed, observable, decorate } from 'mobx';
import store from 'store';

import { StoreContext } from '../context';

export default function useStore() {
  return useContext(StoreContext);
}

export class Randomizer {
  // ----- Points
  savedPoints = store.get('points');
  savedRules = store.get('rules');

  bigHole = this.savedPoints ? this.savedPoints.big : [-10, 24];
  smallHole = this.savedPoints ? this.savedPoints.small : [-10, 25];
  miss = this.savedPoints ? this.savedPoints.miss : [0, 0];

  avoidNull = this.savedRules ? this.savedRules.avoidNull : false;
  notSameNumber = this.savedRules ? this.savedRules.notSameNumber : false;

  updatePoints = points => {
    console.log('update');
    this.bigHole = points.big;
    this.smallHole = points.small;
    this.miss = points.miss;

    store.set('points', points);
  };

  updateRules = rules => {
    this.avoidNull = rules.avoidNull;
    this.notSameNumber = rules.notSameNumber;

    store.set('rules', rules);
  };

  get points() {
    console.log('get poits');
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

  // ----- Game changer
  changerIndex = 0;
  isChangerOpen = false;

  closeChanger = () => {
    this.isChangerOpen = false;
  };

  randomizeChanger = changers => {
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

    // Save to local store to know which ones were already used
    store.set('changers', usedValues);

    if (this.isChangerOpen === false) {
      this.isChangerOpen = true;
    }

    this.changerIndex = newValue;
  };
}

decorate(Randomizer, {
  // ----- Points
  points: computed,
  rules: computed,
  updatePoints: action,
  updateRules: action,

  // ----- Game changer
  changerIndex: observable,
  isChangerOpen: observable,
  randomizeChanger: action,
  closeChanger: action,
  changer: observable
});
