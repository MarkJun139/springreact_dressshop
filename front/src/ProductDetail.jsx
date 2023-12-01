import { Box, Button, Image, Text } from '@chakra-ui/react';
import React from 'react';

const ProductDetail = ({ product }) => {
  // 이 부분은 실제 이미지 URL로 교체해야 합니다.
  const image = '../image/dress.jpg';

  return (
    <Box mt={10}>
      <Box borderWidth="1px" borderRadius="md" overflow="hidden" w="100%" position="relative">
  <img
    src="https://i.ibb.co/zJDxnPQ/dress.jpg"
    alt="dress"
    objectFit="contain"
    border="0"
    width="80%"
    height="auto"
    position="absolute"
    top="50%"
    left="50%"
    transform="translate(-50%, -50%)"
  />
</Box>


      <Box borderWidth="1px" borderRadius="md" position="fixed" top="35%" right="20px" zIndex="10">
        <Image src={product.image} alt={product.name} height="100px" objectFit="cover" />

        <Box p={5}>
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            {product.name}
          </Text>
          <Text fontSize="xl" color="gray.500" mb={2}>
            {product.price}원
          </Text>
          <Text fontSize="lg" color="gray.500" mb={2}>
            카테고리: {product.category}
          </Text>
          <Text fontSize="md" color="gray.500" mb={4}>
            이 여기에 상품 설명을 추가할 수 있습니다.
          </Text>
          <Button colorScheme="blue">
            장바구니에 담기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
