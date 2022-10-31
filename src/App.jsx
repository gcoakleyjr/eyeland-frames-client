import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";


import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Account from "./pages/Account";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector(state => state.user.currentUser)
  return (
    <Routes>
      <Route path='/' exact element={<Home />} />
      <Route path='/product/:id' element={<Product />} />
      <Route path='/products/:category' element={<ProductList />} />
      <Route path='/register' element={user ? <Navigate to="/" /> : <Register />} />
      <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/account/:id' element={<Account />} />
    </Routes>
  );
};

export default App;