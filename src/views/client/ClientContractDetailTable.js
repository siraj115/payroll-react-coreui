import React from "react";
import {
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
  } from '@coreui/react'
  import {capitalizeFirstLetter, formattedDate} from "../../utils/utils"
const ClientContractDetailTable = ({singleClientData, contractDetails})=>{
    return (
        <CTable borderless>
            <CTableBody>
                <CTableRow color="info">
                    <CTableDataCell>Company Name: <strong> {singleClientData.companyname} </strong></CTableDataCell>
                    <CTableDataCell>TRN: <strong> {singleClientData.companytrn} </strong></CTableDataCell>
                    <CTableDataCell>Start Date:  <strong> {formattedDate(contractDetails.contractstart)} </strong>  </CTableDataCell>
                    <CTableDataCell>End Date: <strong>  {formattedDate(contractDetails.contractend)} </strong> </CTableDataCell>
                
                </CTableRow>
                
                <CTableRow color="info">
                    <CTableDataCell>Supervisor Count: <strong>  {contractDetails.countsupervisor} </strong> </CTableDataCell>
                    <CTableDataCell>Male Count:  <strong> {contractDetails.countmale} </strong> </CTableDataCell>
                    <CTableDataCell colSpan={2}>Female Count: <strong>  {contractDetails.countfemale} </strong> </CTableDataCell>
                </CTableRow>
            
            </CTableBody>
        </CTable>
    )
}

export default ClientContractDetailTable;