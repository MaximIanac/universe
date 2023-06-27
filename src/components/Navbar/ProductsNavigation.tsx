import { NavLink } from "react-router-dom";
import { ProductArray, ProductArrayDropdown } from "../../arrays/ProductArrays";
import { Dropdown } from 'flowbite-react';
import { useState } from "react";

let i = 0;

const ProductsNavigation = () => {

    const [isMenuOpen, setOpeningMenu] = useState<boolean>(false);

    const handleToggleMenu = () => {
        setOpeningMenu(!isMenuOpen);
    };

    return (
        <div className="mt-8 w-full md:w-60">

            <button onClick={handleToggleMenu} type="button" className="inline-flex items-center p-4 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
            </button>

            <div className={`${isMenuOpen ? '' : 'hidden'
                } md:block lg:w-60 font-semibold md:w-30 px-4 pb-4 transition-all duration-500`}>

                {ProductArray.map(item => (
                    <div key={i++} className="border-b-2 pb-2 border-gray-200 w-full cursor-pointer text-xl md:mb-4 font-medium md:hover:scale-110 md:hover:text-blue-500 duration-200">
                        <NavLink to={item.path} className="aria-[current=page]:text-blue-500">
                            {item.name}
                        </NavLink>
                    </div>
                ))}

                <div className="cursor-pointer text-xl font-medium md:hover:text-blue-500 duration-200 text-center">
                    <Dropdown
                        inline
                        label="Other"
                    >
                        <Dropdown.Header>
                            <span>
                                Other Products
                            </span>
                        </Dropdown.Header>
                        {ProductArrayDropdown.map(item => (
                            <Dropdown.Item>
                                <NavLink to={item.path}>
                                    {item.name}
                                </NavLink>
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default ProductsNavigation;