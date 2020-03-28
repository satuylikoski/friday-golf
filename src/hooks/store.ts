import { useContext } from 'react';

import { SettingsStore } from '../stores/Settings';
import { GameChangerStore } from '../stores/GameChanger';
import { StoreContext } from '../context';

type StoreType = 'settings' | 'gameChanger';

interface Store {
  gameChanger: GameChangerStore;
  settings: SettingsStore;
}

export default function useStore(storeType: StoreType) {
  const store: Store | null = useContext(StoreContext);

  if (store) {
    return store[storeType];
  }

  return null;
}
