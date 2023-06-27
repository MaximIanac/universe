import { Route, Routes, useNavigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import SignInAPI from './components/SignIn/SignInAPI';
import ProductsNavigation from './components/Navbar/ProductsNavigation';
import CategoryAPI from './components/Homepage/ProductCart/Category/CategoryAPI';
import { RoueteProductArray } from './arrays/ProductArrays';
import NavbarSearchAPI from './components/Navbar/NavbarSearchAPI';
import SingleProductAPI from './components/Homepage/ProductCart/SingleProduct/SingleProductAPI';
import UserInfoAPI from './components/Homepage/UserPage/UserInfo/UserInfoAPI';
import { Product } from './services/cartService/cart-response.interface';
import { CartContext } from './services/contexts/CartContext';
import ShoppingCart from './components/Homepage/ProductCart/ShoppingCart/ShoppingCart';
import SearchResult from './components/Homepage/ProductCart/SearchResult/SearchResult';

const Dashboard = () => {
  return (
    <div>
      <NavbarSearchAPI />
      <Outlet />
    </div>
  )
}

const ProductsBoard = () => {
  return (
    <div className="max-w-screen-xl px-4 mx-auto my-0 ">
      <div className='flex-wrap md:flex-nowrap md:flex gap-5'>
        <ProductsNavigation />
        <Outlet />
      </div>
    </div>

  )
}

const App = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");
  const [cart, setCart] = useState<Product[] | undefined>();

  useEffect(() => {
    !token && navigate("/sign-in");
  }, [token, navigate]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path=":id" element={<UserInfoAPI />} />
          <Route path="/cart" element={<ShoppingCart />} />

          <Route path="products" element={<ProductsBoard />}>
            <Route path="" element={<CategoryAPI path={`/products`} categoryProps={undefined} />} />
            <Route path="result" element={<SearchResult />} />
            {RoueteProductArray.map(item => (
              <>
                <Route path={item.path} element={<CategoryAPI path={`/products/${item.path}`} categoryProps={item.categoryProps} />} />
                <Route path={`/products/:id`} element={<SingleProductAPI />} />
              </>
            ))}
          </Route>

        </Route>
        <Route path="/sign-in" element={<SignInAPI />} />
      </Routes>
    </CartContext.Provider>

  );
}

export default App;
