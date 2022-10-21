import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";
import styled from "styled-components";
import { mobile } from '../responsive';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';




const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  height: ${(props) => props.sizeXl ? "25vw" : props.sizeMd ? '30vw' : props.sizeSm ? '45vw' : '85vw'};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: #ffffff;
  position: relative;
  border-radius: 15px;
  border: 1px solid gray;

  &:hover ${Info}{
    opacity: 1;
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
  margin: 10px;
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
  console.log(smScreen)

  return (
    <Grid sm={6} md={4} xl={3}>
      <Container sizeSm={smScreen} sizeMd={mdScreen} sizeXl={xlScreen}>


        <Image src={item.img[0]?.url} />

        <Info>

          <Icon>
            <ShoppingCartOutlinedIcon />
          </Icon>
          <Link to={`/product/${item._id}`}>
            <Icon>
              <SearchIcon />
            </Icon>
          </Link>

          <Icon>
            <FavoriteIcon />
          </Icon>

        </Info>

      </Container>
    </Grid>
  );
};

export default Product;
