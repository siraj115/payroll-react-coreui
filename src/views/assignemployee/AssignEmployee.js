import React,{useState,useRef,useEffect } from "react";
import {Link, useNavigate, useParams} from 'react-router-dom'
import Cookies from 'js-cookie';
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow ,
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
    CBadge ,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
  import CIcon from '@coreui/icons-react'
  import {cilCalendar} from '@coreui/icons'
import {useForm, Controller } from "react-hook-form";
//import  CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import axios from 'axios';
import UserToaster from '../../utils/UserToaster';
import ClientContractDetailTable from "../client/ClientContractDetailTable";
import {capitalizeFirstLetter, formattedDate} from "../../utils/utils"
const AssignEmployee = ()=>{
    const nav = useNavigate()
    const [btnname, setBtnname] = useState('Save')
    const {register, handleSubmit, watch, formState:{errors}, setValue, control, setError,clearErrors } = useForm()
    const [toast, addToast] = useState(0);
    const toaster = useRef()
    const [clientdata, setClientdata] = useState([]);
    const [singleClientData, setSingleClientData] = useState({});
    const [contractDetails, setContractDetails] = useState({});
    const [isClientData, setisClientData] = useState(0);
    const [showLoading, setShowLoading]=useState(false)
    const [showClientLoading, setShowClientLoading]=useState(false)
    const [selectedClient, setSelectedClient]=useState('')
    const [superVisor, setSuperVisor] = useState({})
    const [maleEmployees, setMaleEmployees] = useState({})
    const [feMaleEmployees, setFeMaleEmployees] = useState({})
    const headers = {
        headers: {'Content-Type':'multipart/form-data'}
    }
    const login_userid = Cookies.get('loggedinuserid');
    const token = Cookies.get('accessToken');
    const onSubmit = async (data) =>{
        try{
            //setShowLoading(true)
            const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}client/assignemployee`
            console.log(url)    
           
            data.login_userid = login_userid;
            data.clientid   = selectedClient;
            data.contractid   = contractDetails.id;
            console.log('data',data);//return false;
            const headers = {
                headers: {'Authorization':token}
            }
            console.log('ins')
            let response = await axios.post(url,data, headers)
            if(response?.data?.errortype ===1){
                const user_toast = <UserToaster color='success' msg={response?.data?.msg} />
                addToast(user_toast)
                
                setTimeout(
                    ()=>{
                        window.location.reload()
                    },2000)
                
            }
            setShowLoading(false)
        }catch(err){

        }
    }
    const ClientData = async () =>{
        const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}client/allclientnames/notassigned`
       // console.log(url)    
       const headers = {
            headers: {'Authorization':token}
        }
        await axios.get(url,headers)
        .then((response)=>{
            console.log(response.data.data)
            const clients = response.data.data;
            const clientDet = clients.map((client)=>({
                value: client.id,
                label: client.companyname
            }))
            setClientdata(clientDet)
        })
        
        
    }
   
   
    useEffect(()=>{
       
        //setBtnname('Update')
        ClientData()
        
    },[])
    const onChangeHandle = async (e)=>{
        console.log(e.value)
        console.log(e.label)
        if(e.value!=''){
            setShowClientLoading(true)
            const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}client/getclientdetails/${e.value}`
            setSelectedClient(e.value) 
            const headers = {
                headers: {'Authorization':token}
            }
            await axios.get(url,headers)
            .then((response)=>{
                const client  = response.data.data;
                const assigned_employees = response.data?.assigned_employees;
                const employeeDetails   = response.data?.employeeDetails;
                console.log(client)
                console.log(client.contractdetails.length)
                console.log('assigned_employees', assigned_employees)
                setisClientData(client.contractdetails.length?true:false)
                let resContractDetails = {}
                if(client.contractdetails.length){
                    resContractDetails = client.contractdetails[0];
                    setContractDetails(resContractDetails)
                    delete client.contractdetails
                    setSingleClientData(client)
                    
                }else{
                    setSingleClientData({})
                    setContractDetails({})
                }    
                setShowClientLoading(false)
                console.log('supervisor',assigned_employees?.supervisor)// siraj start here. Assign employee details in assigned_employees variable on getting data
                const assigned_supervisor  = assigned_employees?.supervisor.map((assigned)=>{
                    console.log(assigned.employee_id)
                    //const findEmployee = employeeDetails.find((ele)=> ele.employee_id==assigned.id)
                    const findEmployee = employeeDetails.find((ele)=> (ele.id==assigned.employee_id))
                    return (findEmployee?{label:findEmployee.name, value:findEmployee.id}:null)
                })||[];
                console.log(assigned_supervisor)
                setValue('supervisor',assigned_supervisor)
                //return resContractDetails;
            })
        
                
        }
        setValue('supervisor',[])
        setValue('maleemp',[])
        setValue('femaleemp',[])
    }
    
    const handleClientChange = (selectedOptions, emprole)=>{
        console.log(selectedOptions)
        console.log(emprole)
        console.log(contractDetails)
        let maxSelection = 0;
        let employeetype = ''
        if(emprole=='supervisor'){
            maxSelection =contractDetails.countsupervisor 
            employeetype = 'Supervisor(s)'
        }else if(emprole=='maleemp'){
            maxSelection =contractDetails.countmale 
            employeetype = 'Male(s)'
        }else if(emprole=='femaleemp'){
            maxSelection =contractDetails.countfemale 
            employeetype = 'Female(s)'
        }
        console.log(maxSelection)
        
        if(selectedOptions.length>maxSelection){
            setError(emprole, {
                type: 'manual',
                message: `You can select up to ${maxSelection}  ${employeetype} only.`
            });
        }else{
            clearErrors(emprole);
            setValue(emprole,(selectedOptions))
        }
    }
    /*useEffect(()=>{
        console.log(contractDetails)        console.log(superVisor)        console.log(maleEmployees)        console.log(feMaleEmployees)
    },[contractDetails,superVisor,maleEmployees,feMaleEmployees])*/

    const getSuperVisorData  = async ()=>{
        const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}user/listuser/Supervisor`
        const headers = {
            headers: {'Authorization':token}
        }
        const getSuperVisorApi = await axios.get(url,headers)
        const getSuperVisor = getSuperVisorApi.data.data
        console.log(getSuperVisor)
        const superVisor = getSuperVisor.map((client)=>({
            value: client.id,
            label: capitalizeFirstLetter(`${client.name} (${client.empno})`)
        }))
        setSuperVisor(superVisor)
    }
    useEffect(()=>{
        getSuperVisorData()
    },[])
    const getCleanerData= async ()=>{
        const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}user/listuser/Cleaner`
        const headers = {
            headers: {'Authorization':token}
        }
        const getSuperVisorApi = await axios.get(url,headers)
        const getSuperVisor = getSuperVisorApi.data.data
        console.log('cleaner')
        console.log(getSuperVisor)
        const maleEmployeesArr = getSuperVisor.filter(emp=> emp.gender==='male')
        console.log(maleEmployeesArr)
        const femaleEmployeesArr = getSuperVisor.filter(emp=> emp.gender==='female')
       
        const maleEmployeesdata = maleEmployeesArr.map((client)=>({
            value: client.id,
            label: capitalizeFirstLetter(`${client.name} (${client.empno})`)
        }))
        console.group(maleEmployeesdata)
        const femaleEmployeesdata = femaleEmployeesArr.map((client)=>({
            value: client.id,
            label: capitalizeFirstLetter(`${client.name} (${client.empno})`)
        }))
        setMaleEmployees(maleEmployeesdata)
        setFeMaleEmployees(femaleEmployeesdata)
    }
    useEffect(()=>{
        getCleanerData()
    },[])
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
                            <CSpinner size="sm" className={!showClientLoading?'visually-hidden':""}/>
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                        {errors.companyname && <code color="danger">{errors.companyname?.message}</code>}
                    </CCol>
                    
                        <CCol xs={12}>
                            
                            
                                {isClientData ?
                                    <>
                                        <ClientContractDetailTable singleClientData={singleClientData} contractDetails={contractDetails} />
                                        
                                        <CRow className="mt-4">
                                            <CCol md={4}>
                                                <CFormLabel htmlFor="supervisor">Supervisor <code color="danger">*</code></CFormLabel>
                                                <Controller
                                                    name="supervisor"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            {...register("supervisor",{required:"Supervisor is required"})}
                                                            options={superVisor}
                                                            isMulti
                                                            onChange={(selectedOptions) => handleClientChange(selectedOptions, 'supervisor')}
                                                            placeholder="Select Supervisor"
                                                        />
                                                    )}
                                                />
                                                <CFormFeedback valid>Looks good!</CFormFeedback>
                                                {errors.supervisor && <code color="danger">{errors.supervisor?.message}</code>}
                                            </CCol>
                                            
                                            <CCol md={4}>
                                                <CFormLabel htmlFor="maleemp">Male Employee <code color="danger">*</code></CFormLabel>
                                                <Controller
                                                    name="maleemp"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            {...register("maleemp",{required:"Male Empoloyee is required"})}
                                                            options={maleEmployees}
                                                            isMulti
                                                            onChange={(selectedOptions) => handleClientChange(selectedOptions, 'maleemp')}
                                                            placeholder="Select Male Employee"
                                                        />
                                                    )}
                                                />
                                                <CFormFeedback valid>Looks good!</CFormFeedback>
                                                {errors.maleemp && <code color="danger">{errors.maleemp?.message}</code>}
                                            </CCol>
                                            <CCol md={4}>
                                                <CFormLabel htmlFor="femaleemp">Female Employee <code color="danger">*</code></CFormLabel>
                                                <Controller
                                                    name="femaleemp"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <Select
                                                            {...field}
                                                            {...register("femaleemp",{required:"Female Empoloyee is required"})}
                                                            options={feMaleEmployees}
                                                            isMulti
                                                            onChange={(selectedOptions) => handleClientChange(selectedOptions, 'femaleemp')}
                                                            placeholder="Select Female Employee"
                                                        />
                                                    )}
                                                />
                                                <CFormFeedback valid>Looks good!</CFormFeedback>
                                                {errors.femaleemp && <code color="danger">{errors.femaleemp?.message}</code>}
                                            </CCol>
                                            <CCol xs={12} className="mt-3">
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
                                        </CRow>

                                        
                                    </>
                                    :
                                    <CTable>
                                        <CTableBody color="danger">
                                            <CTableRow>
                                            {selectedClient? <CTableDataCell> Contract is not assigned </CTableDataCell>:null}
                                            </CTableRow>
                                        </CTableBody>
                                    </CTable>
                                }
                        </CCol>
                        
                    
                    
                </CForm>
            </CCardBody>
        </CCard>
    </CCol>

    )
}

export default AssignEmployee