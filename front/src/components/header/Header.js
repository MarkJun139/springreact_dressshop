import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Header.css";
import { BsSearch } from "react-icons/bs";
import Header_Guest from './Header_Guest';
import Header_User from './Header_User';
import Header_Admin from './Header_Admin';

function Header(props) {
  const [isLogin, set_isLogin] = useState(false);
  const [isPermission, set_isPermission] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState([]);

  let button;
  if (isLogin) {
    if (isPermission) {
      button = <Header_Admin />;
    } else {
      button = <Header_User />;
    }
  } else {
    button = <Header_Guest />;
  }

  const handleSearch = () => {
    fetch("/product_data.json")
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((item) => item.상품이름.includes(searchTerm)); // 검색어가 포함된 상품만 필터링
        setList(filteredData);
      });
  };
  return (
    <>
      <div className="d-flex align-items-center div-header">
        <Link to="/">
          <img src="/logo.png" className="img-fluid logo" alt="..." width="50px" />
        </Link>
        <div className="input-group">
        <input 
          type="text" 
          className="form-control" 
          placeholder="검색어를 입력하세요" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" onClick={handleSearch}>
            <BsSearch />
          </button>
        </div>
      </div>
        <div className='linkbox'>
          |
          <a className="header" href='/'>Home</a>
          |
          <a className="header" href='/'>최근 본 상품</a>
          |
          {button}
        </div>
      </div>
    </>
  );
}

export default Header;
