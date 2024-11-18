import {useState } from "react";
import { IProduct } from "../interfaces/IProduct";

export const PaginationHook=()=>{
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [total,setTotal]=useState<number>(0);
    const itemsPerPage=5;
    const Pagination=(items:IProduct[])=>{
        const reveal = Math.ceil(items.length / itemsPerPage)
        setTotal(reveal)
        const start = (currentPage-1)*itemsPerPage
        const end = start+itemsPerPage
        return items.slice(start, end);
    }
    const goToPage = (number:number) => {
        setCurrentPage(Math.min(Math.max(1, number), total));
        return Math.min(Math.max(1, number), total)
      };
    const nextPage = () => {
        return goToPage(currentPage + 1);
    };
    
    const previousPage = () => {
        return goToPage(currentPage - 1);
    }
    
    

    return {currentPage,total,Pagination,nextPage,previousPage,setCurrentPage,
        hasNext:currentPage<total,hasprevious:currentPage>1,itemsPerPage}
}