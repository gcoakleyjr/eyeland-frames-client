import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { mobile } from "../responsive";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from "react-redux"
import { Box, Stack } from '@mui/system';

const Container = styled.div``;

const Wrapper = styled.section`
  padding: 70px;
  height: 90vh;
  display: flex;
  ${mobile({ padding: "10px 10px 50px 10px", flexDirection: "column", height: "100%" })}
`;

const SubWrapper = styled.div`
  padding: 70px;
  display: flex;
  ${mobile({ padding: "10px 10px 50px 10px", flexDirection: "column", height: "100%" })}
`;

const ImgContainer = styled.div`
  flex: ${(props) => props.flex || 1};
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ margin: "1rem 0" })}
`;

const SizingContainer = styled.div`
display: flex;
flex-direction: row;
margin: 0 80px;
margin-bottom: 30px;
${mobile({ flexDirection: 'column', marginLeft: '30px', marginRight: '30px', gap: "2rem" })}
`

const SizingItem = styled.article`
  flex: 1;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 25px;
  ${mobile({ margin: "1rem 0" })}
`;

const Image = styled.img`
  width: ${(props) => props.width || "100%"};
  min-width: 280px;
  max-width: 500px;
  height: 56vh;
  object-fit: contain;
  ${mobile({ height: "26vh" })}
`;

const SizingImage = styled.img`
  width: 100%;
  object-fit: contain;
  max-width: 200px;
  min-width: 100px;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 80px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: ${(props) => props.gap || 0};
  ${mobile({ padding: "10px", alignItems: "center" })};
`;

const Title = styled.h1`
  font-weight: 300;
  font-size: 4.2rem;
  color: ${(props) => props.theme.colors.black};
  ${mobile({ fontSize: "3rem" })}
`;

const Desc = styled.p`
  margin: 20px 0px;
  ${mobile({ textAlign: 'center' })}
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 60%;
  min-width: 280px;
  margin: 30px 0px;
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  flex-direction: column;
  ${mobile({ width: "100%", alignItems: "center" })}
`;

const FilterDetails = styled.div`
display: flex;
gap: 1rem;
flex-direction: column;
${mobile({ alignItems: "center" })}
`

const Filter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => props.direction === 'column' ? 'column' : 'row'};
`;

const ItemTitle = styled.span`
  font-size: 15px;
  font-weight: 200;
`;


const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color === "tortoise" ? "#a45a1e" : props.color === "crystal" ? "grey" : props.color};
  margin: 0px 5px;
  cursor: pointer;
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


const ItemProperty = styled.span`
  font-size: 15px;
  font-weight: 500;
`;

const ItemDescription = styled.p`
  font-size: 15px;
  font-weight: 100;
  color: ${props => props.theme.colors.gray};
`;

const AddContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${mobile({ width: "100%", alignItems: "center" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid cadetblue;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 1px solid cadetblue;
  background-color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover{
      background-color: #f8f4f4;
  }
`;

const Table = styled.table`
width: 500px;
height: 200px;
margin: 20px auto;
text-align: center;
border-spacing: 0;
border-collapse: collapse;
${mobile({ width: "300px" })}
`

const TD = styled.td`
border: 1px solid gray;
`

