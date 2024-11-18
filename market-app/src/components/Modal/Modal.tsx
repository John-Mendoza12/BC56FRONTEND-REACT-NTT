
import './Modal.css'

interface IModal{
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}
export const Modal:React.FC<IModal> = ({ isOpen, onClose, children }:IModal) => {
    if (!isOpen) return null;
  
    return (
      <div className="overlay">
        <div className="content">
          <button className="close" onClick={onClose}>×</button>
          {children}
        </div>
      </div>
    );
  }; 