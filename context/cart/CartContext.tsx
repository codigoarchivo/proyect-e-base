import { createContext } from 'react';

import { ICartProduct } from '../../interfaces';

interface ContextProps {
    cart: ICartProduct[];

    // method
}

export const CartContext = createContext({} as ContextProps);