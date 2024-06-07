import React, { useState } from 'react'
import {useParams} from 'react-router-dom'
import {
  CRow,
} from '@coreui/react'

import EmployeeDetailForm from './EmployeeDetailForm'
import EmployeeTabs from './EmployeeTabs'


const AddEmployee = ()=>{
  const {empid} = useParams();
  const [enabletabs, setEnabletabs] = useState((empid!=null?true:false))
    return(
        <CRow>
           <EmployeeDetailForm />
           {enabletabs?<EmployeeTabs />:null}
        </CRow>
    )
}

export default  React.memo(AddEmployee);