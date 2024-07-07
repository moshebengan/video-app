import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import emptyAvatarImg from "../img/Avatar.png";
import axios from "axios";

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  background-color: ${({ theme }) => theme.bgLighter};
  
  gap: 10px;

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
display: ${(props) => (props.type === "sm" && "flex")};
width: ${(props) => (props.type === "sm" && "100%")};


@media only screen and (max-width: 600px) {
  
  width:100%;
  
  height: 100%;
  gap: 10px;
  text-decoration: "none";
  color: "inherit";
  background-color: inherit;
  align-items: center;
    display: flex;
}
    
    

`;

const ImgDiv = styled.div`
width: 100%;
height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
flex: 1;


@media only screen and (max-width: 600px) {
  flex: none;
  width:calc((100% - 15px) *0.6);
  height: 90%;
  margin-left: 5px;
  
  
}
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  background-color: #999;
  border-radius: 10px;
  
  object-fit: cover;

`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => (props.type !== "sm" ? "16px" : "0px")};
  align-items: ${(props) => (props.type === "sm" && "center")};
  gap: 12px;
  flex: 1;
  margin-left: ${(props) => (props.type === "sm" && "10px")};
 

  @media only screen and (max-width: 600px) {
    margin-top: 0;
    width: calc((100% - 15px)*0.4);
    height: 90%;
    flex: none;
    flex-direction: column;
   
    
    
  }
`;

const ChannelImage = styled.img`
  height: 36px;
  width: 36px;
  border-radius: 50%;
  background-color: #333;
  object-fit: cover;
  display: ${(props) => props.type === "sm" && "none"};

  @media only screen and (max-width: 600px) {
    display: none;
  }
  
`;

const Texts = styled.div`
  @media only screen and (max-width: 600px) {
    display: flex;
    
    flex-direction: column;
    top: 10px;
    /* background-color: inherit; */
    
    width: calc(100%);
    
    
  }
`;
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};

  @media only screen and (max-width: 600px) {
    font-size: 14px;
  }
  
`;
const ChannelName = styled.h2`
  font-size: 14px;
  margin: 9px 0px;
  color: ${({ theme }) => theme.textSoft};

  @media only screen and (max-width: 600px) {
    font-size: 12px;
  }
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};

  @media only screen and (max-width: 600px) {
    margin-top: 5px;
    font-size: 12px;
  }
`;





const Card = ({ type, video }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/find/${video.userId}`);
        setChannel(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchChannel();
  }, [video.userId]);

  return (
    
      <Container type={type}>
        <StyledLink to={`/video/${video._id}`} type={type}>
        <ImgDiv>
        <Image src={video.imgUrl} type={type} />
        </ImgDiv>
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel ? channel.img : emptyAvatarImg}
          />
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

export default Card;
