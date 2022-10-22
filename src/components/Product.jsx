import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from '../responsive';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect } from 'react';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from "react-redux"



const Divider = styled.hr`
  position: absolute;
  bottom: -2px;
  left: 50%;
  height: .5px;
  transform: translateX(-50%);
  width: 80%;
  opacity: .3;
`

const Info = styled.div`
  opacity: 1;
  width: 100%;
  /* position: absolute;
  top: 0;
  left: 0; */
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.5s ease;
  box-shadow: rgba(0, 0, 0, 0) 0px 3px 8px;
  cursor: pointer;
`;

const InfoTitle = styled.div`
display: flex;
justify-content: space-between;
margin: 0px 7px;
`

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  width: 80%;
`

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color === "tortoise" ? "#a45a1e" : props.color === "crystal" ? "grey" : props.color === "white" ? "#bfbfbf" : props.color};
  margin: 0px 5px;
  position: relative;
  cursor: pointer;
  z-index: 5;

  &::before {
    opacity: 0;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 25px;
    height: 25px;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: .5px solid gray;
  }
  &.active-color::before {
    opacity: 1;
  }
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ColorName = styled.span`
`;

const ColorWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: .5rem;
`

const Container = styled.div`
  height: ${(props) => props.sizeXl ? "24vw" : props.sizeMd ? '30vw' : props.sizeSm ? '44vw' : '80vw'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
  background-color: #ffffff;
  position: relative;
  border-radius: 15px;
  gap: 1.5vw;
  ${mobile({ gap: "1.3rem" })};
  transition: box-shadow 0.5s ease;

  /* &:hover ${Info}{
    opacity: 1;
  } */
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;

const Image = styled.img`
  max-width: 500px;
  width: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const mdScreen = useMediaQuery(theme.breakpoints.up('md'));
  const xlScreen = useMediaQuery(theme.breakpoints.up('xl'));

  const dispatch = useDispatch()
  const [color, setColor] = React.useState('');
  useEffect(() => {
    setColor(color ? color : item.color[0])
  }, [color, item.color])

  const handleCart = () => {
    dispatch(
      addProduct({ ...item, quantity: 1, color })
    );
  };


  return (
    <Grid sm={6} md={4} xl={3} sx={{ position: 'relative' }}>



      <Container sizeSm={smScreen} sizeMd={mdScreen} sizeXl={xlScreen}>

        <Link to={`/product/${item._id}`} style={{ display: 'flex', justifyContent: 'center' }}>
          <Image src={item.img[0]?.url} />
        </Link>
        <ColorWrapper>
          <Filter>
            {item.color?.map((c) => (
              <FilterColor color={c} key={c} onClick={() => setColor(c)} className={c === color ? "active-color" : ""} />
            ))}
          </Filter>
          <ColorName>{color}</ColorName>
        </ColorWrapper>

        <InfoWrapper>
          <Link to={`/product/${item._id}`}>
            <InfoTitle>
              <h3>{item.title}</h3>
              <h3>${item.price}</h3>
            </InfoTitle>
          </Link>

          <Info>
            <Icon onClick={handleCart}>
              <ShoppingCartOutlinedIcon />
            </Icon>
            <Icon>
              <FavoriteIcon />
            </Icon>
          </Info>
        </InfoWrapper>

      </Container>
      <Divider></Divider>
    </Grid>
  );
};

export default Product;
