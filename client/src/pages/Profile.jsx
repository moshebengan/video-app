import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Card from "../components/Card";
import EditProfile from "./EditProfile";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";
import SavedVideoCard from "../components/savedVideoCard";
import Upload from "../components/Upload";

const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 600px) {
    position: relative;
    flex-direction: column;
    height: calc(100vh - 56px);
  }
`;

const Wrapper = styled.div`
  display: flex;
  margin: 20px;
  background-color: ${({ theme }) => theme.bg};
  width: calc(100vw - 400px);
  height: 500px;
  justify-content: space-between;
  gap: 20px;

  @media only screen and (max-width: 600px) {
    position: absolute;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    margin: 5px;
    top: 0;
    width: 400px;

    height: 100%;
  }
`;

const Left = styled.div`
  display: inline-block;
  vertical-align: middle;
  flex: 1;
  margin: 10px;
  background-color: ${({ theme }) => theme.bgLighter};
  flex-direction: column;

  @media only screen and (max-width: 600px) {
    display: flex;
    width: 100%;
    flex: none;
    align-items: center;
  }
`;

const Top = styled.div`
  display: flex;
  position: relative;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: ${({ theme }) => theme.text};
  position: absolute;
  top: 10px;
  right: 10px;
  gap: 30px;

  @media only screen and (max-width: 600px) {
    gap: 10px;
    top: 0px;
    right: 0px;
  }
`;

const Image = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  object-fit: cover;
  margin: 10px 10px 50px 20px;
  @media only screen and (max-width: 600px) {
    margin: 20px;
  }
`;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 600px) {
    justify-content: flex-start;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  color: ${({ theme }) => theme.text};
  padding: 0px 50px;
  margin-top: 20px;
  vertical-align: center;
  align-items: center;
  gap: 10px;

  @media only screen and (max-width: 600px) {
    margin-top: 0px;
    padding: 10px;

    justify-content: flex-start;
  }
`;

const Title = styled.h1`
  font-size: 40px;
  

  font-weight: 500;
@media only screen and (max-width: 600px) {
  font-size: 25px;
  text-align: left;
}

`;

const SubTitle = styled.h2`
  font-size: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-weight: 500;
  margin: 10px 55px;

  @media only screen and (max-width: 600px) {
    margin: 10px;
    text-align: center;
  }
`;

const Desc = styled.div`
  display: flex;

  margin: 0px 55px;
  justify-content: space-between;

  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.textSoft};
  align-items: center;

  @media only screen and (max-width: 600px) {
    margin: 0px;
    justify-content: space-around;
  }
`;

const SavedVideosTitle = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-weight: 500;
  padding: 20px 20px;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Bottom = styled.div`
  display: flex;
  overflow-x: auto;
  

  &::-webkit-scrollbar {
    height: 8px; /* Height for horizontal scrollbar */
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Content = styled.div`
  flex: 0 0 200px;

  height: 200px;
  width: 150px;
  background-color: ${({ theme }) => theme.bg};
  margin-right: 10px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  /* vertical-align: middle; */
  flex: 1;
  margin: 10px;
  background-color: ${({ theme }) => theme.bgLighter};
  overflow-y: scroll;
  white-space: normal;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  @media only screen and (max-width: 600px) {
    
    flex-direction: column;
    overflow: auto;
    
    
    scroll-behavior: smooth;
    flex: none;
    height: 300px;
    width: 90%;
    padding: 10px;
    border-radius: 10px;
    
  }
`;

const EmptyCase = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 20px;
  padding: 20px 30px;
  border: none;
  background-color: crimson;
  color: white;
  border-radius: 10px;

  &:hover {
    background-color: #dc143c3b;
  }
`;

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [videos, setVideos] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/videos/${currentUser?._id}`);
        setVideos(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVideos();
  }, [currentUser._id]);

  //   useEffect(() => {
  //     const fetchSavedVIdeos = async () => {
  //         try {
  //             const res = await axios.get()
  //         }
  //     }
  //   })

  const openDeleteModal = () => {
    setOpenModal(true);
  };

  const closeDeleteModal = () => {
    setOpenModal(false);
  };

  const handleDelete = async () => {
    setOpenModal(false);
    navigate("/");
    try {
      await axios.delete(`/users/${currentUser._id}`);
      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Top>
              <Buttons>
                <DeleteIcon
                  style={{ cursor: "pointer" }}
                  onClick={openDeleteModal}
                />
                <Modal
                  isOpen={openModal}
                  onClose={closeDeleteModal}
                  onConfirm={handleDelete}
                ></Modal>
                {!currentUser.fromGoogle && (
                  <EditIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => setOpenEdit(true)}
                  />
                )}
              </Buttons>
              <Image src={currentUser.img} />
              <Texts>
                <TitleWrapper>
                  <Title>{currentUser.name}</Title>
                  {currentUser.fromGoogle && <GoogleIcon />}
                </TitleWrapper>
                <SubTitle>{currentUser.email}</SubTitle>
                <Desc>
                  <span>{currentUser.subscribers} followers</span>•{" "}
                  <span>{currentUser.subscribedUsers.length} following</span>
                </Desc>
              </Texts>
            </Top>
            <SavedVideosTitle>Saved Videos:</SavedVideosTitle>

            <Bottom>
              {currentUser.savedVideos.length === 0 ? (
                <>
                  <span>You didn't save any video</span>
                </>
              ) : (
                currentUser.savedVideos.map((videoId) => (
                  <Content>
                    <SavedVideoCard videoId={videoId} />
                  </Content>
                ))
              )}
            </Bottom>
          </Left>
          {videos.length !== 0 ? (
            <Right>
              <SavedVideosTitle>{currentUser.name}'s Uploaded videos:</SavedVideosTitle>
              {videos.map((video) => (
                <Card key={video._id} video={video} type="sm" />
              ))}
            </Right>
          ) : (
            <EmptyCase>
              <span>No uploaded videos</span>
              <Button onClick={() => setOpenUpload(true)}>
                Upload new Video
              </Button>
            </EmptyCase>
          )}
        </Wrapper>
      </Container>
      {openEdit && <EditProfile setOpenEdit={setOpenEdit} />}
      {openUpload && <Upload setOpen={setOpenUpload} />}
    </>
  );
};

export default Profile;
