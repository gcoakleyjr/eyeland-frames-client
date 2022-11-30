import React from 'react'
import "./styles/MiniCart.scss"
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useSelector } from "react-redux";
import { removeProduct, emptyCart } from '../redux/cartRedux';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';

const MiniCart = () => {

    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();

    const totalPrice = () => {
        let total = 0;
        products.forEach((item) => {
            total += item.quantity * item.price;
        });
        return total.toFixed(2);
    };

    return (
        <div className="cart">
            <h1>Products in your cart</h1>
            {products.length > 0 ?
                (<>
                    {products?.map((item, i) => (
                        <div className="item" key={item.id}>
                            <Link to={`/product/${item._id}`} style={{ width: '100%' }}>
                                <img src={item.img[0]?.url} alt="" />
                            </Link>

                            <div className="details">
                                <h1>{item.title}</h1>
                                <p>{item.desc?.substring(0, 50)} ...</p>
                                <div className="price">
                                    {item.quantity} x ${item.price}
                                </div>
                            </div>
                            <DeleteOutlinedIcon
                                className="delete"
                                onClick={() => dispatch(removeProduct({ ...item, index: i }))}
                            />
                        </div>
                    ))}
                    <div className="total">
                        <span>SUBTOTAL</span>
                        <span>${totalPrice()}</span>
                    </div>
                    <Link to='/cart'>
                        <button>PROCEED TO CHECKOUT</button>
                    </Link>

                    <span className="reset" onClick={() => dispatch(emptyCart())}>
                        Reset Cart
                    </span>
                </>)
                :
                <p>Your cart is empty</p>
            }

        </div>
    )
}

export default MiniCart