import React from 'react';
import {Routes,Route} from "react-router-dom"
import Dashboard from './Dashboard';
import Checkup from './Check-up';
import Workout from './Work-out';
import Policy from './Policy';
import Playlist from './Playlist';

function PageNav(){
    return(
        <div className='relative w-full h-screen'>
            <Routes>

                <Route path = "/dashboard" element = {<Dashboard/>}/>
                <Route path = "/programari" element = {<Checkup/>}/>          
                <Route path = "/work-out" element = {<Workout/>}/>
                <Route path = "/politica-confidentialitate" element = {<Policy/>}/>
                <Route path = '/playlist' element = {<Playlist/>}/>

            </Routes>
        </div>
    )
}

export default PageNav;