import styled from "styled-components";

const Container = styled.section`
  height: 30px;
  background-color: #121212;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  border-bottom: 1px solid #252525;
`;

const Announcement = () => {
  return <Container id='announcement'>New customers get 15% off!</Container>;
};

export default Announcement;
