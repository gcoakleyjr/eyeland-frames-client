import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  position: relative;
  z-index: 5;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: cadetblue;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed
  }
`;

const Links = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector(state => state.user)

  function handleLogin(e) {
    e.preventDefault()
    login(dispatch, { username, password })
  }

  return (
    <Container>
      <div style={{ position: 'absolute', left: '0', top: '0', height: '100%', width: '500px', overflow: 'hidden', zIndex: 0 }}>
        <img src="https://res.cloudinary.com/dx1cp4cj9/image/upload/v1666147534/Eyeland%20Frames/pexels-anna-shvets-3727465_smbxae.jpg" alt=""
          style={{ height: "100%", objectFit: 'cover' }} />
      </div>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Button onClick={handleLogin} disabled={isFetching} >LOGIN</Button>

          <Links >DON'T REMEMBER THE PASSWORD?</Links>
          <Links to="/register">CREATE A NEW ACCOUNT</Links>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
