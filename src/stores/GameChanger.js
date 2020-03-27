import { action, observable, decorate } from 'mobx';
import store from 'store';

export class GameChanger {
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

decorate(GameChanger, {
  changerIndex: observable,
  isChangerOpen: observable,
  randomizeChanger: action,
  closeChanger: action,
  changer: observable
});
