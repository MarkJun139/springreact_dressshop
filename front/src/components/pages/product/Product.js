import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCategory } from "../../../state/store";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Category from "../category/Category";
import { Container, Row, Col, ToggleButton as BSToggleButton} from "react-bootstrap";
import { PiRectangleFill } from "react-icons/pi";
import { ImCross } from "react-icons/im";
import { IoEllipsisHorizontalOutline } from "react-icons/io5";
import { IoAppsOutline } from "react-icons/io5";

const Product = (props) => {
  const dispatch = useDispatch();
  const isCategoryOpen = useSelector((state) => state.menu.isCategoryOpen);
  const [list, setList] = useState([]);
  const [layout, setLayout] = useState("FOUR");

  useEffect(() => {
    fetch("/product_data.json")
      .then((res) => res.json())
      .then((data) => {
        setList(data);
      });
  }, []);

  const changeLayout = () => {
    setLayout((prevLayout) => (prevLayout === "FOUR" ? "EIGHT" : "FOUR"));
  };

  const handleToggle = () => {
    dispatch(toggleCategory());
  };

  return (
    <>
      <Category />
      <div style={{marginTop:"20px", marginLeft:"5px"}}>
        <BSToggleButton onClick={handleToggle} variant="outline-secondary">
          {isCategoryOpen ? <ImCross /> : <IoEllipsisHorizontalOutline />}{" "}
        </BSToggleButton>
      </div>
      <div style={{marginTop:"20px",marginLeft:"5px"}}>
      <Button onClick={changeLayout} variant="outline-secondary">
          {layout === "FOUR" ? <IoAppsOutline /> : <PiRectangleFill />}
        </Button>
        </div>
      <Container>
        <div style={{margin:"50px"}}/>
        <Row>
          {list.map((item) => {
            return (
              <Col
                sm={12}
                md={6}
                lg={layout === "FOUR" ? 3 : 2}
                xl={layout === "FOUR" ? 3 : 2}
                key={item.상품이름}
              >
                <Card className="mb-4 card-fixed">
                  <a href={`/product/${item.상품이름}`}>
                <Card.Img variant="top" src={item.썸네일이미지} style={{ height: layout === "FOUR" ? '400px' : '200px', objectFit: 'cover' }} />
                </a>
                  <Card.Body>
                      <Card.Title style={{ fontSize: "12px" }}>
                        {item.상품이름}
                      </Card.Title>
                    <Card.Text>{item.가격}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default Product;
