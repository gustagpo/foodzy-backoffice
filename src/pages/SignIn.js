import React, {useState} from 'react';
import { Button, Flex, Input, Heading, SimpleGrid, FormControl, InputGroup, InputLeftElement, Icon, VStack, Image, Link, useToast} from '@chakra-ui/react';
import { FiUser } from 'react-icons/fi';
import { PhoneIcon } from '@chakra-ui/icons';
import { BsCalendarDate } from 'react-icons/bs';
import { AiOutlineIdcard, AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import Card from '../assets/card.png'
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { cpf } from 'cpf-cnpj-validator';
import api from '../services/api';
import { useSelector, useDispatch } from 'react-redux';
import { setJWT } from '../store/actions/authActions';

import DefaultLayout from './_layouts/DefaultLayout';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);

  const toast = useToast();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  function handleDate(){
    setShow(true);
  };

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
      const response = await api.post('/users', {
        name: name,
        email: email,
        cpf: document,
        phone: phone,
        birthday: birthday,
        password: password,
        confirmPassword: confirmPassword
      }, {})

      if(response.data){
        const token = response.data.token;
        const user = response.data.user;
        console.log(token);
        console.log(response.data)
        dispatch(setJWT(token, user));
        navigation('/plans');
      }

      setLoading(false);

    } catch (err) {
      console.log(err.response.data)
      toast({
        title: 'Erro no cadastro.',
        description: err.response.data.error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
        <Flex maxWidth={1300} mb={50}  w="100%" p="8" borderRadius={8}>
          <SimpleGrid minChildWidth='500px' spacing='8' w='100%'>
            <Image src={Card} />
            <Flex as="form" w="100%" flexDirection='column' onSubmit={handleSubmit}>
              <Heading size='xl' color="#004AAD" fontWeight='bold'>Crie sua conta para cuidar da sua saúde pessoal e financeira!</Heading>

              <VStack spacing='4' mt={8}>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <Icon as={FiUser} color='#004AAD' />
                    </InputLeftElement>
                    <Input
                        name='name'
                        id='name'
                        type='text'
                        size='md'
                        color='black'
                        borderColor='#004AAD'
                        borderRadius={20}
                        placeholder='Nome Completo'
                        _placeholder={{
                            fontSize: '18',
                            color: '#004AAD'
                        }}
                        value={name}
                        onChange={(event)=> setName(event.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <Icon as={AiOutlineMail} color='#004AAD' />
                    </InputLeftElement>
                    <Input
                        name='email'
                        id='email'
                        type='email'
                        size='md'
                        color='black'
                        borderColor='#004AAD'
                        borderRadius={20}
                        placeholder='E-mail'
                        _placeholder={{
                            fontSize: '18',
                            color: '#004AAD'
                        }}
                        value={email}
                        onChange={(event)=> setEmail(event.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <Icon as={AiOutlineIdcard} color='#004AAD' />
                    </InputLeftElement>
                    <Input
                        as={InputMask}
                        name='cpf'
                        id='cpf'
                        type='text'
                        size='md'
                        color='black'
                        mask="999.999.999-99"
                        maskChar={null}
                        borderColor='#004AAD'
                        borderRadius={20}
                        placeholder='CPF'
                        _placeholder={{
                            fontSize: '18',
                            color: '#004AAD'
                        }}
                        value={document}
                        onChange={(event)=> checkCPF(event.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <PhoneIcon color='#004AAD' />
                    </InputLeftElement>
                    <Input
                        as={InputMask}
                        name='phone'
                        id='phone'
                        type='text'
                        size='md'
                        color='black'
                        mask="(99) 99999-9999"
                        maskChar={null}
                        borderColor='#004AAD'
                        borderRadius={20}
                        placeholder='Celular'
                        _placeholder={{
                            fontSize: '18',
                            color: '#004AAD'
                        }}
                        value={phone}
                        onChange={(event)=> setPhone(event.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                      <Icon as={BsCalendarDate} color='#004AAD' />
                    </InputLeftElement>
                    <Input
                        name='birthday'
                        id='birthday'
                        type={show ? 'date' : 'text'}
                        size='md'
                        onFocus={handleDate}
                        color='black'
                        borderColor='#004AAD'
                        borderRadius={20}
                        placeholder='Data de nascimento'
                        _placeholder={{
                            fontSize: '18',
                            color: '#004AAD'
                        }}
                        value={birthday}
                        onChange={(event)=> setBirthday(event.target.value)}
                    />
                  </InputGroup>
                </FormControl>
                <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement pointerEvents='none'>
                        <Icon as={AiOutlineLock} color='#004AAD' />
                      </InputLeftElement>
                      <Input
                          name='password'
                          id='password'
                          type='password'
                          size='md'
                          color='black'
                          borderColor='#004AAD'
                          borderRadius={20}
                          placeholder='Senha'
                          _placeholder={{
                              fontSize: '18',
                              color: '#004AAD'
                          }}
                          value={password}
                          onChange={(event)=> setPassword(event.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <InputGroup>
                      <InputLeftElement pointerEvents='none'>
                        <Icon as={AiOutlineLock} color='#004AAD' />
                      </InputLeftElement>
                      <Input
                          name='confirm_password'
                          id='confirm_password'
                          type='password'
                          size='md'
                          color='black'
                          borderColor='#004AAD'
                          borderRadius={20}
                          placeholder='Confirmar senha'
                          _placeholder={{
                              fontSize: '18',
                              color: '#004AAD'
                          }}
                          value={confirmPassword}
                          onChange={(event)=> setConfirmPassword(event.target.value)}
                      />
                    </InputGroup>
                  </FormControl>
                </SimpleGrid>
              </VStack>
              <Link onClick={handleSubmit} w="100%"><Button bg='#004AAD' color="white" fontSize={18} p="25px 35px" borderRadius={20} mt={10} w="100%">Cadastrar agora</Button></Link>
            </Flex>
          </SimpleGrid>
        </Flex>
    </DefaultLayout>
  )
}
