
import { useShopContext } from '../../context/shopListContext';
import './navBar.css';


interface INav{
    setCheckSta:React.Dispatch<React.SetStateAction<boolean>>

}
export const NavBar=(props:INav)=>{
    const { array } = useShopContext();
    const total = array.reduce((sum, item) => sum + item.quantity, 0);
    return (
     <> 
    <nav className="navbar">
        <div className="left">
        <img src="market.png" className="logo" alt='market'/>
        <br/>
        <div className="textContainer">
        <span className="title">My Market</span>
        </div>
        
        </div>
        <div className="shop">
        <button style={{backgroundColor:'transparent'}} onClick={()=>{props.setCheckSta(true)} }>
        <img src="shopping-cart.png"  className="logo" alt='market'/>
        </button>
        <p>{total}</p>
        </div>

    </nav>
    <nav className="navbarRes">
    <img src="shopping-cart.png"  className="logo" alt='market'/>
    </nav>
    </>
        
        
      
    )
}