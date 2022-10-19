import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { logout } from '../redux/userRedux';

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;


const User = styled.span`
  font-size: 14px;
  cursor: pointer;
`

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const HeaderLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: black;
`

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity)
  const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  console.log(user)
  return (
    <Container>
      <Wrapper>
        <Left>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <HeaderLink to="/">
            <Logo>EYELAND FRAMES.</Logo>
          </HeaderLink>
        </Center>
        <Right>

          {!user ?
            <>
              <Link to="/register">
                <MenuItem>REGISTER</MenuItem>
              </Link>

              <Link to="/login">
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
            :
            <>
              <User>Hello, {user.username}!</User>
              <PersonRoundedIcon sx={{ cursor: 'pointer' }} />
              <LogoutIcon sx={{ cursor: 'pointer' }} onClick={() => dispatch(logout())} />
            </>
          }


          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary" overlap="circular">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>

        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
