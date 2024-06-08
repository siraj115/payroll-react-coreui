import React, { useState, useRef, useEffect } from 'react'
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
  CToast,
  CToastHeader,
  CToastBody,
  CToaster,
  CAlert,
  CTooltip
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilCloudDownload
  } from '@coreui/icons'
import {employeeRoles} from "../../utils/emp_utils";
import {useForm} from "react-hook-form";
import axios from 'axios';
import UserToaster from '../../utils/UserToaster';

const EmployeeDetailForm = ()=>{
    const navigate = useNavigate('/');
    const [toast, addToast] = useState(0);
    const [empdata, setEmpdata] = useState({});
    const [btnname, setBtnname] = useState('Save')
    const toaster = useRef()
    const {register, handleSubmit, watch, formState:{errors}, setValue} = useForm()
    const {empid} = useParams();
    console.log(errors)
    const headers = {
        headers: {'Content-Type':'multipart/form-data'}
    }
    const onSubmit = async (data) =>{
        try{
            console.log(data);//return false;
            const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}user/saveuser`
            console.log(url)    
            if(empid!=null)
                data.id = empid;

            let response = await axios.post(url,data,headers)
            //console.log(response)
           // console.log(response.data)
            if(response?.data?.errortype ===1){
                const user_toast = <UserToaster color='success' msg={response?.data?.msg} />
                addToast(user_toast)
                
                setTimeout(function(){navigate(`/employee/addemployee/${response?.data?.userid}`)},1000)
            }else if(response?.data?.errortype ===2){
                const user_toast = <UserToaster color='danger' msg={response?.data?.msg} />
                addToast(user_toast)
            }
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
    
    const UserData = async (empid) =>{
        const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}user/getuser/${empid}`
       // console.log(url)    
        let response = await axios.get(url)
        console.log(response.data.data)
        const users = response.data.data;
        setEmpdata((response.data.data))
        setValue("empno",users.empno)
        setValue("name",users.name)
        setValue("dob",users.dob)
        setValue("gender",users.gender)
        setValue("address",users.address)
        setValue("country",users.country)
        setValue("phone",users.phoneno)
        setValue("email",users.email)
        setValue("emp_type",users.employee_type)
        setValue("emp_role",users.employee_role)
        setValue("salary",users.salary)
        setValue("canlogin",(users.canlogin)?true:false)
        
    }
   
    useEffect(()=>{
        if(empid!=null){
            console.log(empid)
            setBtnname('Update')
            UserData(empid)
            
        }
    },[setValue])
    
   // console.log(empdata)
    
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
                        <CFormInput type="number" {...register("empno")} defaultValue={empdata?.empno}  /> 
                        <CFormFeedback valid>Looks good!</CFormFeedback>
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
                        <CFormLabel htmlFor="validationCustom03">Address <code color="danger">*</code></CFormLabel>
                        <CFormTextarea  id="address"   {...register("address",{required:"Address is required"})} defaultValue={empdata?.address}/>
                        {errors.address && <code color="danger">{errors.address?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="validationCustom03">Country <code color="danger">*</code></CFormLabel>
                        <CFormInput type="text" id="country"   {...register("country",{required:"Country is required"})} defaultValue={empdata?.country} />
                        {errors.country && <code color="danger">{errors.country?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="phone">Phone No <code color="danger">*</code></CFormLabel>
                        <CFormInput type="text" id="phone"   {...register("phone",{required:"Phone no is required"})} defaultValue={empdata?.phoneno} />
                        {errors.phone && <code color="danger">{errors.phone?.message}</code>}
                    </CCol>

                    <CCol md={3}>
                        <CFormLabel htmlFor="email">Email </CFormLabel>
                        <CFormInput type="text" id="email"   {...register("email", {required:"Email is required"})} defaultValue={empdata?.email} />
                        {errors.email && <code color="danger">{errors.email?.message}</code>}
                    </CCol>
                    <CCol md={3}>
                        <CFormLabel htmlFor="userphoto">Photo <code color="danger">*</code>
                        {
                            empdata.employee_photo !='' ?(
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
                        <CFormLabel htmlFor="canlogin">Provide Login </CFormLabel>
                        <CFormCheck id="canlogin"  {...register("canlogin")} value="1" />
                       
                       
                        {errors.canlogin && <code color="danger">{errors.canlogin?.message}</code>}
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

export default React.memo(EmployeeDetailForm);