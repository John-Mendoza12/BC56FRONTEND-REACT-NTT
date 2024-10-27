import { useEffect, useState } from "react"
import { ICategory, IProduct } from "../interfaces/IProduct"
import { productsService } from "../services/productsService"

export const ProductHook=()=>{
    const [products,setProducts]=useState<IProduct[]>([])
    const [data,setData]=useState<IProduct[]>([])
    const [categories,setCategories]=useState<ICategory[]>([])
    const [count,setCount]=useState<number>(0)
    const [selectedCategory,setSelectedCategory]=useState("all")
    const [searchText,setSearchText]=useState("")

    const getProducts=async ()=>{
        try {
          const data = await productsService.getProducts()
          setProducts(data.products) 
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
    const Add=()=>{
       const more= count+1
       setCount(more)
    }
    const ChangeText=(event:React.ChangeEvent<HTMLInputElement>)=>{
      setSearchText(event.target.value)
    }
    const ChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value); // Actualiza el estado con el valor seleccionado
    };
    const filter=()=>{
        const filtered = data.filter(product => {
            const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
            const matchesSearch = product.title.toLowerCase().includes(searchText.toLowerCase());
            return matchesCategory && matchesSearch;
        });
        setProducts(filtered)

    }
    useEffect(()=>{
        getCategories()
        getProducts()
    },[])
    useEffect(()=>{
        filter()
    },[searchText,selectedCategory])

    return {products,categories,count,Add,filter,ChangeText,ChangeCategory}
}