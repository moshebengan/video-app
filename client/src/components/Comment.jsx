import React, { useEffect, useState } from "react";
import styled from "styled-components";
import channel from "../img/channel.png";
import { useSelector } from "react-redux";
import axios from "axios";
import { format } from "timeago.js";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text};
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({comment}) => {
  // const {currentUser} = useSelector(state => state.user)
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/find/${comment.userId}`)
        setUser(res.data)
      } catch (err) {
        
      }
    }
    fetchUser()
  }, [comment.userId])
  return (
    <Container>
      <Avatar src={user.img} />
      <Details>
        <Name>
          {user.name} <Date>{format(comment.createdAt)}</Date>
        </Name>
        <Text>
        {comment.desc}
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;
