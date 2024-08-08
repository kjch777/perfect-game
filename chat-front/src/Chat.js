import React, {useState, useEffect, useRef} from 'react';
import { Client } from '@stomp/stompjs'; //   Client from 'stomp/stompjs'  ->   @stomp/stompjs
import SockJS from 'sockjs-client';
import './Chat.css';
import Emoji from './Emoji.js';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [fontSize, setFontSize] = useState('16px');
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const socket = new SockJS('http://localhost:9001/ws');// java 쪽의 서버포트 설정과 맞춰서 작성
        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {},
            debug: function (str){
                console.log('STOMP Debug:', str);
            },
            onConnect: function(frame){
                console.log('STOM Connected:', frame);
                setConnected(true);
                client.subscribe('/topic/messages',(response)=>{ // java 쪽의 컨트롤러(@SendTo)와 맞춰서 작성
                    const newMessage = JSON.parse(response.body);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
            },
            onStompError: function (frame){
                console.error('STOMP Error:', frame);
            },
            onWebSocketError: function (error) {
                console.error('웹소켓 에러:', error);
            }
        });
        client.activate();
        setStompClient(client);

        return () =>{
            if (client){
                client.deactivate();
            }
        };
    },[]);
    const messagesEndRef = useRef('');

    

    useEffect(() => {
        // 메시지가 업데이트될 때마다 자동으로 스크롤을 아래로 이동
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }, [messages]);


    const sendMessage = () => {
        if (stompClient && connected && message){
            stompClient.publish({
                destination: '/app/chat.send', //Java 쪽의 컨트롤러(@MessageMapping)와 맞춰서 작성
                body: JSON.stringify({sender: 'User', content: message})
            });
            setMessage('');
        } else if (!connected){
            console.error('연결이 안됩니다. 관리자에 문의하세요.');
        }
    };
    
    const pressEnter = (e) =>{
        if(e.key === "Enter"){            
            sendMessage();
        } 
    };
    
    const [emojiPick, setEmojiPick] = useState(false);
    const emojiPicker = () => {
        setEmojiPick(!emojiPick);
    }

    const emojiMessage = (emoji) => {
        setMessage((prevMessages) => prevMessages + emoji);
    }
    
    const deleteMessage = (index) => {
        const afterDelete = messages.filter((message,i) => i !== index);
        setMessages(afterDelete);
    }
    const handleRefresh = () => {
        setMessages([]);
    }
    const handleFontSizeChange = (e) => {
        setFontSize(e.target.value);
    }
    
    return(
        <>        
        <div className = 'chat-container' >       
            {emojiPick && <Emoji onSelect={emojiMessage}/>}
            <div ref={chatContainerRef} style={{fontSize}}>          
            {messages.map((msg, index) => (
                <div key={index}>
                <strong>{msg.sender}</strong>: {msg.content}
                <button className='btn-delete' 
                onClick={() => {deleteMessage(index)}}>&#10060;</button>
                </div>
                ))}          
             <div ref={messagesEndRef} />
            </div>  
            </div>
        <div className='chat-input-section'>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-emoji-smile emoji-icon"
            viewBox="0 0 16 16"
            onClick={emojiPicker} // 아이콘 클릭 시 이모지 리스트 보이기
            >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
            <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5"/>
          </svg>  
            <input 
            className='chat-inputbar'
            type="text" 
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            disabled={!connected}
            placeholder='메시지를 입력하세요.'
            onKeyDown={pressEnter}            
            />    
             <button className='button-chat' onClick={sendMessage} disabled={!connected}>
                채팅
            </button>
            <button onClick={handleRefresh} className='btn-refresh'>
                새로고침
            </button>
            <label htmlFor='font-size'>글자크기</label>
            <select id="font-size" value={fontSize} onChange={handleFontSizeChange}>
                <option value="14px">작게</option>
                <option value="16px">보통</option>
                <option value="18px">크게</option>
                <option value="20px">아주 크게</option>
            </select>
            
        </div>          
        {!connected && <p>서버 연결중...</p>}
        </>
    );
};

export default Chat;