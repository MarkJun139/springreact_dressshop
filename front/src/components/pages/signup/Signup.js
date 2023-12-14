import React, { useState } from "react";
import { Form, Button, InputGroup, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";
import privacyPolicy from "./privacyPolicy.json";

function SignUp() {
  const [showModal, setShowModal] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);
  const [isPhoneVerified, setPhoneVerified] = useState(false);
  const [verificationCode, setVerificationCode] = useState(''); // 인증번호를 관리하는 상태 변수
  const [userInput, setUserInput] = useState(''); // 사용자가 입력한 인증번호를 관리하는 상태 변수
  const [showVerification, setShowVerification] = useState(false); // 인증번호 입력창과 확인 버튼의 표시 여부를 관리하는 상태 변수


  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  
  const navigate = useNavigate();

  const handleCheckVerificationCode = () => {
    if (userInput === verificationCode) {
      alert("인증이 완료되었습니다.");
      setPhoneVerified(true);
    } else {
      alert("인증번호가 일치하지 않습니다.");
    }
  };

  const handlePhoneCheck = () => {
    const phone = document.getElementById("formPhone").value;

    if (!phone) {
      alert("전화번호를 입력하세요.");
      return;
    }

    axios
      .post("http://localhost:3001/phonecheck", { phoneNumber: phone })
      .then((response) => {
        if (response.data) {
          alert("이미 가입된 전화번호입니다.");
          setPhoneVerified(false);
        } else {
          axios
            .post("http://localhost:3001/phonecheck3", { phoneNumber: phone })
            .then((response) => {
              setVerificationCode(String(response.data));
              console.log(response.data);
              setShowVerification(true); // 인증번호를 받은 후 인증번호 입력창과 확인 버튼을 표시
            })
            .catch((error) => {
              navigate('/error');  // front\src\components\pages\error\Error.js 페이지인 /error로 이동
            });
        }
      })
      .catch((error) => {
        navigate('/error');  // front\src\components\pages\error\Error.js 페이지인 /error로 이동
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
  
    const isFormValid = checkFormValidity(form);
    if (!isFormValid || !isUsernameAvailable || !isPhoneVerified) {
      if (!isFormValid) {
        alert("모든 필수 입력창을 채워주세요.");
      }else if (!isUsernameAvailable) {
        alert("아이디 중복확인을 완료해주세요.");
      }else if (!isPhoneVerified){
        alert("전화번호 인증을 완료해주세요.")
      }
      return;
    }
  
    const data = {
      uName: form.elements.formName.value,
      uId: form.elements.formUsername.value,
      uNick:form.elements.formUserNickname.value,
      uPhone: form.elements.formPhone.value,
      uEmail: form.elements.formEmail.value,
      uEmailCheck: form.elements.formEmailAgree.checked,
      uPw: form.elements.formPassword.value,
    };
  
    console.log(data);
  
    axios
      .post("http://localhost:3001/register", data)
      .then((response) => {
        alert("가입완료");
        navigate('/login');
      })
      .catch((error) => {
        navigate('/error');
      });
  };

  const handleUsernameCheck = () => {
    const id = document.getElementById("formUsername").value;
  
    if (!id) {
      alert("아이디를 입력하세요.");
      return;
    }
  
    axios
      .post("http://localhost:3001/idcheck", { id })
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          alert("이미 사용중인 아이디입니다.");
          setIsUsernameAvailable(false);
        } else {
          alert("사용가능한 아이디입니다.");
          setIsUsernameAvailable(true);
        }
      })
      .catch((error) => {
        navigate('/error');
      });
  };

  const checkFormValidity = (form) => {
    const formInputs = Array.from(form.elements);
    let isFormValid = true;
  
    formInputs.forEach((input) => {
      if (
        input.tagName === "INPUT" &&
        input.type !== "email" && // 이메일 입력칸 유효성 검사 제외
        input.type !== "checkbox" && // 이메일 수신동의 체크박스 유효성 검사 제외
        input.value.trim() === ""
      ) {
        isFormValid = false;
        input.classList.add("is-invalid");
  
        // 이메일 입력칸에서 'is-invalid' 클래스 추가 제외
        if (input.type === "email") {
          input.classList.remove("is-invalid");
        }
      } 
    });
  
    return isFormValid;
  };
  
  return (
    <div className="center-box">
      <div className="signupbox">
		<h2>회원가입</h2>
        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group controlId="formName">
            <Form.Label>이름</Form.Label>
            <Form.Control type="text" placeholder="이름을 입력하세요" />
          </Form.Group>

          <Form.Group controlId="formUsername">
            <Form.Label>아이디</Form.Label>
            <InputGroup>
              <Form.Control type="text" placeholder="아이디를 입력하세요" />
              <Button variant="outline-secondary" onClick={handleUsernameCheck}>중복 확인</Button>
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formUserNickname">
            <Form.Label>닉네임</Form.Label>
            <InputGroup>
              <Form.Control type="text" placeholder="닉네임을 입력하세요" />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="formPhone">
            <Form.Label>전화번호</Form.Label>
            <InputGroup>
              <Form.Control type="tel" placeholder="전화번호를 입력하세요" />
              <Button variant="outline-secondary" onClick={handlePhoneCheck}>인증</Button>
            </InputGroup>
          </Form.Group>

          {showVerification && (
        <Form.Group controlId="formVerification">
          <Form.Label>인증번호</Form.Label>
          <InputGroup>
          <Form.Control
  type="text"
  placeholder="인증번호를 입력하세요"
  onChange={(event) => setUserInput(event.target.value)}
  readOnly={isPhoneVerified}
  style={{
    backgroundColor: isPhoneVerified ? "#e9ecef" : "#fff", // 읽기 전용일 때 회색 효과 적용
    pointerEvents: isPhoneVerified ? "none" : "auto" // 읽기 전용일 때 포커스 못하게 함
  }}
/>
          <Button variant="outline-secondary" onClick={handleCheckVerificationCode} style={{
    backgroundColor: isPhoneVerified ? "#e9ecef" : "#fff", // 읽기 전용일 때 회색 효과 적용
    pointerEvents: isPhoneVerified ? "none" : "auto" // 읽기 전용일 때 포커스 못하게 함
  }}>확인</Button>
          </InputGroup>
        </Form.Group>
      )}

          <Form.Group controlId="formEmail">
            <Form.Label>이메일</Form.Label>
            <Form.Control type="email" placeholder="이메일을 입력하세요" isInvalid={false}/>
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
