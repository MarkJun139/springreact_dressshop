import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

const Category = (props) => {
  const isCategoryOpen = useSelector(state => state.menu.isCategoryOpen);
  const [width, setWidth] = useState("280px");

  useEffect(() => {
    setWidth(isCategoryOpen ? "280px" : "0px");
  }, [isCategoryOpen]);

  const style = { 
    width: width, 
    transition: "width 0.5s", 
    visibility: width === "0px" ? "hidden" : "visible",
    overflow: "hidden" // 내부 요소가 벗어나지 못하도록 설정
  };

  const buttonStyle = {
    width: "100%", // 버튼의 너비를 부모 div의 너비와 동일하게 설정
    height: "40px", // 버튼의 높이를 고정
    left: 0, // 왼쪽으로부터의 거리
    transition: "left 0.5s" // 왼쪽으로부터의 거리를 애니메이션화
  };

  return (
    <div style={style}>
        <Button  style={buttonStyle}>카테고리</Button>
    </div>
  );
};

export default Category;
