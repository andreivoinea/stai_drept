import React from 'react';
import FolderStructure from './Playlist/DBNav/FolderStructure';
import Workout from './Playlist/Workout/Workout';
import Arrow from './Playlist/PlaylistArrows/Arrow';
import WorkoutDB from './Playlist/WorkoutDB/WorkoutDB';

function Playlist(){

    return(
        <div className='h-full w-full'>
            <div className = 'topSide flex flex-row w-full h-1/2 border-b-2 border-red-600 select-none overflow-x-auto overflow-y-hidden scroll-smooth'>
                <FolderStructure/>
                <Arrow/>
                <Workout/>
                <Arrow hasPlus/>
                <WorkoutDB/>
            </div>
            <div className = 'dragAndDropSide'>

            </div>
        </div>
    )
}

export default Playlist;