import React,{useState} from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CForm,
    CFormCheck,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CToaster,
    CTooltip
  } from '@coreui/react'
import {useForm} from "react-hook-form";
import axios from 'axios';
import UserToaster from '../../utils/UserToaster';
const ClientDetailForm = ()=>{
    const [btnname, setBtnname] = useState('Save')
    const {register, handleSubmit, watch, formState:{errors}, setValue} = useForm()

    const headers = {
        headers: {'Content-Type':'multipart/form-data'}
    }
    const onSubmit = async (data) =>{
        try{
            console.log(data);//return false;
        }catch(err){

        }
    }
    return(
        
    <CCol xs={12}>
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Client Details</strong> <small></small>
               
            </CCardHeader>
            <CCardBody>
                <CForm
                    className="row g-3 needs-validation"
                    onSubmit={handleSubmit(onSubmit)}
                    
                    >
                   
                    <CCol md={3}>
                        <CFormLabel htmlFor="companyname">Company Name <code color="danger">*</code></CFormLabel>
                        <CFormInput type="text" {...register("companyname",{required:"Company Name is required"})}   /> 
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                        {errors.companyname && <code color="danger">{errors.companyname?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="contactname">Contact Person Name <code color="danger">*</code></CFormLabel>
                        <CFormInput type="text"  {...register("contactname", {required:'Contact Person is required'})} /> 
                        {errors.contactname && <code color="danger">{errors.contactname?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="contactphone">Contact Phone No <code color="danger">*</code></CFormLabel>
                        <CFormInput type="text" id="contactphone"  {...register("contactphone", {required:"Contact Phone is required"})} />
                        {errors.contactphone && <code color="danger">{errors.contactphone?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="contactemail">Contact Email <code color="danger">*</code></CFormLabel>
                        <CFormInput type="text" id="contactemail"  {...register("contactemail", {required:"Contact Email is required"})} />
                        {errors.contactemail && <code color="danger">{errors.contactemail?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="address">Compnay Address <code color="danger">*</code></CFormLabel>
                        <CFormTextarea  id="address"   {...register("address",{required:"Address is required"})}/>
                        {errors.address && <code color="danger">{errors.address?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="companytrn">Compnay TRN <code color="danger">*</code></CFormLabel>
                        <CFormInput type="text" id="companytrn"  {...register("companytrn", {required:"TRN is required"})} />
                        {errors.companytrn && <code color="danger">{errors.companytrn?.message}</code>}
                    </CCol>
                    <CCol xs={12}>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <CButton color="primary" className="me-md-2" type='submit'>
                            {btnname}
                            </CButton>
                        </div>
                    </CCol>
                </CForm>
            </CCardBody>
        </CCard>
    </CCol>

    )
}

export default ClientDetailForm