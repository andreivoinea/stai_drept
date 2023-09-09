import React, { useState } from 'react';
import FolderStructure from './Playlist/DBNav/FolderStructure';
import Workout, { Serie } from './Playlist/Workout/Workout';
import Arrow from './Playlist/PlaylistArrows/Arrow';
import WorkoutDB from './Playlist/WorkoutDB/WorkoutDB';
import Saptamana from './Playlist/Saptamani/Saptamana';
import useDrivePicker from 'react-google-drive-picker';

function Playlist(){

    const [openPicker, authResponse] = useDrivePicker();  
    const [serie,setSerie] = useState<Serie>();
    const [serieToPass, passSerie] = useState<Serie>();

    const handleOpenPicker = () => {
        openPicker({
          clientId: "221850077313-csqf7sn3pldt5rp136rr1ss99kvm3jqp.apps.googleusercontent.com",
          developerKey: "AIzaSyCd3rGs6ULa_fTg8FrFnvPQSblxTf1ZMtc",
          viewId: "DOCS_VIDEOS",
          // token: token, // pass oauth token in case you already have one
          showUploadView: true,
          showUploadFolders: true,
          supportDrives: true,
          multiselect: true,
          // customViews: customViewsArray, // custom view
          callbackFunction: (data) => {
            if (data.action === 'cancel') {
              console.log('User clicked cancel/close button')
            }
            console.log(data)
          },
        })
      }

    function addSerie(){
        passSerie(serie);
    }

    return(
        <div className='h-full w-full'>
            <div className = 'topSide flex flex-row w-full h-1/2 border-b-2 border-red-600 select-none overflow-x-auto overflow-y-hidden scroll-smooth'>
            <button onClick={() => handleOpenPicker()}>Open Picker</button>
                {/* <FolderStructure/>
                <Arrow/>
                <Workout callback={setSerie}/>
                <Arrow hasPlus plusCallback={addSerie}/>
                <WorkoutDB serie={serieToPass} clearSerieAfterAdd={passSerie}/> */}
            </div>
            <div className = 'dragAndDropSide'>
                <Saptamana/>
            </div>
        </div>
    )
}

export default Playlist;