import React, {useState,useEffect, useRef} from "react";
import Cookies from 'js-cookie';
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CToaster,
    CTooltip,
    CSpinner
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import {
    cilCloudDownload
  } from '@coreui/icons'
import {useForm} from "react-hook-form";
import {useParams} from 'react-router-dom'
import axios from "axios";
import UserToaster from '../../utils/UserToaster';
const EmployeeBasicForm = ({userbasic})=>{
    const [toast, addToast] = useState(0);
    const toaster = useRef()
    const [empbasicdata, setEmpbasicdata] = useState({});
    const [showLoading, setShowLoading]=useState(false)
    const {empid} = useParams();
    const {register, handleSubmit, watch, formState:{errors}, setValue} = useForm()
    const headers = {
        headers: {'Content-Type':'multipart/form-data'}
    }
    
    const login_userid = Cookies.get('loggedinuserid');
    const token = Cookies.get('accessToken');
    const onSubmit = async (data) =>{
        setShowLoading(true)
       console.log(data);
       //return false;
       const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}user/savebasicdetails`
       //console.log(url)    
       data.userid = empid;
       data.login_userid = login_userid;
       
       headers.headers['Authorization']= token;
       let response = await axios.post(url,data,headers)
       console.log(response.data)
       if(response?.data?.errortype ===1){
        const user_toast = <UserToaster color='success' msg={response?.data?.msg} />
        addToast(user_toast)
        console.log('inside')
        
        }else if(response?.data?.errortype ===2){
            const user_toast = <UserToaster color='danger' msg={response?.data?.msg} />
            addToast(user_toast)
        }
        setShowLoading(false)
    }
    const UserBasicData = async (users) =>{
        setValue("passport",users?.passport)
        setValue("passport_expiry",users?.passport_expiry)
        setValue("visano",users?.visano)
        setValue("visaexpiry",users?.visa_expiry)
        setValue("eidno",users?.eidno)
        setValue("eidexpiry",users?.eid_expiry)
        setValue("workpermit",users?.work_permit)
        setValue("workpermitexpiry",users?.work_permit_expiry)
        setValue("personalno",users?.personal_no)
        setValue("personalaccno",users?.personal_acc_no)
        
    }
    useEffect(()=>{
        if(empid!=null){
            console.log(empid)
            //setBtnname('Update')
           // UserBasicData(empid)
            
        }
    },[setValue])
    useEffect(()=>{
        if(userbasic){
            setEmpbasicdata(userbasic)
            UserBasicData(userbasic)
        }
    })
    return(
        <CCol xs={12}>
            <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
            <CForm
                className="row g-3 needs-validation"
                onSubmit={handleSubmit(onSubmit)}
                >
                <CCol md={4}>
                    <CFormLabel htmlFor="passport">Passport <code color="danger">*</code></CFormLabel>
                    <CFormInput type="text" id="passport"   {...register("passport", {required:'Passport is required'})}  /> 
                    {errors.passport && <code color="danger">{errors.passport?.message}</code>}
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="passport_expiry">Passport Expiry <code color="danger">*</code></CFormLabel>
                    <CFormInput type="date" id="passport_expiry"   {...register("passport_expiry", {required:'Passport Expiry is required'})}  /> 
                    {errors.passport_expiry && <code color="danger">{errors.passport_expiry?.message}</code>}
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="passportupload">Passport Upload 
                        {
                            (empbasicdata?.passport_url !=null && empbasicdata?.passport_url !='') ?(
                            <CTooltip content="Download" >
                                <CButton color="info" shape="rounded-pill" size="sm" as="a" href={empbasicdata.passport_url} target="_blank"><CIcon icon={cilCloudDownload} className="nav-icon" size="sm"/></CButton>
                            </CTooltip>):null
                        }
                    </CFormLabel>
                    <CFormInput type="file" id="passportupload" {...register("passportupload")}  />
                    {errors.passportupload && <code color="danger">{errors.passportupload?.message}</code>}
                </CCol>
                
                <CCol md={4}>
                    <CFormLabel htmlFor="visano">Visa <code color="danger">*</code>
                        
                    </CFormLabel>
                    <CFormInput type="text" id="visano" {...register("visano", {required:'Visa is required'})}  /> 
                    {errors.visano && <code color="danger">{errors.visano?.message}</code>}
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="visaexpiry">Visa Expiry <code color="danger">*</code>
                        
                    </CFormLabel>
                    <CFormInput type="date" id="visaexpiry" {...register("visaexpiry", {required:'Visa exipry is required'})}  /> 
                    {errors.visaexpiry && <code color="danger">{errors.visaexpiry?.message}</code>}
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="visaupload">Visa Upload <code color="danger">*</code>
                     {
                            (empbasicdata?.visa_expiry_upload != null && empbasicdata?.visa_expiry_upload != '') ?(
                            <CTooltip content="Download" >
                                <CButton color="info" shape="rounded-pill" size="sm" as="a" href={empbasicdata?.visa_expiry_upload} target="_blank"><CIcon icon={cilCloudDownload} className="nav-icon" size="sm"/></CButton>
                            </CTooltip>):null
                        }
                    </CFormLabel>
                    <CFormInput type="file" id="visaupload"   {...register("visaupload")} />
                    {errors.visaupload && <code color="danger">{errors.visaupload?.message}</code>}
                </CCol>
                
                <CCol md={4}>
                    <CFormLabel htmlFor="eidno">Emirates ID <code color="danger">*</code></CFormLabel>
                    <CFormInput type="text" id="eidno"    {...register("eidno", {required:'Eid is required'})}  /> 
                    {errors.eidno && <code color="danger">{errors.eidno?.message}</code>}
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="eidexpiry">Emirates ID Expiry <code color="danger">*</code></CFormLabel>
                    <CFormInput type="date" id="eidexpiry"    {...register("eidexpiry", {required:'Emirates Expiry is required'})}  /> 
                    {errors.eidexpiry && <code color="danger">{errors.eidexpiry?.message}</code>}
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="eidupload">Emirates ID Upload <code color="danger">*</code>
                     {
                            (empbasicdata?.eid_expiry_upload !=null && empbasicdata?.eid_expiry_upload !='') ?(
                            <CTooltip content="Download" >
                                <CButton color="info" shape="rounded-pill" size="sm" as="a" href={empbasicdata.eid_expiry_upload} target="_blank"><CIcon icon={cilCloudDownload} className="nav-icon" size="sm"/></CButton>
                            </CTooltip>):null
                        }
                    </CFormLabel>
                    <CFormInput type="file" id="eidupload"  {...register("eidupload")}/>
                    {errors.eidupload && <code color="danger">{errors.eidupload?.message}</code>}
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="workpermit">Work Permit <code color="danger">*</code></CFormLabel>
                    <CFormInput type="text" id="workpermit"    {...register("workpermit", {required:'Work Permit is required'})}  /> 
                    {errors.workpermit && <code color="danger">{errors.workpermit?.message}</code>}
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="workpermitexpiry">Work Permit Expiry <code color="danger">*</code></CFormLabel>
                    <CFormInput type="date" id="workpermitexpiry"    {...register("workpermitexpiry", {required:'Work Permit is required'})}  /> 
                    {errors.workpermitexpiry && <code color="danger">{errors.workpermitexpiry?.message}</code>}
                </CCol>
                <CCol md={4}>
                    <CFormLabel htmlFor="labourcardupload">Labour Card Upload <code color="danger">*</code>
                    {
                            (empbasicdata?.labour_card_upload !=null && empbasicdata?.labour_card_upload !='') ?(
                            <CTooltip content="Download" >
                                <CButton color="info" shape="rounded-pill" size="sm" as="a" href={empbasicdata.labour_card_upload} target="_blank"><CIcon icon={cilCloudDownload} className="nav-icon" size="sm"/></CButton>
                            </CTooltip>):null
                        }
                    </CFormLabel>
                    <CFormInput type="file" id="labourcardupload" defaultValue=""  {...register("labourcardupload")}  />
                    {errors.labourcardupload && <code color="danger">{errors.labourcardupload?.message}</code>}
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="personalno">Personal Number <code color="danger">*</code></CFormLabel>
                    <CFormInput type="text" id="personalno"   {...register("personalno", {required:'Personal Number is required'})}  /> 
                    {errors.personalno && <code color="danger">{errors.personalno?.message}</code>}
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="personalaccno">Personal Account Number<code color="danger">*</code></CFormLabel>
                    <CFormInput type="text" id="personalaccno"   {...register("personalaccno", {required:'Personal Acc no is required'})}  /> 
                    {errors.personalaccno && <code color="danger">{errors.personalaccno?.message}</code>}
                </CCol>
                
                <CCol xs={12}>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    { !showLoading ?
                        <CButton color="primary" className="me-md-2" type="submit">
                        Save
                        </CButton>
                        :
                        <CButton color="primary" disabled>
                            <CSpinner as="span" size="sm" aria-hidden="true" />
                        </CButton>
                    }
                    </div>
                </CCol>
            </CForm>     
        </CCol>
    )
}

export default React.memo(EmployeeBasicForm)