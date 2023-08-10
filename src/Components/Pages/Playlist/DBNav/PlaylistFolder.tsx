import React, { ReactEventHandler, useState } from 'react';
import folderPic from '../../../../images/svgs/folder-svgrepo-com.svg';

export interface playlistFolder{
    name:string,
    isInput?:boolean,
    onBlur?:(newName:string) => void,
    onClick?:(ev:React.MouseEvent<HTMLButtonElement>) => void,
}

function PlaylistFolder(props:playlistFolder){

    const [name,setName] = useState<string>(props.name);

    // const handleOnSubmit = event => {
    //     setName(event.target.value);
    // }

    let nameJSX = <div>{props.name}</div>;
    if(props.isInput){
        nameJSX = <input className='text-black pl-1' type='text' placeholder={props.name} autoFocus onKeyDown={(ev) => {if(ev.key === "Enter" && props.onBlur) props.onBlur(name);}} onChange={(ev) => setName(ev.target.value)} onBlur={() => props.onBlur? props.onBlur(name):null}></input>
    }

    return(       
        <button className='flex w-full bg-slate-400 border-2 border-slate-500 text-center text-white font-bold rounded justify-center' onClick={props.onClick}>
            <div className='flex flex-row mr-auto'>
                <img className = 'max-h-[25px] mr-2' src = {folderPic} alt =''/>
                {nameJSX}
            </div>
        </button>
    )
}

export default PlaylistFolder;