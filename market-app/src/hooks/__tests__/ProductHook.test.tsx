import { ICategory, IProduct, IProductList } from "../../interfaces/IProduct";
import { IShop } from "../../interfaces/ISummary";
import { productsService } from "../../services/productsService";
import { ProductHook } from "../productHook";
import { renderHook, act } from '@testing-library/react';

jest.mock('../../services/productsService', () => {
    const mockGetProducts = jest.fn();
    const mockGetCategories = jest.fn();
    return {
        __esModule: true,
        productsService: {
            getProducts: mockGetProducts,
            getCategories: mockGetCategories
        },
    };
});
jest.mock('../../context/shopListContext', () => {
    return {
        __esModule: true,
        useShopContext: jest.fn(() => ({
            addItem: mockAddItem,
            updateItem: mockUpdateItem,
            array: mockArray,
        })),
    };
     
});
const mockAddItem = jest.fn();
const mockUpdateItem = jest.fn();
const mockArray:IShop[]= [];



const mockGetProducts = productsService.getProducts as jest.Mock;
const mockGetCategories = productsService.getCategories as jest.Mock;

describe('ProductHook',  () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })
    const mockProducts:IProductList = 
        {
        limit:30,
        products:[ 
           {id:1,title:"Essence Mascara Lash Princess",description:"The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
                category:"beauty",price:9.99,thumbnail:"https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
                }
        ]
       }
    
    test('Productos cargados', async () => {
        mockGetProducts.mockResolvedValue(mockProducts);
        const { result } = renderHook(() => ProductHook());
        await act(async () => {
            await result.current.getProducts();
        });
        expect(result.current.products).toEqual(mockProducts.products);
        expect(mockGetProducts).toHaveBeenCalledTimes(2);
    })
    test('productos sin cargar', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const errorMessage = 'products not loaded';
        const error = new Error(errorMessage);
        mockGetProducts.mockRejectedValue(error);
        const { result } = renderHook(() => ProductHook());
        await act(async () => {
            await result.current.getProducts();
        });
        expect(consoleSpy).toHaveBeenCalledWith('Error al cargar productos', error);
        expect(result.current.products).toEqual([]);
        expect(mockGetProducts).toHaveBeenCalledTimes(2);
        consoleSpy.mockRestore();
    })
    const mockCategories:ICategory[]=[
            {
              "slug": "beauty",
              "name": "Beauty",
              "url": "https://dummyjson.com/products/category/beauty"
            },    
    ]
    test('categorias cargadas', async () => {
        mockGetCategories.mockResolvedValue(mockCategories);
        const { result } = renderHook(() => ProductHook());
        await act(async () => {
            await result.current.getCategories();
        });
        expect(result.current.categories).toEqual(mockCategories);
        expect(mockGetCategories).toHaveBeenCalledTimes(2);

    })
    test('categorias sin cargar', async () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        const errorMessage = 'categories not loaded';
        const error = new Error(errorMessage);
        mockGetCategories.mockRejectedValue(error);
        const { result } = renderHook(() => ProductHook());
        await act(async () => {
            await result.current.getCategories();
        });
        expect(consoleSpy).toHaveBeenCalledWith('Error al cargar categorias', error);
        expect(result.current.categories).toEqual([]);
        expect(mockGetCategories).toHaveBeenCalledTimes(2);
        consoleSpy.mockRestore();
    })
    test('busqueda cargada', () => {
        const { result } = renderHook(() => ProductHook());
        act(() => {
            result.current.ChangeText({ target: { value: 'mascara' } } as React.ChangeEvent<HTMLInputElement>);
        });
        expect(result.current.products).toEqual([]); 
        expect(result.current.searchText).toBe('mascara');
    });
    test('seleccion de categoria cargada', () => {
        const { result } = renderHook(() => ProductHook());
        act(() => {
            result.current.ChangeCategory({ target: { value: 'beauty' } } as React.ChangeEvent<HTMLSelectElement>);
        });
        expect(result.current.selectedCategory).toBe('beauty'); 
    });
    test('filtro con elementos', async () => {
        mockGetProducts.mockResolvedValue(mockProducts);
        const { result } = renderHook(() => ProductHook());
        await act(async () => {
            await result.current.getProducts();
        });
        act(() => {
            result.current.ChangeCategory({ target: { value: 'beauty' } } as React.ChangeEvent<HTMLSelectElement>);
            result.current.ChangeText({ target: { value: 'Essence' } } as React.ChangeEvent<HTMLInputElement>);
        });
        act(() => {
            result.current.filter();
        });
        expect(result.current.products).toEqual(mockProducts.products);
    })
    test('filtro vacio', async () => {
        mockGetProducts.mockResolvedValue(mockProducts);
        const { result } = renderHook(() => ProductHook());
        await act(async () => {
            await result.current.getProducts();
        });
        act(() => {
            result.current.ChangeCategory({ target: { value: 'dex' } } as React.ChangeEvent<HTMLSelectElement>);
            result.current.ChangeText({ target: { value: 'morch' } } as React.ChangeEvent<HTMLInputElement>);
        });
        act(() => {
            result.current.filter();
        });
        expect(result.current.products).toEqual([]);
    })
    test('Nuevo producto', () => {
        const { result } = renderHook(() => ProductHook());
        const newProduct:IProduct = {
            id: 1,
            title:"Essence Mascara Lash Princess",description:"The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
            category:"beauty",price:9.99,thumbnail:"https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
        };

        act(() => {
            result.current.Add(newProduct);
        });
        expect(mockAddItem).toHaveBeenCalledWith({
            quantity: 1,
            product: newProduct,
            id: 0,
        });

    })
    test('añadir producto repetido', () => {
        mockArray.push({
            quantity: 1,
            product: {
                id: 1,
                title:"Essence Mascara Lash Princess",description:"The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
                category:"beauty",price:9.99,thumbnail:"https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
            },
            id: 0,
        });
        const { result } = renderHook(() => ProductHook());
        const existing:IProduct = {
            id: 1,
            title:"Essence Mascara Lash Princess",description:"The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
            category:"beauty",price:9.99,thumbnail:"https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
        };
        act(() => {
            result.current.Add(existing);
        });
        expect(mockUpdateItem).toHaveBeenCalledWith(0, {
            quantity: 2,
            product: existing,
            id: 0,
        });
    })
    
    
    
})