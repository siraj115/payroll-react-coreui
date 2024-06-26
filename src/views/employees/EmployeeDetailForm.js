import React, { useState, useRef, useEffect } from 'react'
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
  CTooltip,
  CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilCloudDownload
  } from '@coreui/icons'
import {employeeRoles} from "../../utils/emp_utils";
import {countrycodes} from "../../utils/contryCodes"
import {useForm} from "react-hook-form";
import axios from 'axios';
import UserToaster from '../../utils/UserToaster';

const EmployeeDetailForm = ({userdata, reload})=>{
    const nav = useNavigate();
    const [toast, addToast] = useState(0);
    const [empdata, setEmpdata] = useState({});
    const [btnname, setBtnname] = useState('Save')
    const [countryCode, setcountryCode] = useState('')
    const toaster = useRef()
    const {register, handleSubmit, watch, formState:{errors}, setValue} = useForm()
    const {empid} = useParams();
    const login_userid = Cookies.get('loggedinuserid');
    const token = Cookies.get('accessToken');
    const [showLoading, setShowLoading]=useState(false)
    //console.log(errors)
    const headers = {
        headers: {'Content-Type':'multipart/form-data'}
    }
    
    const onSubmit = async (data) =>{
        try{
            setShowLoading(true)
            console.log(data);//return false;
            const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}user/saveuser`
            console.log(url)    
            if(empid!=null)
                data.id = empid;

            data.login_userid = login_userid;
           
            headers.headers['Authorization']= token;
            let response = await axios.post(url,data,headers)
            //console.log(response)
           // console.log(response.data)
            if(response?.data?.errortype ===1){
                const user_toast = <UserToaster color='success' msg={response?.data?.msg} />
                addToast(user_toast)
                if(response?.data?.type =='insert'){
                    setTimeout(
                        ()=>{
                            //window.location.href=`#/employee/addemployee/${response?.data?.userid}`
                            //window.location.href=`${window.location.origin}/employee/addemployee/${response?.data?.userid}`
                            nav(`/employee/addemployee/${response?.data?.userid}`)
                        },1000)
                }else{
                    reload()
                }
            }else if(response?.data?.errortype ===2){
                const user_toast = <UserToaster color='danger' msg={response?.data?.msg} />
                addToast(user_toast)
            }
            setShowLoading(false)
        }catch(err){
           // console.log(err.response.data.errortype)
            if(err?.response?.data?.errortype ===2){
                const user_toast = <UserToaster color='danger' msg={err?.response?.data?.msg} />
                addToast(user_toast)
            }else{
                const user_toast = <UserToaster color='danger' msg='Something went wrong!' />
                addToast(user_toast)
            }
        }
    }
    
    const UserData = async (users) =>{
        
        setValue("empno",users?.empno)
        setValue("name",users?.name)
        setValue("dob",users?.dob)
        setValue("gender",users?.gender)
        setValue("address",users?.address)
        setValue("country",users?.country)
        setValue("phone",users?.phoneno)
        setValue("workphone",users?.workphone)
        setValue("email",users?.email)
        setValue("emp_type",users?.employee_type)
        setValue("emp_role",users?.employee_role)
        setValue("salary",users?.salary)
        setValue("datejoining",(users?.datejoining))
        if(Object.keys(users).length)
            setValue("canlogin",(users?.canlogin)?true:false)
        else
            setValue("canlogin",null)
        
    }
   
    useEffect(()=>{
        if(empid!=null){
            console.log(empid)
            setBtnname('Update')
            
        }else{
            setBtnname('Save')
            setEmpdata({})
            UserData({})
        }
    },[empid])

    useEffect(()=>{
        if(userdata){
            setEmpdata(userdata)
            UserData(userdata)
        }else{
            setEmpdata({})
            UserData({})
        }

    },[userdata])
    
   // console.log(empdata)
    const handleSelectCountry = (e)=>{
        console.log(e.target.value)
        const countryname = e.target.value;
        const country = countrycodes.find(c=>c.name.toLocaleLowerCase() === countryname.toLocaleLowerCase())
        console.log(country)
       // setcountryCode(country.dial_code)
        //setValue("country",countryCode)
    }
