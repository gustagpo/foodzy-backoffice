import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Image, Box, Flex, SimpleGrid, Text, Link, Icon } from '@chakra-ui/react';
import { BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';

import Logo from '../assets/logo2.png'

export default function Footer() {

  return (
    <Box bg="#004AAD" display="block">
      <Flex
          as="footer"
          w="100%"
          maxWidth={1300}
          mx="auto"
          py="14"
          px="6"
        >
        <SimpleGrid w="100%" gap="4" minChildWidth="320px">
          <Box>
            <Link as={RouterLink} to='/' display="flex" algin="center">
              <Flex w="100%" h="100%" alignItems="center" justifyContent={{ sm: "center", md: "start"}}>
                <Image src={Logo} w={250} />
              </Flex>
            </Link>
          </Box>
          <Box>
              <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
                <Text fontSize="md" color="white" >Rua 84, Número 414, Setor Sul,Goiânia - GO, 74080-400</Text>
              </Flex>
          </Box>
          <Box>
              <Flex w="100%" h="100%" alignItems="center" justifyContent="center">
                <Text fontSize="lg" mr="1" color="white">Siga a Saú</Text>
                <Link href="https://www.instagram.com/saubeneficios/" target='blank' ml={2}>
                  <Flex bg="white" boxSize={10} borderRadius={50} alignItems="center" justifyContent="center">
                      <Icon as={BsInstagram} color="#004AAD" boxSize={6}/>
                  </Flex>
                </Link>
                <Link href="https://www.instagram.com/saubeneficios/" target='blank' ml={2}>
                  <Flex bg="white" boxSize={10} borderRadius={50} alignItems="center" justifyContent="center">
                      <Icon as={FaFacebookF} color="#004AAD" boxSize={6}/>
                  </Flex>
                </Link>
              </Flex>
          </Box>
        </SimpleGrid>
      </Flex>
    </Box>
  );
};