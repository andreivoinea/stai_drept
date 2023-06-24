import React,{useState} from 'react';
import { CreateEmail as FirebaseCreateEmail } from '../Firebase/FirebaseModule';
import logo from '../images/pngs/logo_alb_misto.png'

import { login } from '../LoginPage';

function NoAccount(props:login){
    return(
        <div className = "flex flex-col py-4 px-8 justify-center items-center bg-slate-300 rounded-lg min-w-[300px] max-w-[300px] space-y-2">
                <div className = "select-none logo max-w-[200px] drop-shadow-lg ">
                        {// eslint-disable-next-line
                        }<img src={logo}/>
                </div>
                <input type="text" name="firstName" id = "first-name" placeholder="First Name" className ="inputField w-full"/>
                <input type="text" name="lastName" id = "last-name" placeholder="Last Name" className ="inputField w-full"/>
                <input type="email" name="email" id = "user-create-email" placeholder="Email" className ="inputField w-full"/>
                <input type="password" name="password" id="user-create-password" placeholder="Password" className ="inputField w-full"/>              
                <button type="submit" className ="bg-green-600 inputBtn" onClick = {() => DebugUserAndPass(props)}>Create</button>
                <button type="submit" className ="bg-slate-400 inputBtn" onClick = {() => props.callback(false)}>Close</button>       
            </div>
    )
}

function DebugUserAndPass(props:login){

    var emailElement = document.getElementById("user-create-email") as HTMLInputElement;
    var passwordElement = document.getElementById("user-create-password") as HTMLInputElement;
    
    if(emailElement != null && passwordElement!= null){
        FirebaseCreateEmail(emailElement.value,passwordElement.value);
    }

    props.callback(false);
}

export default NoAccount;