import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import SavedVideoCard from "../components/savedVideoCard";

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;

  @media only screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    min-height: 100vh;
  
   
  }
`;

const EmptyCase = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const Homepage = ({ type }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [videos, setVideos] = useState([]);
  const [reload, setReload] = useState(Date.now());

  const handleForceReload = () => {
    setReload(Date.now()); // Update reload to current timestamp to trigger useEffect
  };

  document.addEventListener("load", handleForceReload);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        let response;
        switch (type) {
          case "random":
          case "trend":
          case "sub":
            response = await axios.get(`/videos/${type}`);
            setVideos(response.data);
            break;
          case "music":
          case "sports":
          case "movies":
          case "gaming":
          case "live":
            response = await axios.get(`/videos/tags?tags=${type}`);
            setVideos(response.data);
            break;
          case "library":
            setVideos(currentUser.savedVideos)
            break;

          default:
            throw new Error("Unknown type");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchVideo();
  }, [type, reload, currentUser.savedVideos]);

  return (
    <Container>
      {type === "library"
        ? videos.map((videoId) => (
            <SavedVideoCard videoId={videoId} library/>
          ))
        : videos.map((video) => <Card key={video._id} video={video} />)}
      {videos.length === 0 && <EmptyCase></EmptyCase>}
    </Container>
  );
};

export default Homepage;
