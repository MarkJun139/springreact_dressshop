import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from 'react-router-dom';
import { setProductList } from '../../../state/productSlice';

const Category = (props) => {
  const isCategoryOpen = useSelector(state => state.menu.isCategoryOpen);
  const [width, setWidth] = useState("280px");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState({});

  useEffect(() => {
    setWidth(isCategoryOpen ? "280px" : "0px");

    fetch("/product_data.json")
      .then((res) => res.json())
      .then((data) => {
        const categories = data.reduce((acc, item) => {
          if (!acc[item.대분류]) {
            acc[item.대분류] = [];
          }
          if (!acc[item.대분류].includes(item.소분류)) {
            acc[item.대분류].push(item.소분류);
          }
          return acc;
        }, {});
        setCategories(categories);
      });
  }, [isCategoryOpen, dispatch]);

  const style = { 
    width: width, 
    transition: "width 0.5s", 
    visibility: width === "0px" ? "hidden" : "visible",
    overflow: "hidden"
  };

  const handleSearch = (searchTerm) => {
    fetch("/product_data.json")
      .then((res) => res.json())
      .then((data) => {
        const filteredData = data.filter((item) => item.소분류.includes(searchTerm));
        dispatch(setProductList(filteredData));
        navigate(`/?category=${searchTerm}`);
      });
  };

  const handleAll = () => {
    fetch("/product_data.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch(setProductList(data));
        navigate("/");
      });
  };

  return (
    <div style={style} className=''>
      <hr/>
      <h3>Cartegory</h3>
      <hr/>
      <Accordion>
        <h5 onClick={handleAll}>ALL</h5>
        {Object.keys(categories).map((category, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header className="accordion-header">{category}</Accordion.Header>
            <Accordion.Body>
              {categories[category].map((subcategory, subIndex) => (
                <p key={subIndex} onClick={(event) => handleSearch(event.target.textContent)}>
                  {subcategory}
                </p>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default Category;
