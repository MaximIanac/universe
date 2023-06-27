export interface ProductsResponseInterface<Product> {
    limit: number,
    products: Product[],
    skip: number,
    total: number
}

export interface Product {
    id: number,
    title: string,
    description: string,
    price: number,
    rating: number,
    brand: string,
    category: string,
    thumbnail: string,
    images: string[],
    discountPercentage: number,
    quantity: number
}

export interface CertainProductInterface {
    category: string
}

export interface AddingProductInterface {
    title: string,
    brand: string,
    price: number,
    discountPercentage: number,
    category: string,
    thumbnail: string,
    description: string,
}

export interface UpdateProductInterface {
    id: number | undefined,
    title: string | undefined,
    brand: string | undefined,
    price: number | undefined,
    discountPercentage: number | undefined,
    category: string | undefined,
    thumbnail: string | undefined,
    description: string | undefined,
}
