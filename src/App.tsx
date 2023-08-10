import './App.css';
import { useState } from 'react';
import UserPage from './UserPage';
import LoginPage from './LoginPage';
import { WriteFirestore, auth } from './Firebase/FirebaseModule';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import logo from './images/pngs/logo_alb_misto.png';

export interface manageUser{
  callback: React.Dispatch<React.SetStateAction<User|undefined>>
}

function App(){

  const[user,setUser] = useState<User>();

  let page = <LoginPage callback={setUser}/>

  if(user){
    page = <UserPage callback = {setUser}/>
  }

  return(
    <div className=' overflow-hidden'>
      {page}
    </div>
  );
}



export default App;
