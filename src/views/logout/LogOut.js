import React, { useEffect } from "react";
import Cookies from 'js-cookie';

const LogOut = ()=>{
    Cookies.remove('accessToken');
    Cookies.remove('loggedinuserid');
    

    const redirect = ()=>{
        window.location.href=`/login`
    }
    useEffect(()=>{
        redirect()
    },[])
    return('Logout')
}

export default LogOut;