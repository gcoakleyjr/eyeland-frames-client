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

const Title = styled.h1`
`;

const SubTitle = styled.span`
`;

const EmptyProducts = styled.div`
height: 30vh;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`

const URL = 'https://eyelandframezapi.herokuapp.com/api/products' || 'http://localhost:5000/api/products'

const Products = ({ category, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `${URL}?category=${category}`
            : URL
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
          Object.entries(filters).every(([key, value]) => {
            if (value === "all") return true
            else return item[key].includes(value)
          })
        )
      );
    console.log(filters)
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    }
  }, [sort]);

  return (
    <Container id='products'>
      {!category ?
        <div>
          <Title>Featured Glasses</Title>
          <SubTitle>From clear to gold glasses, these are the biggest trends that you can easily wear in your everyday life.</SubTitle>
        </div>
        :
        <></>
      }


      <Grid container spacing={2}>
        {category
          ? filteredProducts.length > 0 ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
            : (<EmptyProducts><SubTitle>No products match that description</SubTitle></EmptyProducts>)
          : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item._id} />)}
      </Grid>

    </Container>
  );
};

export default Products;
