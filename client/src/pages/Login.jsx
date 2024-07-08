import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";

import {auth, provider} from '../firebase';
import {signInWithPopup} from 'firebase/auth'
import styled from "styled-components";
import { useNavigate } from "react-router-dom";




const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const Login = () => {

  axios.defaults.withCredentials = true;

  const {currentUser} = useSelector(state => state.user)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [succSignup, setSuccSignup] = useState(false)
 
  const dispatch = useDispatch()
  const navigate = useNavigate();

  // if user is logged in - he won't have access for login page
  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate])

  const handleSignIn = async (e) => {
    e.preventDefault()
    dispatch(loginStart());
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/signin`, {name, password})
      dispatch(loginSuccess(res.data))
      navigate('/');
    } catch (err) {
      dispatch(loginFailure())
      
    }
  }

  const signInWithGoogle = async () => {
    dispatch(loginStart())
    signInWithPopup(auth, provider).then((result) => {
      axios.post(`${process.env.REACT_APP_API_URL}/auth/google`, {
        name: result.user.displayName,
        email: result.user.email,
        img: result.user.photoURL,

      }).then((res) => {
        dispatch(loginSuccess(res.data))
        navigate('/');
      })
    }).catch(err =>dispatch(loginFailure()))
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    const img = 'https://www.pngmart.com/files/21/Account-Avatar-Profile-PNG-Pic.png';
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {name, email, password, img})
      setName('');
      setEmail('');
      setPassword('')
      setSuccSignup(true)
      setTimeout(() => {
        setSuccSignup(false);
      }, [3000])
    } catch (err) {
      console.log(err)
    }
  }

  
  return (
    <Container>
      <Wrapper>
        <Title>Sign In</Title>
        <SubTitle>to continue to MoshikoTube</SubTitle>
        <Input type="text" placeholder="username" onChange={e => setName(e.target.value)} />
        <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        <Button onClick={handleSignIn}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        <Title>or</Title>
        <Input type="text" placeholder="username" value={name}  onChange={e => setName(e.target.value)}  />
        <Input type="email" placeholder="email" value={email}  onChange={e => setEmail(e.target.value)} />
        <Input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <Button onClick={handleSignUp}>Sign up</Button>
        {succSignup && <SubTitle>You signed up successfully, Enter your credentials on the login form above.</SubTitle>}
      </Wrapper>
      <More>
        English(USA)
        <Links>
          <Link>Help</Link>
          <Link>Privacy</Link>
          <Link>Terms</Link>
        </Links>
      </More>
    </Container>
  );
};

export default Login;
