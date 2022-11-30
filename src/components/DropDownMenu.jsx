import React from 'react'
import { dropDownItems } from '../data'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Menu = styled.ul`
    width: 100%;
    position: absolute;
    list-style: none;
    text-align: start;
    top: 80px;
    left: 0;
    padding: 0;
    z-index: 50;
    background-color: white;

    &.clicked {
        display: none;
    }

    ${mobile({ top: "50px" })}
`

const MenuItem = styled.li`
    background-color: white;
    cursor: pointer;
`

const MenuLink = styled(Link)`
    display: block;
    width: 100%;
    height: 100%;
    text-decoration: none;
    transition: text-decoration 0.3s;
    color: ${props => props.theme.colors.black} !important;
    padding: 15px;
    padding-left: 60px;

    &:hover {
        text-decoration: underline;
    }
`

const DropDownMenu = ({ dropDown, setDropDown }) => {

    return (
        <Menu
            onClick={() => setDropDown(!dropDown)}
            onMouseLeave={() => setDropDown(false)}
            className={dropDown ? "" : "clicked"}
        >
            {dropDownItems.map(item => {
                return (
                    <MenuItem key={item.id}>
                        <MenuLink to={item.path} onClick={() => setDropDown(false)} >
                            {item.title}
                        </MenuLink>
                    </MenuItem>
                )
            })}
        </Menu>
    )
}

export default DropDownMenu