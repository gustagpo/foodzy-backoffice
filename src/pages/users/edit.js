import React, {useState, useEffect} from 'react';
import { useToast, Box, Card, Select, CardBody, Switch, InputGroup, InputLeftElement, Heading, Input, SimpleGrid, VStack, FormControl, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Flex, HStack, Button, Link, Icon, Text, Image, Badge, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper} from '@chakra-ui/react';
import { FaPercentage } from 'react-icons/fa';
import { MdAttachMoney } from 'react-icons/md';
import { GrTransaction } from 'react-icons/gr';
import InputMask from 'react-input-mask';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { cpf } from 'cpf-cnpj-validator';
import { formatDate, formatValue } from '../../utils/format';

import AuthLayout from '../_layouts/AuthLayout';

export default function EditUsers({jwt, user}) {
  const { at } = useParams();
  const [newUser, setNewUser] = useState('');
  const [plan, setPlan] = useState('');
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

  const [balance, setBallance] = useState('');
  const [account, setAccount] = useState({});
  const [docs, setDocs] = useState([]);
  const [config, setConfig] = useState({});
  const [admin, setAdmin] = useState({});
  const [users, setUsers] = useState([]);
  const [amount, setAmount] = useState(0);
  const [pixLimit, setPixLimit] = useState(0);
  const [transactionLimit, setTransactionLimit] = useState(0);
  const [cardLimit, setCardLimit] = useState(0);
  const [pixFee, setPixFee] = useState(0);
  const [receivePixFee, setReceivePixFee] = useState(0);
  const [tedFee, setTedFee] = useState(0);
  const [boletoFee, setBoletoFee] = useState(0);
  const [planId, setPlanId] = useState(null);

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

  async function handleStatusAccount(e){
    setLoading(true);

    try{
      const response = await api.post(`/bo/approve-account`, {
        at: account.account_token
      },{
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      })

      if(response.data == 'APPROVED'){
        toast({
          title: 'Conta ativa.',
          description: 'Alteração realizada com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        setStatusAccount(true);
      } else {
        toast({
          title: 'Conta desativada.',
          description: 'Alteração realizada com sucesso',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });

        setStatusAccount(false);
      };

      console.log(e);
      console.log(response.data);
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

  async function handleStatusDocument(e){
    setLoading(true);

    try{
      const response = await api.post(`/bo/approve-account-document`, {
        at: account.account_token
      },{
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      })

      if(response.data == 'APPROVED'){
        toast({
          title: 'Documentos aprovados.',
          description: 'Alteração realizada com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        setStatusDocument(true);
      } else {
        toast({
          title: 'Documentos pendentes.',
          description: 'Alteração realizada com sucesso',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });

        setStatusDocument(false);
      };

      console.log(e);
      console.log(response.data);
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

  function format(val) {
    return `$` + val;
  };

  function parse(val) {
    if(val === '$') {
      return
    } else {
      return Number(val.replace(/^\$/, ''));
    }
  };

  async function handleSubmit() {
    setLoading(true);

    const body = {
      account_id: account.id,
      amount: Number(amount),
      pix_limit: Number(pixLimit),
      transaction_limit: Number(transactionLimit),
      card_limit: Number(cardLimit),
      pix_fee: Number(pixFee),
      receive_pix_fee: Number(receivePixFee),
      ted_fee: Number(tedFee),
      boleto_fee: Number(boletoFee),
      plan_id: planId
    };

    try{
      const response = await api.post(`/bo/account-config`, body, {
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
      const responseAccount = await api.post(`/bo/get-account`, {}, {
        headers: { 
            'Authorization': 'Bearer ' + jwt,
            'at': at,          
          }      
      });
  
      if(responseAccount.data){
        setBallance(responseAccount.data.balance);
        setAccount(responseAccount.data.account);
        setDocs(responseAccount.data.docs);
        setConfig(responseAccount.data.config);
        setAdmin(responseAccount.data.admin);
        setUsers(responseAccount.data.users);
        if(responseAccount.data.config){
          setAmount(responseAccount.data.config.amount)
          setPixLimit(responseAccount.data.config.pix_limit)
          setTransactionLimit(responseAccount.data.config.transaction_limit)
          setCardLimit(responseAccount.data.config.card_limit)
          setPixFee(responseAccount.data.config.pix_fee)
          setReceivePixFee(responseAccount.data.config.receive_pix_fee)
          setTedFee(responseAccount.data.config.ted_fee)
          setBoletoFee(responseAccount.data.config.boleto_fee)
          setPlanId(responseAccount.data.config.plan_id)
        }
        setStatusAccount(responseAccount.data.account.status);
        setStatusDocument(responseAccount.data.account.status_document);
      };
    } catch(err) {
      setBallance('');
      setAccount({});
      setDocs([]);
      setConfig({});
      setAdmin({});
      setUsers([]);
      setAmount(0);
      setPixLimit(0);
      setTransactionLimit(0);
      setCardLimit(0);
      setPixFee(0);
      setReceivePixFee(0);
      setTedFee(0);
      setBoletoFee(0);
      setPlanId(null);
      setStatusAccount(false);
      setStatusDocument(false);
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
            <Heading size='lg' fontWeight='normal'>Saldo: {formatValue(balance)}</Heading>
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
                    <b>Nome/Razão Social:</b> {account.company_name}                      
                  </Text>                   
                  <Text>
                    <b>Tipo:</b> {account.person_type == 'LEGAL_PERSON' ? ' Pessoa Jurídica (PJ)' : 'Pessoa Física (PF)'}                      
                  </Text>                   
                  <Text>
                    <b>Principal Atividade:</b> {account.main_activity}                      
                  </Text>                   
                  <Text>
                    <b>Email:</b> {account.email}                      
                  </Text>                   
                  <Text>
                    <b>Telefone 1:</b> {account.phone_number_1}                      
                  </Text>                   
                  <Text>
                    <b>Telefone 2:</b> {account.phone_number_2}                      
                  </Text>                   
                </CardBody>                  
              </VStack>                
              <VStack>
                <CardBody>
                  <Text>
                    <b>Documento {account.documentType}:</b> {account.document}                      
                  </Text>
                  { account.person_type === 'LEGAL_PERSON' ? 
                    <Text>
                      <b>Data de Abertura:</b> {account.document_date}                      
                    </Text> 
                    :
                    <Text>
                      <b>Data de Nascimento:</b> {account.birthday}                      
                    </Text> 
                  }                   
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
                    <b>Complemento:</b> {account.complement != null ? account.complement : '' } 
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
                      Pendente
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
                      Aprovados
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
                    <b>Username:</b> {admin.username}                      
                  </Text>                   
                  <Text>
                    <b>Nome:</b> {admin.name}                      
                  </Text>                   
                  <Text>
                    <b>CPF:</b> {admin.cpf}                      
                  </Text>                   
                  <Text>
                    <b>Data de Nascimento:</b> {admin.birthday}                      
                  </Text>                                     
                  <Text>
                    <b>Email:</b> {admin.email}                      
                  </Text>                   
                  <Text>
                    <b>Telefone:</b> {admin.phone}                      
                  </Text>
                  <Text>
                    <b>CEP:</b> {admin.cep}                      
                  </Text>                   
                  <Text>
                    <b>Logadouro:</b> {admin.address} 
                  </Text> 
                  <Text>
                    <b>Número:</b> {admin.number} 
                  </Text> 
                  <Text>
                    <b>Complemento:</b> {admin.complement} 
                  </Text> 
                  <Text>
                    <b>Bairro:</b> {admin.neighborhood} 
                  </Text> 
                  <Text>
                    <b>Cidade:</b> {admin.city} 
                  </Text> 
                  <Text>
                    <b>Estado:</b> {admin.state}                                        
                  </Text>                                                       
                </CardBody>                  
              </VStack>
            </Card>
            <Card w='100%' direction='column'>               
              <Heading size='lg' fontWeight='normal' textAlign='center' mb='6'>Documentos da Conta</Heading>
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
                <Select name='plan' id='plan' placeholder='Selecione a opção' mb='8'>
                  <option value='0' selected>Basic</option>
                </Select>
                <Box>
                  <Text htmlFor='name' mb='2'>
                    Valor de Manutenção da Conta (mês)
                  </Text>
                  <NumberInput
                    onChange={(valueString) => setAmount(valueString)}
                    value={amount}
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
              </CardBody>                                               
              <VStack>
                <CardBody>
                  <Box mb='2'>
                    <Text htmlFor='name' mb='2'>
                      Limite de PIX (diário)
                    </Text>
                    <NumberInput
                      onChange={(valueString) => setPixLimit(valueString)}
                      value={pixLimit}
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
                      onChange={(valueString) => setTransactionLimit(valueString)}
                      value={transactionLimit}
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
                      onChange={(valueString) => setReceivePixFee(valueString)}
                      value={receivePixFee}
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
                      onChange={(valueString) => setPixFee(valueString)}
                      value={pixFee}
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
                      onChange={(valueString) => setTedFee(valueString)}
                      value={tedFee}
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
                      onChange={(valueString) => setBoletoFee(valueString)}
                      value={boletoFee}
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