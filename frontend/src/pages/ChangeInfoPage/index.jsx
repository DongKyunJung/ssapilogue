import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import API from "../../api/API";
import store from "../../utils/store";

const ChangeInfoPage = () => {

  const [inputs, setInputs] = useState({
    nickname: '',
    github: '',
    email: '',
    greeting: '',
  });
  const { nickname, github, email, greeting } = inputs;
  const navigate = useNavigate();

  const getInfo = async () => {
    store.getToken();
    const response = await API.get("/api/user")
    setInputs(response.data.user);
  }

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const changeInfo = () => {
    API.put("/api/user", {
      email: email,
      nickname: nickname,
      github: github,
      greeting: greeting,
      image: null,
    })
  }
  
  const withDraw = () => {
    store.getToken();
    API.delete("api/user");
    store.setToken("logout");
    return;
  }

  useEffect(() => {
    getInfo();
  }, [])
  
  return (
    <>
      <h1>회원정보 변경 페이지!</h1>
      닉네임 <input name="nickname" onChange={e => handleOnChange(e)} value={nickname}/>
      이메일 <input name="email" onChange={e => handleOnChange(e)} value={email}/>
      GITHUB <input name="github" onChange={e => handleOnChange(e)} value={github}/>
      자기소개 <input name="greeting" onChange={e => handleOnChange(e)} value={greeting}/>
      <button>변경하기</button>

      <button onClick={withDraw}>회원탈퇴</button>
    </>
  )
}

export default ChangeInfoPage;