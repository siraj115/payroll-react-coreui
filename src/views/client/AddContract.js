import React,{useState,useEffect, useRef } from "react";
import {useParams} from 'react-router-dom'
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
    CTooltip,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import {
    cilCloudDownload
  } from '@coreui/icons'
import {useForm} from "react-hook-form";
import axios from 'axios';
import UserToaster from '../../utils/UserToaster';
import { calculateDaysRemaining } from "../../utils/utils";
const AddContract = ()=>{
    const [toast, addToast] = useState(0);
    const toaster = useRef()
    const {clientid} = useParams();
    const [btnname, setBtnname] = useState('Save')
    const [clientCotractData, setClientCotractData] = useState({});
    const {register, handleSubmit, watch, formState:{errors}, setValue} = useForm()
    const headers = {
        headers: {'Content-Type':'multipart/form-data'}
    }
    console.log(errors)
    const startDate = watch("contractstart");
    const endDate = watch("contractend");
    const onSubmit = async (data) =>{
        try{
            console.log('fgfg',data);//return false;
            const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}client/saveclientcontract`
            //console.log(url)    
            data.clientid = clientid;
     
            let response = await axios.post(url,data,headers)
            if(response?.data?.errortype ===1){
                const user_toast = <UserToaster color='success' msg={response?.data?.msg} />
                addToast(user_toast)
                
            }else if(response?.data?.errortype ===2){
                const user_toast = <UserToaster color='danger' msg={response?.data?.msg} />
                addToast(user_toast)
            }
        }catch(err){

        }
    }
    const ClientContractData = async (clientid) =>{
        const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}client/getclientcontract/${clientid}`
       // console.log(url)    
        let response = await axios.get(url)
        console.log(response.data.data)
        const users = response.data.data;
        if(users!=null){
            setClientCotractData(users)
        }
        setValue("contractstart",users?.contractstart)
        setValue("contractend",users?.contractend)
        setValue("contractprice",users?.contractprice)
        setValue("countmale",users?.countmale)
        setValue("countfemale",users?.countfemale)
        setValue("countsupervisor",users?.countsupervisor)
        setValue("amountmale",users?.amountmale)
        setValue("amountfemale",users?.amountfemale)
        setValue("amountsupervisor",users?.amountsupervisor)
        setValue("vattax",users?.vattax)
        
    }
    useEffect(()=>{
        if(clientid!=null){
            console.log(clientid)
            //setBtnname('Update')
            ClientContractData(clientid)
            
        }
    },[setValue])
    return(
        
    <CCol xs={12}>
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Client Contract Details</strong> <small></small>
                <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
            </CCardHeader>
            <CCardBody>
                <CForm
                    className="row g-3 needs-validation"
                    onSubmit={handleSubmit(onSubmit)}
                    
                    
                    >
                   
                    <CCol md={4}>
                        <CFormLabel htmlFor="contractstart">Contract Start <code color="danger">*</code></CFormLabel>
                        <CFormInput type="date" {...register("contractstart",{required:"Contract Start Date is required"})}   /> 
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                        {errors.contractstart && <code color="danger">{errors.contractstart?.message}</code>}
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel htmlFor="contractend">Contract End <code color="danger">*</code></CFormLabel>
                        <CFormInput type="date" {...register("contractend",{
                            required:"Contract End Date is required",
                            validate: value => !startDate || new Date(endDate) >= new Date(startDate) || "End date must be after start date"
                            })}   /> 
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                        {errors.contractend && <code color="danger">{errors.contractend?.message}</code>}
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel htmlFor="contractprice">Contract Amount <code color="danger">*</code></CFormLabel>
                        <CFormInput type="text"  {...register("contractprice", {required:'Contract Amount is required'})} /> 
                        {errors.contractprice && <code color="danger">{errors.contractprice?.message}</code>}
                    </CCol>
                   
                    <CCol md={4}>
                        <CFormLabel htmlFor="countmale">Employee Count Male <code color="danger">*</code></CFormLabel>
                        <CFormInput type="number" id="countmale"  {...register("countmale", {required:"Male Count is required"})} />
                        {errors.countmale && <code color="danger">{errors.countmale?.message}</code>}
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel htmlFor="countfemale">Employee Count Female <code color="danger">*</code></CFormLabel>
                        <CFormInput type="number" id="countfemale"  {...register("countfemale", {required:"Female Count is required"})} />
                        {errors.countfemale && <code color="danger">{errors.countfemale?.message}</code>}
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel htmlFor="countsupervisor">Supervisor Count  <code color="danger">*</code></CFormLabel>
                        <CFormInput type="number" id="countsupervisor"  {...register("countsupervisor", {required:"Supervisor Count is required"})} />
                        {errors.countsupervisor && <code color="danger">{errors.countsupervisor?.message}</code>}
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel htmlFor="amountmale">Employee salary Per Male <code color="danger">*</code></CFormLabel>
                        <CFormInput type="number" id="amountmale"  {...register("amountmale", {required:"Male Salary is required"})} />
                        {errors.amountmale && <code color="danger">{errors.amountmale?.message}</code>}
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel htmlFor="amountfemale">Employee Salary Per Female <code color="danger">*</code></CFormLabel>
                        <CFormInput type="number" id="amountfemale"  {...register("amountfemale", {required:"Female Salary is required"})} />
                        {errors.amountfemale && <code color="danger">{errors.amountfemale?.message}</code>}
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel htmlFor="amountsupervisor">Supervisor Salary  <code color="danger">*</code></CFormLabel>
                        <CFormInput type="number" id="amountsupervisor"  {...register("amountsupervisor", {required:"Supervisor Salary is required"})} />
                        {errors.amountsupervisor && <code color="danger">{errors.amountsupervisor?.message}</code>}
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel htmlFor="vattax">Vat Tax  <code color="danger">*</code></CFormLabel>
                        <CFormInput type="number" id="vattax"  {...register("vattax", {required:"Vat Tax is required"})} />
                        {errors.vattax && <code color="danger">{errors.vattax?.message}</code>}
                    </CCol>
                    <CCol md={4}>
                        <CFormLabel htmlFor="contractpdf">Contract PDF <code color="danger">*</code>
                        {
                            (clientCotractData?.contractpdf !=null && clientCotractData?.contractpdf !='') ?(
                            <CTooltip content="Download" >
                                <CButton color="info" shape="rounded-pill" size="sm" as="a" href={clientCotractData.contractpdf} target="_blank"><CIcon icon={cilCloudDownload} className="nav-icon" size="sm"/></CButton>
                            </CTooltip>):null
                        }
                        </CFormLabel>
                        <CFormInput type="file" id="contractpdf"   {...register("contractpdf")} />
                        {
                            //,{required:"Photo is required"}
                        }
                        {errors.contractpdf && <code color="danger">{errors.contractpdf?.message}</code>}
                        
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

export default AddContract