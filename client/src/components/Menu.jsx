import React, { useContext, useState } from "react";
import styled from "styled-components";
import MosesTube from "../img/logo.png";
import HomeIcon from "@mui/icons-material/Home";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import SubscriptionsOutlinedIcon from "@mui/icons-material/SubscriptionsOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SportsEsportsOutlinedIcon from "@mui/icons-material/SportsEsportsOutlined";
import SportsBasketballOutlinedIcon from "@mui/icons-material/SportsBasketballOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsBrightnessOutlinedIcon from "@mui/icons-material/SettingsBrightnessOutlined";
import CloseIcon from "@mui/icons-material/Close";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SidebarContext } from "../context/SidebarContext";
import { logout } from "../redux/userSlice";
import Upload from "./Upload";


const Container = styled.div`
  flex: 1;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 100vh;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  position: sticky;
  top: 0;
  min-height: 100vh;

  @media only screen and (max-width: 600px) {
    /* display: ${(props) => (props.isSidebarOpen ? "block" : "none")}; */
    /* opacity:${(props) => (props.isSidebarOpen ? 1 : 0)};  */
    position: fixed;
    width: 80%;
    height: 100vh;
    transform: ${({ isOpen }) =>
      isOpen ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    overflow-y: scroll;
    
  }
`;


const Wrapper = styled.div`
  padding: 18px 26px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Icon = styled.div`
  display: none;
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-weight: bold;
  margin-bottom: 25px;
`;

const Img = styled.img`
  height: 25px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;

  &:hover {
    background-color: ${({ theme }) => theme.soft};
  }
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Profile = styled.div`
  display: none;
  @media only screen and (max-width: 600px) {
    display: flex;
    align-items: center;
    margin-left: 5px;
    margin-bottom: 30px;
    gap: 15px;
    vertical-align: center;
    
  }
`

const ProfileImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  align-items: center;
  justify-content: center;
  cursor: pointer;
 
`

const ProfileRight = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  font-size: 20px;
  gap: 20px;
`

const LogoutBtn = styled.button`
  padding: 5px 15px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid crimson;
  color: crimson;
  background-color: transparent;
  font-size: 15px;


`

const ProfileActions = styled.div`
  display: none;
  @media only screen and (max-width: 600px) {
    display: flex;
    margin: 30px 10px;
   }

`

const Login = styled.div``;

const LoginText = styled.div`
   @media only screen and (max-width: 600px) {
    display: none;
   }
`

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${({ theme }) => theme.text};
`;

const Menu = ({ darkMode, setDarkMode }) => {
  
  const { currentUser } = useSelector((state) => state.user);
  const { isSidebarOpen, toggleSidebar } = useContext(SidebarContext);

  const [openPopup, setOpenPopup] = useState(false);
  const dispatch = useDispatch();

  const linkStyle = { textDecoration: "none", color: "inherit", alignItems: "center", marginLeft:"5px" };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    toggleSidebar();
  }

  const handleOpenUploadPopup = () => {
    toggleSidebar();
    setOpenPopup(true)
  }

  return (
    <>
    <Container isOpen={isSidebarOpen}>
      <Wrapper>
        <Header>
          <StyledLink to="/" onClick={toggleSidebar}>
            <Logo>
              <Img src={MosesTube} />
              MoshikoTube
            </Logo>
          </StyledLink>
          <Icon onClick={toggleSidebar}>
            <CloseIcon style={{ fontSize: "24px" }} />
          </Icon>
        </Header>
        <StyledLink to="/" onClick={toggleSidebar} >
          <Item>
            <HomeIcon />
            Home
          </Item>
        </StyledLink>
        <StyledLink to="/trends" onClick={toggleSidebar}>
          <Item>
            <ExploreOutlinedIcon />
            Explore
          </Item>
        </StyledLink>
        <StyledLink
          to="/subscriptions"
          onClick={toggleSidebar}
        >
          <Item>
            <SubscriptionsOutlinedIcon />
            Subscriptions
          </Item>
        </StyledLink>
        <Hr />
        <StyledLink
          to="/library"
          onClick={toggleSidebar}
        >
          <Item>
            <VideoLibraryOutlinedIcon />
            Library
          </Item>
        </StyledLink>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr />
        {currentUser ? (
          <>
          <Profile>
            <StyledLink to="/profile" onClick={toggleSidebar} >
            <ProfileImage src={currentUser.img}/>
            </StyledLink>
            <ProfileRight>
            {currentUser.name}
            <LogoutBtn onClick={handleLogout}>Logout</LogoutBtn>
            </ProfileRight>
           
          </Profile>
          <ProfileActions>
            <Button onClick={handleOpenUploadPopup}><VideoCallOutlinedIcon/>Upload New Video</Button>
          </ProfileActions>
          </>
        ) : (
          <>
            <Login>
              <LoginText>
              Sign in to like videos, comment and subscribe.
              </LoginText>
              <StyledLink
                to="/login"
                onClick={toggleSidebar}
                
              >
                <Button onClick={toggleSidebar}>
                  <AccountCircleOutlinedIcon />
                  SIGN IN
                </Button>
              </StyledLink>
            </Login>
            <Hr />
          </>
        )}
        <Title>BEST OF MoshikoTube</Title>
        <StyledLink
          to="/bestOf/music"
          onClick={toggleSidebar}
          
        >
          <Item>
            <LibraryMusicOutlinedIcon />
            Music
          </Item>
        </StyledLink>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <MovieOutlinedIcon />
          Movies
        </Item>
        <StyledLink
          to="/bestOf/live"
          onClick={toggleSidebar}
        >
          <Item>
            <LiveTvOutlinedIcon />
            Live
          </Item>
        </StyledLink>
        <Hr />
        <Item>
          <SettingsOutlinedIcon />
          Settings
        </Item>
        <StyledLink to="/help"
        onClick={toggleSidebar}
         >
          <Item>
            <HelpOutlineOutlinedIcon />
            Help
          </Item>
        </StyledLink>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <SettingsBrightnessOutlinedIcon />
          {darkMode ? "Light" : "Dark"} Mode
        </Item>
      </Wrapper>
    </Container>
    {openPopup && <Upload setOpen={setOpenPopup}/>}
    </>
  );
};

export default Menu;
