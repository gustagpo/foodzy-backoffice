import React, {useState, useEffect} from 'react';
import { useToast, Box, Card, Select, CardBody, Switch, InputGroup, InputLeftElement, Heading, Input, SimpleGrid, VStack, FormControl, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, HStack, Button, Link, Icon, Text, Image, Badge, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from '@chakra-ui/react';
import { FaPercentage } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { GrTransaction } from 'react-icons/gr';
import InputMask from 'react-input-mask';
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
  const [pixLimit, setPixLimit] = useState(0);
  const [cardLimit, setCardLimit] = useState(0);
  const [feePix, setFeePix] = useState(0);
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

  function handlePixLimit(e){
    toast({
      title: 'Switch Pix',
      description: `${e}`,
      status: 'error',
      duration: 5000,
      isClosable: true,
    })
    
    setPixLimit(e);
    return
  };

  function format(val) {
    return `$` + val;
  };

  function parse(val) {
    if(val === '$') {
      return
    } else {
      return val.replace(/^\$/, '');
    }
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
              <CardBody justify='center'>
                <Heading size='lg' fontWeight='normal' textAlign='center' mb='4'>Configurações da Conta</Heading>
                <Text htmlFor='name' mb='2'>
                  Plano de Conta
                </Text>                  
                <Select name='plan' id='plan' placeholder='Selecione a opção'>
                  <option value='1' selected>Free</option>
                </Select>                  
              </CardBody>                  
              <VStack>
              </VStack>                
              <VStack>
                <CardBody>
                  <Box mb='2'>
                    <Text htmlFor='name' mb='2'>
                      Limite de PIX (diário)
                    </Text>
                    <NumberInput
                      onChange={(valueString) => setPixLimit(parse(valueString))}
                      value={format(pixLimit)}
                      precision={2}
                      borderColor='#20242D'
                      borderRadius={5}
                      _placeholder={{
                          fontSize: '18',
                          color: '#20242D'
                      }}
                    >
                      <NumberInputField />
                      {/* <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper> */}
                    </NumberInput>                                                    
                  </Box>
                  <Box mb='2'>
                    <Text htmlFor='name' mb='2'>
                      Limite de transação (diário por conta)
                    </Text>
                    <NumberInput
                      onChange={(valueString) => handlePixLimit(parse(valueString))}
                      value={format(pixLimit)}
                      precision={2}
                      borderColor='#20242D'
                      borderRadius={5}
                      _placeholder={{
                          fontSize: '18',
                          color: '#20242D'
                      }}
                    >
                      <NumberInputField />                      
                    </NumberInput>                                                      
                  </Box>
                  <Box mb='2'>
                    <Text htmlFor='name' mb='2'>
                      Quantidade de cartão (por conta)
                    </Text>
                    <NumberInput
                      onChange={(valueString) => setCardLimit(valueString)}
                      value={cardLimit}
                      precision={0}
                      borderColor='#20242D'
                      borderRadius={5}
                      _placeholder={{
                          fontSize: '18',
                          color: '#20242D'
                      }}
                    >
                      <NumberInputField />                      
                    </NumberInput>                                                     
                  </Box>
                </CardBody>                  
              </VStack>             
              <VStack>
                <CardBody>
                  <Box mb='2'>
                    <Text htmlFor='name' mb='2'>
                      Taxa de entrada do PIX (%)
                    </Text>
                    <NumberInput
                      onChange={(valueString) => setFeePix(valueString)}
                      value={feePix}
                      precision={2}
                      borderColor='#20242D'
                      borderRadius={5}
                      _placeholder={{
                          fontSize: '18',
                          color: '#20242D'
                      }}
                    >
                      <NumberInputField />                      
                    </NumberInput>                                                     
                  </Box>
                  <Box mb='2'>
                    <Text htmlFor='name' mb='2'>
                      Taxa de saída do PIX (reais)
                    </Text>
                    <NumberInput
                      onChange={(valueString) => handlePixLimit(parse(valueString))}
                      value={format(pixLimit)}
                      precision={2}
                      borderColor='#20242D'
                      borderRadius={5}
                      _placeholder={{
                          fontSize: '18',
                          color: '#20242D'
                      }}
                    >
                      <NumberInputField />                      
                    </NumberInput>                                                     
                  </Box>
                  <Box mb='2'>
                    <Text htmlFor='name' mb='2'>
                      Taxa de saída do TED (reais)
                    </Text>
                    <NumberInput
                      onChange={(valueString) => handlePixLimit(parse(valueString))}
                      value={format(pixLimit)}
                      precision={2}
                      borderColor='#20242D'
                      borderRadius={5}
                      _placeholder={{
                          fontSize: '18',
                          color: '#20242D'
                      }}
                    >
                      <NumberInputField />                      
                    </NumberInput>                                                     
                  </Box>
                  <Box mb='2'>
                    <Text htmlFor='name' mb='2'>
                      Taxa de emissão do Boleto (reais)
                    </Text>
                    <NumberInput
                      onChange={(valueString) => handlePixLimit(parse(valueString))}
                      value={format(pixLimit)}
                      precision={2}
                      borderColor='#20242D'
                      borderRadius={5}
                      _placeholder={{
                          fontSize: '18',
                          color: '#20242D'
                      }}
                    >
                      <NumberInputField />                      
                    </NumberInput>                                                     
                  </Box>
                  <Flex mt='8' justify='flex-end'>                    
                    <Button type='submit' onClick={handleSubmit} colorScheme='whatsapp'>Atualizar</Button>
                  </Flex>
                </CardBody>                  
              </VStack>             
            </Card>
          </Flex>
          <Flex mt='8' justify='flex-end'>
            <Link as={RouterLink} to='/clients' display="flex" algin="center">
              <Button colorScheme='blackAlpha'>Voltar</Button>
            </Link>
          </Flex>
        </Box>
    </AuthLayout>
  )
}