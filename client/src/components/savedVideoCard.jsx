import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import emptyAvatarImg from "../img/Avatar.png";
import axios from "axios";

const Container = styled.div`
  width: ${props => props.library ? "360px" : "200px"};
  height: ${props => !props.library && "200px"};
  overflow: hidden;
  margin-bottom: ${(props) => (props.library ? "45px" : " 10px")};
  cursor: pointer;
  white-space: nowrap;
  background-color: ${({ theme }) => theme.bgLighter};
 
  gap: 5px;
  border-radius: 10px;
  

  @media only screen and (max-width: 600px) {
    position: relative;
    width: 75vw;
    height: 15vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    gap: 5px;
    
    
  }
`;

const StyledLink = styled(Link)`
  display: ${(props) => props.library  && "flex"};
  width: ${(props) => props.library && "100%"};
  
  text-decoration: "none";

  @media only screen and (max-width: 600px) {
    width: 100%;

    height: 100%;
    gap: 5px;
    text-decoration: "none";
    color: "inherit";
    align-items: center;
    display: flex;
    justify-content: center;
  
  }
`;

const ImgDiv = styled.div`
  width: 100%;
  height: ${(props) => (!props.library ? "120px" : "202px")};
  flex: 1;
  background-color: purple;
  

  @media only screen and (max-width: 600px) {
    flex: none;
    width: calc((100% - 15px) * 0.6);
    height: 90%;
    margin-left: 5px;
    
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  background-color: #999;
  border-radius: 10px;

  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => (!props.library ? "5px" : "16px")};
  gap: 12px;
  flex: 1;
  
  

  @media only screen and (max-width: 600px) {
    margin-top: 0;
    width: calc((100% - 15px) * 0.4);
    height: 90%;
    flex: none;
    flex-direction: column;
    
  }
`;

const ChannelImage = styled.img`
  height: ${(props) => (!props.library ? "25px" : "36px")};
  width:  ${(props) => (!props.library ? "25px" : "36px")};
  border-radius: 50%;
  background-color: #333;
  object-fit: cover;

  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Texts = styled.div`
 width: calc(100%);
 text-decoration: none;
@media only screen and (max-width: 600px) {
    display: flex;
    
    flex-direction: column;
    top: 10px;
    /* background-color: inherit; */
}
   `;

const Title = styled.h1`
text-decoration: none;
  font-size: ${(props) => (!props.library ? "12px" : "16px")};
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 600px) {
    font-size: 14px;
  }
`;
const ChannelName = styled.h2`
text-decoration: none;
  font-size: ${(props) => (!props.library ? "10px" : "14px")};
  margin: ${(props) => (!props.library ? "5px 0px" : "9px 0px")};
  color: ${({ theme }) => theme.textSoft};

  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const Info = styled.div`
text-decoration: none;
  font-size: ${(props) => (!props.library ? "10px" : "14px")};
  color: ${({ theme }) => theme.textSoft};

  @media only screen and (max-width: 600px) {
    margin-top: 5px;
    font-size: 12px;
  }
`;



const SavedVideoCard = ({ videoId, library }) => {
  const [video, setVideo] = useState({});
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`/videos/find/${videoId}`);
        setVideo(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchVideo();
  }, [videoId]);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`/users/find/${video.userId}`);
        setChannel(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChannel();
  }, [video.userId]);

  return (
    <Container library={library}>
      <StyledLink
        to={`/video/${video._id}`}
      >
        <ImgDiv>
          <Image src={video.imgUrl} />
        </ImgDiv>
      
      <Details>
        <ChannelImage src={channel ? channel.img : emptyAvatarImg} />
        <Texts>
          <Title>{video.title}</Title>
          <ChannelName>{channel ? channel.name : "Deleted User"}</ChannelName>
          <Info>
            {video.views} views • {format(video.createdAt)}
          </Info>
        </Texts>
      </Details>
      </StyledLink>
    </Container>
  );
};

export default SavedVideoCard;
