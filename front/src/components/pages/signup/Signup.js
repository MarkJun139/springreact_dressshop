import React, { useState } from "react";
import { Form, Button, InputGroup, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Signup.css";
import privacyPolicy from "./privacyPolicy.json";

function SignUp() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <div className="center-box">
      <div className="signupbox">
		<h2>회원가입</h2>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" placeholder="이름을 입력하세요" />
          </Form.Group>

          <Form.Group controlId="formUsername">
            <Form.Label>아이디</Form.Label>
            <InputGroup>
              <Form.Control type="text" placeholder="아이디를 입력하세요" />
              <Button variant="outline-secondary">중복 확인</Button>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>전화번호</Form.Label>
            <InputGroup>
              <Form.Control type="tel" placeholder="전화번호를 입력하세요" />
              <Button variant="outline-secondary">인증</Button>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="email" placeholder="이메일을 입력하세요" />
          </Form.Group>

          <Form.Group controlId="formEmailAgree">
            <Form.Check type="checkbox" label="이메일 수신 동의" />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>비밀번호</Form.Label>
            <Form.Control type="password" placeholder="비밀번호를 입력하세요" />
          </Form.Group>

          <Form.Group controlId="formPasswordConfirm">
            <Form.Label>비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
            />
          </Form.Group>

          <Form.Group controlId="formAgree">
            <Form.Check
              type="checkbox"
              label={
                <>
                  <span
                    onClick={(event) => {
                      event.preventDefault();
                      openModal();
                    }}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    개인정보 수집 및 이용
                  </span>
                  에 동의합니다.
                </>
              }
            />
          </Form.Group>

          <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>개인정보 수집 및 이용</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {privacyPolicy.map((item, index) => (
                <div key={index} className="modal-item">
                  <h5>{item.title}</h5>
                  <hr />
                  <p dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              ))}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                닫기
              </Button>
            </Modal.Footer>
          </Modal>

          <div className="form-footer">
            <Button variant="outline-secondary" type="submit">
              회원가입
            </Button>
            <Button variant="outline-secondary" type="button" to="/login">
              <Link to="/login" className="text-secondary link">
                돌아가기
              </Link>
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
