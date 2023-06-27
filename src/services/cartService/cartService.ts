import http from "../http";
import { AddingProductInterface, CertainProductInterface, Product, ProductsResponseInterface, UpdateProductInterface} from "./cart-response.interface";

export const getProducts = async (): Promise<Product[]> => {
    const response = await http.get<ProductsResponseInterface<Product>>("products?limit=30")
    return response.data.products;
}

export const getProductsByCategory = async (data: CertainProductInterface): Promise<Product[]> => {
    const response = await http.get<ProductsResponseInterface<Product>>(`products/category/${data.category}`)
    return response.data.products;
}

export const searchProducts = async (data: string): Promise<Product[]> => {
    const response = await http.get<ProductsResponseInterface<Product>>(`products/search/?q=${data}&limit=15`)
    return response.data.products;
}

export const getProductByID = async (id: number): Promise<Product> => {
    const response = await http.get<Product>(`products/${id}`)
    return response.data;
}

export const addProduct = async (product: AddingProductInterface) => {
    const response = await http.post<AddingProductInterface>('products/add', product);
    console.log(response);
    return response;
}

export const updateProduct = async (data: UpdateProductInterface) => {
    const response = await http.put<UpdateProductInterface>(`products/${data.id}`, {data});
    return response;
}

export const deleteProduct = async (id: number) => {
    const response = await http.delete<UpdateProductInterface>(`products/${id}`);
    return response.data;
}

