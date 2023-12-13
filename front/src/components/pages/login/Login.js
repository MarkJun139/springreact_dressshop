import React from 'react';
import { Link } from 'react-router-dom';
import "./Login.css";

const Login = (props) => {
	return (
		<>
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="border border-dark p-5">
        <h2 className="mb-4">로그인</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">아이디:</label>
            <input type="text" id="username" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">비밀번호:</label>
            <input type="password" id="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-outline-secondary">로그인</button>
          <Link to="/sign_up">
          <button type="submit" className="btn btn-outline-secondary">회원가입</button>
          </Link>
        </form>
      </div>
    </div>
		</>
	);
};

export default Login;