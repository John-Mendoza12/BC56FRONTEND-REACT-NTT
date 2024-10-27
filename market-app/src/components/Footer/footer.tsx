
import "./footer.css"
export const Footer=()=>{
    return(
        <footer className="footer">
            <p>Siguenos en nuestra redes sociales</p>
            <div className="social">
            <a href="https://twitter.com" target="_blank">
             <img src="twitter.png" alt="Twitter" className="icon"/>
             </a>
             <a href="https://instagram.com" target="_blank">
                    <img src="instagram.png" alt="Instagram" className="icon"/>
                </a>
                <a href="https://tiktok.com" target="_blank">
                    <img src="tiktok.png" alt="TikTok" className="icon"/>
                </a>

            </div>
            <p >@2024 My Market. Todos los derechos reservados</p>
            <div className="linksGroup">
                <a className="links" href="#">Política de privacidad</a> | <a  className="links" href="#">Términos de uso</a> | <a  className="links" href="#">Contacto</a>
            </div>

        </footer>
        )
}