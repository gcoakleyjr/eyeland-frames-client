import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RoomIcon from '@mui/icons-material/Room';
import TwitterIcon from '@mui/icons-material/Twitter';
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.footer`
  display: flex;
  padding: 0 60px;
  background-color: #121212;
  color: #c0c0c0;
  font-weight: 100;
  flex-direction: column;
  ${mobile({ padding: "20px 20px 30px 20px" })}
`;

const UpperWrapper = styled.div`
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const LowerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  margin-bottom: 30px;
  border-top: 1px solid #252525;
`;

const LowerItem = styled.span`
  font-size: 10px;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  padding-right: 40px;
  ${mobile({ padding: '20px 0' })}
`;

const Logo = styled.h1`
font-weight: 100;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #afafaf;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  &:last-child {
    margin-right: 0px
  }
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  padding-right: 0;
  ${mobile({ padding: '20px 0' })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 40px;
`;

const PaymentWrapper = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    gap: .5rem;
`;

const Footer = () => {
  return (
    <Container>
      <UpperWrapper>
        <Left>
          <Logo>EYELAND FRAMES</Logo>
          <Desc>
            Shop for designer glasses and have them delivered to your local store for pickup! We provide fashionable, innovative, and top-graded quality eyewear.
          </Desc>

        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Men's Fashion</ListItem>
            <ListItem>Women's Fashion</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Wishlist</ListItem>
          </List>
        </Center>
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <RoomIcon style={{ marginRight: "10px" }} /> Eventual Brick & Mortar Location
          </ContactItem>
          <ContactItem>
            <PhoneIcon style={{ marginRight: "10px" }} /> +1 242 242 2442
          </ContactItem>
          <ContactItem>
            <MailIcon style={{ marginRight: "10px" }} /> eyelandframes@gmail.com
          </ContactItem>
          <PaymentWrapper>
            <Payment src="./img/american-express-svgrepo-com.svg" />
            <Payment src="./img/discover-svgrepo-com.svg" />
            <Payment src="./img/mastercard-3-svgrepo-com.svg" />
            <Payment src="./img/visa-svgrepo-com.svg" />
          </PaymentWrapper>

        </Right>
      </UpperWrapper>

      <LowerWrapper>
        <LowerItem>Copyright © 2022 Eyeland Framez. All rights reserved.</LowerItem>
        <SocialContainer>
          <SocialIcon>
            <FacebookIcon />
          </SocialIcon>
          <SocialIcon>
            <InstagramIcon />
          </SocialIcon>
          <SocialIcon>
            <TwitterIcon />
          </SocialIcon>
          <SocialIcon>
            <PinterestIcon />
          </SocialIcon>
        </SocialContainer>
      </LowerWrapper>
    </Container>
  );
};

export default Footer;
