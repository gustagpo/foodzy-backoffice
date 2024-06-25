import React, {useState, useEffect} from 'react';
import { useToast, Text, Box, Select, InputGroup, InputLeftElement, Heading, Input, SimpleGrid, VStack, FormControl, FormLabel, Flex, HStack, Button, Link, Icon, Textarea} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { FiUser } from 'react-icons/fi';
import InputMask from 'react-input-mask';
import { AiOutlineIdcard, AiOutlineMail, AiOutlineLock, AiOutlineTrophy } from 'react-icons/ai';
import { Link as RouterLink, useParams, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../services/api';
import { cpf, cnpj } from 'cpf-cnpj-validator';

import AuthLayout from '../_layouts/AuthLayout';

export default function EditPartners({jwt, user}) {
  const [searchParams, setSearchParams] = useSearchParams();
  const doc = searchParams.get('doc');
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [discount, setDiscount] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [bonification1, setBonification1] = useState('');
  const [description1, setDescription1] = useState('');
  const [bonification2, setBonification2] = useState('');
  const [description2, setDescription2] = useState('');
  const [bonificationSau, setBonificationSau] = useState('');
  const [bonificationSauFamilia, setBonificationSauFamilia] = useState('');
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
      id: id,
      name: name,
      email: email,
      document: document,
      phone: phone,
      type: type,
      discount: discount,
      oldPassword: oldPassword,
      password: password,
      confirmPassword: confirmPassword
    } : {
      id: id,
      name: name,
      email: email,
      document: document,
      phone: phone,
      type: type,
      discount: discount
    }

    if(description1 || bonification1) {
      body.bonificationSau = {
        id: bonificationSau,
        bonification: bonification1,
        description: description1
      }
    }

    if(description2 || bonification2) {
      body.bonificationSauFamilia = {
        id: bonificationSauFamilia,
        bonification: bonification2,
        description: description2
      }
    }

    try{
      const response = await api.put('/partners/admin', body, {
        headers: {
          'Authorization': 'Bearer '+jwt
        }
      })

      if(response.data){
        toast({
          title: 'Cadastro atualizado.',
          description: 'Alteração realizada com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigation('/partners');
        handleData();
      }

      setLoading(false);

    } catch (err) {
      console.log(err.data)
      toast({
        title: 'Erro na atualização.',
        description: err.response.data.error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  async function handleData(){
    let partner = {};
    try {
      const responsePartner = await api.get(`/admin/partners?id=${doc}`,{
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      });
      if(responsePartner.data){
        partner = responsePartner.data.partner;
        setId(partner.id)
        setName(partner.name);
        setEmail(partner.email);
        setDocument(partner.document);
        setPhone(partner.phone);
        setType(partner.type);
        setDiscount(partner.discount);
      }

    } catch (err) {
      console.log(err.data)
      toast({
        title: 'Erro no cadastro.',
        description: err.response.data.error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    
    try {
      const responsePartner = await api.get(`/bonifications/${partner.id}`,{
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      });
      if(responsePartner.data){
        responsePartner.data.map((b) => {
          if(b.plan === 4){
            setBonificationSau(b.id);
            setBonification1(b.name);
            setDescription1(b.description);
          } else if(b.plan === 7){
            setBonificationSauFamilia(b.id);            
            setBonification2(b.name);
            setDescription2(b.description);
          }
        });
      }
    } catch (err) {
      console.log(err.data)
      toast({
        title: 'Erro no cadastro.',
        description: err.response.data.error,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    handleData()
  }, [jwt])

  return (
    <AuthLayout>
        <Box w='100%' flex='1' p='8'>
          <Heading size='lg' fontWeight='normal'>Editar parceiro</Heading>

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
                  <option value='0'>Pessoa Física</option>
                  <option value='1'>Pessoa Jurídica</option>
                </Select>
              </FormControl>
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
            </SimpleGrid>
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
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
                    borderColor='#004AAD'
                    borderRadius={20}
                    disabled={ oldPassword ? false : true }
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

          <Heading size='lg' fontWeight='normal' mt={10}>Editar desconto</Heading>
          <FormControl mt={4} isRequired>
            <InputGroup>
              <InputLeftElement pointerEvents='none'>
                <Icon as={AiOutlineTrophy} color='#004AAD' />
              </InputLeftElement>
              <Input 
                name='discount'
                id='discount'
                type='text'
                size='md'
                color='black'
                borderColor='#004AAD'
                borderRadius={20}
                placeholder='Desconto'
                _placeholder={{
                    fontSize: '18',
                    color: '#004AAD'
                }}
                value={discount}
                onChange={(event)=> setDiscount(event.target.value)}
              />
            </InputGroup>
          </FormControl>

          <Heading size='lg' fontWeight='normal' mt={10}>Editar bonificação</Heading>
          <HStack spacing='4' mt={8}>
            <Flex spacing='8' w='100%' flexDir='column' p={8} borderWidth={1} borderRadius={20}>
              <Text fontSize='3xl' color="#004AAD" >Plano Saú Individual</Text>
              <FormControl mt={4} isRequired>
                {/* <Text fontSize='xl' >Benefício</Text> */}
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={AiOutlineTrophy} color='#004AAD' />
                  </InputLeftElement>
                  <Input 
                    name='bonification1'
                    id='bonification1'
                    type='text'
                    size='md'
                    color='black'
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='Benefício'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={bonification1}
                    onChange={(event)=> setBonification1(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4} isRequired>
                {/* <Text fontSize='xl' >Descrição</Text> */}
                <InputGroup>
                  <Textarea
                    name='description1'
                    id='description1'
                    type='text'
                    size='md'
                    color='black'
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='Descrição'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={description1}
                    onChange={(event)=> setDescription1(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </Flex>

            <Flex spacing='8' w='100%' flexDir='column' p={8} borderWidth={1} borderRadius={20}>
              <Text fontSize='3xl' color="#004AAD" >Plano Saú Familiar</Text>
              <FormControl mt={4} isRequired>
                {/* <Text fontSize='xl' >Benefício</Text> */}
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={AiOutlineTrophy} color='#004AAD' />
                  </InputLeftElement>
                  <Input 
                    name='bonification1'
                    id='bonification1'
                    type='text'
                    size='md'
                    color='black'
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='Benefício'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={bonification2}
                    onChange={(event)=> setBonification2(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl mt={4} isRequired>
                {/* <Text fontSize='xl' >Descrição</Text> */}
                <InputGroup>
                  <Textarea
                    name='description1'
                    id='description1'
                    type='text'
                    size='md'
                    color='black'
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='Descrição'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={description2}
                    onChange={(event)=> setDescription2(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </Flex>

          </HStack>
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