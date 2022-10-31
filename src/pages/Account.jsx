import React from 'react'
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { mobile } from '../responsive';
import { userRequest } from '../requestMethods';
import { useState, useEffect } from 'react';
import Moment from 'moment'

const Container = styled.section`
    
`;

const Wrapper = styled.div`
    padding: 0 60px;
    ${mobile({ padding: "0 20px 30px 20px" })}
`

const Title = styled.h1`
  font-weight: 300;
  font-size: 4.2rem;
  color: ${(props) => props.theme.colors.black};
  ${mobile({ fontSize: "3rem" })}
`;

const SubTitle = styled.h2`
  font-weight: 100;
  font-size: 3rem;
  color: ${(props) => props.theme.colors.black};
  ${mobile({ fontSize: "2rem" })}
`;


const ItemTitle = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

const ItemDescription = styled.p`
  font-size: 15px;
  font-weight: 100;
  color: ${props => props.theme.colors.gray};
`;


const Account = () => {
    const location = useLocation()
    const id = location.pathname.split("/")[2]

    const user = useSelector(state => state.user.currentUser)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getCart = async () => {
            try {
                const res = await userRequest.get("/order/find/" + id);
                setOrders(res.data);
            } catch { }
        };
        getCart();
    }, [id]);
    console.log(orders)

    const orderHTML = orders.map(order => {
        const date = Moment(order.createdAt).format("MMM Do YYYY")
        return (
            <div key={order._id}>
                <ItemTitle>Order Placed</ItemTitle>
                <ItemDescription>{date}</ItemDescription>

                <ItemTitle>Total</ItemTitle>
                <ItemDescription>$ {order.amount / 100}</ItemDescription>

                <ItemTitle>Order Number</ItemTitle>
                <ItemDescription>{order._id}</ItemDescription>

                <ItemTitle>Status</ItemTitle>
                <ItemDescription>{order.status}</ItemDescription>

                <ItemTitle>Products</ItemTitle>
                {order.products.map(product => {
                    return (
                        <div>
                            <ItemTitle>{product.description}</ItemTitle>
                            <ItemDescription>Quantity: {product.quantity} Price: $ {product.price.unit_amount / 100}</ItemDescription>
                            <ItemDescription>Total: $ {product.amount_total / 100}</ItemDescription>
                        </div>
                    )
                })}
                <hr />

            </div>
        )
    })

    return (
        <Container>
            <Navbar />

            <Wrapper>
                <Title>Account</Title>

                <ItemTitle>Username</ItemTitle>
                <ItemDescription>{user.username}</ItemDescription>

                <ItemTitle>Email</ItemTitle>
                <ItemDescription>{user.email}</ItemDescription>

                <SubTitle>Order History</SubTitle>
                {orderHTML}

            </Wrapper>

            <Footer />
        </Container>
    )
}

export default Account