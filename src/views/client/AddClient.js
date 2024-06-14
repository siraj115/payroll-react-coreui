import React, {useEffect, useState} from "react";
import {useParams} from 'react-router-dom'
import ClientDetailForm from "./ClientDetailForm"
import {
    CRow,
  } from '@coreui/react'
import ClientTabs from "./ClientTabs";
const AddClient = ()=>{
    const {clientid} = useParams();
    const [enabletabs, setEnabletabs] = useState(false)
    useEffect(()=>{
        
        setEnabletabs(clientid!=null?true:false)
    },[clientid])
    return(
        <CRow>
            <ClientDetailForm />
           {enabletabs?<ClientTabs />:null} 
        </CRow>
    )
}

export default React.memo(AddClient)