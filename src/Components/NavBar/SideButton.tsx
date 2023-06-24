import React from 'react';
import {Link} from "react-router-dom"

interface sideButton{
    className:string,
    icon:string,
    text:string,
    navPath:string
}

function SideButton(props:sideButton){
    return(       
        <div>
            <Link to = {props.navPath}>
                <button className = {props.className + " sidebtn"}>
                    {// eslint-disable-next-line
                    }<img src={props.icon} className = "sidebtnicon"/>
                    <label className= "text-xs text-center w-full">{props.text}</label>    
                </button>
            </Link>
        </div>
    )
}

export default SideButton;