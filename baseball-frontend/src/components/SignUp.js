import React, {useState} from "react";

/*
f12를 누르고 console(콘솔) 창에서
error가 없는지 확인

만약 error가 뜬다면
백엔드 서버와 연길이 안되어 있을 가능성이 높음
*/

const Signup = () => {
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [pwCheck, setPwCheck] = useState('');
    const [name, setName] = useState('');
    const [result, setResult] = useState('');

    //아이디 중복검사와 중복검사 이벤트 핸들러
    //아이디 중복검사
    const [idValidation, setIdValidation] = useState(false);
                                                   //false : 사용불가, true : 사용가능

    //이벤트 핸들러
    const 아이디중복검사 = (eventId) => {
        //eventId : 현재 입력하는 이벤트가 발생한 Id
        setId(eventId);

        //Id가 4글자 미만이면 중복 검사 x
        if (eventId.trim().length < 4) {//입력 받은 아이디를 공백제거한 총 길이가 4보다 적다면
                  //trim() : 입력 받은 아이디를 양쪽으로 공백제거 함
                         //length : 길이
            setIdValidation(false);
            return;
        }

        //DB에 중복되는 아이디가 있는지 비동기로 아이디 중복검사 수행
        //axios나 fetch를 사용할 수 있음
        fetch("/idCheck?id=" + eventId)
            //"/idCheck?id=" + eventId : SpringBoot Controller와 연결할 mapping URL
            .then (response => response.text())
            .then (result => {
                //중복이 아닐 때 true, 중복이면 false
                if (Number(result) === 0) {
                  //Number(result) === 0 : 나중에 SpringBoot에서 아이디가 중복되지 않았으면 0을 전달
                  //                       아이디가 중복이면 0 이외의 값을 전달
                  //                       ex. 결과전달을 0을 사용하지 않고 "중복"글자 전달 가능
                  //                           Number(result) === "중복아님"
                  //                           하지만 한글은 깨질 수 있기 때문에
                    setIdValidation(true);
                } else {
                    setIdValidation(false);
                }
            })
    }

    //회원가입버튼
    const 회원가입버튼 = () => {
        //아이디 유효하지 않으면 가입x
        if(!idValidation) {
            alert('아이디가 유효하지 않습니다.');
            return;
        }

        //비밀번호, 비밀번호 확인이 일치하지 않으면 가입x
        if (pw !== pwCheck) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        //회원가입 비동기 요청
        const input값들 = {}; //처음엔 들어온 값이 없으니 빈 공간으로 설정
        input값들.id = id;//id값이 들어오면 input값들에 id값을 작성
        input값들.pw = pw;//pw값이 들어오면 input값들에 pw값을 작성
        //만약 input에 id값으로 khc를 작성하고, pw값으로 1q2w3e4r을 작성하면
        /*
        const input값들 = {             }; 에서
              input값들 = {khc, 1q2w3e4r}; 로 변경됨
        */
        input값들.name = name;

        fetch("/signup", {
            method: "POST",
                //SpringBoot Container에 @PostMapping("/signup") 에 전달하겠다는 표시
            headers: {"Content-Type" : "application/json"}, 
          //headers : 메일로 치면 메일주소, 메일제목처럼 초기에 어떤 것을 보내는지 설정
                //<form>태그에는 "Content-Type" : "application/json"이 기본으로 생략되어 작성
                    //"Content-Type" : 데이터를 전달할 때 이미지 파일인지, 동영상 파일인지,
                    //                 다중이미지파일인지, 글자만 있는지 정보 전달
                                     //"application/json" : 
                                      //application : 코딩하는 폴더 자체를 의미
                                      //              코딩하는 폴더 1개 = 어플리케이션 1개
                                                  //json : 사용자나 개발자가 작성한 여러 값을
                                                  //       key-value 형태로 데이터를 1개 이상
                                                  //       주고 받을 수 있는 형태       
            body : JSON.stringify(input값들)//사용자가 작성한 모든 값을 보내기
          //body : 내용, 본문 작성
        })

        //결과 응답 받아서 저장해놓고
        .then(response => response.text())
        .then(result => {
            if (Number(result) > 0) {//결과가 0보다 크다면 결과가 ==1 이면 회원강비 완료)
                setResult('회원가입성공!~');
                //input값들 모두 초기화
                setId('');
                setPw('');
                setPwCheck('');
                setName('');
            } else {
                setResult('회원가입 실패~!');
            }
        })
    }

    return (
        <div className="signup-container">
            {/*
            원래는 다음과 같이 작성해왔음
            <label for="input에 작성된 id값과 일치하는값을 작성"></label>

            하지만 label 태그 안에 for 값을 작성하고 싶지 않다면
            <label><input/><label>
            처럼 input태그를 label태그 안에 작성해주면 for를 작성한 것과 동일하게 설정

            ex. <label for="abc"></label><input id=abc"/> 와
                <label><input id="abc"/></label>은 똑같음
            */}
            <label>  ID :  
                <input type="text" 
                    onChange={e => 아이디중복검사(e.target.value)}
                    value={id}
                    className={idValidation ? '' : 'id-err'}/>
            </label>

            <label> PW : 
                <input type="password" 
                       onChange={e => setPw(e.target.value)}
                       value={pw}/>
            </label>

            <label> PW CHECK : 
                <input type="password" 
                       onChange={e => setPwCheck(e.target.value)}
                       value={pwCheck}/>
            </label>

            <label> NAME : 
                <input type="text" 
                       onChange={e => setName(e.target.value)}
                       value={name}/>
            </label>

            <button onClick={회원가입버튼}>가입하기</button>
            <hr/>

            {/* 회원가입이 무사히 완료됐는지 결과 표시 */}
            <h3>{result}</h3>
        </div>
    ) 
}

export default Signup;