return(
    <CCol xs={12}>
        <CCard className="mb-4">
            <CCardHeader>
                <strong>Employee Details</strong> <small></small>
                <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
            </CCardHeader>
            <CCardBody>
                <CForm
                    className="row g-3 needs-validation"
                    
                    onSubmit={handleSubmit(onSubmit)}
                    >
                    <CCol md={3}>
                        <CFormLabel htmlFor="empno">Emp No</CFormLabel>
                        <CFormInput type="number" {...register("empno", {required:"Emp No is required"})} defaultValue={empdata?.empno}  /> 
                        <CFormFeedback valid>Looks good!</CFormFeedback>
                        {errors.empno && <code color="danger">{errors.empno?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="name">Name <code color="danger">*</code></CFormLabel>
                        <CFormInput type="text"  {...register("name", {required:'Name is required'})} defaultValue={empdata?.name}  /> 
                        {errors.name && <code color="danger">{errors.name?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="dob">DOB <code color="danger">*</code></CFormLabel>
                        <CFormInput type="date" id="dob" defaultValue={empdata?.dob}  {...register("dob", {required:"DOB is required"})} />
                        {errors.dob && <code color="danger">{errors.dob?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="validationCustomUsername">Gender <code color="danger">*</code></CFormLabel>
                        <div>
                            
                        <CFormCheck
                            inline
                            type="radio"
                            name="gender"
                            id="male"
                            label="Male"
                            value="male"
                            {...register("gender",{required:"Gender is required"})} 
                            
                        />
                        <CFormCheck
                            inline
                            type="radio"
                            name="gender"
                            id="female"
                            label="Female"
                            value="female"
                            {...register("gender",{required:"Gender is required"})} 
                           
                        />
                        </div>
                        {errors.gender && <code color="danger">{errors.gender?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="address">Address <code color="danger">*</code></CFormLabel>
                        <CFormTextarea  id="address"   {...register("address",{required:"Address is required"})} defaultValue={empdata?.address}/>
                        {errors.address && <code color="danger">{errors.address?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="country">Country <code color="danger">*</code></CFormLabel>
                        
                       <CFormSelect id="country" name="country" onChange={()=>{handleSelectCountry(event)}} {...register("country",{required:"Country is required"})}>
                            <option value="">Select Country</option>
                            {countrycodes.map((country)=>{
                               return (<option value={country.name} key={country.code}>{country.name}</option>)
                            })}
                       </CFormSelect>
                        {errors.country && <code color="danger">{errors.country?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="phone">Phone No(Personal) <code color="danger">*</code></CFormLabel>
                        <CFormInput type="text" id="phone"   {...register("phone",{required:"Phone no is required"})}  />
                        {errors.phone && <code color="danger">{errors.phone?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="workphone">Work Phone No <code color="danger">*</code></CFormLabel>
                        <CFormInput type="text" id="workphone" name="workphone"   {...register("workphone",{required:"Work Phone no is required"})} />
                        {errors.workphone && <code color="danger">{errors.workphone?.message}</code>}
                    </CCol>

                    <CCol md={3}>
                        <CFormLabel htmlFor="email">Email </CFormLabel>
                        <CFormInput type="text" id="email"   {...register("email")} defaultValue={empdata?.email} />
                        {errors.email && <code color="danger">{errors.email?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="userphoto">Photo <code color="danger">*</code>
                        {
                            empdata?.employee_photo !='' ?(
                            <CTooltip content="Download" >
                                <CButton color="info" shape="rounded-pill" size="sm" as="a" href={empdata.employee_photo} target="_blank"><CIcon icon={cilCloudDownload} className="nav-icon" size="sm"/></CButton>
                            </CTooltip>):null
                        }
                        </CFormLabel>
                        <CFormInput type="file" id="userphoto"   {...register("userphoto")} />
                        {
                            //,{required:"Photo is required"}
                        }
                        {errors.userphoto && <code color="danger">{errors.userphoto?.message}</code>}
                        
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="emp_type">Employee Type <code color="danger">*</code></CFormLabel>
                        <div>
                        <CFormCheck
                            inline
                            type="radio"
                            name="emp_type"
                            id="own"
                            label="Own"
                            value="own"
                            {...register("emp_type",{required:"Employee type is required"})} 
                            
                        />
                        <CFormCheck
                            inline
                            type="radio"
                            name="emp_type"
                            id="outsource"
                            label="Out Source"
                            value="outsource"
                            {...register("emp_type",{required:"Employee type is required"})} 
                            
                        />
                        </div>
                        {errors.emp_type && <code color="danger">{errors.emp_type?.message}</code>}
                    </CCol>

                    <CCol md={3}>
                        <CFormLabel htmlFor="emp_role">Employee Role <code color="danger">*</code></CFormLabel>
                        <CFormSelect id="emp_role" 
                        options={employeeRoles}
                        {...register("emp_role", {required:"Employee role is required"})}
                        
                        />
                        {errors.emp_role && <code color="danger">{errors.emp_role?.message}</code>}
                    </CCol>
                    
                    <CCol md={3}>
                        <CFormLabel htmlFor="salary">Salary <code color="danger">*</code></CFormLabel>
                        <CFormInput type="text" id="salary"  
                        {...register("salary",{required:"Salary is required"})} defaultValue={empdata?.salary} />
                        {errors.salary && <code color="danger">{errors.salary?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="datejoining">Date of Joining <code color="danger">*</code></CFormLabel>
                        <CFormInput type="date" id="datejoining"  
                        {...register("datejoining",{required:"Date Joining is required"})} defaultValue={empdata?.datejoining} />
                        {errors.datejoining && <code color="danger">{errors.datejoining?.message}</code>}
                    </CCol>
                    
                    <CCol md={3}>
                        <CFormLabel htmlFor="canlogin">Provide Login </CFormLabel>
                        <CFormCheck id="canlogin"  {...register("canlogin")} value="1" />
                       
                       
                        {errors.canlogin && <code color="danger">{errors.canlogin?.message}</code>}
                    </CCol>
                
                    <CCol xs={12}>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            { !showLoading ?
                                <CButton color="primary" className="me-md-2" type='submit'>
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

export default React.memo(EmployeeDetailForm);