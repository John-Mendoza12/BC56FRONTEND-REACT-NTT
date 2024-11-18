

import { PaginationHook } from "../../hooks/paginationHook"
import { ProductHook } from "../../hooks/productHook"


import "./products.css"


export const Products=()=>{
    const {products,categories,Add,ChangeText,ChangeCategory,next,previous} = ProductHook()
    const {hasNext,hasprevious}= PaginationHook()
    
    return(
    <>
    <div className="body">
        <div className="container">
            <input type="text" id="search" placeholder="Buscar productos..." className="input-producto" onChange={ChangeText}/>
            <div className="divider"></div>
            <select id="categorySelect" className="combo" onChange={ChangeCategory}>
                <option value={"all"}> todas las categorias</option>
                {categories.map((item,index)=>(
                    <option key={index} value={item.slug}>{item.name}</option>
                ))}
                
            </select>
        </div>
        <div className="containerCard" id="containerCard">
            {products.map((item,index)=>(
                <div className="card" key={index}>
                <img src={item.thumbnail} className="img" alt="Eggs"/>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <h3>Categoría</h3>
                <div className="box">
                    <span className="category">{item.category}</span>
                </div>
                <h2>Precio: S/{item.price}</h2>
                <div className="buttonDiv">
                    <button className="button" onClick={()=>{ Add(item)}}>Agregar al carrito</button>
                </div>
            </div>
            ))}
        </div>
        <div style={{display:'flex',justifyContent:'space-between'}}>
        <button disabled={hasprevious} onClick={previous}>Anterior</button>
        <button disabled={hasNext} onClick={next}>Siguiente</button>
        </div>
    </div>
</>)

}