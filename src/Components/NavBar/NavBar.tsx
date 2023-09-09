import React, { useEffect, useState } from 'react';
import logo from '../../images/pngs/logo_alb_misto.png';

///svgs
import dashboardIcon from '../../images/svgs/simple-system-monitor-svgrepo-com.svg';
import checkupIcon from '../../images/svgs/contactdiary-svgrepo-com.svg';
import workoutIcon from '../../images/svgs/fitify-svgrepo-com.svg';
import infoIcon from '../../images/svgs/deviceinfo-svgrepo-com.svg';


import SideButton from './SideButton';
import { auth } from '../../Firebase/FirebaseModule';

function NavBar(){

    const [isAdmin,setAdmin] = useState(false);

    let workout = <SideButton className='work-out' icon={workoutIcon} text = "Work-out" navPath='work-out'/>;

    if(isAdmin){
        workout = workout = <SideButton className='work-out' icon={workoutIcon} text = "Playlist" navPath='playlist'/>
    }

    useEffect(()=>{
        if(auth.currentUser?.email == "admin@admin.com"){
            setAdmin(true);
        }
    },[auth.currentUser?.email]);

    return(
        <div className = "navbar relative select-none bg-slate-50 border-r-2 border-red-300 top-0 left-0 w-1/5 h-screen max-w-[220px] min-w-[170px]">
            {/* Logo Zone */}          
                <div className = "logo relative h-1/6 min-h-[150px] drop-shadow-lg">
                    {// eslint-disable-next-line
                    }<img src={logo}/>
                </div>

            {/* Buttons Zone */}            
                <div className ="allbtns relative h-5/6 mx-3">

                    {/* Nav */}
                    <div className = "navbtns absolute w-full inset-x-0 top-0">

                        <SideButton className='dashboard' icon={dashboardIcon} text = "Dashboard" navPath='dashboard'/>
                        <SideButton className='check-up' icon={checkupIcon} text = "Programari si Consultatii" navPath='programari'/>
                        {workout}
                
                    </div>

                    {/* Policy Zone */}
                    <div className = "policy absolute w-full inset-x-0 bottom-1">
                        <SideButton className='policy' icon={infoIcon} text = "Politica de Confidentialitate" navPath='politica-confidentialitate'/>
                    </div>

                </div>
        </div>
    )

}

export default NavBar;