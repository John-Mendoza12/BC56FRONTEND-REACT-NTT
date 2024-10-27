
import './navBar.css';

interface IAPP{
    count:number;
}

export const NavBar=(props:IAPP)=>{
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
        <img src="shopping-cart.png"  className="logo" alt='market'/>
        <p>{props.count}</p>
        </div>

    </nav>
    <nav className="navbarRes">
    <img src="shopping-cart.png"  className="logo" alt='market'/>
    </nav>
    </>
        
        
      
    )
}