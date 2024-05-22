import React, {useState, useEffect} from 'react';
import { useToast, Box, Card, CardHeader, CardBody, Switch, InputGroup, InputLeftElement, Heading, Input, SimpleGrid, VStack, FormControl, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, HStack, Button, Link, Icon, Text, Image, Badge} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { FiUser } from 'react-icons/fi';
import { BsCalendarDate } from 'react-icons/bs';
import InputMask from 'react-input-mask';
import { AiOutlineIdcard, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { cpf } from 'cpf-cnpj-validator';
import { formatDate } from '../../utils/format';

import AuthLayout from '../_layouts/AuthLayout';

export default function EditUsers({jwt, user}) {
  const { at } = useParams();
  const [newUser, setNewUser] = useState('');
  const [account, setAccount] = useState('');
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
  const [statusAccount, setStatusAccount] = useState(false);
  const [statusDocument, setStatusDocument] = useState(false);

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
      const response = await api.put(`/users/${newUser.id}`, body, {
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      })

      if(response.data){
        const token = response.data.token;
        toast({
          title: 'Cadastro atualizado.',
          description: 'Alteração realizada com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        console.log(token);
        console.log(response.data);
        navigation('/users');
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
      const responseAccount = await api.post(`/acc/get-account`, {}, {
        headers: { 
            'Authorization': 'Bearer ' + jwt,
            'at': at,          
          }      
      });
  
      if(responseAccount.data){
        setAccount(responseAccount.data);
      };
    } catch(err) {
      setAccount('');
    }

    // try{
    //   const responsePlan = await api.post('/plans', {}, {
    //     headers: {
    //       'Authorization': 'Bearer ' + jwt
    //     }
    //   });
  
    //   if(responsePlan.data){
    //     setPlan(responsePlan.data.plan);
    //     setDate(responsePlan.data.date);
    //   };
    // } catch(err) {
    //   setPlan('');
    //   setDate('');
    // }
  };

  function handleStatusAccount(e){
    toast({
      title: 'Switch Conta',
      description: `${e}`,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
    
    setStatusAccount(e);
    return
  };

  function handleStatusDocument(e){
    toast({
      title: 'Switch Documento',
      description: `${e}`,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
    
    setStatusDocument(e);
    return
  };
  
  useEffect(() => {
    loadData()
  }, [jwt])

  return (
    <AuthLayout>
        <Box w='100%' flex='1' p='8' pt='0'>
          <Flex justify='space-between'>
            <Heading size='lg' fontWeight='normal'>Conta FX: {at}</Heading>
            <Link as={RouterLink} to='/clients' display="flex" algin="center">
              <Button colorScheme='blackAlpha'>Voltar</Button>
            </Link>
          </Flex>
          <Flex w='100%' mt={8}>
            <Card w='100%' direction={{ base: 'column', sm: 'row' }} justify='space-evenly'>
              <VStack>
              <Heading size='lg' fontWeight='normal'>Dados da Conta</Heading>
                <CardBody>
                  <Text>
                    <b>Nome da Conta:</b> {account.name}                      
                  </Text>                   
                  <Text>
                    <b>Nome/Razão Social:</b> {account.companyName}                      
                  </Text>                   
                  <Text>
                    <b>Tipo:</b> {account.personType == 'LEGAL_PERSON' ? ' Pessoa Jurídica' : 'Pessoa Física'}                      
                  </Text>                   
                  <Text>
                    <b>Principal Atividade:</b> {account.mainActivity}                      
                  </Text>                   
                  <Text>
                    <b>Email:</b> {account.email}                      
                  </Text>                   
                  <Text>
                    <b>Telefone 1:</b> {account.phoneNumber1}                      
                  </Text>                   
                  <Text>
                    <b>Telefone 2:</b> {account.phoneNumber2}                      
                  </Text>                   
                </CardBody>                  
              </VStack>                
              <VStack>
                <CardBody>
                  <Text>
                    <b>Documento {account.documentType}:</b> {account.document}                      
                  </Text>                   
                  <Text>
                    <b>Data de Abertura:</b> {account.documentDate}                      
                  </Text> 
                  <Text>
                    <b>CEP:</b> {account.cep}                      
                  </Text>                   
                  <Text>
                    <b>Logadouro:</b> {account.address} 
                  </Text> 
                  <Text>
                    <b>Número:</b> {account.number} 
                  </Text> 
                  <Text>
                    <b>Complemento:</b> {account.complement} 
                  </Text> 
                  <Text>
                    <b>Bairro:</b> {account.neighborhood} 
                  </Text> 
                  <Text>
                    <b>Cidade:</b> {account.city} 
                  </Text> 
                  <Text>
                    <b>Estado:</b> {account.state}                                        
                  </Text>                   
                </CardBody>                  
              </VStack>
              <VStack>
                <CardBody>
                  <Text fontWeight='bold' mb='2'>Status da Conta</Text>                  
                  <FormControl display='flex' alignItems='center'>
                    <Text htmlFor='status-account' mb='0'>
                      Inativo
                    </Text>
                    <Switch 
                      id='status-account'
                      colorScheme='red'
                      mx='2'
                      size='lg'
                      isChecked={statusAccount}
                      onChange={(e) => handleStatusAccount(e.target.checked)}
                    />
                    <Text htmlFor='status-account' mb='0'>
                      Aprovado
                    </Text>
                  </FormControl>
                  <br/>         
                  <Text fontWeight='bold' mb='2'>Status dos Documentos</Text>                  
                  <FormControl display='flex' alignItems='center'>
                    <Text htmlFor='status-account' mb='0'>
                      Inativo
                    </Text>
                    <Switch 
                      id='status-account'
                      colorScheme='red'
                      mx='2'
                      size='lg'
                      isChecked={statusDocument}
                      onChange={(e) => handleStatusDocument(e.target.checked)}
                    />
                    <Text htmlFor='status-account' mb='0'>
                      Aprovado
                    </Text>
                  </FormControl>         
                </CardBody>
              </VStack>                
            </Card>
          </Flex>                    
          <Flex w='100%' mt={8}>
            <Card w='100%' direction={{ base: 'column', sm: 'row' }} justify='center' mr='10'>
              <VStack>
              <Heading size='lg' fontWeight='normal'>Dados do Responsável</Heading>
                <CardBody>
                  <Text>
                    <b>Nome:</b> {account.name}                      
                  </Text>                   
                  <Text>
                    <b>CPF:</b> {account.companyName}                      
                  </Text>                   
                  <Text>
                    <b>Data de Nascimento:</b> {account.personType == 'LEGAL_PERSON' ? ' Pessoa Jurídica' : 'Pessoa Física'}                      
                  </Text>                   
                  <Text>
                    <b>Principal Atividade:</b> {account.mainActivity}                      
                  </Text>                   
                  <Text>
                    <b>Email:</b> {account.email}                      
                  </Text>                   
                  <Text>
                    <b>Telefone:</b> {account.phoneNumber1}                      
                  </Text>
                  <Text>
                    <b>CEP:</b> {account.cep}                      
                  </Text>                   
                  <Text>
                    <b>Logadouro:</b> {account.address} 
                  </Text> 
                  <Text>
                    <b>Número:</b> {account.number} 
                  </Text> 
                  <Text>
                    <b>Complemento:</b> {account.complement} 
                  </Text> 
                  <Text>
                    <b>Bairro:</b> {account.neighborhood} 
                  </Text> 
                  <Text>
                    <b>Cidade:</b> {account.city} 
                  </Text> 
                  <Text>
                    <b>Estado:</b> {account.state}                                        
                  </Text>                                                       
                </CardBody>                  
              </VStack>
            </Card>
            <Card w='100%' direction='column'>               
              <Heading size='lg' fontWeight='normal' textAlign='center' mb='6'>Documentos Enviados</Heading>
              <Accordion allowToggle w='100%'>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        Foto do Documento
                      </Box>
                      <Badge colorScheme='purple' flex='1' textAlign='left'>
                        Em aprovação
                      </Badge>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <HStack spacing='4' justify='center'>
                      <Button colorScheme='red'>Reprovar</Button>
                      <Button colorScheme='whatsapp'>Aprovar</Button>
                    </HStack>
                    <Image src='https://fxbank.com.br/wp-content/uploads/2024/05/iphone.png'/>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        Foto Traseira do Documento
                      </Box>
                      <Badge colorScheme='purple' flex='1' textAlign='left'>
                        Em aprovação
                      </Badge>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <HStack spacing='4' justify='center'>
                      <Button colorScheme='red'>Reprovar</Button>
                      <Button colorScheme='whatsapp'>Aprovar</Button>
                    </HStack>
                    <Image src='https://fxbank.com.br/wp-content/uploads/2024/05/iphone.png'/>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        Comprovante de Endereço
                      </Box>
                      <Badge colorScheme='purple' flex='1' textAlign='left'>
                        Em aprovação
                      </Badge>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <HStack spacing='4' justify='center'>
                      <Button colorScheme='red'>Reprovar</Button>
                      <Button colorScheme='whatsapp'>Aprovar</Button>
                    </HStack>
                    <Image src='https://fxbank.com.br/wp-content/uploads/2024/05/iphone.png'/>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        Selfie
                      </Box>
                      <Badge colorScheme='purple' flex='1' textAlign='left'>
                        Em aprovação
                      </Badge>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <HStack spacing='4' justify='center'>
                      <Button colorScheme='red'>Reprovar</Button>
                      <Button colorScheme='whatsapp'>Aprovar</Button>
                    </HStack>
                    <Image src='https://fxbank.com.br/wp-content/uploads/2024/05/iphone.png'/>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        Cartão CNPJ
                      </Box>
                      <Badge colorScheme='purple' flex='1' textAlign='left'>
                        Em aprovação
                      </Badge>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <HStack spacing='4' justify='center'>
                      <Button colorScheme='red'>Reprovar</Button>
                      <Button colorScheme='whatsapp'>Aprovar</Button>
                    </HStack>
                    <Image src='https://fxbank.com.br/wp-content/uploads/2024/05/iphone.png'/>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        Comprovante de Endereço CNPJ
                      </Box>
                      <Badge colorScheme='green' flex='1' textAlign='left'>
                        Aprovado
                      </Badge>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {/* <HStack spacing='4' justify='center'>
                      <Button colorScheme='red'>Reprovar</Button>
                      <Button colorScheme='whatsapp'>Aprovar</Button>
                    </HStack> */}
                    <Image src='https://fxbank.com.br/wp-content/uploads/2024/05/iphone.png'/>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        Contrato/Estatuto Social
                      </Box>
                      <Badge colorScheme='red' flex='1' textAlign='left'>
                        Reprovado
                      </Badge>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {/* <HStack spacing='4' justify='center'>
                      <Button colorScheme='red'>Reprovar</Button>
                      <Button colorScheme='whatsapp'>Aprovar</Button>
                    </HStack> */}
                    <Image src='https://fxbank.com.br/wp-content/uploads/2024/05/iphone.png'/>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>                                          
            </Card>
          </Flex>
          <Flex w='100%' mt={8}>
            <Card w='100%' direction={{ base: 'column', sm: 'row' }} justify='space-evenly'>
              <VStack>
              <Heading size='lg' fontWeight='normal'>Configurações da Conta</Heading>
                <CardBody>
                  <Text>
                    <b>Nome da Conta:</b> {account.name}                      
                  </Text>                   
                  <Text>
                    <b>Nome/Razão Social:</b> {account.companyName}                      
                  </Text>                   
                  <Text>
                    <b>Tipo:</b> {account.personType == 'LEGAL_PERSON' ? ' Pessoa Jurídica' : 'Pessoa Física'}                      
                  </Text>                   
                  <Text>
                    <b>Principal Atividade:</b> {account.mainActivity}                      
                  </Text>                   
                  <Text>
                    <b>Email:</b> {account.email}                      
                  </Text>                   
                  <Text>
                    <b>Telefone 1:</b> {account.phoneNumber1}                      
                  </Text>                   
                  <Text>
                    <b>Telefone 2:</b> {account.phoneNumber2}                      
                  </Text>                   
                </CardBody>                  
              </VStack>                
              <VStack>
                <CardBody>
                  <Box mb='2'>
                    <Text htmlFor='name' mb='0'>
                      Limite de PIX (diário)
                    </Text>
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
                        borderRadius={5}
                        placeholder='%'
                        _placeholder={{
                            fontSize: '18',
                            color: '#004AAD'
                        }}
                        value={name}
                        onChange={(event)=> setName(event.target.value)}
                      />
                    </InputGroup>                                                     
                  </Box>
                  <Box mb='2'>
                    <Text htmlFor='name' mb='0'>
                      Limite de transação (diário por conta)
                    </Text>
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
                        borderRadius={5}
                        placeholder='%'
                        _placeholder={{
                            fontSize: '18',
                            color: '#004AAD'
                        }}
                        value={name}
                        onChange={(event)=> setName(event.target.value)}
                      />
                    </InputGroup>                                                     
                  </Box>
                  <Box mb='2'>
                    <Text htmlFor='name' mb='0'>
                      Quantidade de cartão (por conta)
                    </Text>
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
                        borderRadius={5}
                        placeholder='%'
                        _placeholder={{
                            fontSize: '18',
                            color: '#004AAD'
                        }}
                        value={name}
                        onChange={(event)=> setName(event.target.value)}
                      />
                    </InputGroup>                                                     
                  </Box>
                </CardBody>                  
              </VStack>             
              <VStack>
                <CardBody>
                  <Box mb='2'>
                    <Text htmlFor='name' mb='0'>
                      Taxa de saída do PIX (reais)
                    </Text>
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
                        borderRadius={5}
                        placeholder='%'
                        _placeholder={{
                            fontSize: '18',
                            color: '#004AAD'
                        }}
                        value={name}
                        onChange={(event)=> setName(event.target.value)}
                      />
                    </InputGroup>                                                     
                  </Box>
                  <Box mb='2'>
                    <Text htmlFor='name' mb='0'>
                      Taxa de saída do TED (reais)
                    </Text>
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
                        borderRadius={5}
                        placeholder='%'
                        _placeholder={{
                            fontSize: '18',
                            color: '#004AAD'
                        }}
                        value={name}
                        onChange={(event)=> setName(event.target.value)}
                      />
                    </InputGroup>                                                     
                  </Box>
                  <Box mb='2'>
                    <Text htmlFor='name' mb='0'>
                      Taxa de emissão do Boleto (reais)
                    </Text>
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
                        borderRadius={5}
                        placeholder='%'
                        _placeholder={{
                            fontSize: '18',
                            color: '#004AAD'
                        }}
                        value={name}
                        onChange={(event)=> setName(event.target.value)}
                      />
                    </InputGroup>                                                     
                  </Box>
                  <Flex mt='8' justify='flex-end'>
                    <HStack spacing='4'>
                      <Link as={RouterLink} to='/clients' display="flex" algin="center">
                        <Button colorScheme='blackAlpha'>Cancelar</Button>
                      </Link>
                      <Button type='submit' onClick={handleSubmit} colorScheme='whatsapp'>Salvar</Button>
                    </HStack>
                  </Flex>
                </CardBody>                  
              </VStack>             
            </Card>
          </Flex>
          <Link as={RouterLink} to='/clients' display="flex" algin="center">
            <Button colorScheme='blackAlpha'>Voltar</Button>
          </Link>
        </Box>
    </AuthLayout>
  )
}