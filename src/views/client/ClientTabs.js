import React,{useState,useEffect, useRef } from "react";
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from 'axios';
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
import AddContract from "./AddContract";
import ClientPaymentDetails from "./ClientPaymentDetails";
import ClientContractAssignedEmployees from "./ClientContractAssignedEmployees";
const EmployeeTabs = ()=>{
    const {clientid}                                = useParams();
    const [clientCotractData, setClientCotractData] = useState({});
    const login_userid  = Cookies.get('loggedinuserid');
    const token         = Cookies.get('accessToken');
    const ClientContractData = async (clientid) =>{
        const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}client/getclientcontract/${clientid}`
       // console.log(url)    
       const headers = {
            headers: {'Authorization':token}
        }
        let response = await axios.get(url,headers)
        console.log(response.data.data)
        const users = response.data.data;
        if(users!=null){
            setClientCotractData(users)
        }
        
    }
    useEffect(()=>{
        ClientContractData(clientid)
    },[])
    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                
                <CCardBody>
                
                    <CTabs activeItemKey="basic">
                        <CTabList variant="tabs">
                            <CTab itemKey="basic">Contract Details</CTab>
                            <CTab itemKey="advance">Payment Details</CTab>
                            <CTab itemKey="employeeassign">Assigned Employees</CTab>
                        </CTabList>
                        <CTabContent>
                            <CTabPanel className="p-3" itemKey="basic">
                                <AddContract />
                            </CTabPanel>
                            <CTabPanel className="p-3" itemKey="advance">
                                <ClientPaymentDetails />     
                            </CTabPanel>
                            <CTabPanel className="p-3" itemKey="employeeassign">
                                <ClientContractAssignedEmployees singleClientData={clientCotractData} contractDetails='' />     
                            </CTabPanel>
                            
                        </CTabContent>
                    </CTabs>
                    
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default React.memo(EmployeeTabs)