import React, { useState } from "react";
import {
    CPagination,
    CPaginationItem
  } from '@coreui/react'
const ClientPagination = ({pagination, })=>{
    const { data, per_page, total, last_page } = pagination;
    const [currentPage, setCurrentPage] = useState(pagination.current_page)
    console.log(currentPage)
    const handleNextPage  = ()=>{
        if(currentPage<last_page){
            setCurrentPage(prevPage =>prevPage+1)
        }
    }
    const handlePrevPage = ()=>{
        if(currentPage>1){
            setCurrentPage(prevPage => prevPage-1)
        }
    }
    const handlePageNo =(page)=>{
        //handleClickPagination(page)
    }
    const startIndex = (currentPage -1)* per_page;
    const randomPageNumbers =()=>{
        const pageNumbers = [];
        for(let i=1;i<=last_page;i++){
            pageNumbers.push(
                <CPaginationItem key={i} onClick={handlePageNo(i)}>{i}</CPaginationItem>
            )
        }
        return pageNumbers
    }
    return (
        <CPagination className="justify-content-end" aria-label="Page navigation example">
            <CPaginationItem onClick={handleNextPage} disabled={currentPage ===1}>Previous</CPaginationItem>
            {randomPageNumbers()}
            <CPaginationItem onClick={handlePrevPage} disabled={currentPage===last_page}>Next</CPaginationItem>
        </CPagination>
    )
}

export default ClientPagination;