import React, { useEffect, useState } from 'react';
import { useToast, Link, Avatar, Box, Flex, SimpleGrid, Text, List, Icon, Button, Image, ListItem, ListIcon, HStack, Table, Thead, Tr, Th, Td, Checkbox, Tbody } from '@chakra-ui/react';
import { BsPiggyBank, BsCheck } from 'react-icons/bs';
import { MdCheckCircle } from 'react-icons/md';
import {  RiCloseLine } from 'react-icons/ri';
import Care from '../assets/health-care 2.png';
import Family from '../assets/family 2.png';
import Phone from '../assets/cellphone.png';
import Star from '../assets/star.png';
import { Link as RouterLink } from 'react-router-dom';
import api from '../services/api';
import { formatValue, formatDate } from '../utils/format';


import AuthLayout from './_layouts/AuthLayout';

export default function Home({jwt, user}) {
  const [plan, setPlan] = useState('');
  const [date, setDate] = useState('');
  const [discount, setDiscount] = useState('');
  const [approve, setApprove] = useState('');
  const [partners, setPartners] = useState([]);

  const toast = useToast();

  async function loadData(){
    try{
      const responseApprove = await api.get('/discounts/user/approve', {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
  
      if(responseApprove.data){
        setApprove(responseApprove.data)
      };
    } catch(err) {
      setApprove('')
    }
    
    try{
      const responsePlan = await api.get('/plans', {
        headers: {
          'Authorization': 'Bearer '+jwt
        }
      });
  
      if(responsePlan.data){
        setPlan(responsePlan.data.plan);
        setDate(responsePlan.data.date.split('-'));
      };
    } catch(err) {
      setPlan('');
      setDate('');
    }

    try{
      const responsePartner = await api.get('/partners/list', {
        headers: {
          'Authorization': 'Bearer '+jwt
        }
      });
  
      if(responsePartner.data){
        setPartners(responsePartner.data);
      };
    } catch(err) {
      console.log(err)
    }

    try{
      const responseDis = await api.get('/discounts/user', {
        headers: {
          'Authorization': `Bearer ${jwt}`
        }
      });
  
      if(responseDis.data){
        setDiscount(responseDis.data)
      };
    } catch(err) {
      setDiscount('')
    }

    

  };

  async function handleFalse(id){
    try{
        const responseDis = await api.post('/discounts/check', {
            id: id,
            status: false,
        },{
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
        });

        if(responseDis.data){
            loadData();
        }
    } catch (err) {
        console.log(err.data)
        toast({
            title: 'Erro na confirmação.',
            description: err.data,
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    }
  };

  async function handleTrue(id){
      try{
          const responseDis = await api.post('/discounts/check', {
              id: id,
              status: true,
          },{
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
          });

          if(responseDis.data){
              loadData();
          }
      } catch (err) {
          console.log(err.data)
          toast({
              title: 'Erro na confirmação.',
              description: err.data,
              status: 'error',
              duration: 5000,
              isClosable: true,
          });
      }
  };
  
  useEffect(() => {
    loadData()
  }, [jwt])

  return (
    <AuthLayout>
      <Flex w='100%' display="flex" flexDirection="column">
          <Box padding="100px 140px 70px" bg="#DBFBFD" borderRadius="150px 0 150px 0" mb={24}>
            <Flex align="center" mb="12" >
              {/* <Avatar size="xl" name="Gustavo Peixoto" src="https://github.com/gustagpo.png" mr="12" /> */}
              <Text fontSize="4xl" fontWeight="bold">Bem-vindo, {user.name}</Text>
            </Flex>
            <Text fontSize="xl">Acreditamos que cuidar da sua saúde não precisa ser caro, e é por isso que oferecemos uma variedade de benefícios exclusivos para nossos membros.</Text>
            <Link as={RouterLink} to='/users' display="flex" algin="center">
              <Button bg='#004AAD' color="white" fontSize={18} p="25px 35px" borderRadius={20} mt={10}>Clique aqui para complementar as informações do seu perfil</Button>
            </Link>
          </Box>
          {approve.length > 0 ? 
          <>
              <Text fontSize="4xl" fontWeight="bold">Veja os descontos que precisam ser aprovados</Text>
              <Table colorScheme='gray.200' mt={16} mb={20}>
                  <Thead>
                      <Tr>
                          {/* <Th px='6' width='8'>
                              <Checkbox colorScheme='twitter' borderColor="gray.400" />
                          </Th> */}
                          <Th>Id Desconto</Th>
                          <Th>Parceiro</Th>
                          <Th>Valor</Th>
                          <Th>Data</Th>
                          <Th>Ações</Th>
                      </Tr>
                  </Thead>
                  <Tbody>
                      {approve.map((dis) => {
                        if(dis.status == null) {
                          return (
                          <Tr>
                              {/* <Td px='6'>
                                  <Checkbox colorScheme='twitter' borderColor="gray.400"/>
                              </Td> */}
                              <Td>
                                  <Box>
                                      <Text fontWeight='sm'>#{dis.id.split('-', 1)}</Text>
                                  </Box>
                              </Td>
                              <Td>
                                  {dis.partner.name}
                              </Td>
                              <Td>
                                  {formatValue(dis.value)}
                              </Td>
                              <Td>
                                  {formatDate(dis.date)}
                              </Td>
                              <Td>
                                  { dis.status != null ?
                                      <Button
                                          as='a'
                                          size='sm'
                                          disabled
                                          fontSize='sm'
                                          colorScheme='gray'
                                          leftIcon={<Icon as={MdCheckCircle} />}
                                          >
                                          {dis.status ? 'Confirmado' : 'Negado'}
                                      </Button>
                                  :
                                      <HStack spacing='2'>
                                          <Button
                                          as='button'
                                          size='sm'
                                          fontSize='sm'
                                          colorScheme='green'
                                          leftIcon={<Icon as={BsCheck} />}
                                          onClick={() => handleTrue(dis.id)}
                                          >
                                              Confirmar
                                          </Button>

                                          <Button
                                          as='button'
                                          size='sm'
                                          fontSize='sm'
                                          colorScheme='red'
                                          leftIcon={<Icon as={RiCloseLine} />}
                                          onClick={() => handleFalse(dis.id)}
                                          >
                                              Negar
                                          </Button>
                                      </HStack>
                                  }
                              </Td>
                          </Tr>
                          )
                        }
                      })}        
                  </Tbody>
              </Table>

              {/* <Pagination/> */}
          </>
          :
          <></>
          }
          <Text fontSize="4xl" fontWeight="bold">Veja como você está cuidando da sua saúde pessoal e financeira</Text>
          <SimpleGrid flex="1" gap="4" minChildWidth="500px" align="flex-start" mt={16} mb={20}>
              <Box
                p="8"
                bg="#004AAD"
                borderRadius={14}
                pb="4"
              >
                <Flex w="100%" align="center" pb="4" display="flex" flexDirection="column" color="white" >
                  <Flex align="center" mb="10" justify="center">
                    <Icon as={BsPiggyBank} color="#5DE0E6" transform="scaleX(-1)" boxSize={14} mr="5" />
                    <Text fontSize="3xl" fontWeight="bold" mr="3" align="center" >Sua ECONOMIA até agora: </Text>
                  </Flex>
                  <Flex bgImage={Star} w="100%" bgRepeat="no-repeat" bgSize="contain" transform="rotate(345deg)" bgPos="center" p={16} align="center" justify="center">
                    <Text fontSize="4xl" color="#FD4A8A" fontWeight="bold">{formatValue(discount.total)}</Text>

                  </Flex>
                  {/* <Text fontSize="lg" >Compartilhe a economia que você já conquistou conosco e ajude aqueles que você ama a economizar em seus exames médicos.</Text> */}
                </Flex>
              </Box>
              { plan ?  
                <Box
                  p="8"
                  borderWidth={3}
                  borderColor="#5DE0E6"
                  borderRadius={14}
                  pb="4"
                >
                    <Flex w="100%" align="left" pb="4" display="flex" color="black">
                      <Image src={Care} boxSize={14} mt="2" />
                      <Flex w="100%" align="left" display="flex" ml={6} flexDirection="column" color="black">
                        <Text fontSize="4xl" fontWeight="bold" >{plan.name}</Text>
                        <Text fontSize="3xl" fontWeight="bold" color="#004AAD">{formatValue(plan.value)} /mês</Text>
                      </Flex>
                    </Flex>
                    <Text fontSize="lg" mt={10}>Seu plano atual vence no dia <strong>{date[2]}/{date[1]}/{date[0]}</strong></Text>
                    {/* <Text fontSize="lg" > <strong>Clique aqui para prolongar sua assinatura</strong> (ganhe desconto ao renovar sua assinatura antes do vencimento)</Text> */}
                </Box>
              :
                <Box
                  p="8"
                  borderWidth={3}
                  borderColor="#5DE0E6"
                  borderRadius={14}
                  pb="4"
                >
                    <Flex w="100%" align="left" pb="4" display="flex" color="black">
                      <Image src={Care} boxSize={14} mt="2" />
                      <Flex w="100%" align="left" display="flex" ml={6} flexDirection="column" color="black">
                        <Text fontSize="4xl" fontWeight="bold" >Contrate seu plano</Text>
                        <Text fontSize="3xl" fontWeight="bold" color="#004AAD">Conheça nossas opções</Text>
                      </Flex>
                    </Flex>
                    <Text fontSize="lg" mt={10}>Venha conhecer as opções que oferecem uma ampla gama de exames médicos a um custo reduzido, garantindo que toda a família possa realizar exames de rotina regularmente.<strong>{date}</strong></Text>
                    <Link as={RouterLink} to='/plans' display="flex" algin="center">
                      <Button bg='#004AAD' color="white" fontSize={18} p="25px 35px" borderRadius={20} mt={10}>Clique para contratar esse serviço agora</Button>
                    </Link>
                    {/* <Text fontSize="lg" > <strong>Clique aqui para prolongar sua assinatura</strong> (ganhe desconto ao renovar sua assinatura antes do vencimento)</Text> */}
                </Box>
              }
          </SimpleGrid>
          { plan.plan_type !== 7 ? 
          <>
            <Text fontSize="4xl" fontWeight="bold">Faça o upgrade do seu plano e cuide de mais pessoas!</Text>
            <SimpleGrid flex="1" gap="4" minChildWidth="500px" align="flex-start" p={20} mt={16} mb={20} borderWidth={3} borderColor="#004AAD" borderRadius={14}>
              <Box>
                  <Flex w="100%" align="center" pb="4" display="flex" color="black" mb="6">
                    <Image src={Family} boxSize={14} />
                    <Flex w="100%" align="left" display="flex" ml={6} flexDirection="column" color="black">
                      <Text fontSize="4xl" fontWeight="bold" >Plano Familiar</Text>
                      <Text fontSize="3xl" fontWeight="bold" color="#004AAD">A partir de R$ 39,90 /mês</Text>
                    </Flex>
                  </Flex>
                  <Text fontSize="xl" >É a opção abrangente e econômica para famílias (para até 4 membros) que desejam cuidar da saúde de todos os membros. 
                  Esse plano oferece uma ampla gama de exames médicos a um custo reduzido, garantindo que toda a família possa realizar exames de rotina regularmente.</Text>
              </Box>
              <Box>
                <Flex w="100%" align="left" pl={{ sm: "0", md: "10"}} pb="4" display="flex" flexDirection="column" color="black" fontSize="xl">
                  <List spacing={3}>
                    <ListItem>
                      <ListIcon as={MdCheckCircle} color="#004AAD" />
                      Exames de Urina
                    </ListItem>
                    <ListItem>
                      <ListIcon as={MdCheckCircle} color="#004AAD" />
                      Exames de Imagem
                    </ListItem>
                    <ListItem>
                      <ListIcon as={MdCheckCircle} color="#004AAD" />
                      Eletrocardiograma (ECG)
                    </ListItem>
                    <ListItem>
                      <ListIcon as={MdCheckCircle} color="#004AAD" />
                      Receba seus resultados de exames e prescrições realizados com nossos parceiros
                    </ListItem>
                  </List>
                  <Link as={RouterLink} to='/plans' display="flex" algin="center">
                    <Button bg='#004AAD' color="white" fontSize={18} p="25px 35px" borderRadius={20} mt={10}>Clique para contratar esse serviço agora</Button>
                  </Link>
                </Flex>
              </Box>
            </SimpleGrid>
          </> 
          :
          <>
          </>
          }
          <Text fontSize="4xl" fontWeight="bold">Veja os benefícios dos nossos parceiros</Text>
          <SimpleGrid flex="1" gap="16" minChildWidth="500px" align="flex-start" p={10} mt={3} mb={3}>
          {partners.map((e) => {
            return(
              <Box borderWidth={3} borderColor="#004AAD" borderRadius={14} p={10}>
                  <HStack>
                    <Avatar size="lg" name={e.partner.name} mr="8" />
                    <Text fontSize="4xl" fontWeight="bold" >{e.partner.name}</Text>
                  </HStack>
                  {e.bonifications.map((b) => {
                    return(
                    <Flex w="100%" align="left" display="flex" mr={6} mt={6} flexDirection="column" color="black">
                      <Text fontSize="4xl" fontWeight="bold" >{b.plan == 4 ? 'Plano Individual' : 'Plano Familiar'}</Text>
                      <Text fontSize="2xl" fontWeight="bold" color="#004AAD">{b.name}</Text>
                      <Text fontSize="xl" >{b.description}</Text>
                    </Flex>
                    )
                  })}
              </Box>
            )
          })}
          </SimpleGrid>
          <SimpleGrid flex="1" gap="4" minChildWidth="500px" align="flex-start" mt={10} mb={12}>
            <Box alignSelf="center">
                <Text fontSize="4xl" fontWeight="bold">Acesse gratuitamente os resultados dos seus exames </Text>
                <Text fontSize="xl" mt={5}>Lembre-se, sua saúde é valiosa e merece atenção de qualidade. Conte conosco para ajudá-lo nessa jornada de cuidado com a saúde! 
                Pela Saú, você consegue visualizar os resultados dos seus exames sem sair de casa</Text>
                <Link as={RouterLink} to='/exams' display="flex" algin="center">
                  <Button bg='#004AAD' color="white" fontSize={18} p="25px 35px" borderRadius={20} mt={10}>Clique aqui para visualizar seus exames</Button>  
                </Link>
            </Box>
            <Box>
              <Flex w="100%" align="center" pl={{ sm: "0", md: "10"}} pb="4" display="flex" flexDirection="column" color="black" fontSize="xl">
                <Image src={Phone} />
              </Flex>
            </Box>
          </SimpleGrid>
      </Flex>
    </AuthLayout>
  )
}