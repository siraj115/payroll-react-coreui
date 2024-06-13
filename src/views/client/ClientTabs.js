import React from "react";
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
const EmployeeTabs = ()=>{
    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                
                <CCardBody>
                
                    <CTabs activeItemKey="basic">
                        <CTabList variant="tabs">
                            <CTab itemKey="basic">Contract Details</CTab>
                            <CTab itemKey="advance">Payment Details</CTab>
                        </CTabList>
                        <CTabContent>
                            <CTabPanel className="p-3" itemKey="basic">
                                <AddContract />
                            </CTabPanel>
                            <CTabPanel className="p-3" itemKey="advance">
                                <ClientPaymentDetails />     
                            </CTabPanel>
                            
                        </CTabContent>
                    </CTabs>
                    
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default React.memo(EmployeeTabs)