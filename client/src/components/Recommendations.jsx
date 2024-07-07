import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./Card";

const Container = styled.div`
  flex: 2;
  
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const Recommendations = ({ tags }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/videos/tags?tags=${tags}`);
      setVideos(res.data);
    };
    fetchVideos();
  }, [tags]);
  return (
  <Container>
    {videos.map(video => (
        <Card key={video._id} type='sm' video={video}/>
    ))}
  </Container>
  );
};

export default Recommendations;
