import React,{useState,useRef,useEffect } from "react";
import {Link, useNavigate, useParams} from 'react-router-dom'
import Cookies from 'js-cookie';
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
    CSpinner,
    CListGroup,
    CListGroupItem,
    CBadge 
  } from '@coreui/react'
import {useForm} from "react-hook-form";
//import  CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import axios from 'axios';
import UserToaster from '../../utils/UserToaster';
const AssignEmployee = ()=>{
    const nav = useNavigate()
    const [btnname, setBtnname] = useState('Save')
    const {register, handleSubmit, watch, formState:{errors}, setValue} = useForm()
    const {clientid} = useParams();
    const [toast, addToast] = useState(0);
    const toaster = useRef()
    const [clientdata, setClientdata] = useState([]);
    const [showLoading, setShowLoading]=useState(false)
    const headers = {
        headers: {'Content-Type':'multipart/form-data'}
    }
    const login_userid = Cookies.get('loggedinuserid');
    const token = Cookies.get('accessToken');
    const onSubmit = async (data) =>{
        try{
            setShowLoading(true)
            console.log('data',data);//return false;
            const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}client/saveclient`
            console.log(url)    
            if(clientid!=null)
                data.id = clientid;

            data.login_userid = login_userid;
            
            const headers = {
                headers: {'Authorization':token}
            }
            console.log('ins')
            let response = await axios.post(url,data, headers)
            if(response?.data?.errortype ===1){
                const user_toast = <UserToaster color='success' msg={response?.data?.msg} />
                addToast(user_toast)
                if(response?.data?.type =='insert'){
                setTimeout(
                    ()=>{
                        nav(`/client/addclient/${response?.data?.clientid}`)
                        //window.location.href=`${window.location.origin}/client/addclient/${response?.data?.clientid}`
                    },1000)
                }else{
                    ClientData(clientid)
                }
            }
            setShowLoading(false)
        }catch(err){

        }
    }
    const ClientData = async () =>{
        const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}client/allclientnames`
       // console.log(url)    
       const headers = {
            headers: {'Authorization':token}
        }
        let response = await axios.get(url,headers)
        console.log(response.data.data)
        const clients = response.data.data;
        const clientDet = clients.map((client)=>({
            value: client.id,
            label: client.companyname
        }))
        setClientdata(clientDet)
        
    }
   
   
    useEffect(()=>{
       
        //setBtnname('Update')
        ClientData()
        
    },[])
    const onChangeHandle = async (e)=>{
        console.log(e.value)
        console.log(e.label)
        if(e.value!=''){
            const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}client/getclientdetails/${e.value}`
            // console.log(url)    
            const headers = {
                headers: {'Authorization':token}
            }
            let response = await axios.get(url,headers)
        }
    }
    return(
        
    <CCol xs={12}>
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Assign Employee</strong> <small></small>
                <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
            </CCardHeader>
            <CCardBody>
                <CForm
                    className="row g-3 needs-validation"
                    onSubmit={handleSubmit(onSubmit)}
                    
                    >
                   
                    <CCol md={3}>
                        <CFormLabel htmlFor="companyname">Client <code color="danger">*</code></CFormLabel>
                        <Select
                                options={clientdata}
                                onChange={onChangeHandle}
                                placeholder="Select Client"
                                id="companyname"
                                name="companyname"
                            />
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                        {errors.companyname && <code color="danger">{errors.companyname?.message}</code>}
                    </CCol>
                    
                    <CCol xs={12}>
                        <CListGroup className="mb-2" layout='horizontal' >
                            <CListGroupItem className="d-flex justify-content-between align-items-center">
                                Supervisor
                            </CListGroupItem>
                            <CListGroupItem className="d-flex justify-content-between align-items-center">
                                Male
                            </CListGroupItem>
                            <CListGroupItem className="d-flex justify-content-between align-items-center">
                                Female
                            </CListGroupItem>
                        </CListGroup>
                        <CListGroup className="mb-2" layout='horizontal' >
                            <CListGroupItem className="d-flex justify-content-between align-items-center">
                                Supervisor
                                <CBadge color="primary" shape="rounded-pill">
                                14
                                </CBadge>
                            </CListGroupItem>
                            <CListGroupItem className="d-flex justify-content-between align-items-center">
                                Male
                                <CBadge color="primary" shape="rounded-pill">
                                2
                                </CBadge>
                            </CListGroupItem>
                            <CListGroupItem className="d-flex justify-content-between align-items-center">
                                Female
                                <CBadge color="primary" shape="rounded-pill">
                                1
                                </CBadge>
                            </CListGroupItem>
                        </CListGroup>
                        <CListGroup className="mb-2" layout='horizontal' >
                            <CListGroupItem className="d-flex justify-content-between align-items-center">
                                Supervisor
                                <CBadge color="primary" shape="rounded-pill">
                                14
                                </CBadge>
                            </CListGroupItem>
                            <CListGroupItem className="d-flex justify-content-between align-items-center">
                                Male
                                <CBadge color="primary" shape="rounded-pill">
                                2
                                </CBadge>
                            </CListGroupItem>
                            <CListGroupItem className="d-flex justify-content-between align-items-center">
                                Female
                                <CBadge color="primary" shape="rounded-pill">
                                1
                                </CBadge>
                            </CListGroupItem>
                        </CListGroup>
                    </CCol>
                    <CCol xs={12}>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            
                            { !showLoading ?
                                <CButton color="primary" className="me-md-2" type="submit">
                                  {btnname}
                                </CButton>
                                :
                                <CButton color="primary" disabled>
                                    <CSpinner as="span" size="sm" aria-hidden="true" />
                                </CButton>
                            }
                        </div>
                    </CCol>
                </CForm>
            </CCardBody>
        </CCard>
    </CCol>

    )
}

export default AssignEmployee