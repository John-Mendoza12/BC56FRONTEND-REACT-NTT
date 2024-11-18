import { useState } from "react"
import { IAuthBody, initialAuth} from "../../interfaces/IAuth"
import { authService } from "../../services/authService"
import { TokenHook } from "../../hooks/TokenHook";
import { useNavigate } from "react-router-dom";

export const UseLogin=()=>{
    const {setToken} = TokenHook()
    const navigate = useNavigate();
    const [open,setOpen]=useState<boolean>(false)
    const [data,setData]=useState<IAuthBody>(initialAuth)
    const [message,setMessage]=useState<string>("")
    const [email,setEmail]=useState<string>("")
    const [emailMessage,setEmailMesage]=useState<string>("")
    const [showAlert, setShowalert] = useState(false);
    const changeUsername=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setData({...data,username:event.target.value})
    }
    const changePassword=(event:React.ChangeEvent<HTMLInputElement>)=>{
        setData({...data,password:event.target.value})
    }
    const changeEmail=(event:React.ChangeEvent<HTMLInputElement>)=>{
      setEmail(event.target.value)
  }
    const signIn=()=>{
      setMessage("")
      authService.auth(data).then(async (res)=>{
        if(res.status==200){
          const body = await res.json() 
          setToken(body.accessToken)      
          navigate('/dashboard');    
        }else{
          const body = await res.json() 
          setMessage(body.message)
        }
      }).catch(()=>{
         setMessage("Error Inesperado")
      })
    }
    const checkEmail = (): boolean => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    };
    const sendEmail=()=>{
      if(email==""){
        setEmailMesage("Requerido")
        return;
      }
      if(!checkEmail()){
        setEmailMesage("Formato Incorrecto")
        return;
      }
      setShowalert(true)
      setEmailMesage("")
      setTimeout(() => {
        setShowalert(false);
        setOpen(false)
        setEmail("")
      }, 3000);

      //setOpen(false)


    }
    return {changeUsername,changePassword,signIn,message,changeEmail,open,setOpen,sendEmail,emailMessage,setShowalert,showAlert}
}