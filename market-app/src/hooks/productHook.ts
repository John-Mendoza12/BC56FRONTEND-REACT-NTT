import { useEffect, useState } from "react"
import { ICategory, IProduct } from "../interfaces/IProduct"
import { productsService } from "../services/productsService"
import { useShopContext } from "../context/shopListContext"
import { IShop } from "../interfaces/ISummary"
import { PaginationHook } from "./paginationHook"

export const ProductHook=()=>{
    const [products,setProducts]=useState<IProduct[]>([])
    const [data,setData]=useState<IProduct[]>([])
    const {Pagination,nextPage,previousPage,itemsPerPage,setCurrentPage}= PaginationHook()
    const [categories,setCategories]=useState<ICategory[]>([])
    const [selectedCategory,setSelectedCategory]=useState("all")
    const [searchText,setSearchText]=useState("")
    const { addItem,updateItem,array } = useShopContext();
    const getProducts=async ()=>{
        try {
          const data = await productsService.getProducts()
          const pages = Pagination(data.products)
          setProducts(pages) 
          setData(data.products)
        }catch (error) {
        console.error("Error al cargar productos",error);
        }
    }
    const getCategories=async ()=>{
        try{
            const data = await productsService.getCategories()
            setCategories(data)
        }catch (error) {
            console.error("Error al cargar productos",error);
            }
    }
    const Add=(item: IProduct)=>{
    const productSelect=array.findIndex((prop)=>prop.product.title==item.title)
    if(productSelect==-1){
        const req:IShop={
            quantity: 1,
            product: item,
            id: 0
        }
        addItem(req)
    }
    else{
        const productObject = array[productSelect];
        const req:IShop={
            quantity: productObject.quantity+1,
            product: item,
            id: 0
        }
        updateItem(productSelect,req)
    }
       
    }
    const ChangeText=(event:React.ChangeEvent<HTMLInputElement>)=>{
      setSearchText(event.target.value)
    }
    const ChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value); 
    };
    const filter=()=>{
        const filtered = data.filter(product => {
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            const matchesSearch = product.title.toLowerCase().includes(searchText.toLowerCase());
            setCurrentPage(1)
            return matchesCategory && matchesSearch;
        });
        const pages = Pagination(filtered)
        setProducts(pages) 

    }

    const next=()=>{
        const number = nextPage()
        const start = (number-1)*itemsPerPage
        const end = start+itemsPerPage
        setProducts(data.slice(start, end)) ;
    }
    const previous=()=>{
        const number = previousPage()
        const start = (number-1)*itemsPerPage
        const end = start+itemsPerPage
        setProducts(data.slice(start, end)) ;
    }
   

    
    useEffect(()=>{
        getCategories()
        getProducts()
    },[])
    useEffect(()=>{
        filter()
    },[searchText,selectedCategory])

    return {products,categories,Add,filter,ChangeText,ChangeCategory,next,previous}
}