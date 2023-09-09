import { useEffect, useState } from "react";
import { Serie } from "../Workout/Workout";
import { GetAllSeries, GetAllUsers } from "../../../../Firebase/FirebaseModule";
import { User } from "firebase/auth";
import userPic from '../../../../images/svgs/profile-circle-svgrepo-com.svg';

interface wdbprops{
    serie:Serie | undefined;
    clearSerieAfterAdd:React.Dispatch<React.SetStateAction<Serie | undefined>>
}

function WorkoutDB(props:wdbprops){

    const [utilizatori,setUtilizatori] = useState<boolean>(false);
    const [emails,setEmails] = useState<string[]>([]);
    const [series,setSeries] = useState<Serie[]>([]);
    // else{
    //     setSeriiBG('flex w-full font-bold border-r-2 border-slate-500 text-center place-content-center rounded-tl-3xl bg-red-400');
    //     setUtilizatoriBG('flex w-full font-bold text-center place-content-center rounded-tr-3xl bg-blue-200');
    // }

    useEffect(() => {
        GetAllUsers().then((users) => {
            setEmails(users.filter( (user)=>{return user.role === "client";}).map((user) => { return user.email;}));
        });

        GetAllSeries().then(async (series) => {
            let serieMap = await Promise.all(series.map(async (serie) => {return Serie.load(serie);}));
            setSeries(serieMap);
        });

    },[]);

    useEffect(() => {
        console.log(emails);
    },[emails]);

    useEffect(() =>{
        if(props.serie != null){
            series.push(props.serie);
            props.clearSerieAfterAdd(undefined);
        } 
    },[props.serie]);

    let SeriiButton = 
    <button className='flex w-full font-bold border-r-2 border-slate-500 text-center place-content-center rounded-tl-3xl bg-red-500' onClick={() =>{setUtilizatori(false)}}>
        Serii      
    </button>

    let UtilizatoriButton = 
    <button className='flex w-full font-bold text-center place-content-center rounded-tr-3xl bg-blue-200' onClick={() =>{setUtilizatori(true)}}>
        Utilizatori      
    </button>

    let ShowMap = 
    <div className='content-bar flex flex-col p-2 space-y-1 justify-center'>
        {series.map((serie) =>
            <button className='flex w-full bg-slate-400 border-2 border-slate-500 text-center text-black font-bold rounded justify-center'>
                    <div className='flex flex-row mr-auto'>
                        <img className = 'max-h-[25px] mr-2' src = {userPic} alt =''/>
                        {serie.name}
                    </div>
            </button>
        )}
     </div>

    if(utilizatori){
        SeriiButton = 
        <button className='flex w-full font-bold border-r-2 border-slate-500 text-center place-content-center rounded-tl-3xl bg-red-200' onClick={() =>{setUtilizatori(false)}}>
            Serii      
        </button>

        UtilizatoriButton =
        <button className='flex w-full font-bold text-center place-content-center rounded-tr-3xl bg-blue-400' onClick={() =>{setUtilizatori(true)}}>
            Utilizatori
        </button>

        ShowMap = 
        <div className='content-bar flex flex-col p-2 space-y-1 justify-center'>
            {emails.map((email) =>
                <button className='flex w-full bg-slate-400 border-2 border-slate-500 text-center text-black font-bold rounded justify-center'>
                        <div className='flex flex-row mr-auto'>
                            <img className = 'max-h-[25px] mr-2' src = {userPic} alt =''/>
                            {email}
                        </div>
                </button>
            )}
        </div>
    }

    return( 
        <div className = 'folderStructure flex flex-col bg-slate-300 min-w-[400px] max-w-[400px] border-slate-500 border-2 rounded-3xl m-2'>
            <div className='title-bar flex flex-row border-b-2 border-slate-500 justify-center place-items-center'>
                {SeriiButton}
                {UtilizatoriButton}
            </div>
            {ShowMap}
        </div>
        )
}

export default WorkoutDB;