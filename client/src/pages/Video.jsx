import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import GradeIcon from "@mui/icons-material/Grade";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  dislike,
  fetchFailure,
  fetchStart,
  fetchSuccess,
  like,
  setVideo,
} from "../redux/videoSlice";
import { format } from "timeago.js";
import { saveVideo, subscription } from "../redux/userSlice";
import Recommendations from "../components/Recommendations";
import Upload from "../components/Upload";
import Modal from "../components/Modal";

const Container = styled.div`
  display: flex;
  gap: 24px;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    margin: 0;
    
    justify-content: flex-start;
    min-height: 100vh;
    gap: 0;
  }
`;
const Content = styled.div`
  flex: 5;

  @media only screen and (max-width: 600px) {
    
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex: none;
  }
`;

const VideoWrapper = styled.div`
  @media only screen and (max-width: 600px) {
    flex: 1;
    width: 100%;
  }
`;

const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;

   @media only screen and (max-width: 600px) {
    display: flex;
    flex: 1;
   }
`;

const TitleRow = styled.div`
  display: flex;
  color: ${({ theme }) => theme.text};
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 5px;
  

  @media only screen and (max-width: 600px) {
    margin-left: 10px;
    margin-bottom: 10px;
  }
`;

// const OwnerButton = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 10px;
//   cursor: pointer;
//   font-size: 15px;
// `;

const Description = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin-bottom: 10px;

  @media only screen and (max-width: 600px) {
    margin-left: 10px;
  }
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    margin-left: 10px;
  }
`;
const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
  @media only screen and (max-width: 600px) {
    display: flex;
    align-items: center;
    justify-content: center;
}
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 600px) {
    margin-top: 15px;
    font-size: 12px;
  }
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    justify-content: space-around;
    gap: 10px
  }
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;

  @media only screen and (max-width: 600px) {
    gap: 10px;
  }
`;
const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;

  @media only screen and (max-width: 600px) {
    width: 24px;
    height: 24px;
  }
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.div`
  margin-top: 5px;

  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    padding: 5px 5px;
    font-size: 10px;
  }
`;



const Video = () => {
  const [loading, setLoading] = useState(true);
  const [openEdit, setOpenEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [channel, setChannel] = useState({});

  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchStart());
        await axios.put(`/videos/views/${path}`);
        const videoRes = await axios.get(`/videos/find/${path}`);

        const channelRes = await axios.get(
          `/users/find/${videoRes.data.userId}`
        );

        setChannel(channelRes.data);
        dispatch(fetchSuccess(videoRes.data));
        setLoading(false);
      } catch (err) {
        dispatch(fetchFailure(err));
        setLoading(false);
      }
    };
    fetchData();
  }, [path, dispatch, openEdit]);

  const handleLike = async () => {
    await axios.put(`/users/like/${currentVideo._id}`);
    dispatch(like(currentUser._id));
  };

  const handleDislike = async () => {
    await axios.put(`/users/dislike/${currentVideo._id}`);
    dispatch(dislike(currentUser._id));
  };

  const handleSubscribe = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/users/unsub/${channel._id}`)
      : await axios.put(`/users/sub/${channel._id}`);
    dispatch(subscription(channel._id));
  };

  const handleSave = async () => {
    await axios.put(`/users/saveVideo/${currentVideo._id}`);
    dispatch(saveVideo(currentVideo._id));
  };

  const handleDelete = async () => {
    setOpenModal(false);
    navigate("/");
    try {
      axios.delete(`/videos/${currentVideo._id}`);
      dispatch(setVideo());
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || !currentVideo) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Container>
          <Content>
            <VideoWrapper>
              <VideoFrame src={currentVideo.videoUrl} controls></VideoFrame>
            </VideoWrapper>
            <TitleRow>
            <Title>{currentVideo?.title}</Title>
              {/* Edit and delete buttons will be available only for video owner */}
              {currentUser?._id === currentVideo.userId && (
                <>
                  <Button onClick={() => setOpenEdit(true)}>
                    <EditIcon style={{fontSize:"15px"}} />
                  </Button>
                  <Button onClick={() => setOpenModal(true)}>
                    <DeleteIcon style={{fontSize:"15px"}} />
                  </Button>
                </>
              )}
              
            </TitleRow>

            <Description>{currentVideo?.desc}</Description>
            <Details>
              <Info>
                {currentVideo?.views} views • {format(currentVideo?.createdAt)}{" "}
              </Info>

              {currentUser && (
                <>
                  <Buttons>
                    {/* Regular buttons */}
                    <Button onClick={handleLike}>
                      {currentVideo.likes?.includes(currentUser?._id) ? (
                        <ThumbUpIcon />
                      ) : (
                        <ThumbUpAltOutlinedIcon />
                      )}{" "}
                      {currentVideo?.likes.length}
                    </Button>

                    <Button onClick={handleDislike}>
                      {currentVideo.dislikes?.includes(currentUser?._id) ? (
                        <ThumbDownIcon />
                      ) : (
                        <ThumbDownAltOutlinedIcon />
                      )}{" "}
                      Dislike
                    </Button>
                    <Button>
                      <ReplyOutlinedIcon /> Share
                    </Button>
                    <Button onClick={handleSave}>
                      {!currentUser?.savedVideos?.includes(currentVideo._id) ? (
                        <>
                          <AddTaskOutlinedIcon /> Save
                        </>
                      ) : (
                        <>
                          <GradeIcon /> Saved
                        </>
                      )}
                    </Button>
                  </Buttons>
                </>
              )}
            </Details>
            <Hr />
            <Channel>
              <ChannelInfo>
                <Image src={channel.img} alt="" />
                <ChannelDetail>
                  <ChannelName>{channel.name}</ChannelName>
                  <ChannelCounter>
                    {channel.subscribers} Subscribers
                  </ChannelCounter>
                </ChannelDetail>
              </ChannelInfo>
              <Subscribe onClick={handleSubscribe}>
                {currentUser?.subscribedUsers.includes(channel._id)
                  ? "SUBSCRIBED"
                  : "SUBSCRIBE"}
              </Subscribe>
            </Channel>
            <Hr />
            <Comments videoId={currentVideo._id} />
          </Content>
          <Recommendations tags={currentVideo.tags} />
        </Container>
        {openEdit && <Upload setOpen={setOpenEdit} edit={true} />}
        {openModal && (
          <Modal
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
            onConfirm={handleDelete}
            video={true}
          />
        )}
      </>
    );
  }
};

export default Video;
