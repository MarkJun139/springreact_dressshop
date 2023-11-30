import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';

const SignupForm = ({ onSignup }) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [agreeEmail, setAgreeEmail] = useState(false);
  const [passwordError, setPasswordError] = useState(undefined);
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isPhoneChecked, setIsPhoneChecked] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!isIdChecked) {
      alert('아이디 중복 체크를 진행해주세요.');
      return;
    }
    const formData = {
      name,
      id,
      password,
      nickname,
      email,
      phoneNumber,
      agreeEmail,
    };
    console.log(formData);
    try {
      const response = await fetch('http://localhost:3001/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        // 가입 완료 후의 작업을 수행하세요.
      } else {
        alert("회원가입 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error(error);
      alert("회원가입 중 오류가 발생했습니다.");
    }


    onSignup(formData);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(undefined);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setPasswordError(undefined);
  };

  const isPasswordValid =
    password.length >= 8 &&
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/.test(password);

    const handleIdCheck = async () => {
      if (id !== "") {
        try {
          const response = await fetch('http://localhost:3001/idcheck', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
          });
          const result = await response.json();
          console.log(response.ok);
          console.log(result);
    
          if (response.ok) {
            if (!result) {
              setIsIdChecked(true);
              alert("사용 가능한 아이디입니다.");
              console.log("idck:"+isIdChecked);
            } else {
              alert("이미 가입된 아이디입니다.");
              console.log("idck:"+isIdChecked);
            }
          } else {
            alert("중복체크 중 오류가 발생했습니다.");
          }
        } catch (error) {
          console.error(error);
          alert('중복체크 중 오류가 발생했습니다.');
        }
      } else {
        alert("아이디를 입력해주세요.");
        console.log("idck:"+isIdChecked);
      }
    };

    const handlePhonecheck = async () => {
      if (phoneNumber !== "") {
        try {
          const response = await fetch('http://localhost:3001/phonecheck', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ phoneNumber })
          });
          const result = await response.json();
          console.log(response.ok);
          console.log(result);
    
          if (response.ok) {
            console.log(result);
            if (result === false || result === "false") {
              const modal = document.getElementById("phoneModal");
              console.log(result);
              if (modal) {
                modal.style.display = "block"; // 모달 창 열기
    
                // 모달 내용 채우기
                const authNumber = result.numStr; // 백엔드에서 생성된 인증번호
                const phoneNumberElement = document.getElementById("phoneNumber");
                const authNumberInput = document.getElementById("authNumberInput");
                phoneNumberElement.textContent = phoneNumber;
                authNumberInput.value = ""; // 인증번호 입력칸 초기화
    
                // 확인 버튼 이벤트 처리
                const confirmButton = document.getElementById("confirmButton");
                confirmButton.addEventListener("click", () => {
                  const inputAuthNumber = authNumberInput.value;
                  if (inputAuthNumber === authNumber) {
                    alert("인증이 완료되었습니다.");
                    // 인증 완료 처리
                  } else {
                    alert("인증번호가 일치하지 않습니다.");
                    // 인증 실패 처리
                  }
                });
    
                // 취소 버튼 이벤트 처리
                const cancelButton = document.getElementById("cancelButton");
                cancelButton.addEventListener("click", () => {
                  modal.style.display = "none";
                  // 모달 창 닫기
                });
              }
            } else {
              alert("중복된 전화번호가 있습니다."); // 중복된 전화번호 알림창 표시
              console.log("Phoneck 중복:" + isPhoneChecked);
            }
          } else {
            alert("중복체크 중 오류가 발생했습니다.");
          }
        } catch (error) {
          console.error(error);
          alert('중복체크 중 오류가 발생했습니다.');
        }
      } else {
        alert("전화번호를 입력해주세요.");
        console.log("phck:" + isPhoneChecked);
      }
    };
    
    
    
  return (
    <Box overflowX="hidden">
      <form onSubmit={handleSubmit} ref={formRef} style={{ display: 'flex', flexDirection: 'column' }}>
        <FormControl>
          <FormLabel>이름</FormLabel>
          <Input
            id="name-field"
            type="text"
            placeholder="이름을 입력하세요"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="lg"
            mb={4}
          />
        </FormControl>

        <FormControl>
          <FormLabel>아이디</FormLabel>
          <Flex>
            <Input
              id="id-field"
              type="text"
              placeholder="아이디를 입력하세요"
              autoComplete="off"
              value={id}
              onChange={(e) => setId(e.target.value)}
              size="lg"
              mb={4}
              mr={2}
            />
            <Button
              size="lg"
              colorScheme="white"
              onClick={handleIdCheck}
              disabled={isIdChecked}
              variant="outline"
              _focus={{ boxShadow: 'none' }}
              _active={{ bg: 'gray.300' }}
            >
              중복 체크
            </Button>
          </Flex>
        </FormControl>

        <FormControl>
          <FormLabel>비밀번호</FormLabel>
          <Input
            id="password-field"
            type="password"
            placeholder="비밀번호를 입력하세요"
            autoComplete="off"
            value={password}
            onChange={handlePasswordChange}
            size="lg"
            mb={4}
            isInvalid={!!passwordError || (password.length > 0 && !isPasswordValid)}
          />
          {passwordError && (
            <Box color="red.500" fontSize="sm" mb={2}>
              {passwordError}
            </Box>
          )}
        </FormControl>

        <FormControl>
          <FormLabel>비밀번호 확인</FormLabel>
          <Input
            id="confirm-password-field"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            autoComplete="off"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            size="lg"
            mb={4}
            isInvalid={!!passwordError || (password.length > 0 && !isPasswordValid)}
          />
        </FormControl>

        <FormControl>
          <FormLabel>닉네임</FormLabel>
          <Input
            id="nickname-field"
            type="text"
            placeholder="닉네임을 입력하세요"
            autoComplete="off"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            size="lg"
            mb={4}
          />
        </FormControl>

        <FormControl>
          <FormLabel>이메일</FormLabel>
          <Input
            id="email-field"
            type="email"
            placeholder="이메일을 입력하세요"
            autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            size="lg"
            mb={4}
          />
          <Checkbox isChecked={agreeEmail} onChange={(e) => setAgreeEmail(e.target.checked)}>
            이메일 수신 동의
          </Checkbox>
        </FormControl>

        <FormControl>
          <FormLabel>전화번호</FormLabel>
          <Flex>
            <Input
              id="phone-number-field"
              type="text"
              placeholder="전화번호를 입력하세요"
              autoComplete="off"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              size="lg"
              mb={4}
              mr={2}
            />
            <Button
              size="lg"
              colorScheme="white"
              onClick={handlePhonecheck}
              disabled={isPhoneChecked}
              variant="outline"
              _focus={{ boxShadow: 'none' }}
              _active={{ bg: 'gray.300' }}
            >
              인증하기
            </Button>
            </Flex>
        </FormControl>
        <Button
          type="submit"
          mt={6}
          width="full"
          colorScheme="white"
          variant="outline"
          size="sm"
          isDisabled={!isPasswordValid || !isIdChecked || !phoneNumber}
          _focus={{ boxShadow: 'none' }}
          _active={{ bg: 'gray.300' }}
        >
          가입 완료
        </Button>
      </form>
    </Box>
  );
};

export default SignupForm;
