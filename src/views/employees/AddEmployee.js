import React, { useEffect , useState,useRef } from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie';
import axios from "axios"
import {
  CRow,
  CToaster
} from '@coreui/react'

import UserToaster from '../../utils/UserToaster';
import EmployeeDetailForm from './EmployeeDetailForm'
import EmployeeTabs from './EmployeeTabs'


const AddEmployee = ()=>{
  const [toast, addToast] = useState(0);
  const toaster = useRef()
  const {empid} = useParams();
  const [enabletabs, setEnabletabs] = useState(false)

  const [empdata, setEmpdata] = useState({});
  const [empbasicdata, setEmpbasicdata] = useState({});
  const login_userid = Cookies.get('loggedinuserid');
  const token = Cookies.get('accessToken');
  const UserData = async (empid) =>{
      const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}user/getuser/${empid}`
    // console.log(url)    
    const headers = {
          headers: {'Authorization':token}
      }
      let response = await axios.get(url,headers)
      console.log(response.data.data)
      const users = response.data.data;
      setEmpdata((response.data.data))
  }
  const UserBasicData = async (empid) =>{
      const url = `${import.meta.env.VITE_APP_PAYROLL_BASE_URL}user/getuserbasic/${empid}`
    // console.log(url)    
    const headers = {
          headers: {'Authorization':token}
      }
      let response = await axios.get(url,headers)
      console.log(response.data.data)
      const users = response.data.data;
      if(users){
          setEmpbasicdata(users)
      }
      
  }

  useEffect(()=>{
      if(empid!=null){
          console.log(empid)
          UserData(empid)
          UserBasicData(empid)
      }
      
      setEnabletabs(empid!=null?true:false)
  },[empid])
  
  
    return(
        <CRow><CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
           <EmployeeDetailForm userdata ={empdata} reload={()=>{UserData(empid)}} />
           {enabletabs?<EmployeeTabs userbasic={empbasicdata} emptype={empdata?.employee_type}  />:null}
        </CRow>
    )
}

export default  React.memo(AddEmployee);