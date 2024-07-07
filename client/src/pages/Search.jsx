import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import Card from '../components/Card';
import { useLocation } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const EmptyCase = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  text-align: center;
`;

const Search = () => {
    const [videos, setVideos] = useState([]);
    const query = useLocation().search
    

    useEffect(() => {
      const fetchVideos = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/videos/search${query}`);
        setVideos(res.data);
      };
      fetchVideos();
    }, [query]);
    return (
    <Container>
      {videos.map(video => (
          <Card key={video._id} video={video}/>
      ))}
      {videos.length === 0 && <EmptyCase>No search Results.</EmptyCase>}
    </Container>
    );
  };

export default Search
