import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import { render } from "react-dom";


function Workout(){
    return(
        <div className='w-[400px] h-[400px] m-2 space-y-4'>
                <LiteYouTubeEmbed id="tM7YT_-gO2M" title="Glezna"/>
                <LiteYouTubeEmbed id="Ye2fD-QRQFM" title="Genunchi"/>
        </div>
    )
}

export default Workout;