import React, { ChangeEvent, DragEventHandler, RefObject, useEffect, useRef, useState } from 'react';
import { GetAllFilesStorage } from '../../../../Firebase/FirebaseModule';

import backPic from '../../../../images/svgs/backward-svgrepo-com.svg';
import PlaylistFolder from './PlaylistFolder';
import PlaylistItem from './PlaylistItem';

function FolderStructure(){

    const [rootFolder,setRootFolder] = useState<Folder>(new Folder(['root']));
    const [currentFolder,setCurrentFolder] = useState<Folder>(rootFolder);
    const [newFolder,addNewFolder] = useState<string>('');
    const inputFile = useRef<HTMLInputElement>(null);
    const [, updateState] = React.useState({});
    const forceUpdate = React.useCallback(() => updateState({}), []);
    
    useEffect(()=>{
        GetAllFilesStorage('/').then((res)=>{ 

            console.log("gotem",res);

            let root = new Folder(['root']);
            //console.log(res); 
            res.forEach((ref)=>{
                //console.log(ref.fullPath.split('/'));
                root.Add(ref.fullPath.split('/'));
            });

            setRootFolder(root);
            setCurrentFolder(root);
        });
    },[]);

    let newFolderJSX = <div></div>;
    if(newFolder !== ''){
        newFolderJSX = <PlaylistFolder name={newFolder} isInput onBlur = {(newName) => {
            addNewFolder('');
            currentFolder.Add([newName,'']);
        }}/>
    }

    const handleDrag = (e:React.DragEvent, fileName:string) => {
        let path = currentFolder.getPathString();
        path += "/" + fileName;

        console.log(path);

        e.dataTransfer.setData('itemPath',path);
    }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log(e.target.files[0].name);
          currentFolder.Add([e.target.files[0].name]);
          console.log(currentFolder.items);
          forceUpdate();
        }
    };

    return( 
    <div className = 'folderStructure flex flex-col bg-slate-300 min-w-[400px] max-w-[400px] w-full border-slate-500 border-2 rounded-3xl m-2'>
        <div className='title-bar flex flex-row border-b-2 border-slate-500'>
            <button className='flex border-r-2 border-slate-500 mr-2 bg-red-400 rounded-tl-3xl justify-center place-items-center pl-2 pr-1 select-none' onClick={() => {setCurrentFolder(currentFolder.parent ?? currentFolder)}}> 
                <img className = 'max-h-[20px]' src = {backPic} alt =''/>
            </button>
            <div className='flex font-bold'>{currentFolder.name}</div>
        </div>
        <div className='content-bar w-full max-h-full p-2 space-y-1 justify-center overflow-y-auto scroll-smooth'>
            {/* folder zone */}
                {currentFolder.children.map((child)=>
                    <PlaylistFolder name={child.name} onClick={() => {setCurrentFolder(child)}}/>
                )}
                {newFolderJSX}
            {/* file zone */}
                {currentFolder.items.map((child)=>
                    <PlaylistItem name = {child} dragCallback={handleDrag}/>
                )}
        </div>
        <div className='bottom-bar mt-auto flex flex-row justify-center border-t-2 border-slate-500 font-bold  select-none'>
            <button className='border-r-2 w-full border-slate-500 bg-blue-300 rounded-bl-3xl' onClick={() => {addNewFolder('New Folder')}}>
                Add Folder
            </button>
            <button className='w-full bg-green-400 rounded-br-3xl' onClick={() => {inputFile.current?.click()}}>
                Upload File<input type='file' className='hidden' onChange={handleFileChange} ref = {inputFile}/>
            </button>
        </div>
    </div>
    )
}

class Folder{
    name:string;
    parent:Folder | null;
    children:Folder[];
    items:string[]

    constructor(path:string[], parent?:Folder){
        this.name = path[0];
        this.items = [];
        this.children = [];
        this.parent = parent ?? null;

        if(path.length === 1){
            return;
        } else if(path.length === 2){
            if(path[1] !== '' && path[1].includes('.'))
            this.items.push(path[1]);
        }
        else{
            this.children.push(new Folder(path.slice(1),this));
        }
    }

    public Add(path:string[]){

        if(path.length === 1){
            if(path[0] !== '' && path[0].includes('.')){
                    this.items.push(path[0]);
                    return;
            }
        }

        let stringMap = this.children.map((child)=>child.name);

        if(stringMap.includes(path[0])){
            this.children[stringMap.indexOf(path[0])].Add(path.slice(1));
        }
        else{
            this.children.push(new Folder(path,this));
        }
    }

    public getPath():string[]{
        let path:string[] = [];
        let current:Folder | null = this;

        while(current.parent !== null){
            path.push(current.name);
            current = current.parent;
        }

        return path.reverse();
    }

    public getPathString():string{
        return this.getPath().join('/');
    }
}

export default FolderStructure;