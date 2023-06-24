import React,{useState} from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';

function CookieMaster(){
    
    const [cookies,setCookie,removeCookie] = useCookies(['userData']);

    return(
        <div>
            <CookiesProvider/>
        </div>
    )
}

export default CookieMaster;