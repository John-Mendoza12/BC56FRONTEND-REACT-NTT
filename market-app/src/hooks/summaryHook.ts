import { useState } from "react"
import { IDistrict, initial, ISend, IShop } from "../interfaces/ISummary"
import { useShopContext } from "../context/shopListContext"
interface INav{
    setCheckSta:React.Dispatch<React.SetStateAction<boolean>>

}
export const SummaryHook=(props:INav)=>{
const [send,setSend]=useState<ISend>(initial)
const [alert,setALert]=useState<boolean>(false)
const {clearArray,array,updateItem}= useShopContext();
const changeName=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setSend({...send,name:event.target.value})
}
const changeLastName=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setSend({...send,apellido:event.target.value})
}
const changeAdress=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setSend({...send,dirrecion:event.target.value})
}
const changeReference=(event:React.ChangeEvent<HTMLInputElement>)=>{
    setSend({...send,referencia:event.target.value})
}
const changePhone =(event:React.ChangeEvent<HTMLInputElement>)=>{
    setSend({...send,celular:event.target.value})
}
const changeDis=(event: React.ChangeEvent<HTMLSelectElement>)=>{
    setSend({...send,distrito:event.target.value})
}
const handleText=(value:string)=>{
    if(value.length==0){
        return "campor requerido"
    }
    if (!/^[a-zA-Z\s]*$/.test(value)) {
        return "debe ser un texto"
    }
    return ""
}
const handleNumber=(value:string)=>{
    if(value.length==0){
        return "campor requerido"
    }
    if (!/^\d*$/.test(value)) {
        return "debe ser un numero"
    }
    return ""
}
const loadDis=()=>{
    const districts:IDistrict[]=[
        {
         key:"Surco",
         text:"Surco"
        },{
         key:"Chorrillos",
         text:"Chorrillos"
        }
    ]
    return districts
        
}
const submit=()=>{
    if (!send.name || !send.apellido || !send.distrito || !send.dirrecion||!send.celular||!send.referencia) {
        return 
    }
    else{
        console.log(send)
        setALert(true)
    }
}
const acceptChange=()=>{
    clearArray()
    props.setCheckSta(false)
}
const upItem=(index:number)=>{
    const itemSel= array[index]
    const req:IShop={
        quantity: itemSel.quantity+1,
        product: itemSel.product,
        id: 0
    }
    updateItem(index,req)
}
const downItem=(index:number)=>{
    const itemSel= array[index]
    if(itemSel.quantity-1>=0){
        const req:IShop={
            quantity: itemSel.quantity-1,
            product: itemSel.product,
            id: 0
        }
        updateItem(index,req)
    }

}
const Sum=()=>{
   const total= array.reduce((acc,item)=>acc+item.quantity*item.product.price,0)
   return total
}
return {send,changeName,changeLastName,changePhone,changeReference,changeAdress,changeDis,handleText,handleNumber,loadDis,submit,alert,acceptChange,upItem,downItem,Sum}



}