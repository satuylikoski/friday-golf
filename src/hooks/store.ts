import { useContext } from 'react';

import { StoreContext } from '../context';

type StoreType = 'settings' | 'gameChanger';

export default function useStore(storeType: StoreType) {
  const store: any = useContext(StoreContext);
  return store[storeType];
}
