import React, {useState, useEffect} from 'react';
import { useToast, Box, Card, CardBody, Heading, Input, VStack, Flex, HStack, Button, Link, Text, NumberInput, NumberInputField} from '@chakra-ui/react';
import { Link as RouterLink, useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

import AuthLayout from '../_layouts/AuthLayout';

export default function EditPartners({jwt, user}) {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [pixLimit, setPixLimit] = useState(0);
  const [transactionLimit, setTransactionLimit] = useState(0);
  const [cardLimit, setCardLimit] = useState(0);
  const [pixFee, setPixFee] = useState(0);
  const [receivePixFee, setReceivePixFee] = useState(0);
  const [minReceivePixFee, setMinReceivePixFee] = useState(0);
  const [tedFee, setTedFee] = useState(0);
  const [boletoFee, setBoletoFee] = useState(0);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigation = useNavigate();
  
  async function handleSubmit() {
    setLoading(true);

    const body = {
      planId: id,
      name: name,
      amount: Number(amount),
      pix_limit: Number(pixLimit),
      transaction_limit: Number(transactionLimit),
      card_limit: Number(cardLimit),
      pix_fee: Number(pixFee),
      receive_pix_fee: Number(receivePixFee),
      min_receive_pix_fee: Number(minReceivePixFee),
      ted_fee: Number(tedFee),
      boleto_fee: Number(boletoFee),
    }

    console.log(body);

    try{
      const response = await api.post('/bo/update-plan', body, {
        headers: {
          'Authorization': 'Bearer '+jwt
        }
      })

      if(response.data){
        toast({
          title: 'Plano atualizado',
          description: 'Alteração realizada com sucesso',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        navigation('/plans');
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

  async function handleData(){
    try {
      const response = await api.post('/bo/get-plan',{
        planId: id
      },{
        headers: {
          'Authorization': 'Bearer ' + jwt
        }
      });

      if(response.data){
        setName(response.data.name);
        setAmount(response.data.amount)
        setPixLimit(response.data.pix_limit);
        setTransactionLimit(response.data.transaction_limit);
        setCardLimit(response.data.card_limit);
        setPixFee(response.data.pix_fee);
        setMinReceivePixFee(response.data.min_receive_pix_fee);
        setReceivePixFee(response.data.receive_pix_fee);
        setTedFee(response.data.ted_fee);
        setBoletoFee(response.data.boleto_fee);
      };

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
        <Heading size='lg' fontWeight='normal'>Atualizar um Plano</Heading>          

        <Flex w='100%' mt={8}>
          <Card w='100%' direction={{ base: 'column', sm: 'row' }} justify='space-evenly'>
            <CardBody justify='center'> 
              <Box mb='2'>
                <Text htmlFor='name' mb='2'>
                  Nome do Plano
                </Text>                                  
                <Input 
                    name='name'
                    id='name'
                    type='text'                                        
                    borderColor='#20242D'
                    borderRadius={5}
                    _placeholder={{
                        fontSize: '18',
                        color: '#20242D'
                    }}
                    value={name}
                    onChange={(event)=> setName(event.target.value)}
                  />
              </Box>             
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
                <Box mb='2'>
                  <Text htmlFor='name' mb='2'>
                    Taxa mínima de entrada do PIX (R$)
                  </Text>
                  <NumberInput
                    onChange={(valueString) => setMinReceivePixFee(valueString)}
                    value={minReceivePixFee}
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
              </CardBody>                  
            </VStack>             
          </Card>
        </Flex>
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