import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Text, Icon, HStack, Box, Avatar, IconButton, useDisclosure, VStack, Image, Link } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { RiNotificationLine } from 'react-icons/ri'
import Logo from '../assets/logo1.png'
import { BsInstagram } from 'react-icons/bs';
import { FaWhatsapp } from 'react-icons/fa';

export default function Header2() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>      
      <Box mb={4} px={4} display={{ sm: "none", md: "block" }}>
        <Flex
          as="header"
          w="100%"
          maxWidth={1300}
          h="20"
          mx="auto"
          my="6"
          px="6"
          align="center"
        >
          <Link as={RouterLink} to='/' display="flex" algin="center">
            <Image
              src={Logo} w={250}
            />
          </Link>

          <Flex
            align="center"
            ml="auto"
          >
            <HStack
              spacing="10"
              mx="8"
              pr="8"
              py="1"
              color="#2D2D2D"
            >
              <Link href="https://fxbank.com.br" target='blank' display="flex" algin="center">
                <Text>Site FxBank</Text>
              </Link>              
              <Link href="https://app.fxbank.com.br/new_user" target='blank' display="flex" algin="center">
                <Text>Criar conta</Text>
              </Link>              
              <Link href="https://app.fxbank.com.br" target='blank' display="flex" algin="center">
                <Text>Entrar na conta</Text>
              </Link>              
              <Flex alignItems="center">
                <Text>Siga a FxBank</Text>
                <Link href="https://www.instagram.com/fxbankbr/" target='blank' ml={2}>
                  <Flex bg="#D8E800" boxSize={10} borderRadius={50} alignItems="center" justifyContent="center">
                      <Icon as={BsInstagram} color="white" boxSize={6}/>
                  </Flex>
                </Link>
                <Link href="https://api.whatsapp.com/send/?phone=%2B5512981289405" target='blank' ml={2}>
                  <Flex bg="#D8E800" boxSize={10} borderRadius={50} alignItems="center" justifyContent="center">
                      <Icon as={FaWhatsapp} color="white" boxSize={6}/>
                  </Flex>
                </Link>
              </Flex>
            </HStack>
          </Flex>

        </Flex>
      </Box>      
    </>
  );
};