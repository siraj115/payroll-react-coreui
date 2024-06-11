import React,{useState,useRef,useEffect } from "react";
import {Link, useNavigate, useParams} from 'react-router-dom'
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
    const {clientid} = useParams();
    const [toast, addToast] = useState(0);
    const toaster = useRef()
    const [clientdata, setClientdata] = useState({});
    const headers = {
        headers: {'Content-Type':'multipart/form-data'}
    }
    const onSubmit = async (data) =>{
        try{
            console.log('data',data);//return false;
            const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}client/saveclient`
            console.log(url)    
            if(clientid!=null)
                data.id = clientid;

            let response = await axios.post(url,data)
            if(response?.data?.errortype ===1){
                const user_toast = <UserToaster color='success' msg={response?.data?.msg} />
                addToast(user_toast)
                setTimeout(
                    ()=>{
                        window.location.href=`#/client/addclient/${response?.data?.clientid}`
                    },1000)
                //setTimeout(function(){navigate(`/client/addclient/${response?.data?.clientid}`)},1000)
            }
        }catch(err){

        }
    }
    const ClientData = async (clientid) =>{
        const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}client/getclient/${clientid}`
       // console.log(url)    
        let response = await axios.get(url)
        console.log(response.data.data)
        const users = response.data.data;
        setClientdata((response.data.data))
        setValue("companyname",users.companyname)
        setValue("contactname",users.contactname)
        setValue("contactphone",users.contactphone)
        setValue("contactemail",users.contactemail)
        setValue("address",users.address)
        setValue("companytrn",users.companytrn)
        
    }
   
    useEffect(()=>{
        if(clientid!=null){
            console.log(clientid)
            setBtnname('Update')
            ClientData(clientid)
            
        }
    },[setValue])
    return(
        
    <CCol xs={12}>
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Client Details</strong> <small></small>
                <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
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