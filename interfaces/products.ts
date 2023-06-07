export interface ITallas {
    size: string,
    stock: number
}

export interface IProductosRelacionados{
    title: string,
    price: number,
    description: string,
    image: string
}


export interface IProduct {
    _id: string;
    description: string;
    images: string[];
    inStock: number;
    price: number;
    slug: string;
    tags: string[];
    title: string;
    type: IType;
    sizes: string[];
    personalization?: string
    gender: 'football' | 'regional'
    popular: boolean;
    productosRelacionados?: IProductosRelacionados[]
    createdAt: string;
    updatedAt: string;

}


export type IType = 'shirts' | 'jacket' | 'pants' | 'hoodies' | 'hats' | 'mate' | 'yerba' | 'alfajores' | 'wine' | 'short' | 'socks' | 'wallet' | 'purse' | 'accessories' | 'bag' | 'espadrilles' | 'footwear';
