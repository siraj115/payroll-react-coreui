import React from "react";
import ClientDetailForm from "./ClientDetailForm"
import AddContract from "./AddContract";
import {
    CRow,
  } from '@coreui/react'
import ClientTabs from "./ClientTabs";
const AddClient = ()=>{
    return(
        <CRow>
            <ClientDetailForm />
            <ClientTabs />
        </CRow>
    )
}

export default React.memo(AddClient)