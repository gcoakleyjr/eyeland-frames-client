import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/apiCalls";


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  position: relative;
  z-index: 5;
  gap: .5rem;
  display: flex;
  flex-direction: column;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 200px;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Links = styled(Link)`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
    color: red;
    font-size: 12px;
`

const Register = () => {

  const [inputs, setInputs] = useState({});
  const [errorPassword, setErrorPassword] = useState(false);
  const dispatch = useDispatch()
  const { isFetching } = useSelector(state => state.user)

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  //SUBMIT DATA TO API
  const handleCreate = (e) => {
    e.preventDefault()
    if (inputs.password !== inputs.confirmPassword) {
      setErrorPassword(true)
      return
    }
    const { confirmPassword, ...others } = inputs
    register(dispatch, others)
  }

  useEffect(() => {
    const resetError = setTimeout(() => {
      setErrorPassword(false)
    }, 5000)
    return () => clearTimeout(resetError)
  }, [errorPassword])


  return (
    <Container>
      <div style={{ position: 'absolute', left: '0', top: '0', height: '100%', width: '500px', overflow: 'hidden', zIndex: 0 }}>
        <img src="https://res.cloudinary.com/dx1cp4cj9/image/upload/v1666147534/Eyeland%20Frames/pexels-anna-shvets-3727465_smbxae.jpg" alt=""
          style={{ height: "100%", objectFit: 'cover' }} />
      </div>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            placeholder="name"
            onChange={handleChange}
            name="firstName"
          />
          <Input
            placeholder="last name"
            onChange={handleChange}
            name="lastName"
          />
          <Input
            placeholder="username"
            onChange={handleChange}
            name="username"
          />
          <Input
            placeholder="email"
            onChange={handleChange}
            name="email"
            type="email"
          />
          <Input
            placeholder="password"
            onChange={handleChange}
            type="password"
            name="password"
          />
          <Input
            placeholder="confirm password"
            onChange={handleChange}
            type="password"
            name="confirmPassword"
          />
        </Form>
        <Agreement>
          By creating an account, I consent to the processing of my personal
          data in accordance with the <b>PRIVACY POLICY</b>
        </Agreement>
        <div style={{ display: "flex", alignItems: 'center', gap: '1rem' }}>
          <Button onClick={handleCreate} disabled={isFetching} >{isFetching ? "Creating..." : "Create"}</Button>
          <Links to='/'>Back to Home Page</Links>
          {errorPassword && <Error>Passwords do not match</Error>}

        </div>

      </Wrapper>
    </Container>
  );
};

export default Register;
