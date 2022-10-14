import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { Stack, Button, Text, Link, Grid, Flex } from '@chakra-ui/react';

import logo from '../public/logo.svg';
import header from '../public/header.svg';
import footer from '../public/footer.svg';

import { Product } from '../product/types';

interface DataProductsProps {
  products: Product[];
}

const Home: NextPage<DataProductsProps> = ({ products }) => {

  console.log(products);

  return (
    <Stack>
      <Stack
        alignContent='center'
        as='nav'
        direction='row'
        justifyContent='space-between'
        padding={4}>
        <Image src={logo} alt='Basement' />
        <Button variant='outline'>Cart (0)</Button>
      </Stack>
      <Stack as='header'>
        <Image src={header} alt='Basement supply' />
        <Text
          as={'marquee' as any}
          borderBottomWidth={2}
          borderColor='#fff'
          borderTopWidth={2}
          fontSize='2xl'>
          Hi! This is a frontend challenge using Next.js + TypeScript and ChakraUI by <Link href='https://jeandv.vercel.app' isExternal>Jeandv</Link>! - Hi!This is a frontend challenge using Next.js + TypeScript and ChakraUI by <Link href='https://jeandv.vercel.app' isExternal>Jeandv</Link>! - Hi!This is a frontend challenge using Next.js + TypeScript and ChakraUI by <Link href='https://jeandv.vercel.app' isExternal>Jeandv</Link>! - Hi!This is a frontend challenge using Next.js + TypeScript and ChakraUI by <Link href='https://jeandv.vercel.app' isExternal>Jeandv</Link>! - Check my <u><Link href='https://linkedin.com/in/jeandv' isExternal>Linkedin</Link></u> and <u><Link href='https://github.com/jeandv' isExternal>GitHub</Link></u>! (͠≖ ͜ʖ͠≖)👌
        </Text>
      </Stack>
      <Grid gap={4} templateColumns='repeat(auto-fit, minmax(256px, 1fr))'>
        {
          products.map(({ id, name, price, image }) => (
            <Stack key={id}>
              <Flex
                alignItems='center'
                bgGradient='linear(to-b, black, gray.900)'
                justifyContent='center'
                margin='auto'
                width='100%'>
                <Image
                  alt={name}
                  height={400}
                  layout='fixed'
                  src={image}
                  width={320} />
              </Flex>
              <Stack
                alignItems='center'
                borderTopColor='#fff'
                borderTopWidth={2}
                direction='row'
                fontSize='lg'
                justifyContent='space-between'>
                <Text>{name}</Text>
                <Text>${price}</Text>
              </Stack>
            </Stack>
          ))
        }
      </Grid>
      <Image src={footer} alt='Wear everyday' />
    </Stack>
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
