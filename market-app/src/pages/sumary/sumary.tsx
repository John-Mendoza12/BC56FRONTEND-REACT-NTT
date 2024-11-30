import { useShopContext } from "../../context/shopListContext";
import { SummaryHook } from "../../hooks/summaryHook";
import "./sumary.css"
interface INav{
    setCheckSta:React.Dispatch<React.SetStateAction<boolean>>

}
export const Sumary=(props:INav)=>{
    const { array,removeItem } = useShopContext();
    const {send,changeName,changeLastName,changePhone,changeReference,changeAdress,changeDis,handleText,handleNumber,loadDis,submit,alert,acceptChange,upItem,downItem,Sum} = SummaryHook(props); 
    return(
        <>
        
        <div className="conatinerTable">
        <table className="table">
        <thead>
        <tr>
        <th className="header">Producto</th>
        <th className="header">Nombre</th>
        <th className="header">Cantidad</th>
        <th className="header">Eliminar</th>
        </tr>
        </thead>
        <tbody>
            {array.map((item,index)=>(
                <tr key={index}>
                    <td className="Cell">
                        <img src={item.product.thumbnail} className="image"/>
                    </td>
                    <td className="Cell">{item.product.title}</td>
                    <td className="Cell">
                        <div className="updown">
                            <button className="count" onClick={()=>{downItem(index)}} >-</button>
                            <span className="span">{item.quantity}</span>
                            <button className="count" onClick={()=>{upItem(index)}}>+</button>
                        </div>
                    </td>
                    <td className="Cell">
                        <button className="delete" onClick={()=>{removeItem(index)}}>Eliminar</button>
                    </td>

                </tr>
            ))}

        </tbody>
        </table>
        </div>
        <div className="footer-table">
            <span> Total: {Sum()}</span>
        </div>
        
        <br/>
        <div className="center">
         <div className="cardForm">
         <h2>Información de Envio</h2>
            <form>
           
            <div className="form-group">
                <label>Nombres</label>
                <input type="text" placeholder="Ingrese tus Nombres" onChange={changeName}></input>
                <p style={{color:'red'}}>{handleText(send.name)}</p>
            </div>
            <div className="form-group">
            <label>Apellidos</label>
            <input type="text"  placeholder="Ingrese tus Apellidos" onChange={changeLastName}></input>
            <p style={{color:'red'}}>{handleText(send.apellido)}</p>
            </div>
            <div className="form-group">
                <label>Distrito</label>
                <select onChange={changeDis}>
                    <option value={""}>Selleccione Distrito</option>
                    {loadDis().map((item,index)=>(
                         <option key={index} value={item.key}>{item.text}</option>
                    ))}

                </select>
                <p style={{color:'red'}}>{handleText(send.distrito)}</p>
            </div>
            <div className="form-group">
            <label>Dirreción</label>
            <input type="text"  placeholder="Ingrese tu Dirreción" onChange={changeAdress}></input>
            <p style={{color:'red'}}>{handleText(send.dirrecion)}</p>
            </div>
            <div className="form-group">
            <label>Referencia</label>
            <input type="text"   placeholder="Referencia de tu Dirreción" onChange={changeReference}></input>
            <p style={{color:'red'}}>{handleText(send.referencia)}</p>
            </div>
            <div className="form-group">
            <label>Celular</label>
            <input type="text" placeholder="Ingrese tu número de celular" onChange={changePhone}></input>
            <p style={{color:'red'}}>{handleNumber(send.celular)}</p>
            </div>
            </form>
            <button type="submit" className="but-form" onClick={submit}>Comprar</button>
        </div>
        </div>
        {alert ?(<>
        <div className="center">
        <div className="cardForm">
            <h2>Registro exitoso</h2>
            <button className="but-form" onClick={acceptChange}>Aceptar</button>
        </div>
        </div>
        </>):(<></>)}
    
        </>
    )
}