import { ProductHook } from "../../hooks/productHook";
import { Products } from "../products/products";
import { render, screen,fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { IProduct } from "../../interfaces/IProduct";


jest.mock('../../hooks/productHook', () => ({
    ProductHook: jest.fn(),
})); 


describe('Products Page', () => {
  
  beforeEach(() => {
    (ProductHook as jest.Mock).mockReturnValue({
        products: [
            {id: 1,
            title:"Essence Mascara Lash Princess",description:"The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
            category:"beauty",price:9.99,thumbnail:"https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"}
        ],
        categories: [
            {
                slug: "beauty",
                name: "Beauty",
                url: "https://dummyjson.com/products/category/beauty"
            }
        ],
        Add: jest.fn(),
        ChangeText: jest.fn(),
        ChangeCategory: jest.fn(),
      });
  
  });
  
    

    it('llamar a campo escribir', () => {
    const { ChangeText } = ProductHook();

    render(<Products />);
    const searchInput = screen.getByPlaceholderText('Buscar productos...');
    fireEvent.change(searchInput, { target: { value: 'Essence' } });
    expect(ChangeText).toHaveBeenCalledTimes(1);
    expect(ChangeText).toHaveBeenCalledWith(expect.any(Object)); 

    })
    it('llamar a campo categoria', () => {
        const { ChangeCategory } = ProductHook();
        render(<Products />);
        const categorySelect = screen.getByText('todas las categorias').closest('select');
        fireEvent.change(categorySelect!, { target: { value: 'beauty' } });
        expect(ChangeCategory).toHaveBeenCalledTimes(1);
        expect(ChangeCategory).toHaveBeenCalledWith(expect.any(Object));
    });
    test('renderiza el componente correctamente', () => {
        render(<Products />);
        expect(screen.getByPlaceholderText('Buscar productos...')).toBeInTheDocument();
        expect(screen.getByText('todas las categorias')).toBeInTheDocument();
        expect(screen.getByText('Essence Mascara Lash Princess')).toBeInTheDocument();
      });
      it('Agregar al carrito', () => {
        const { Add } = ProductHook();
        render(<Products />);
        const addButton = screen.getAllByText('Agregar al carrito')[0];
        fireEvent.click(addButton);
        expect(Add).toHaveBeenCalledTimes(1);
        const newProduct:IProduct = {
            id: 1,
            title:"Essence Mascara Lash Princess",description:"The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
            category:"beauty",price:9.99,thumbnail:"https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
        };
        expect(Add).toHaveBeenCalledWith(newProduct)


      })


})