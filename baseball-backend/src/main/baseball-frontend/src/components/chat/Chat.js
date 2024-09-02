import React, { useState, useEffect, useRef, useContext } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import '../../css/Chat.css';
import Emoji from './Emoji.js';
import LoginContext from '../Login/LoginContext.js';
import { DateTime } from 'luxon';
import axios from 'axios';
import '../../css/Emoji.css';


const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [stompClient, setStompClient] = useState(null);
    const [connected, setConnected] = useState(false);
    const [fontSize, setFontSize] = useState('16px');
    const chatContainerRef = useRef(null);
    const { loginMember, setLoginMember } = useContext(LoginContext);       
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [emojiPick, setEmojiPick] = useState(false);
    
    
    // STOMP 클라이언트 연결 설정
    useEffect(() => {
        const socket = new SockJS('http://localhost:9090/ws');
        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {},
            debug: function (str) {
                console.log('STOMP Debug:', str);
            },
            onConnect: function (frame) {
                console.log('STOMP Connected:', frame);
                setConnected(true);
                client.subscribe('/topic/messages', (response) => {
                    const newMessage = JSON.parse(response.body);
                    setMessages((prevMessages) => [...prevMessages, newMessage]);
                });
                client.subscribe('/topic/deleteMessage', (response) => {
                    const deleteMessage = JSON.parse(response.body);
                    console.log('Received deleteMessage:', deleteMessage); // 추가된 로그
                    if (deleteMessage && deleteMessage.message && deleteMessage.sendTime) {
                        setDeleteMessage(deleteMessage);
                    }
                });
            },
            onStompError: function (frame) {
                console.error('STOMP Error:', frame);
            },
            onWebSocketError: function (error) {
                console.error('웹소켓 에러:', error);
            }
        });
        client.activate();
        setStompClient(client);

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, []);

    // 메시지가 업데이트될 때마다 자동으로 스크롤을 아래로 이동
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        if (!loginMember || !loginMember.memberId) {
            console.log('로그인 정보가 없습니다.');
            return;
        }  
       
    }, [loginMember]);

    // 메시지 전송 함수
    const sendMessage = () => {
        if (!loginMember || !loginMember.memberId) {
            alert('로그인 후 이용하세요.');
            return;
        }

        if (stompClient && connected && message) {
            const memberProfile = loginMember.memberId;
            const sender = loginMember.memberId;
            const now = DateTime.local();
            const timeOnly = now.toFormat('HH:mm');
            const realtime = now.toFormat('yyyy-MM-dd HH:mm:ss');

            stompClient.publish({
                destination: '/app/chat.send',
                body: JSON.stringify({
                    profile: memberProfile,
                    sender: sender,
                    content: message,
                    nowtime: timeOnly,
                    presenttime: realtime
                })
            });
            setMessage('');
        } else if (!connected) {
            console.error('연결이 안됩니다. 관리자에 문의하세요.');
        }
        if (!loginMember || !loginMember.memberId) {            
            alert('로그인 후 이용하세요.');
            return;
        }
    };
    // 컴포넌트가 처음 렌더링될 때 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // 메시지가 업데이트될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

    // Enter 키로 메시지 전송
    const pressEnter = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    // 이모지 선택 기능
    const emojiPicker = () => {
        setEmojiPick(!emojiPick);
    };

    const emojiMessage = (emoji) => {
        setMessage((prevMessage) => prevMessage + emoji);
    };

    // 메시지 삭제 기능
    const operateDeleteMessage = async ({ msgSubstance, msgTime }) => {
        const memberId = loginMember.memberId;

        console.log('Attempting to delete message with params:');
        console.log('memberId:', memberId);
        console.log('message:', msgSubstance);
        console.log('sendTime:', msgTime);

        try {
            // 서버에 HTTP DELETE 요청을 보내기
            const response = await axios.delete('/chat/delete', {
                params: {
                    memberId: memberId,
                    message: msgSubstance,
                    sendTime: msgTime
                }
            });

            if (response.status === 200) {
                if (stompClient) {
                    stompClient.publish({
                        destination: '/app/chat.deleteMessage',
                        body: JSON.stringify({
                            memberId: memberId,
                            message: msgSubstance,
                            sendTime: msgTime
                        })
                    });
                }
            } else {
                console.error('Failed to delete message from the server');
            }
        } catch (error) {
            console.error('Failed to delete message:', error);
        }
    };

    // 삭제된 메시지를 UI에서 제거
    useEffect(() => {
        if (deleteMessage) {
            console.log('Updating messages state after deletion:', deleteMessage); 
            setMessages((prevMessages) =>
                prevMessages.filter(
                    (message) =>
                        !(message.content === deleteMessage.message && message.presenttime === deleteMessage.sendTime)
                )
            );
            setDeleteMessage(null);
        }
    }, [deleteMessage]);

    const handleDeleteClick = ({ msgSubstance, msgTime }) => {
        operateDeleteMessage({ msgSubstance, msgTime });
    };

    const handleFontSizeChange = (e) => {
        setFontSize(e.target.value);
    };

    const handleLogout = () => {
        // STOMP 연결 해제
        if (stompClient) {
            stompClient.deactivate();
            setStompClient(null);
            setConnected(false);
        }
    
        // 로그인 멤버 상태 초기화
        setLoginMember(null);
        
        // 메시지 상태 초기화
        setMessages([]);
    };

    return (
        <>
        <div className="chat-icon">
        <img src="./images/chat-glove-icon.png" alt="chat-icon" />
      </div>
        <img></img>
        <h3 className='chat-title'>퍼펙트게임 플레이</h3>
            <div className="chat-container" ref={chatContainerRef} style={{ fontSize }}>
                {emojiPick && <Emoji onSelect={emojiMessage} />}
                    {messages.map((msg, chatNo) => (
                       loginMember && loginMember.memberId ? ( 
                        <div key={chatNo}>
                            <strong>{msg.sender}</strong>: {msg.content}
                            <span className="chat-time">{msg.nowtime}</span>
                            {loginMember.memberId === 'admin' &&
                            <button
                                className="btn-delete"
                                onClick={() => handleDeleteClick({ msgSubstance: msg.content, msgTime: msg.presenttime })}
                            >
                                &#10060;
                            </button>}
                        </div>
                  
                    ) : null
                ))}
            </div>
          
            <div className="chat-input-section">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-emoji-smile emoji-icon"
                    viewBox="0 0 16 16"
                    onClick={emojiPicker}
                >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.5 3.5 0 0 0 8 11.5a3.5 3.5 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683M7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5m4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5" />
                </svg>

                <input
                    className="chat-inputbar"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={!connected}
                    placeholder="메시지를 입력하세요."
                    onKeyDown={pressEnter}
                />

                <button className="button-chat" onClick={sendMessage} disabled={!loginMember || !connected ||!message}>
                    채팅
                </button>
                
                <label className="font-size" htmlFor="font-size">
                    글자크기
                </label>
                <select id="font-size" value={fontSize} onChange={handleFontSizeChange} disabled={!loginMember}>
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