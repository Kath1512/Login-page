import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import EmojiPicker from 'emoji-picker-react';
import { FaRegSmile } from "react-icons/fa";


export default function ChatInput({handleSendMessage}) {

    const [currentMessage, setCurrentMessage] = useState('');
    const [isShowEmoji, setIsShowEmoji] = useState('');

    function handleInputMessage(event) {
        setCurrentMessage(event.target.value);
    }

    function isValidatedMessage(message) {
        if(!message.trim()) return false;
        return true;
    }

    function handleSubmit(event) { 
        event.preventDefault();
        if(!isValidatedMessage(currentMessage)){
            return;
        }
        handleSendMessage(currentMessage);
        setCurrentMessage('');
    }

    function handleEmojiClick({emoji}, event){
        setCurrentMessage(prev => prev + emoji);
        setIsShowEmoji(!isShowEmoji);
    }

    return (
        <div className="chat-input">
            <form onSubmit={handleSubmit} autoComplete="off">
                <input type="text" name="chatInput" value={currentMessage} onChange={handleInputMessage}
                    id="chatInput" placeholder="Start typing" />
                <button className="send-button button-icon">
                    <IoMdSend color="white" enableBackground="blue"/>
                </button>
                <div className="emoji-container">
                    <button className="emoji-button button-icon" onClick={(event) => {
                        event.preventDefault();
                        setIsShowEmoji(!isShowEmoji);
                    }}>
                        <FaRegSmile color="white" size="3em"/>
                    </button>
                    <div className="emoji-picker">
                        {isShowEmoji && <EmojiPicker onEmojiClick={handleEmojiClick}/>}
                    </div>
                </div>
            </form>
        </div>
    )
}