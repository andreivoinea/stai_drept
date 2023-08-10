import React, { useEffect, useState } from 'react';
import { GetAllFilesStorage, GetItems, WriteFirestore } from '../../../../Firebase/FirebaseModule';

import filePic from '../../../../images/svgs/file-svgrepo-com.svg';
import penLinePic from '../../../../images/svgs/pen-line-svgrepo-com.svg';
import PlaylistFolder from '../DBNav/PlaylistFolder';
import { DocumentData } from 'firebase/firestore';

function Workout(){

    const [serieCurenta,setSerieCurenta] = useState<Serie>(new Serie('Serie Noua'));
    const [editSerie,setEditSerie] = useState<boolean>(false);
    const [, updateState] = React.useState({});
    const forceUpdate = React.useCallback(() => updateState({}), []);
    // const [currentFolder,setCurrentFolder] = useState<Folder>(rootFolder);
    // const [newFolder,addNewFolder] = useState<string>('');

    // const [items,setItems] = useState<string[]>([]);

    // function handleDrop(e:React.DragEvent){
    //     const name = e.dataTransfer.getData('itemName');
    //     setItems([...items,name]);
    // }
    

    // useEffect(()=>{
    //     GetAllFilesStorage('/').then((res)=>{ 
    //         let root = new Folder(['Serie']);
    //         //console.log(res); 
    //         res.forEach((ref)=>{
    //             //console.log(ref.fullPath.split('/'));
    //             root.Add(ref.fullPath.split('/'));
    //         });

    //         setRootFolder(root);
    //         setCurrentFolder(root);
    //         //console.log(rootFolder.current);
    //     });
    // },[]);

    // let newFolderJSX = <div></div>;
    // if(newFolder !== ''){
    //     newFolderJSX = <PlaylistFolder name={newFolder} isInput onBlur = {(newName) => {
    //         addNewFolder('');
    //         currentFolder.Add([newName,'']);
    //     }}/>
    // }

    const handleDrop = (e:React.DragEvent) => {
        const path = e.dataTransfer.getData('itemPath') as string;

        console.log(path);

        serieCurenta.Add(path.split('/'));
        forceUpdate();
    }

    let serieCurentaJSX = <div className='flex font-bold'>{serieCurenta.name}</div>;

    if(editSerie){
        serieCurentaJSX = <input className='flex font-bold focus pl-1' type = 'text' autoFocus placeholder={serieCurenta.name} onKeyDown={(ev) => {if(ev.key === "Enter")setEditSerie(false);}} onBlur = {(ev) => {setEditSerie(false);}} onChange={(e) => {serieCurenta.name = e.target.value;}}/>
    }

    return( 
    <div className = 'workoutserie flex flex-col bg-slate-300 min-w-[400px] max-w-[400px] w-full border-slate-500 border-2 rounded-3xl m-2'>
        <div className='title-bar flex flex-row border-b-2 border-slate-500 justify-center place-items-center'>
            <button className='flex flex-row place-items-center' onClick ={() => setEditSerie(true)}>
                <img className = 'max-h-[20px] bg-blue-300 border-black border-2 p-[1px] mr-1 rounded-md' src = {penLinePic} alt =''/>           
            </button>
            {serieCurentaJSX}
        </div>
        <div className='content-bar flex flex-col h-full p-2 space-y-1 justify-start' onDrop={handleDrop} onDragOver={(e) => {e.preventDefault();}}>

            {/* file zone */}
                {serieCurenta.items.map((child)=>
                    <button className='flex w-fuil h-fit bg-slate-400 border-2 border-slate-500 text-center text-blue-800 font-bold rounded justify-center'>
                        <div className='flex flex-row mr-auto'>
                            <img className = 'max-h-[25px] mr-2' src = {filePic} alt =''/>
                            {child.name}
                        </div>
                    </button>
                )}
                
        </div>
    </div>
    )
}



export class Serie{
    name:string;
    items:Item[]

    constructor(name:string){
        this.name = name;
        this.items = [];
    }

    public Add(path:string[]){
        this.items.push(new Item(path,this));
    }

    public static async load(data:DocumentData):Promise<Serie>{
        let serie = new Serie(data.name);
        (await GetItems(data.name)).forEach((item)=>{
            serie.Add(item.path.split('/'));
        });
        return serie;
    }

    public async upload(){
        await WriteFirestore("series/" + this.name,{name:this.name});
        for(let i = 0; i < this.items.length; i++){
            await this.items[i].upload();
        }
    }
}

class Item{
    name:string;
    path:string[];
    parent:Serie;

    constructor(path:string[],parent:Serie){
        this.name = path[path.length-1];
        this.path = path;
        this.parent = parent;
    }

    public async upload(){
        await WriteFirestore("series/" + this.parent.name +"/items/" + this.name,{path:this.path.join('/')});
    }
}

export default Workout;