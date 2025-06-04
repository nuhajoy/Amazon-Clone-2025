import React, { useEffect } from 'react';
import Home from './pages/home/Home';
import Routing from './Router';
import { useContext } from 'react';

import { Type } from './utiltiy/ActionType';
import { auth } from './utiltiy/firebase'; 
import { DataContext } from './Components/DataProvider/DataProvider';


export default function App() {
  const {user, dispatch} = useContext(DataContext)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user:authUser
        })
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
        
      }
    })
    
  }, [])
  return (
   <Routing/>
  )
}
