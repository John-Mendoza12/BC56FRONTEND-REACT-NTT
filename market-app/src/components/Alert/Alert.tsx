import './Alert.css'
interface IAlert{
    message:string,
    onClose: () => void;
}
export const Alert=(props:IAlert)=>{
    return (
        <div className="alert">
          <span>{props.message}</span>
          <button className="alert-close" onClick={props.onClose}>×</button>
        </div>
      );
    
}