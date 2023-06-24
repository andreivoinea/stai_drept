import Login from './Components/Login';
import NoAccount from './Components/NoAccount';
import { manageUser } from './App';
import { useState } from 'react';

export interface login{
    manageUser:manageUser
    callback: React.Dispatch<React.SetStateAction<boolean>>
}

function LoginPage(props:manageUser){

    const[creatingAccount, setCreatingAccount] = useState(false);

    let html = <Login manageUser={props} callback={setCreatingAccount}/>

    if(creatingAccount){
        html = <NoAccount manageUser={props} callback={setCreatingAccount}/>
    }

    return(
        <div className='flex flex-col h-screen justify-center items-center'>
            {html}
        </div>
    )
}

export default LoginPage;