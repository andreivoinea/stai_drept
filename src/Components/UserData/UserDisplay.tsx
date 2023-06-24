import React from 'react';
import defaultUserIcon from '../../images/svgs/profile-circle-svgrepo-com.svg';
import { auth } from '../../Firebase/FirebaseModule';
import { manageUser } from '../../App';
import { User } from 'firebase/auth';

export enum UserType{
    Antrenor,
    Utilizator
}

interface userData{
    firstName: string,
    lastName: string,
    id: string,
    type: UserType,
    callback: React.Dispatch<React.SetStateAction<User | undefined>>

}

function UserDisplay(props:userData){

    return(
        <div className = "userInfo select-none fixed top-4 right-4 box-content">
            <button className = "settings bg-slate-300 drop-shadow-md rounded-lg p-3" onClick = {() => OnClick(props)}>
                <img src = {defaultUserIcon} className = "h-[50px] w-[50px] "/>
                <div className = "subpixel-antialiased"> {UserType[props.type]}</div>
            </button>
            
        </div>
    );
}

function OnClick(props:userData){
    console.log("First Name: " + props.firstName);
    console.log("Last Name: " + props.lastName);
    console.log("ID Name: " + props.id);
    console.log("Type: " + props.type);

    if(window.confirm("Are you sure you want to sign out?"))
    {
        auth.signOut().then(() => props.callback(undefined));

    }
}

export default UserDisplay;