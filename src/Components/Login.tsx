import React,{useState} from 'react';
import { LoginEmail as FirebaseLoginEmail } from '../Firebase/FirebaseModule';
import { User } from 'firebase/auth';
import { manageUser } from '../App';
import logo from '../images/pngs/logo_alb_misto.png'
import { login } from '../LoginPage';

function Login(props:login){

    return(
        <div className = "flex flex-col py-4 px-8 justify-center items-center bg-slate-300 rounded-lg min-w-[300px] max-w-[300px] space-y-2">
                <div className = "select-none logo max-w-[200px] drop-shadow-lg ">
                        {// eslint-disable-next-line
                        }<img src={logo}/>
                </div>
                <input type="email" name="email" id = "user-email" placeholder="Email" className ="inputField w-full"/>
                <input type="password" name="password" id="user-password" placeholder="Password" className ="inputField w-full"/>
                <button type="submit" className ="bg-green-600 inputBtn" onClick = {() => LoginCreds(props.manageUser)}>Login</button>                
                <input type="submit" value="Google Login" className ="bg-blue-600 text-white inputBtn"/>  
                <input type="submit" value="Facebook Login" className ="bg-blue-800 text-white inputBtn"/>
                <div className='subpixel-antialiased'> No account yet? </div>    
                <button type="submit" className ="bg-cyan-500 inputBtn" onClick = {() => props.callback(true)}>Register</button>
            </div>
    )
}

function LoginCreds(props:manageUser){
    var emailElement = document.getElementById("user-email") as HTMLInputElement;
    var passwordElement = document.getElementById("user-password") as HTMLInputElement;
    
    if(emailElement != null && passwordElement!= null){
        FirebaseLoginEmail(emailElement.value,passwordElement.value, props.callback);
    }
}

export default Login;