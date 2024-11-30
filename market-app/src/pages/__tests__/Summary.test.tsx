import { SummaryHook } from "../../hooks/summaryHook";
import { IProduct } from "../../interfaces/IProduct";
import { render, screen,fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { Sumary } from "../sumary/sumary";
import { IShop } from "../../interfaces/ISummary";
jest.mock('../../hooks/summaryHook.ts', () => ({
    SummaryHook: jest.fn(),
}));
const inProduct:IProduct = {
    id: 1,
    title:"Essence Mascara Lash Princess",description:"The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    category:"beauty",price:9.99,thumbnail:"https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
};
jest.mock('../../context/shopListContext', () => {
    return {
        __esModule: true,
        useShopContext: jest.fn(() => ({
            removeItem: mockRemoveItem,
            array: mockArray,
        })),
    };
});
const mockArray:IShop[]= [
    {quantity: 2,
    id: 0,
    product:inProduct
    }
];
const mockDownItem = jest.fn();
const mockUpItem = jest.fn();
const mockRemoveItem = jest.fn();
const mockSetCheckSta = jest.fn();
const mockChangeName = jest.fn();
const mockChangeLastName = jest.fn();
const mockChangePhone = jest.fn();
const mockSubmit = jest.fn();

describe('Summary Page', () => {
beforeEach(() => {
    jest.clearAllMocks();
    (SummaryHook as jest.Mock).mockReturnValue({
      send: {},
      downItem: mockDownItem,
      upItem: mockUpItem,
      Sum: jest.fn(() => 100),
      changeName: mockChangeName,
      changeLastName: mockChangeLastName,
      changePhone: mockChangePhone,
      changeReference: jest.fn(),
      changeAdress: jest.fn(),
      changeDis: jest.fn(),
      handleText: jest.fn(() => ''),
      handleNumber: jest.fn(() => ''),
      loadDis: jest.fn(() => [{ key: 'Surco', text: 'Surco' }]),
      submit: mockSubmit,
      alert: false,
      acceptChange: jest.fn(),
    })
})
afterEach(() => {
    jest.clearAllMocks();
});

it('renderiza el componente correctamente', () => {
render(<Sumary setCheckSta={jest.fn()} />);
expect(screen.getByText('Producto')).toBeInTheDocument();
expect(screen.getByText('Nombres')).toBeInTheDocument();
expect(screen.getByText('Cantidad')).toBeInTheDocument();
})




it('llamar a los boton de quitar elementos', () => {
    render(<Sumary setCheckSta={mockSetCheckSta} />);
    const decreaseButton = screen.getAllByText('-')[0];
    fireEvent.click(decreaseButton);
    expect(mockDownItem).toHaveBeenCalledTimes(1);
})
it('llamar a los boton de añadir elementos', () => {
    render(<Sumary setCheckSta={mockSetCheckSta} />);
    const increaseButton  = screen.getAllByText('+')[0];
    fireEvent.click(increaseButton );
    expect(mockUpItem).toHaveBeenCalledTimes(1);
})
it('llamar el boton eliminar', () => {
    render(<Sumary setCheckSta={mockSetCheckSta} />);
    const deleteButton = screen.getAllByText('Eliminar')[0];
    fireEvent.click(deleteButton);
    expect(mockRemoveItem).toHaveBeenCalledTimes(0);
});
it('Mensajes de error', () => {
    render(<Sumary setCheckSta={mockSetCheckSta} />);

    const nameInput = screen.getByPlaceholderText('Ingrese tus Nombres');
    const lastNameInput = screen.getByPlaceholderText('Ingrese tus Apellidos');
    const phoneInput = screen.getByPlaceholderText('Ingrese tu número de celular');
    
    fireEvent.change(nameInput, { target: { value: '3232' } });
    fireEvent.change(lastNameInput, { target: { value: '323' } });
    fireEvent.change(phoneInput, { target: { value: 'sdds' } });

    expect(mockChangeName).toHaveBeenCalled();
    expect(mockChangeLastName).toHaveBeenCalled();
    expect(mockChangePhone).toHaveBeenCalled();
  });
  it('Boton Comprar', () => {
    render(<Sumary setCheckSta={mockSetCheckSta} />);
    const submitButton = screen.getByText('Comprar');
    fireEvent.click(submitButton);
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });

})
