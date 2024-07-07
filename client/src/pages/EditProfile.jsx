import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import CloseIcon from "@mui/icons-material/Close";
import Channel from '../img/channel.png'

import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  import app from "../firebase";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../redux/userSlice';

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const Wrapper = styled.div`
  width: 600px;
  height: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.button`
  background-color: ${({ theme }) => theme.bgLighter};
  color: white;
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  z-index: 999;
`;


const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.label`
  font-size: 14px;
`;

const Image = styled.img`
    height: 40px;
    width: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: none;
`

const EditProfile = ({setOpenEdit}) => {
    const {currentUser} = useSelector(state => state.user)
    const [img, setImg] = useState(null);
    const [imgPerc, setImgPerc] = useState(0);
    const imgInputRef = useRef();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState(currentUser);

    const uploadFile = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setImgPerc(Math.round(progress))
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
                  default:
                    break;
              }
            }, 
            (error) => {
              console.log(error)
              }, 
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setInputs((prev) => {
                    return { ...prev, img : downloadURL}
                })
              });
            }
          );
        }

        useEffect(() => {
            img && uploadFile(img)
        }, [img])



    const handleImageClick = () => {
        imgInputRef.current.click();
    }

    const handleChange = (e) => {
        setInputs((prev) => {
          return { ...prev, [e.target.name]: e.target.value };
        });
      };

      
    
      const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/users/${currentUser._id}`, inputs )
            dispatch(loginSuccess(res.data))
            setOpenEdit(false)
            res.status === 200 && navigate('/profile');
            
        } catch (err) {
            console.log(err)
            
        }
       
      }
      
  return (
    <Container>
    <Wrapper>
    <Close onClick={() => setOpenEdit(false)}>
          <CloseIcon />
        </Close>
      <Title>Edit Your Profile</Title>
      <Label>Profile photo:</Label>
      <Label>Image:</Label>
      {imgPerc > 0 ? (
        "Uploading: " + imgPerc + "%"
      ) :(<>
      <Input
          type="file"
          accept="image/*"
          onChange={(e) => setImg(e.target.files[0])}
          hidden="true"
          ref={imgInputRef}
          
        />
      <Image src={currentUser.img || Channel }
      onClick={handleImageClick} />
        
        </>
      )}
      <Label>Name:</Label>
      <Input
      
        type="text"
        name="name"
        placeholder={currentUser.name}
        onChange={handleChange}
      />
      <Label>Email:</Label>
      <Input
        type="text"
        name="email"
        placeholder={currentUser.email}
        onChange={handleChange}
      />
      <Label>Password:</Label>
      <Input
        type="password"
        name="password"
        placeholder="password"
        onChange={handleChange}
      />
      
        
      

      <Button onClick={handleUpload}>Upload</Button>
    </Wrapper>
  </Container>
  )
}

export default EditProfile
