import universeImage from '../../assets/img/universe.png';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Product } from '../../services/cartService/cart-response.interface';
import LogOut from '../LogOut/LogOut';
import { useCartContext } from '../../services/contexts/CartContext';

type Props = {
    onSearch: (query: any) => void,
    setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>
}

const Navbar = ({ onSearch, setProducts }: Props) => {

    const [search, setSearch] = useState<string>("");
    const [isMenuOpen, setOpeningMenu] = useState<boolean>(false);
    const [modalActive, setModalActive] = useState<boolean>(false);
    const userID = localStorage.getItem("id");
    const { cart } = useCartContext();

    const handleToggleMenu = () => {
        setOpeningMenu(!isMenuOpen);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && search) {
            onSearch(search);
        }
    };

    const handleSearchEmpty = () => {
        setSearch("");
        onSearch("");
        setProducts(undefined);
    };

    return (
        <nav className="bg-black border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <div className='flex items-center'>
                    <img src={universeImage} className="h-16 mr-3" alt="Universe Logo" />
                    <span className="self-center text-4xl font-semibold whitespace-nowrap text-white">
                        <NavLink to={`/${userID}`}>Universe</NavLink>
                    </span>
                </div>

                <div className="flex md:order-2">
                    <button onClick={handleToggleMenu} type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                    </button>

                    <button onClick={handleToggleMenu} className="md:hidden text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 mr-1" >
                        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        <span className="sr-only">Search</span>
                    </button>

                    <div className="relative hidden md:block ">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                            <span className="sr-only">Search icon</span>
                        </div>
                        <div onClick={handleSearchEmpty} className="cursor-pointer absolute inset-y-0 flex items-center right-0 pl-3 p-4 md:space-x-8">
                            <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <input
                            value={search}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text" id="search-navbar"
                            className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-1 focus:outline-blue-600"
                            placeholder="Search..."
                        />
                    </div>
                </div>

                <div className={`${isMenuOpen ? 'block' : 'hidden'
                    } items-center justify-between w-full md:flex md:w-auto md:order-1`}
                >
                    <div className="relative mt-3 md:hidden">
                        <div className="absolute inset-y-0 flex items-center ml-7 pl-3 p-4 md:space-x-8 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                        </div>
                        <input type="text" id="search-navbar" className="block mt-4 ml-7 max-w-20 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" placeholder="Search..." />
                    </div>
                    <ul className='flex flex-col items-start md:items-center font-medium p-4 md:p-0 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0'>
                        <li className='block py-2 pl-3 pr-4 text-white text-lg md:hover:text-blue-500 duration-200 md:p-0'>
                            <NavLink
                                className="aria-[current=page]:text-blue-500"
                                to={`/${userID}`}
                            >Homepage</NavLink>
                        </li>
                        <li className='block py-2 pl-3 pr-4 text-white text-lg  md:hover:text-blue-500 duration-200 md:p-0'>
                            <NavLink
                                className="aria-[current=page]:text-blue-500"
                                to="/products"
                            >Products</NavLink>
                        </li>
                        <li className='relative py-2 pl-3 pr-4 text-white text-lg md:hover:text-blue-500 duration-200 md:p-0'>
                            {cart && cart.length > 0 && <span className={`absolute text-white text-center right-[7px] top-[13px] md:top-1 md:right-[-8px] transform -translate-y-1/2 w-2 h-2 bg-blue-700 rounded-full`}>
                            </span>}
                            <NavLink
                                className="aria-[current=page]:text-blue-500"
                                to="/cart"
                            >Cart</NavLink>
                        </li>
                        <li className='flex justify-between items-center cursor-pointer py-2 pl-3 pr-4 text-white text-lg md:hover:text-blue-500 duration-200 md:p-0'>
                            <svg className='mr-1 w-6 h-6' fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                            </svg>
                            <div onClick={() => setModalActive(true)}>
                                Log Out
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <LogOut
                modalActive={modalActive}
                setModalActive={setModalActive}
            />
        </nav>
    )
}

export default Navbar;