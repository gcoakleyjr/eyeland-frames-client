import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import React from "react";
import styled from "styled-components";
import { mobile, tablet } from "../responsive";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { logout } from '../redux/userRedux';

const Container = styled.nav`
  height: 80px;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.black};
  color: white;
  ${mobile({ height: "50px" })}
  & a {
    color: white
  }
`;

const Wrapper = styled.div`
  padding: 10px 60px;
  display: flex;
  align-items: center;

  width: 100%;
  justify-content: space-between;
  ${mobile({ padding: "10px 25px" })}
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
  border-radius: 3px;
  ${tablet({ display: "none" })}
`;

const Input = styled.input`
  border: none;
  color: white;
  background: transparent;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  text-align: center;
  flex: 1;
  min-width: 200px;
`;

const Logo = styled.h1`
  font-weight: 100;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${tablet({ marginLeft: "0" })};
  ${mobile({ fontSize: "12px" })}
`;

const UserMenuWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  ${tablet({ display: "none" })}
`;

const HeaderLink = styled(Link)`
  cursor: pointer;
  text-decoration: none;
  color: white;
`

const MenuWrapper = styled.div`
  width: 2rem;
  height: 3rem;
  z-index: 100;
  position: relative;
  display: none;
  align-items: center;
  justify-content: flex-end;
  ${tablet({ display: "flex" })}
`

const MenuBar = styled.div`
position: relative;
  width: 2rem;
  height: 1px;
  border-radius: 1px;
  background-color: white;
  transition: 0.5s;

  &:before, &:after {
    content: "";
    position: absolute;
    width: 2rem;
    height: 1px;
    border-radius: 1px;
    background-color: white;
    transition: .5s
  };

  &:before {
    transform: translateY(-8px)
  };
  &:after {
    transform: translateY(8px)
  }
`

const Hamburger = (props) => {
  return (
    <MenuWrapper>
      <MenuBar />
    </MenuWrapper>
  )
}

const Navbar = () => {
  const quantity = useSelector(state => state.cart.quantity)
  const user = useSelector(state => state.user.currentUser)

  const dispatch = useDispatch()

  return (
    <Container id='nav-bar'>
      <Wrapper>
        <Left>
          <Hamburger />
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

          <UserMenuWrapper>
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
          </UserMenuWrapper>

          <Link to="/cart" style={{ color: "white" }}>
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
