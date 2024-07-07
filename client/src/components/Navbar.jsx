import { useState, useRef, useContext } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import MenuIcon from '@mui/icons-material/Menu';

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";
import Upload from "./Upload";
import {SidebarContext} from '../context/SidebarContext'

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  align-items: center;
  height: 56px;
  z-index: 999;

  @media only screen and (max-width: 600px) {
    width: 100%;
    
  }
`;


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 20px;
  justify-content: center;
  position: relative;
  
  height: 56px;
  gap: 20px;
  
  @media only screen and (max-width: 600px) {
    padding: 0px;
    
  }

  /* @media only screen and (max-width: 600px) {
    justify-content:space-around;
    gap: 20p;
    
  } */
`;

const Icon = styled.div`

  display: none;

  @media only screen and (max-width: 600px) {
  display: flex;
   color: ${({ theme }) => theme.text};
   font-size: 30px;
   position: absolute;
   top: 5px;
   left: 5px;
   
  }
`



const Search = styled.div`
  
  /* position: absolute;
  left: 0px;
  right: 0px; */
  /* margin: auto; */
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 600px) {
   
    /* justify-content: space-around; */
    /* margin-top: 20px;
    margin-right: 100px; */
    
    
  }
`;
const Input = styled.input`
  border: none;
  width: 50%;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  outline: none;

  @media only screen and (max-width: 600px) {
  }
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  width: 20%;
  position: absolute;
  right: 0;

  justify-content: space-around;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 50%;
  height: 72px;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
  background-color: #999;
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 20px;
  width: 200px;
  display: flex;
  gap: 20px;
  z-index: 2;

  padding: 20px;
  background: ${({ theme }) => theme.bgLighter};
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  opacity: ${(props) => (props.open ? 1 : 0)};
  transform: ${(props) => (props.open ? "translateY(0)" : "translateY(-20px)")};
  transition: opacity 0.5s ease, transform 0.5s ease;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
`;

const DropdownButton = styled.button`
  background: ${({ theme }) => theme.bgLighter};
  color: white;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 10px;
  color: ${({ theme }) => theme.text};
`;

// const Navbar = ({setIsSidebarOpen, toggleSidebar}) => {
  const Navbar = () => {
  // the state that manages the logout/profile dropdown menu
  const [openDropdown, setOpenDropdown] = useState(false);
  // the state that manages the add new video modal
  const [openPopup, setOpenPopup] = useState(false);



  const [q, setQ] = useState("");

  const dispatch = useDispatch();

  const dropdownRef = useRef();

  const { currentUser } = useSelector((state) => state.user);



  const handleOpen = () => {
    setOpenDropdown(true);
  };

  const handleClose = (e) => {
    if (openDropdown && !dropdownRef.current?.contains(e.target)) {
      setOpenDropdown(false);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  const handleProfileButton = () => {
    navigate("/profile");
    setOpenDropdown(false);
  };

  const navigate = useNavigate();

  document.addEventListener("mousedown", handleClose);

  const {toggleSidebar} = useContext(SidebarContext)

  return (
    <>
      <Container>
        <Wrapper>
          <Icon>
          <MenuIcon style={{fontSize:"50px"}} onClick={toggleSidebar} />
          </Icon>
          <Search>
            <Input
              placeholder="search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon style={{cursor: "pointer"}} onClick={() => navigate(`/search?q=${q}`)} />
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon
                style={{ cursor: "pointer" }}
                onClick={() => setOpenPopup(true)}
              />
              <AvatarWrapper onClick={handleOpen}>
                <Avatar src={currentUser.img} alt="" />
                {currentUser.name}
                <DropdownContainer ref={dropdownRef} open={openDropdown}>
                  <DropdownButton onClick={handleProfileButton}>
                    My Profile
                  </DropdownButton>
                  <DropdownButton onClick={handleLogout}>Logout</DropdownButton>
                </DropdownContainer>
              </AvatarWrapper>
            </User>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button>
                <AccountCircleOutlinedIcon />
                SIGN IN
              </Button>
            </Link>
          )}
        </Wrapper>
      </Container>
      {openPopup && <Upload setOpen={setOpenPopup} />}
    </>
  );
};

export default Navbar;
