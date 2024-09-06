import React, {useState, useEffect} from "react";

const Login = () => {
    const [userInfo, setUserInfo] = useState(null);
    
    useEffect(() => {
        const 유저정보 = () => {
            fetch('http://localhost:9090/userInfo')
            .then(가져온응답결과 => {
                return 가져온응답결과.json();
            })
            .then( data => {
                setUserInfo(data);
            })
            .catch(err => {
                console.error("Error user INFO : ", err);
            })
        };
        
        유저정보();
    }, [])

    return (
        <>
            {userInfo ? (
                <div>
                    <h1>로그인 완료!</h1>
                    <div>{ JSON.stringify( userInfo, null, 2 ) }</div>
                </div>
            )
            : (
                <a href="http://localhost:9090/api/naverLogin">
                    <img height="50" src="http://static.nid.naver.com/oauth/small_g_in.PNG" />
                </a>
            )}
        </>
    )
}

export default Login;