import { NavBar } from "../NavBar/navBar";
import { render,screen,fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom'
describe('NavBar Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();})
    const mockSetCheckSta = jest.fn();
    it('renderiza el componente correctamente', () => {
    render(<NavBar setCheckSta={mockSetCheckSta} />);
    expect(screen.getByText(/My Market/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    })
    it('Boton de comprar', () => {
        render(<NavBar setCheckSta={mockSetCheckSta} />);
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(mockSetCheckSta).toHaveBeenCalledTimes(1);
        expect(mockSetCheckSta).toHaveBeenCalledWith(true);
    })




})
