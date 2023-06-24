import React, { ChangeEvent,useState } from 'react';
import { UploadToUser, DownloadWorkout,auth } from '../../Firebase/FirebaseModule';

function Dashboard(){

    const [file,setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
          setFile(e.target.files[0]);
        }
      };

    return(   
        <div className="m-4">       
                <input type = "file" accept =".pdf" onChange={handleFileChange}></input> 
                <div className='pdfbuttons grid grid-cols-2 m-4'>
                    
                    <button className='bg-slate-300 drop-shadow-md p-2 w-fit' onClick={() => UploadClick(file)}>
                        Upload PDF
                    </button>
                    <button className='bg-slate-300 drop-shadow-md p-2 w-fit' onClick={() => DownloadClick()}>
                        Download PDF
                    </button>

                </div>        
        </div>
    )
}

function UploadClick(file:File|undefined){

    if (!file) {
        return;
      }

    let userID = auth.currentUser?.uid;

    if(!userID){
        return;
    }

   UploadToUser(userID,file);
}

function DownloadClick(){
    let userID = auth.currentUser?.uid;

    if(!userID){
        return;
    }

    DownloadWorkout(userID);
}

export default Dashboard;