import React from "react";
import {
    CContainer,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CListGroup,
    CListGroupItem,
    CTooltip,
    CLink
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilDelete, cilTrash, cilFolder,cilPencil
  } from '@coreui/icons'
import {capitalizeFirstLetter} from '../../utils/utils';
import EmployeePagination from "./EmployeePagination";
const EmployeeListTable = ({tblheading, users})=>{
    console.log(users)
    const allusers = users.data;
    const count = users.count;
    let currentpage  = users.current_page
    const per_page = users.per_page;
    console.log(allusers)
    const startIndex = (currentpage-1) * per_page

    function handleDelete (empid){
        if(confirm('Are you sure to delete?')){
            console.log('hi')
        }
    }
    return (
        <CContainer>
            <CRow>
                <CCol xs={12} mt={12}>
                    <CCard className="mb-4">
                    <CCardHeader>
                        <strong>{tblheading}</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable hover>
                            <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">S.No</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Emp No</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Employee Type</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Employee Role</CTableHeaderCell>
                                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                            </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {
                                    
                                    count && allusers.map((eachuser, index)=>{
                                        
                                       const editurl    = `${window.location.origin}/employee/addemployee/${eachuser.id}`
                                       const name       = (eachuser.name!=null)?capitalizeFirstLetter(eachuser.name):'';
                                       const country    = (eachuser.country!=null)?capitalizeFirstLetter(eachuser.country):''; 
                                       const employee_role    = (eachuser.employee_role!=null)?capitalizeFirstLetter(eachuser.employee_role):''; 
                                        const employee_type = (eachuser.employee_type!=null)?capitalizeFirstLetter(eachuser.employee_type):''; 
                                        const sno       = startIndex + index +1;

                                        return(<CTableRow key={eachuser.id}>
                                            <CTableHeaderCell scope="row">{sno}</CTableHeaderCell>
                                            <CTableDataCell>{name}</CTableDataCell>
                                            <CTableDataCell>{eachuser.email}</CTableDataCell>
                                            <CTableDataCell>{eachuser.empno}</CTableDataCell>
                                            <CTableDataCell>{country}</CTableDataCell>
                                            <CTableDataCell>{employee_role}</CTableDataCell>
                                            <CTableDataCell>{employee_type}</CTableDataCell>
                                            <CTableDataCell>
                                                <CListGroup layout="horizontal">
                                                    <CTooltip content="Edit Employee">
                                                        <CListGroupItem as="a" href={editurl}>
                                                                <CIcon icon={cilPencil} className="nav-icon" size="sm"/>
                                                        </CListGroupItem>
                                                    </CTooltip>
                                                        <CTooltip content="Delete Employee" >
                                                            <CListGroupItem as="button" onClick={()=>{handleDelete(eachuser.id)}}>
                                                                    <CIcon icon={cilTrash} className="text-danger nav-icon" size="sm"/>
                                                            </CListGroupItem>
                                                        </CTooltip>
                                                    
                                                </CListGroup>
                                            </CTableDataCell>
                                            
                                        </CTableRow>)
                                    })
                                }
                                
                            </CTableBody>
                        </CTable>
                        {count &&
                            <EmployeePagination pagination={users}  />
                        }
                    </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    )
}

export default EmployeeListTable;

