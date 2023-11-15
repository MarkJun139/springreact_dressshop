import {
  Box,
  Button,
  ChakraProvider,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import './App.css';
import CategorySelect from './CategorySelect';
import LoginForm from './LoginForm';
import Main from './Main';
import ProductDetail from './ProductDetail';
import SignupForm from './SignupForm';
import { UserProvider } from './UserContext';
import UserMenu from './UserMenu';

function App() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [showMain, setShowMain] = useState(true);
  const [user, setUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      // 세션 정보를 가져오는 API 호출
      try {
        const response = await fetch('http://localhost:8080/dlogin', {
          method: 'POST',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          if (data.session && data.session.is_logined) {
            const newUser = {
              nickname: data.session.nickname,
            };
            setUser(newUser);
          }
        } else {
          throw new Error('HTTP 요청 실패');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchSession();
  }, []);

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowSignupForm(false);
    setShowMain(false);
  };

  const handleSignupClick = () => {
    setShowLoginForm(false);
    setShowSignupForm(true);
    setShowMain(false);
  };

  const handleLogoClick = () => {
    setShowLoginForm(false);
    setShowSignupForm(false);
    setShowMain(true);
    setSelectedProduct(null);
    setShowProductDetail(false);
  };

  const handleLogin = async (uId, uPw) => {
    try {
      // 로그인 API 호출
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Access-Control-Allow-Origin": 'http://localhost:3000',
          'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify({ uId, uPw }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          const newUser = {
            nickname: data.nickname,
          };
          setUser(newUser);
          setShowLoginForm(false);
          setShowMain(true);
        } else {
          alert(data.message);
        }
      } else {
        throw new Error('HTTP 요청 실패');
      }
    } catch (error) {
      console.error(error);
      alert('로그인 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = async () => {
    try {
      // 로그아웃 API 호출
      const response = await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setUser(null);
          setShowLogoutModal(false);
          setShowMain(true);
          setShowProductDetail(false);
        } else {
          throw new Error('로그아웃 실패');
        }
      } else {
        throw new Error('HTTP 요청 실패');
      }
    } catch (error) {
      console.error(error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  const handleProductDetailClose = () => {
    setShowMain(true);
    setShowProductDetail(false);
  };

  const handleProductDetail = (product) => {
    setSelectedProduct(product);
    setShowMain(false);
    setShowProductDetail(true);
  };

  const handleLogoutModalOpen = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutModalClose = () => {
    setShowLogoutModal(false);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowProductDetail(false);
    setShowMain(true);
  };

  return (
    <UserProvider value={{ user, logout: handleLogout }}>
      <ChakraProvider>
        <div style={{ minHeight: '100vh' }}>
          <Flex align="center" justify="space-between" p={5} className="menuBar">
            <Image
              src="/logo.png"
              alt="로고"
              boxSize="25px"
              onClick={handleLogoClick}
              style={{ cursor: 'pointer' }}
            />

            <Box>
              {user && <UserMenu onLogout={handleLogoutModalOpen} />}
              {!user && (
                <Button
                  colorScheme="white"
                  variant="outline"
                  size="sm"
                  onClick={handleLoginClick}
                  _focus={{ boxShadow: 'none' }}
                  _active={{ bg: 'gray.300' }}
                >
                  로그인
                </Button>
              )}
            </Box>
          </Flex>

          {showLoginForm && (
            <Box className="boxStyle">
              <LoginForm onSignupClick={handleSignupClick} onLogin={handleLogin} />
            </Box>
          )}

          {showSignupForm && (
            <Box className="boxStyle">
              <SignupForm onClose={handleLoginClick} onSignup={() => {}} />
            </Box>
          )}

          {showMain && (
            <Flex>
              <Box flex="2" style={{ padding: '0', margin: '0' }}>
                <CategorySelect onSelectCategory={handleCategorySelect} />
              </Box>
              <Box flex="8" style={{ padding: '0', margin: '0' }}>
                <Main selectedCategory={selectedCategory} onDetail={handleProductDetail} />
              </Box>
            </Flex>
          )}

          {showProductDetail && (
            <Flex>
              <Box flex="2" style={{ padding: '0', margin: '0' }}>
                <CategorySelect onSelectCategory={handleCategorySelect} />
              </Box>
              <Box flex="8" style={{ padding: '0', margin: '0' }}>
                <ProductDetail product={selectedProduct} onClose={handleProductDetailClose} />
              </Box>
            </Flex>
          )}

          <Modal isOpen={showLogoutModal} onClose={handleLogoutModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>로그아웃</ModalHeader>
              <ModalCloseButton />
              <ModalBody className="modalBody">로그아웃 하시겠습니까?</ModalBody>
              <ModalFooter>
                <Button colorScheme="red" mr={3} onClick={handleLogout}>
                  확인
                </Button>
                <Button variant="ghost" onClick={handleLogoutModalClose}>
                  취소
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </ChakraProvider>
    </UserProvider>
  );
}

export default App;
