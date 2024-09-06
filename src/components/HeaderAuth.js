import React from 'react';
import { connect } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Flex, Text, Icon, HStack, Box, Avatar, IconButton, useDisclosure, VStack, Image, Link } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { MdSettings } from 'react-icons/md'
import Logo from '../assets/logo1.png'
import { BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

function Header(props) {
  const { user, config } = props.auth;
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
              color="#E52A24"
              borderRightWidth={1}
              borderColor="gray.500"
            >
              { config.account ? 
                <Link as={RouterLink} to='/clients' display="flex" algin="center">
                  <Text>Contas</Text>
                </Link>
                :
                <></>
              }
              {
                config.users ?
                <Link as={RouterLink} to='/users' display="flex" algin="center">
                  <Text>Usuários</Text>
                </Link>
                : 
                <></>
              }
              {
                config.card ? 
                <Link as={RouterLink} to='/cards' display="flex" algin="center">
                  <Text>Cartões</Text>
                </Link>
                : 
                <></>
              }
              {
                config.plan ?
                <Link as={RouterLink} to='/plans' display="flex" algin="center">
                  <Text>Planos</Text>
                </Link>
                :
                <></>
              }
              {
                config.accounting ?
                <Link as={RouterLink} to='/accounting' display="flex" algin="center">
                  <Text>Contabilidade</Text>
                </Link>             
                :
                <></>
              }
            </HStack>
            <Link as={RouterLink} to='/config' display="flex" algin="center">
              <Flex align="center" mr="4">
                <Box mr="4" textAlign="right" >
                  <Text color="#E52A24">{user.username}</Text>
                  <Text color="#gray.500" fontSize="small" >{user.email}</Text>
                </Box>

                <Icon as={MdSettings} boxSize={6} color="#E52A24"/>


                {/* <Avatar size="md" name={user.name} src="https://github.com/gustagpo.png" /> */}
              </Flex>
            </Link>
            <Link as={RouterLink} to='/login' display="flex" algin="center">
                <Icon as={FiLogOut} boxSize={6} color="#E52A24"/>
            </Link>
          </Flex>

        </Flex>
      </Box>      
    </>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Header);