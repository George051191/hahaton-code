/* eslint-disable import/extensions */
import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';

import store from './store';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, RootState, unknown, Action>
>;

export const useDispatch = () => dispatchHook<AppDispatch & AppThunk>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
