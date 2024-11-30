import { render,screen } from "@testing-library/react";
import { Footer } from "../Footer/footer";
import '@testing-library/jest-dom'

describe('Footer Component', () => {
    render(<Footer />);

    it('renderiza el componente correctamente', () => {
        expect(screen.getByText(/Siguenos en nuestra redes sociales/i)).toBeInTheDocument();
        const twitterLink = screen.getByRole('link', { name: /Twitter/i });
        const instagramLink = screen.getByRole('link', { name: /Instagram/i });
        const tiktokLink = screen.getByRole('link', { name: /TikTok/i });
        expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
        expect(instagramLink).toHaveAttribute('href', 'https://instagram.com');
        expect(tiktokLink).toHaveAttribute('href', 'https://tiktok.com');
        const twitterIcon = screen.getByAltText('Twitter');
        const instagramIcon = screen.getByAltText('Instagram');
        const tiktokIcon = screen.getByAltText('TikTok');
       expect(twitterIcon).toBeInTheDocument();
       expect(instagramIcon).toBeInTheDocument();
       expect(tiktokIcon).toBeInTheDocument();
       expect(screen.getByText(/@2024 My Market. Todos los derechos reservados/i)).toBeInTheDocument();
       expect(screen.getByText(/Política de privacidad/i)).toBeInTheDocument();
       expect(screen.getByText(/Términos de uso/i)).toBeInTheDocument();
       expect(screen.getByText(/Contacto/i)).toBeInTheDocument();
    })

})
