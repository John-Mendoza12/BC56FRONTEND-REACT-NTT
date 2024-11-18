import { UseLogin } from "./useLogin"
import "./login.css"
import { Modal } from "../../components/Modal/Modal"
import { Alert } from "../../components/Alert/Alert"

export const Login=()=>{
 const {changeUsername,changePassword,signIn,message,changeEmail,open,setOpen,sendEmail,emailMessage,showAlert,setShowalert} = UseLogin()
 return (
    <div className="backGround">
     
    <div className="cardForm">
        <h2>Inicie Sesión</h2>
       
           <div className="form-group">
                <input type="text" placeholder="Usuario" onChange={changeUsername}></input> 
            </div>
            <div className="form-group">
                <input type="text" placeholder="Contraseña" onChange={changePassword}></input>
            </div>
            <button className="forgot-password-link" onClick={()=>{setOpen(true)}}>¿Olvido su Contraseña?</button>
            {message==""?(<></>): <p>{message}</p> }
        
        <button className="but-form" onClick={signIn}>Iniciar Sesión</button>
    </div>
    <Modal isOpen={open} onClose={()=>{setOpen(false)} }>
        <div style={{ display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
        <h2>Resetea tu contraseña</h2>
        <p>Ingresa tu correo electronico</p>
        <div className="form-group">
            <input type="text" placeholder="Correo" onChange={changeEmail}></input> 
        </div>
        <button className="but-form" onClick={sendEmail}>Enviar</button>
        {emailMessage &&(<p style={{color:'red'}}>{emailMessage}</p>)}
        </div>
    </Modal>
    {showAlert && (
            <Alert message={"Se envió la información al correo ingresado"} onClose={()=>{setShowalert(false)}} ></Alert>
    )}
    






    </div>
 )
}