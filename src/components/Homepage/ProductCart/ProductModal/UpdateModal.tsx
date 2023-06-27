import ModalUser from "../../../../Extra/Modal/Modal";
import { UpdateProductInterface } from "../../../../services/cartService/cart-response.interface";

type Props = {
    modalActive: boolean,
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>,
    onUpdateProduct: (formData: UpdateProductInterface | undefined, e: React.FormEvent<HTMLFormElement>) => void,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
    formData: UpdateProductInterface
}

const UpdateModal = ({modalActive, setModalActive, onUpdateProduct, handleInputChange, formData}: Props) => {
    return (
        <ModalUser active={modalActive} setModalActive={setModalActive}>
            <form onSubmit={(e) => onUpdateProduct(formData, e)}>
                <div className="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                        <input value={formData.title} onChange={handleInputChange} type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Title" required />
                    </div>
                    <div>
                        <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900">Brand</label>
                        <input value={formData.brand} onChange={handleInputChange} type="text" name="brand" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Brand" required />
                    </div>
                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                        <input value={formData.price} onChange={handleInputChange} type="number" name="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Price $" required />
                    </div>
                    <div>
                        <label htmlFor="discountPercentage" className="block mb-2 text-sm font-medium text-gray-900">Discount Percentage</label>
                        <input value={formData.discountPercentage} onChange={handleInputChange} type="number" name="discountPercentage" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Discount %" required />
                    </div>
                </div>

                <div className="mb-6">
                    <div>
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                        <input value={formData.category} onChange={handleInputChange} type="text" name="category" className="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Category" />
                    </div>
                    <div>
                        <label htmlFor="thumbnail" className="block mb-2 text-sm font-medium text-gray-900">Thumbnail</label>
                        <input value={formData.thumbnail} onChange={handleInputChange} type="text" name="thumbnail" className="bg-gray-50 border mb-6 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Image Link" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                        <textarea value={formData.description} onChange={handleInputChange} name="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-24"></textarea>
                    </div>
                </div>

                <input type="submit" onClick={() => setModalActive(false)} className="text-white bg-orange-700 opacity-50 hover:opacity-80 duration-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" value="Update" />
            </form>
        </ModalUser>
    )
}

export default UpdateModal;