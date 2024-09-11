import React, {useState} from 'react';
import { useToast, Link, Button, Flex, Input, Heading, SimpleGrid, FormControl, InputGroup, InputLeftElement, Icon, VStack, Image, HStack, Text} from '@chakra-ui/react';
import { AiOutlineIdcard, AiOutlineLock } from 'react-icons/ai';
import Card from '../assets/card.png';
import { useNavigate, Link as RouterLink} from 'react-router-dom';
import InputMask from 'react-input-mask';
import { cpf } from 'cpf-cnpj-validator';
import api from '../services/api';
import { useDispatch } from 'react-redux';
import { setJWT } from '../store/actions/authActions';


import DefaultLayout from './_layouts/DefaultLayout';

export default function Login() {
  const [document, setDocument] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  function checkCPF(e){
    if(e.length === 14) {
        const validCpf = cpf.isValid(e);
        if(!validCpf) {   
            toast({
                title: 'CPF Inválido.',
                description: "O número do CPF colocado é inválido.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            setDocument('');
        };
    };
    setDocument(e);
  };

  async function handleSubmit() {
    setLoading(true);
    try{
      const response = await api.post('/bo/login', {
        username: document,
        password: password,
      }, {})

      if(response.data){
        const token = response.data.token;
        const user = response.data.user;
        const config = response.data.backoffice;
        if(user) {
          dispatch(setJWT(token, user, config));
          navigation('/');
        } else {
          toast({
            title: 'Login inválido.',
            description: 'Usuário não é administrador',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }

      setLoading(false);

    } catch (err) {
      console.log(err.response.data)
      toast({
        title: 'Login inválido.',
        description: err.response.data.error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  }

  return (
    <DefaultLayout>
        <Flex maxWidth={1300} mb={50}  w="100%" h="100%" p="8" borderRadius={8}>
          <SimpleGrid minChildWidth='500px' spacing='8' w='100%' alignItems={'top'}>
            <Image src={Card} w="90%"/>
            <Flex as="form" w="80%" flexDirection='column' onSubmit={handleSubmit}>
              <Heading size='xl' color="#20242D" fontWeight='bold'>Bem Vindo Administração Foodzy!</Heading>

              <VStack spacing='4' mt={8}>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <Icon as={AiOutlineIdcard} color='#20242D' />
                    </InputLeftElement>
                    <Input                        
                        name='username'
                        id='username'
                        type='text'
                        size='md'
                        color='black'                                                
                        borderColor='#20242D'
                        borderRadius={20}
                        placeholder='Usuário'
                        _placeholder={{
                            fontSize: '18',
                            color: '#20242D'
                        }}
                        value={document}
                        onChange={(event)=> setDocument(event.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <Icon as={AiOutlineLock} color='#20242D' />
                    </InputLeftElement>
                    <Input
                        name='password'
                        id='password'
                        type='password'
                        size='md'
                        color='black'
                        borderColor='#20242D'
                        borderRadius={20}
                        placeholder='Senha'
                        _placeholder={{
                            fontSize: '18',
                            color: '#20242D'
                        }}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                  </InputGroup>
                </FormControl>
              </VStack>
              <HStack justify="space-evenly" mt={10} mb={10}>
                <Button bg='#2D2D2D' onClick={handleSubmit} color="white" fontSize={18} p="25px 95px" borderRadius={20} >Acessar</Button>
              </HStack>

              <Text size='xl' color="#20242D" fontWeight='bold' textAlign='center'>v.1.0.0 - Todos os direitos reservados</Text>
            </Flex>
          </SimpleGrid>
        </Flex>
    </DefaultLayout>
  )
}
