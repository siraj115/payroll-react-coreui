import React, { useState,useRef } from 'react'
import {useParams} from 'react-router-dom'
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
  const [enabletabs, setEnabletabs] = useState((empid!=null?true:false))
    return(
        <CRow><CToaster className="p-3" placement="top-end" push={toast} ref={toaster} />
           <EmployeeDetailForm />
           {enabletabs?<EmployeeTabs />:null}
        </CRow>
    )
}

export default  React.memo(AddEmployee);