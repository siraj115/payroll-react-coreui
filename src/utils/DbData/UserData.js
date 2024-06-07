import React from "react";
import axios from 'axios';

const UserData = async (empid) =>{
    const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}user/getuser/${empid}`
    console.log(url)    
    let response = await axios.get(url)
    console.log(response.data.data)
    return response.data.data;
    //setEmpdata((response.data.data))
    
}

export {UserData};