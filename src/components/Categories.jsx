import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.section`
  display: flex;
  padding: 60px;
  justify-content: space-between;
  ${mobile({ padding: "20px", flexDirection: "column" })}

`;

const Categories = () => {
  return (
    <Container id='categories'>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
