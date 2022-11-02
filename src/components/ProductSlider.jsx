import React from 'react'
import Slider from "react-slick";
import { Box } from '@mui/material';
// import { mobile } from '../responsive';
// import styled from 'styled-components';

// const Image = styled.img`
//   width: ${(props) => props.width || "100%"};
//   min-width: 280px;
//   max-width: 1050px;
//   height: 56vh;
//   object-fit: contain;
//   ${mobile({ height: "26vh" })}
// `;

export const SliderComponent = ({ images }) => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const slides = images?.map((image, i) => {
        console.log(image.url)
        return (
            <Box key={i}>
                <img src={image.url} alt="" />
            </Box>
        )
    })
    return (
        <Slider {...settings}>
            {slides}
        </Slider>
    )
}
