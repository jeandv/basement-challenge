import { useMemo, useState } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Modal,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  useDisclosure
} from '@chakra-ui/react';

import logo from '../public/logo.svg';
import header from '../public/header.svg';
import footer from '../public/footer.svg';
import hd4k from '../public/hd4k.svg';
import yourCart from '../public/yourCart.svg';
import figure3d1 from '../public/figure3d1.svg';
import figure3d2 from '../public/figure3d2.svg';

import { Product } from '../product/types';

interface DataProductsProps {
  products: Product[];
}

const Home: NextPage<DataProductsProps> = ({ products }) => {

  const { isOpen: isModalOpen, onClose: closeModal, onOpen: openModal } = useDisclosure();

  const [cart, setCart] = useState<Product[]>(
    []
    // typeof window !== 'undefined' ? (JSON.parse(window.localStorage.getItem('cart') || '[]') as Product[]): []
  );

  // useEffect(() => window.localStorage.setItem('cart', JSON.stringify(cart)), [cart]);

  const totalPrice = useMemo(() => cart.reduce((total, product) => total + product.price, 0), [cart]);

  const deleteProductSelected = (index: number) => setCart(cart => cart.filter((_, indexToDelete) => index !== indexToDelete));

  return (
    <>
      <Stack>
        <Stack
          alignContent='center'
          as='nav'
          direction='row'
          justifyContent='space-between'
          padding={4}>
          {/* <Text fontSize='45px'>JEANDV();</Text> */}
          <Image src={logo} alt='Basement' />
          <Image src={hd4k} alt='Basement HD-4K' />
          <Button variant='outline' onClick={openModal}>Cart ({cart.length})</Button>
        </Stack>
        <Stack as='header'>
          <Image src={header} alt='Basement supply' />
          <Text
            as={'marquee' as any}
            borderBottomWidth={2}
            borderColor='#fff'
            borderTopWidth={2}
            fontSize='2xl'>
            <p>
              Hi! This is a frontend challenge using Next.js + TypeScript and ChakraUI by <Link href='https://jeandv.vercel.app' isExternal>Jeandv</Link>! - Hi! This is a frontend challenge using Next.js + TypeScript and ChakraUI by <Link href='https://jeandv.vercel.app' isExternal>Jeandv</Link>! - Hi! This is a frontend challenge using Next.js + TypeScript and ChakraUI by <Link href='https://jeandv.vercel.app' isExternal>Jeandv</Link>! - Hi! This is a frontend challenge using Next.js + TypeScript and ChakraUI by <Link href='https://jeandv.vercel.app' isExternal>Jeandv</Link>! - Check my <u><Link href='https://linkedin.com/in/jeandv' isExternal>Linkedin</Link></u> and <u><Link href='https://github.com/jeandv' isExternal>GitHub</Link></u>! (͠≖ ͜ʖ͠≖)👌
            </p>
          </Text>
        </Stack>
        <Grid gap={4} templateColumns='repeat(auto-fit, minmax(256px, 1fr))'>
          {
            products.map(product => (
              <Stack key={product.id} cursor='pointer' onClick={() => setCart(cart => cart.concat(product))}>
                <Flex
                  alignItems='center'
                  bgGradient='linear(to-b, black, gray.900)'
                  justifyContent='center'
                  margin='auto'
                  width='100%'>
                  <Image
                    alt={product.name}
                    height={400}
                    layout='fixed'
                    src={product.image}
                    width={320} />
                </Flex>
                <Stack
                  alignItems='center'
                  borderTopColor='#fff'
                  borderTopWidth={2}
                  direction='row'
                  fontSize='lg'
                  justifyContent='space-between'>
                  <Text>{product.name}</Text>
                  <Text>${product.price}</Text>
                </Stack>
              </Stack>
            ))
          }
        </Grid>
        <Image src={footer} alt='Wear everyday' />
        <Box position='absolute' top='50vh' left={5}>
          <Image src={figure3d2} alt='Figure 3D 2' />
        </Box>
        <Box position='absolute' top='30vh' right={5}>
          <Image src={figure3d1} alt='Figure 3D 1' />
        </Box>
        <Box position='absolute' top='165vh' left={10}>
          <Image src={figure3d1} alt='Figure 3D 1' />
        </Box>
        <Box position='absolute' top='240vh' right={15}>
          <Image src={figure3d2} alt='Figure 3D 2' />
        </Box>
        <Flex alignItems='center' justifyContent='center'>
          <video src='https://grotesque.basement.studio/KTYPE%20B-%201.mp4' playsInline autoPlay muted loop />
        </Flex>
      </Stack>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay onClick={closeModal} />
        <Stack
          backgroundColor='#000'
          borderColor='#fff'
          borderWidth={2}
          maxWidth={480}
          position='fixed'
          right={0}
          top={0}
          width='100%'
          zIndex={9999}>
          <Button
            cursor='pointer'
            fontSize='2xl'
            fontWeight='bold'
            marginLeft='auto'
            onClick={closeModal}
            padding={2}
            variant='link'>
            → CLOSE
          </Button>
          {/* <Text fontSize='3xl' fontWeight='bold' paddingX={4}>
            YOUR CART
          </Text> */}
          <Box paddingX={3}>
            <Image src={yourCart} alt='Your cart' />
          </Box>
          <Box paddingY={4}>
            {
              cart.map((addedProduct, index) => (
                <Stack key={index}
                  alignItems='center'
                  direction='row'
                  fontSize='xl'
                  justifyContent='space-between'
                  marginTop={2}
                  paddingX={4}>
                  <Text>{addedProduct.name}</Text>
                  <Text>{addedProduct.price}</Text>
                  <Button
                    cursor='pointer'
                    onClick={() => deleteProductSelected(index)}>
                    ✖
                  </Button>
                </Stack>
              ))
            }
          </Box>
          <Stack
            borderTopColor='#fff'
            borderTopWidth={2}
            direction='row'
            justifyContent='space-between'
            padding={4}
            divider={<StackDivider borderColor='#fff' />}>
            <Text fontSize='35px' fontWeight='bold'>TOTAL: ${totalPrice}</Text>
            <Button fontSize='35px' fontWeight='bold' textColor='#fff' variant='link'>CHECKOUT</Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {

  const products = await import('../product/mock.json').then((res) => res.default);

  return {
    props: {
      products
    }
  }

}

export default Home;
