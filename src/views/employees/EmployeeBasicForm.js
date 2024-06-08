import React, {useState,useEffect, useRef} from "react";
import {
    CButton,
    CCol,
    CForm,
    CFormInput,
    CFormFeedback,
    CFormLabel,
    CToaster,
    CTooltip
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import {
    cilCloudDownload
  } from '@coreui/icons'
import {useForm} from "react-hook-form";
import {useParams} from 'react-router-dom'
import axios from "axios";
import UserToaster from '../../utils/UserToaster';
const EmployeeBasicForm = ()=>{
    const [toast, addToast] = useState(0);
    const toaster = useRef()
    const [empbasicdata, setEmpbasicdata] = useState({});
    const {empid} = useParams();
    const {register, handleSubmit, watch, formState:{errors}, setValue} = useForm()
    const headers = {
        headers: {'Content-Type':'multipart/form-data'}
    }
    const onSubmit = async (data) =>{
       console.log(data);
       //return false;
       const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}user/savebasicdetails`
       //console.log(url)    
       data.userid = empid;

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
    }
    const UserBasicData = async (empid) =>{
        const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}user/getuserbasic/${empid}`
       // console.log(url)    
        let response = await axios.get(url)
        console.log(response.data.data)
        const users = response.data.data;
        setEmpbasicdata(users)
        setValue("passport",users?.passport)
        setValue("visaexpiry",users?.visa_expiry)
        setValue("eid",users?.eid_expiry)
        setValue("workpermit",users?.work_permit)
        setValue("personalno",users?.personal_no)
        setValue("personalaccno",users?.personal_acc_no)
        
    }
    useEffect(()=>{
        if(empid!=null){
            console.log(empid)
            //setBtnname('Update')
            UserBasicData(empid)
            
        }
    },[setValue])
    return(
        <CCol xs={12}>
            <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
            <CForm
                className="row g-3 needs-validation"
                onSubmit={handleSubmit(onSubmit)}
                >
                <CCol md={6}>
                    <CFormLabel htmlFor="passport">Passport <code color="danger">*</code></CFormLabel>
                    <CFormInput type="text" id="passport"   {...register("passport", {required:'Passport is required'})}  /> 
                    {errors.passport && <code color="danger">{errors.passport?.message}</code>}
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="passportupload">Passport Upload <code color="danger">*</code>
                        {
                            empbasicdata.passport_url !='' ?(
                            <CTooltip content="Download" >
                                <CButton color="info" shape="rounded-pill" size="sm" as="a" href={empbasicdata.passport_url} target="_blank"><CIcon icon={cilCloudDownload} className="nav-icon" size="sm"/></CButton>
                            </CTooltip>):null
                        }
                    </CFormLabel>
                    <CFormInput type="file" id="passportupload" {...register("passportupload")}  />
                    {errors.passportupload && <code color="danger">{errors.passportupload?.message}</code>}
                </CCol>
                
                <CCol md={6}>
                    <CFormLabel htmlFor="visaexpiry">Visa Expiry <code color="danger">*</code>
                        
                    </CFormLabel>
                    <CFormInput type="text" id="visaexpiry" {...register("visaexpiry", {required:'Visa exipry is required'})}  /> 
                    {errors.visaexpiry && <code color="danger">{errors.visaexpiry?.message}</code>}
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="visaupload">Visa Upload <code color="danger">*</code>
                     {
                            empbasicdata.visa_expiry_upload !='' ?(
                            <CTooltip content="Download" >
                                <CButton color="info" shape="rounded-pill" size="sm" as="a" href={empbasicdata.visa_expiry_upload} target="_blank"><CIcon icon={cilCloudDownload} className="nav-icon" size="sm"/></CButton>
                            </CTooltip>):null
                        }
                    </CFormLabel>
                    <CFormInput type="file" id="visaupload"   {...register("visaupload")} />
                    {errors.visaupload && <code color="danger">{errors.visaupload?.message}</code>}
                </CCol>
                
                <CCol md={6}>
                    <CFormLabel htmlFor="eid">Eid <code color="danger">*</code></CFormLabel>
                    <CFormInput type="text" id="eid"    {...register("eid", {required:'Eid is required'})}  /> 
                    {errors.eid && <code color="danger">{errors.eid?.message}</code>}
                </CCol>
                <CCol md={6}>
                    <CFormLabel htmlFor="eidupload">Eid Upload <code color="danger">*</code>
                     {
                            empbasicdata.eid_expiry_upload !='' ?(
                            <CTooltip content="Download" >
                                <CButton color="info" shape="rounded-pill" size="sm" as="a" href={empbasicdata.eid_expiry_upload} target="_blank"><CIcon icon={cilCloudDownload} className="nav-icon" size="sm"/></CButton>
                            </CTooltip>):null
                        }
                    </CFormLabel>
                    <CFormInput type="file" id="eidupload"  {...register("eidupload")}/>
                    {errors.eidupload && <code color="danger">{errors.eidupload?.message}</code>}
                </CCol>
                <CCol md={3}>
                    <CFormLabel htmlFor="workpermit">Work Permit <code color="danger">*</code></CFormLabel>
                    <CFormInput type="text" id="workpermit"    {...register("workpermit", {required:'Work Permit is required'})}  /> 
                    {errors.workpermit && <code color="danger">{errors.workpermit?.message}</code>}
                </CCol>
                <CCol md={3}>
                    <CFormLabel htmlFor="personalno">Personal Number <code color="danger">*</code></CFormLabel>
                    <CFormInput type="text" id="personalno"   {...register("personalno", {required:'Personal Number is required'})}  /> 
                    {errors.personalno && <code color="danger">{errors.personalno?.message}</code>}
                </CCol>
                <CCol md={3}>
                    <CFormLabel htmlFor="personalaccno">Personal Account Number<code color="danger">*</code></CFormLabel>
                    <CFormInput type="text" id="personalaccno"   {...register("personalaccno", {required:'Personal Acc no is required'})}  /> 
                    {errors.personalaccno && <code color="danger">{errors.personalaccno?.message}</code>}
                </CCol>
                <CCol md={3}>
                    <CFormLabel htmlFor="labourcardupload">Labour Card Upload <code color="danger">*</code>
                    {
                            empbasicdata.labour_card_upload !='' ?(
                            <CTooltip content="Download" >
                                <CButton color="info" shape="rounded-pill" size="sm" as="a" href={empbasicdata.labour_card_upload} target="_blank"><CIcon icon={cilCloudDownload} className="nav-icon" size="sm"/></CButton>
                            </CTooltip>):null
                        }
                    </CFormLabel>
                    <CFormInput type="file" id="labourcardupload" defaultValue=""  {...register("labourcardupload")}  />
                    {errors.labourcardupload && <code color="danger">{errors.labourcardupload?.message}</code>}
                </CCol>
                <CCol xs={12}>
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <CButton color="primary" className="me-md-2" type="submit">
                        Save
                        </CButton>
                    </div>
                </CCol>
            </CForm>     
        </CCol>
    )
}

export default React.memo(EmployeeBasicForm)