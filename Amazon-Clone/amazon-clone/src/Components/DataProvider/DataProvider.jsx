import React, { createContext, useReducer } from 'react';
import { initialState, reducer } from '../../utiltiy/Reducer';

export const DataContext = createContext();

export const DataProvider = ({ children,reducer,initialState }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{ basket: state.basket,user: state.user, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
