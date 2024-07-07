import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import SendIcon from "@mui/icons-material/Send";
// import channel from '../img/channel.png'
import axios from "axios";
import { useSelector } from "react-redux";

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const InputWrapper = styled.div`
  display: flex;
  font-size: 20px;
  height: 50px;
  width: 60%;
`;

const Input = styled.input`
  display: flex;
  align-items: end;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.soft};
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  outline: none;
  padding: 5px;
  width: 100%;
  font-size: 20px;
`;

const Icon = styled.div`
  color: ${({ theme }) => theme.text};
  cursor: pointer;
`;

const Comments = ({ videoId }) => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentVideo } = useSelector((state) => state.video);

  const [comments, setComments] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [newComment, setNewComment] = useState({});

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (error) {}
    };
    fetchComments();
  }, [videoId]);

  const handleClick = async () => {
    setNewComment({
      userId: currentUser._id,
      videoId: currentVideo._id,
      desc: newCommentText,
    });
    try {
      await axios.post(`/comments`, newComment);
      setComments((prev) => [...prev, newComment]);
      setNewCommentText("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      {currentUser && (
        <>
          <NewComment>
            <Avatar src={currentUser?.img} />
            <InputWrapper>
              <Input
                value={newCommentText}
                placeholder="Add a comment.."
                onChange={(e) => setNewCommentText(e.target.value)}
              />
            </InputWrapper>
            <Icon>
              <SendIcon onClick={handleClick} />
            </Icon>
          </NewComment>
        </>
      )}

      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
