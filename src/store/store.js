import { configureStore } from '@reduxjs/toolkit';
import sidebar from './sidebar/sidebarSlice';
import partners from './partners/partnersSlice';

export let store = null;

export default function getStore(incomingPreloadState) {
  store = configureStore({
    reducer: {
      sidebar,
      partners
    },
    preloadedState: incomingPreloadState
  });
  return store;
};