import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:  #000000a7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.bg};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  max-width: 400px;
  width: 100%;
  text-align: center;
  z-index: 999;
`;

const ModalTitle = styled.h2`
  margin-bottom: 20px;
`;

const ModalButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${(props) => (props.primary ? "#007BFF" : "#6c757d")};
  
  &:hover {
    background-color: ${(props) => (props.primary ? "#0056b3" : "#5a6268")};
  }
`;

const Modal = ({ isOpen, onClose, onConfirm, video }) => {
  if (!isOpen) return null;
  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>Are you sure you want to delete your {video ? 'Video' : 'account'} ?</ModalTitle>
        <ModalButtonContainer>
          <ModalButton onClick={onConfirm}>Yes</ModalButton>
          <ModalButton onClick={onClose}>Cancel</ModalButton>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Modal;
