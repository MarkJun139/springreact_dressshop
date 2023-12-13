import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Header.css";
import { BsSearch } from "react-icons/bs";
import Header_Guest from './Header_Guest';
import Header_User from './Header_User';
import Header_Admin from './Header_Admin';
import { useSelector, useDispatch } from 'react-redux';
import { setProductList } from '../../state/productSlice';

function Header(props) {
  const dispatch = useDispatch();
  
  const isLogin = useSelector(state => state.login.isLogin);
  const [isPermission, set_isPermission] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const list = useSelector((state) => state.product.list);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialSearchTerm = searchParams.get('search') || '';
  const navigate = useNavigate();
  

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
        const filteredData = data.filter((item) => item.상품이름.includes(searchTerm));
        dispatch(setProductList(filteredData));
      });
    navigate(`/?search=${searchTerm}`);
  };

  const getAllProducts = () => {
    fetch("/product_data.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProductList(data));
      });
      setSearchTerm('');
  };

  return (
    <>
      <div className="d-flex align-items-center div-header">
        <Link to="/" onClick={getAllProducts}>
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
          <Link className="header" to='/' onClick={getAllProducts}>Home</Link>
          |
          <Link className="header" to='/'>최근 본 상품</Link>
          |
          {button}
        </div>
      </div>
    </>
  );
}

export default Header;
