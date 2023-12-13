import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../../state/loginSlice';
import axios from 'axios';
import "./Login.css";
import { setUserNick } from '../../../state/userSlice';

const Login = (props) => {
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
        uId: username,
        uPw: password
    };
    console.log(data);

    const response = await axios.post("http://localhost:3001/login", data);

    if(response.data) {
        dispatch(setLogin(true));
        console.log(response.data);
        const userNickFromResponse = response.data.unick;
        dispatch(setUserNick(userNickFromResponse));
        navigate('/');
    } else {
        dispatch(setLogin(false));
        console.log('로그인 실패');
    }
  }
  
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="border border-dark p-5">
          <h2 className="mb-4">로그인</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">아이디:</label>
              <input type="text" id="username" className="form-control" onChange={e => setUsername(e.target.value)} />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">비밀번호:</label>
              <input type="password" id="password" className="form-control" onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-outline-secondary">로그인</button>
            <Link to="/sign_up">
            <button type="button" className="btn btn-outline-secondary">회원가입</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
