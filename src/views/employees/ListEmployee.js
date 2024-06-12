import React, {useEffect, useState,useRef } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import {
    CCard,
    CCardBody,
    CCol,
    CToaster
  } from '@coreui/react';
  import UserToaster from '../../utils/UserToaster';
  
import EmployeeListTable from "./EmployeeListTable"
const ListEmployee = ()=>{
    const [toast, addToast] = useState(0);
    const toaster = useRef()
    const [usersdata, setUsersdata] = useState({});
    const [currentPage, setCurrentPage] = useState(1)
    const token = Cookies.get('accessToken');
    const headers = {
        headers: {'Authorization':token}
    }
    const UserBasicData = async () =>{
        try{
            const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}user/listuser?currentpage=${currentPage}`
        // console.log(url)    
            let response = await axios.get(url,headers)
            //console.log(response.data.data)
            if(response?.data?.errortype==1){
                const users = response.data.data;
                setCurrentPage(users.current_page)
                setUsersdata(users)
            }else{ 
                const user_toast = <UserToaster color='danger' msg={response?.data?.msg} />
                addToast(user_toast)
            }
        }catch(err){
            const user_toast = <UserToaster color='danger' msg='Invalid Token' />
            addToast(user_toast)
        }
    }
    useEffect(()=>{
           UserBasicData()
    },[])
    const handleClickPagination = (pageno)=>{ console.log(pageno)
        //setCurrentPage(pageno)
    }
    return(
        <CCol xs={12}><CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
            <CCard className="mb-4">
                <CCardBody>
                    <EmployeeListTable tblheading="Employee List" users={usersdata}  />
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default ListEmployee;