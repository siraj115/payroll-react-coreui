import React, {useState, useRef} from 'react'
import { Link } from 'react-router-dom'
import {useForm} from "react-hook-form";
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CToaster
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import UserToaster from '../../../utils/UserToaster';

const Login = () => {
  const {register, handleSubmit, watch, formState:{errors}} = useForm()
  
  const [toast, addToast] = useState(0);
  const toaster = useRef()
  
  const token = Cookies.get('accessToken');
  if(token){
    window.location.href=`${window.location.origin}/dashboard`
  }
  const onSubmit = async (data) =>{
    console.log(data)
    try{
      const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}user/login`
      console.log(url)    

      let response = await axios.post(url,data)
      console.log(response)
      if(response?.data.errortype==2){
        const user_toast = <UserToaster color='danger' msg={response?.data?.msg} />
        addToast(user_toast)
      }else  if(response?.data.errortype==1){
        const user_toast = <UserToaster color='success' msg={response?.data?.msg} />
        addToast(user_toast)
        Cookies.set('accessToken', response.data.accessToken, { expires: 7 }); // Set expiry as needed
        Cookies.set('loggedinuserid', response.data.id, { expires: 7 }); // Set expiry as needed
        setTimeout(
          ()=>{
              window.location.href=`${window.location.origin}/dashboard`
          },300)
      }
    }catch(err){
      const user_toast = <UserToaster color='success' msg='Login failed!. Please try again later' />
      addToast(user_toast)
    }
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
          <CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                     onSubmit={handleSubmit(onSubmit)}
                  >
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autoComplete="username" {...register("username", {required:"Username is required"})} />
                    </CInputGroup>
                    
                    {errors.username && <code color="danger">{errors.username?.message}</code>}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        {...register("password", {required:"Password is required"})} 
                      />
                    </CInputGroup>
                    {errors.password && <code color="danger">{errors.password?.message}</code>}
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type='submit'>
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        {/*<CButton color="link" className="px-0">
                          Forgot password?
                      </CButton>*/}
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Zas Payroll</h2>
                    <p>
                      Login to access Dashboard, Employees and Client Details
                    </p>
                    
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
