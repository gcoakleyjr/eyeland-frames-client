import { useEffect, useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import Product from "./Product";
import axios from "axios"
import Grid from '@mui/material/Unstable_Grid2';

const Container = styled.section`
    padding: 0 60px 30px 60px;
    display: flex;
    flex-direction: column;
    gap: 60px;
    ${mobile({ padding: "0 20px 30px 20px" })}
`;

// const ProductsWrapper = styled.div`
//     display: flex;
//     flex-wrap: wrap;
//     justify-content: center;
// `;

const Title = styled.h1`
`;

const SubTitle = styled.span`
`;

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:5000/api/products?category=${category}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) { }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container id='products'>
      <div>
        <Title>Featured Glasses</Title>
        <SubTitle>From clear to gold glasses, these are the biggest trends that you can easily wear in your everyday life.</SubTitle>
      </div>

      <Grid container spacing={2}>
        {category
          ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
          : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
      </Grid>

    </Container>
  );
};

export default Products;
