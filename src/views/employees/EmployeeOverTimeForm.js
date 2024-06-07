import React from "react";
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CContainer,
    CRow,
    CCard,
    CCardBody
  } from '@coreui/react'
  
const EmployeeOverTimeForm  = ()=>{
    return(
        <CContainer>
            <CRow>
                <CCol xs={12}>
                    <CCard className="mb-4">
                        <CCardBody>
                            <CForm
                                className="row g-3 needs-validation"
                                
                                >
                                
                                <CCol md={3}>
                                    <CFormLabel htmlFor="overtimedate">Date <code color="danger">*</code></CFormLabel>
                                    <CFormInput type="date" id="overtimedate" defaultValue="" required />
                                    <CFormFeedback valid>Looks good!</CFormFeedback>
                                </CCol>
                                
                                <CCol md={3}>
                                    <CFormLabel htmlFor="overtimehrs">hours <code color="danger">*</code></CFormLabel>
                                    <CFormInput type="text" id="overtimehrs" defaultValue="" required /> 
                                    <CFormFeedback valid>Looks good!</CFormFeedback>
                                </CCol>
                                
                                <CCol md={3}>
                                    <CFormLabel htmlFor="overtimeamount">Amount <code color="danger">*</code></CFormLabel>
                                    <CFormInput type="text" id="overtimeamount" defaultValue="" required /> 
                                    <CFormFeedback valid>Looks good!</CFormFeedback>
                                </CCol>
                                <CCol md={3}>
                                    <CFormLabel htmlFor="reciiptupload">Reciept Upload <code color="danger">*</code></CFormLabel>
                                    <CFormInput type="file" id="reciiptupload" defaultValue="" required />
                                    <CFormFeedback valid>Looks good!</CFormFeedback>
                                </CCol>
                                
                                <CCol xs={12}>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <CButton color="primary" className="me-md-2">
                                        Save
                                        </CButton>
                                    </div>
                                </CCol>
                            </CForm>     
                        </CCardBody>
                    </CCard >
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default React.memo(EmployeeOverTimeForm)