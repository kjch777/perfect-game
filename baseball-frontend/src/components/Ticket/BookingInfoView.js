import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoginContext from "../Login/LoginContext";

export const BookingInfoView = () => {
    const { loginMember } = useContext(LoginContext);
    const [ticketInfo, setTicketInfo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        if(!loginMember) {
            alert("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            navigate("/login");
            return;
        }

        const ticketData = async () => {
            try {
                const response = await axios.get('http://localhost:9090/ticket/bookingInfoView');
                setTicketInfo(response.data);
            } catch (error) {
                console.error("예매 정보 불러오기 실패", error);
            }
        };
        ticketData();
    }, [loginMember, navigate]);

    if (!loginMember) {
        return null;
    }

    return (
        <>
        
        </>
    )
}