const Product = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const dispatch = useDispatch()
  const [product, setProduct] = useState({})
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        setColor(res.data.color[0])
      } catch { }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addProduct({ ...product, quantity, color })
    );
  };

  return (
    <Container>
      <Announcement />
      <Navbar />

      <Wrapper id='product-overview'>

        <ImgContainer flex={4}>
          <Image src={product.img ? product.img[0].url : ""} />
        </ImgContainer>

        <InfoContainer id="over-view-info-container">
          <Title>{product.title}</Title>

          <Price>$ {product.price}</Price>

          <FilterContainer>

            <FilterDetails>
              <Stack direction="row">
                <ItemTitle>Color</ItemTitle>
                <ItemProperty> : {color}</ItemProperty>
              </Stack>
              <Filter>
                {product.color?.map((c) => (
                  <FilterColor color={c} key={c} onClick={() => setColor(c)} className={c === color ? "active-color" : ""} />
                ))}

              </Filter>
            </FilterDetails>

            <Filter>
              <ItemTitle>Size</ItemTitle>
              <ItemProperty> : {product.size}</ItemProperty>
            </Filter>

          </FilterContainer>

          <AddContainer>

            <AmountContainer>
              <RemoveIcon sx={{ cursor: 'pointer' }} onClick={() => handleQuantity("dec")} />
              <Amount>{quantity}</Amount>
              <AddIcon sx={{ cursor: 'pointer' }} onClick={() => handleQuantity("inc")} />
            </AmountContainer>

            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>

        </InfoContainer>

      </Wrapper>

      <Stack component="section" sx={{ alignItems: 'center' }}>

        <Title>Product Details</Title>

        <SubWrapper>

          <ImgContainer flex={1}>
            <Image width="70%" src="https://res.cloudinary.com/dx1cp4cj9/image/upload/v1667084166/Eyeland%20Frames/frame_tdkpeb.png" />
          </ImgContainer>

          <InfoContainer id="details-info-container" gap="1rem">

            <Desc>{product.desc}</Desc>

            <Stack direction='row'>
              <ItemTitle>Gender </ItemTitle>
              <ItemProperty>:  {product.categories}</ItemProperty>
            </Stack>

            <Stack direction='row'>
              <ItemTitle>Shape</ItemTitle>
              <ItemProperty>:  {product.shape}</ItemProperty>
            </Stack>

            <Stack direction='row'>
              <ItemTitle>Material</ItemTitle>
              <ItemProperty>:  acetate</ItemProperty>
            </Stack>

            <Stack direction='row'>
              <ItemTitle>Item ID</ItemTitle>
              <ItemProperty>: {product._id}</ItemProperty>
            </Stack>

          </InfoContainer>

        </SubWrapper>

      </Stack>

      <Stack component="section" sx={{ alignItems: 'center', padding: "0 20px", marginBottom: '70px', textAlign: 'center' }}>
        <Title>Our Frame Sizes</Title>

        <SubWrapper>

          <Box>
            <Table>
              <tbody>
                <tr>
                  <TD>Size</TD>
                  <TD>Frame Width(mm)</TD>
                </tr>
                <tr>
                  <TD>Narrow</TD>
                  <TD>≦128mm</TD>
                </tr><tr>
                  <TD>Medium</TD>
                  <TD>129mm - 138mm</TD>
                </tr>
                <tr>
                  <TD>Wide</TD>
                  <TD>≥139mm</TD>
                </tr>
              </tbody>
            </Table>
          </Box>

        </SubWrapper>

        <SizingContainer>
          <SizingItem>
            <SizingImage src="https://res.cloudinary.com/dx1cp4cj9/image/upload/v1667094468/Eyeland%20Frames/sizeguide_03_hystxk.jpg" />
            <ItemProperty>Frame Width</ItemProperty>
            <ItemDescription>Frame Width is the measurement horizontally across the back of the frame.</ItemDescription>
          </SizingItem>
          <SizingItem>
            <SizingImage src="https://res.cloudinary.com/dx1cp4cj9/image/upload/v1667094468/Eyeland%20Frames/download_1_vk8agu.jpg" />
            <ItemProperty>Lens Height</ItemProperty>
            <ItemDescription>Lens Height is the vertical distance of the lens at its tallest point.</ItemDescription>
          </SizingItem>
          <SizingItem>
            <SizingImage src="https://res.cloudinary.com/dx1cp4cj9/image/upload/v1667094468/Eyeland%20Frames/download_av8kwl.jpg" />
            <ItemProperty>Temple Length</ItemProperty>
            <ItemDescription>Temple Length is the length of the temple to its temple tip, including the bend that sits on your ear.</ItemDescription>
          </SizingItem>
        </SizingContainer>

        <ItemDescription>Due to the different measurements methods, the measurements printed on the inside of the temple arm may vary from those showing on our website.</ItemDescription>

      </Stack>

      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;
