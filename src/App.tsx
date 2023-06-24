import './App.css';
import { useState } from 'react';
import UserPage from './UserPage';
import LoginPage from './LoginPage';
import { auth } from './Firebase/FirebaseModule';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

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
    <div>
      {page}
    </div>
  );
}

export default App;
