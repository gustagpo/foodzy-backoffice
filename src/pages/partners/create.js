import React, {useState, useEffect} from 'react';
import { useToast, Box, Select, InputGroup, InputLeftElement, Heading, Input, SimpleGrid, VStack, FormControl, FormLabel, Flex, HStack, Button, Link, Icon} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { FiUser } from 'react-icons/fi';
import { BsCalendarDate } from 'react-icons/bs';
import InputMask from 'react-input-mask';
import { AiOutlineIdcard, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { Link as RouterLink, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { cnpj, cpf } from 'cpf-cnpj-validator';

import AuthLayout from '../_layouts/AuthLayout';

export default function CreatePartners({jwt, user}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigation = useNavigate();

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

  function checkCNPJ(e){
    if(e.length === 18) {
        const validCnpj = cnpj.isValid(e);
        if(!validCnpj) {   
            toast({
                title: 'CNPJ Inválido.',
                description: "O número do CNPJ colocado é inválido.",
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

    if(password) {
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

    const body = {
      name: name,
      document: document,
      email: email,
      phone: phone,
      type: Number(type),
      status: 1,
      password: password,
      confirmPassword: confirmPassword
    }

    console.log(body);

    try{
      const response = await api.post('/partners', body, {
        headers: {
          'Authorization': 'Bearer '+jwt
        }
      })

      if(response.data){
        const partner = response.data.user;
        navigation(`/plans/edit?doc=${partner.document}`);
      }

      setLoading(false);

    } catch (err) {
      console.log(err.data)
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
    <AuthLayout>
        <Box w='100%' flex='1' p='8'>
          <Heading size='lg' fontWeight='normal'>Cadastrar um parceiro</Heading>

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
                <Select
                  size='md'
                  color='black'
                  borderColor='#004AAD'
                  borderRadius={20}
                  placeholder='Tipo de parceiro'
                  _placeholder={{
                      fontSize: '18',
                      color: '#004AAD'
                  }}
                  value={type}
                  onChange={(event)=> setType(event.target.value)}
                >
                  <option value={0}>Pessoa Física</option>
                  <option value={1}>Pessoa Jurídica</option>
                </Select>
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
                    name='document'
                    id='document'
                    type='text'
                    size='md'
                    color='black'
                    disabled={type ? false : true}
                    mask={type == 0 ? "999.999.999-99" : "99.999.999/9999-99"}
                    maskChar={null}
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='Documento'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={document}
                    onChange={(event) => {
                      if(type) {
                        type == 0 ? checkCPF(event.target.value) : checkCNPJ(event.target.value) ;
                      }
                    }}
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
              <Link as={RouterLink} to='/plans' display="flex" algin="center">
                <Button colorScheme='blackAlpha'>Cancelar</Button>
              </Link>
              <Button type='submit' onClick={handleSubmit} colorScheme='whatsapp'>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
    </AuthLayout>
  )
}