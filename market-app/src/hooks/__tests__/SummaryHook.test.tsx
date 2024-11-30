import { act, renderHook } from "@testing-library/react";
import { IShop } from "../../interfaces/ISummary";
import { SummaryHook } from "../summaryHook";
import { IProduct } from "../../interfaces/IProduct";

jest.mock('../../context/shopListContext', () => {
    return {
        __esModule: true,
        useShopContext: jest.fn(() => ({
            clearArray: mockCleanArray,
            updateItem: mockUpdateItem,
            array: mockArray,
        })),
    };
     
});
const mockUpdateItem = jest.fn();
const inProduct:IProduct = {
    id: 1,
    title:"Essence Mascara Lash Princess",description:"The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
    category:"beauty",price:9.99,thumbnail:"https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
};
const mockArray:IShop[]= [
    {quantity: 2,
    id: 0,
    product:inProduct
    }
];
const mockCleanArray = jest.fn();

describe('SummaryHook', () => {
    const mockSetCheckSta = jest.fn();
    beforeEach(() => {
        jest.clearAllMocks();
    })
    test('añadir elemento', () => {
        const { result } = renderHook(() =>
            SummaryHook({ setCheckSta: mockSetCheckSta })
        );

        act(() => {
            result.current.upItem(0);
        });
        expect(mockUpdateItem).toHaveBeenCalledWith(0, {
            quantity: 3,
            product: inProduct,
            id: 0,
        });
    })
    test('quitar elementos', () => {
        const { result } = renderHook(() =>
            SummaryHook({ setCheckSta: mockSetCheckSta })
        );

        act(() => {
            result.current.downItem(0);
        });

        expect(mockUpdateItem).toHaveBeenCalledWith(0, {
            quantity: 1,
            product: inProduct,
            id: 0,
        });
    })
    test('Total de productos', () => {
        const { result } = renderHook(() =>
            SummaryHook({ setCheckSta: mockSetCheckSta })
        );

        const total = result.current.Sum();

        expect(total).toBe(19.98); 
    });
    test('Registrar', () => {
        const { result } = renderHook(() =>
            SummaryHook({ setCheckSta: mockSetCheckSta })
        );

        act(() => {
            result.current.acceptChange();
        });

        expect(mockCleanArray).toHaveBeenCalled();
        expect(mockSetCheckSta).toHaveBeenCalledWith(false);
    });
    test('Insertar Nombre', () => {
        const { result } = renderHook(() =>
            SummaryHook({ setCheckSta: mockSetCheckSta })
        );
        act(() => {
            result.current.changeName({
                target: { value: 'John' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        expect(result.current.send.name).toBe('John');
    });

    test('Insertar Apellido', () => {
        const { result } = renderHook(() =>
            SummaryHook({ setCheckSta: mockSetCheckSta })
        );
        act(() => {
            result.current.changeLastName({
                target: { value: 'Mendoza' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        expect(result.current.send.apellido).toBe('Mendoza');
    });
    test('Insertar Dirrecion', () => {
        const { result } = renderHook(() =>
            SummaryHook({ setCheckSta: mockSetCheckSta })
        );
        act(() => {
            result.current.changeAdress({
                target: { value: 'Manzana' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        expect(result.current.send.dirrecion).toBe('Manzana');
    });
    test('Insertar Telefono', () => {
        const { result } = renderHook(() =>
            SummaryHook({ setCheckSta: mockSetCheckSta })
        );
        act(() => {
            result.current.changePhone({
                target: { value: '123456789' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        expect(result.current.send.celular).toBe('123456789');
    });
    test('Insertar Telefono', () => {
        const { result } = renderHook(() =>
            SummaryHook({ setCheckSta: mockSetCheckSta })
        );
        act(() => {
            result.current.changePhone({
                target: { value: '123456789' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        expect(result.current.send.celular).toBe('123456789');
    });
    test('Insertar Distrito', () => {
        const { result } = renderHook(() =>
            SummaryHook({ setCheckSta: mockSetCheckSta })
        );
        const mockEvent = {
            target: { value: 'Surco' },
        } as React.ChangeEvent<HTMLSelectElement>;
        act(() => {
            result.current.changeDis(mockEvent);
        });
        expect(result.current.send.distrito).toBe('Surco');
    });
    test('Verificar Texto', () => {
        const { result } = renderHook(() =>
            SummaryHook({ setCheckSta: mockSetCheckSta })
        );
        const empty = result.current.handleText('');
        const invalid = result.current.handleText('123456789');
        expect(empty).toBe('campor requerido');
        expect(invalid).toBe('debe ser un texto');
    });
    test('Verificar Número', () => {
        const { result } = renderHook(() =>
            SummaryHook({ setCheckSta: mockSetCheckSta })
        );

        const empty = result.current.handleNumber('');
        const invalid = result.current.handleNumber('John');
        expect(empty).toBe('campor requerido');
        expect(invalid).toBe('debe ser un numero');
    });
    test('Registrar Campos', () => {
        const { result } = renderHook(() =>
            SummaryHook({ setCheckSta: mockSetCheckSta })
        );
        const mockEvent = {
            target: { value: 'Surco' },
        } as React.ChangeEvent<HTMLSelectElement>;

        act(() => {
            result.current.changePhone({
                target: { value: '123456789' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        act(() => {
            result.current.changeDis(mockEvent);
        });
        act(() => {
            result.current.changeName({
                target: { value: 'John' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        act(() => {
            result.current.changeLastName({
                target: { value: 'Mendoza' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        act(() => {
            result.current.changeReference({
                target: { value: 'Parque' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        act(() => {
            result.current.changeAdress({
                target: { value: 'Manzana' },
            } as React.ChangeEvent<HTMLInputElement>);
        });
        act(() => {
            result.current.submit();
        });
        expect(result.current.send).toEqual({
            name: 'John',
            apellido: 'Mendoza',
            distrito: 'Surco',
            dirrecion: 'Manzana',
            referencia: 'Parque',
            celular: '123456789',
        });
    

        expect(result.current.alert).toBe(true);
    });

   
  
})