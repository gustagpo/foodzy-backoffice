import React from 'react';
import PropTypes from 'prop-types';
import { Flex } from '@chakra-ui/react';
import Header from '../../components/HeaderAuth';
import Footer from '../../components/Footer';
export default function AuthLayout({ children }) {
    return (
        <Flex w='100%' h='100vh' flexDirection='column'>
            <Header/>

            <Flex w='100%' mt='6' mb='2' maxWidth={1300} mx='auto' px='6'>
                {children}
            </Flex>                        
        </Flex>
    )
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
