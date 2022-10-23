import { IUser, ISize } from "./";

export interface IOrder {

    _id?: string;
    user?: IUser | string;
    orderItems: IOrdersItem[];
    shippingAddress: ShippingAddress;
    paymentResult?: string;

    numberOfItems: number;
    subTotal: number;
    tax: number;
    total: number;

    isPaid: boolean;
    paidAt?: string;

    transactionId?: string;


    createdAt?: string;
    updatedAt?: string;
}

export interface IOrdersItem {

    _id: string;
    title: string;
    size: ISize;
    quantity: number;
    slug: string;
    image: string;
    price: string;
    gender: string;

}

export interface ShippingAddress {
    firstName: string,
    lastName: string,
    address: string,
    address2?: string,
    zip: string,
    city: string,
    country: string,
    phone: string,
}