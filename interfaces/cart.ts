

export interface ICartProduct {
    _id: string;
    image: string;
    price: number;
    size?: string;
    slug: string;
    title: string;
    gender: 'men'|'women'|'kid'|'unisex'|'regionales'|'fashion'
    quantity: number;
}
