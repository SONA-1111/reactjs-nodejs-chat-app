import React, { useState,useEffect } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend , IoMdAttach} from "react-icons/io";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import axios from "axios";
import { uploadImageRoute } from '../utils/APIRoutes'
export const ChatInput = ({ handleSendMsg,setValue,setFile,file, setImage }) =>{
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };


  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };

  const uploadFile = async (data) => {
    try {
        return await axios.post(uploadImageRoute, data);
    } catch (error) {
        console.log('Error while calling newConversations API ', error);
    }
}


  useEffect(() => {
    const getImage = async () => {
        if (file) {
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);

            const response = await uploadFile(data);
            setImage(response.data);
        }
    }
    getImage();
}, [file])

  const onFileChange = (e) => {
    console.log(e);
    setMsg(e.target.files[0].name);
    setFile(e.target.files[0]);
}

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>       
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <label htmlFor="fileInput">
        <IoMdAttach size={29} style={{color:"#ffffff", paddingLeft:"5px", cursor:"pointer"}}/>
        </label>
        <input type="file" id="fileInput" style={{display:"none"}}  onChange={(e) => onFileChange(e)}/>
        <input
          type="text"
          placeholder="type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
        />
        <button type="submit">
        <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
   background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      padding:14px;
      border: none;
      
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem .7rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: .9rem;
        }
      }
      svg {
        font-size: 1.5rem;
        color: white;
      }
    }
  }
`;