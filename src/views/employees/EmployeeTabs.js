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
import EmployeeBasicForm from "./EmployeeBasicForm"
import EmployeeAdvanceForm from "./EmployeeAdvanceForm"
import EmployeeAdvanceTable from "./EmployeeAdvanceTable"
import EmployeeOverTimeForm from "./EmployeeOverTimeForm"
import EmployeeProvidentFundForm from "./EmployeeProvidentFundForm"
const EmployeeTabs = ()=>{
    return (
        <CCol xs={12}>
            <CCard className="mb-4">
                
                <CCardBody>
                
                    <CTabs activeItemKey="basic">
                        <CTabList variant="tabs">
                            <CTab itemKey="basic">Basic Details</CTab>
                            <CTab itemKey="advance">Advance</CTab>
                            <CTab itemKey="overtime">Over Time</CTab>
                            <CTab itemKey="pf">Provident Fund</CTab>
                        </CTabList>
                        <CTabContent>
                            <CTabPanel className="p-3" itemKey="basic">
                                <EmployeeBasicForm/>
                            </CTabPanel>
                            <CTabPanel className="p-3" itemKey="advance">
                                <EmployeeAdvanceForm />
                                <EmployeeAdvanceTable  tblheading="Advance List" />
                            </CTabPanel>
                            <CTabPanel className="p-3" itemKey="overtime">
                                <EmployeeOverTimeForm />
                                <EmployeeAdvanceTable tblheading="OverTime List" />
                            </CTabPanel>
                            <CTabPanel className="p-3" itemKey="pf">
                                <EmployeeProvidentFundForm />
                                <EmployeeAdvanceTable tblheading="PF List" />
                            </CTabPanel>
                        </CTabContent>
                    </CTabs>
                    
                </CCardBody>
            </CCard>
        </CCol>
    )
}

export default React.memo(EmployeeTabs)