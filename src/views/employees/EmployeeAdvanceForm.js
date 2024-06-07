import React from "react";
import {
    CRow,
    CButton,
    CContainer,
    CCol,
    CForm,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CFormSelect,
    CCard,
    CCardBody
  } from '@coreui/react'
  
import {advanceReasons} from "../../utils/emp_utils"
const EmployeeAdvanceForm  = ()=>{
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
                            <CFormLabel htmlFor="advanceReasons">Reason <code color="danger">*</code></CFormLabel>
                            <CFormSelect id="advanceReasons" 
                            options={advanceReasons}
                            />
                            <CFormFeedback invalid>Please provide Employee Role.</CFormFeedback>
                        </CCol>
                        <CCol md={3}>
                            <CFormLabel htmlFor="advancedate">Date <code color="danger">*</code></CFormLabel>
                            <CFormInput type="date" id="advancedate" defaultValue="" required />
                            <CFormFeedback valid>Looks good!</CFormFeedback>
                        </CCol>
                        
                        <CCol md={3}>
                            <CFormLabel htmlFor="advanceamount">Amount <code color="danger">*</code></CFormLabel>
                            <CFormInput type="text" id="advanceamount" defaultValue="" required /> 
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

export default React.memo(EmployeeAdvanceForm)