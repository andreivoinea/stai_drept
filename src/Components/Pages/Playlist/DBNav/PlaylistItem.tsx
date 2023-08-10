import React, { DragEvent, DragEventHandler } from 'react';
import filePic from '../../../../images/svgs/file-svgrepo-com.svg';

export interface playlistItem{
    name:string,
    dragCallback:(e:React.DragEvent,name:string) => void,
}

function PlaylistItem(props:playlistItem){
    return(       
    <div className='flex w-full bg-slate-400 border-2 border-slate-500 text-center text-blue-800 font-bold rounded justify-center' draggable onDragStart={(e) => props.dragCallback(e,props.name)}>
            <div className='flex flex-row mr-auto'>
                <img className = 'max-h-[25px] mr-2' src = {filePic} alt =''/>
                {props.name}
            </div>
    </div>
    )
}

export default PlaylistItem;