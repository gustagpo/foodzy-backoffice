import React, {useState, useEffect} from 'react';
import { useToast, Box, Select, InputGroup, InputLeftElement, Heading, Input, SimpleGrid, VStack, FormControl, FormLabel, Flex, HStack, Button, Link, Icon} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { FiUser } from 'react-icons/fi';
import { BsCalendarDate } from 'react-icons/bs';
import InputMask from 'react-input-mask';
import { AiOutlineIdcard, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

import AuthLayout from './_layouts/AuthLayout';

export default function EditUsers({jwt, user}) {
  const { cpf } = useParams();
  const [newUser, setNewUser] = useState('');
  const [plan, setPlan] = useState('');
  const [date, setDate] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigation = useNavigate();

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

    if(oldPassword) {
      if(!password) {
        toast({
          title: 'Preenhca o campo de nova senha.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return
      }
      if(!confirmPassword) {
        toast({
          title: 'Preenhca o campo de confirmar senha.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return
      }
      if(password != confirmPassword) {
        toast({
          title: 'Senha diferente em confirmar senha',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return
      }
    };

    const body = oldPassword ? {
      name: name,
      email: email,
      cpf: document,
      phone: phone,
      birthday: birthday,
      oldPassword: oldPassword,
      password: password,
      confirmPassword: confirmPassword
    } : {
      name: name,
      email: email,
      cpf: document,
      phone: phone,
      birthday: birthday,
    };

    try{
      const response = await api.put(`/users/`, body, {
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      })

      if(response.data){
        const token = response.data.token;
        console.log(token);
        console.log(response.data);
        toast({
        title: 'Edição realizada.',
        description: 'Ajuste feito com sucesso',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
        navigation('/');
      }

      setLoading(false);

    } catch (err) {
      console.log(err.data)
      toast({
        title: 'Erro no cadastro.',
        description: err.data,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  async function loadData(){
    try{
      const responseUser = await api.get(`/users`, {
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      });
  
      if(responseUser.data){
        setNewUser(responseUser.data.user);
        setName(responseUser.data.user.name);
        setEmail(responseUser.data.user.email);
        setDocument(responseUser.data.user.cpf);
        setPhone(responseUser.data.user.phone);
        setBirthday(responseUser.data.user.birthday);
      };
    } catch(err) {
      setNewUser('');
    }

    try{
      const responsePlan = await api.get('/plans', {
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      });
  
      if(responsePlan.data){
        setPlan(responsePlan.data.plan);
        setDate(responsePlan.data.date);
      };
    } catch(err) {
      setPlan('');
      setDate('');
    }
  };
  
  useEffect(() => {
    loadData()
  }, [jwt])

  return (
    <AuthLayout>
        <Box w='100%' flex='1' p='8'>
          <Heading size='lg' fontWeight='normal'>Editar seu usuário</Heading>

          <VStack spacing='4' mt={8}>
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
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
            </SimpleGrid>
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
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
                    disabled
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
            </SimpleGrid>
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={BsCalendarDate} color='#004AAD' />
                  </InputLeftElement>
                  <Input
                    name='birthday'
                    id='birthday'
                    type={birthday ? 'date' : 'text'}
                    size='md'
                    onFocus={handleDate}
                    color='black'
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='Data de Nascimento'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={birthday}
                    onChange={(event)=> setBirthday(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
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
                    placeholder='Senha Antiga'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={oldPassword}
                    onChange={(event)=> setOldPassword(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </SimpleGrid>
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
                    disabled={ oldPassword ? false : true }
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='Nova Senha'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={password}
                    onChange={(event)=> setPassword(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl >
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
                    disabled={ password ? false : true }
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
          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Link as={RouterLink} to='/users' display="flex" algin="center">
                <Button colorScheme='blackAlpha'>Cancelar</Button>
              </Link>
              <Button type='submit' onClick={handleSubmit} colorScheme='whatsapp'>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
    </AuthLayout>
  )
}
