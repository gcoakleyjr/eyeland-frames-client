import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { logout } from '../redux/userRedux';

import { mobile, tablet } from "../responsive";
import DropDownMenu from './DropDownMenu';

const Container = styled.nav`
  height: 80px;
  display: flex;
  align-items: center;
  position: relative;
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


const MenuText = styled.span`
  font-size: 14px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-right: 25px;
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

const MenuAction = styled.div`
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
  const [dropDown, setDropDown] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    dispatch(logout())
    setAnchorEl(null);
  };


  const dispatch = useDispatch()

  return (
    <Container id='nav-bar'>
      <Wrapper>
        <Left>

          <Hamburger />

          <SearchContainer onMouseEnter={() => setDropDown(false)}>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>

          <MenuText
            onClick={() => setDropDown(!dropDown)}
            onMouseEnter={() => setDropDown(true)}
          >
            Shop
          </MenuText>
          <DropDownMenu dropDown={dropDown} setDropDown={setDropDown} />

        </Left>
        <Center onMouseEnter={() => setDropDown(false)}>
          <HeaderLink to="/">
            <Logo>EYELAND FRAMES.</Logo>
          </HeaderLink>
        </Center>

        <Right onMouseEnter={() => setDropDown(false)}>

          <UserMenuWrapper>
            {!user ?
              <>
                <Link to="/register">
                  <MenuAction>REGISTER</MenuAction>
                </Link>

                <Link to="/login">
                  <MenuAction>SIGN IN</MenuAction>
                </Link>
              </>
              :
              <>
                <MenuText>Hello, {user.username}!</MenuText>
                <PersonRoundedIcon
                  sx={{ cursor: 'pointer' }}
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={handleClick}
                />

                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <Link to={"/account/" + user._id}><MenuItem onClick={handleClose}>My account</MenuItem></Link>

                  <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
              </>
            }
          </UserMenuWrapper>

          <Link to="/cart" style={{ color: "white" }}>
            <MenuAction>
              <Badge badgeContent={quantity} color="primary" overlap="circular">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuAction>
          </Link>

        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
