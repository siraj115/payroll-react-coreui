import React, {useEffect, useState} from "react";
import axios from "axios";
import {
    CCard,
    CCardBody,
    CCol,
    CTabs,
    CTabList,
    CTab,
    CTabContent,
    CTabPanel
  } from '@coreui/react';
  
import ClientListTable from "./ClientListTable"
const ListEmployee = ()=>{
    const [usersdata, setUsersdata] = useState({});
    const [currentPage, setCurrentPage] = useState(1)
    const UserBasicData = async () =>{
        
        const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}client/listclient?currentpage=${currentPage}`
       // console.log(url)    
        let response = await axios.get(url)
        console.log(response.data.data)
        const users = response.data.data;
        setCurrentPage(users.current_page)
        setUsersdata(users)
    }
    useEffect(()=>{
           UserBasicData()
    },[])
    const handleClickPagination = (pageno)=>{ console.log(pageno)
        //setCurrentPage(pageno)
    }
    return(
        <CCol xs={12}>
            <CCard className="mb-4">
                <CCardBody>
                    <ClientListTable tblheading="Client List" users={usersdata}  />
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default ListEmployee;