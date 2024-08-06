import React, { useState, useEffect } from 'react';
import { Input, Box, Flex, Skeleton, Heading, SimpleGrid, Button, Icon, Table, Thead, Tr, Th, Td, Text, theme, Tbody, HStack, Tooltip, Image } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import api from '../../services/api';
import { formatValue, formatDate } from '../../utils/format';
import {format, subDays} from 'date-fns';

import AuthLayout from '../_layouts/AuthLayout';

export default function PartnerList({jwt, user}) {
    const [data, setData] = useState({});
    const [startDate, setStartDate] = useState(format(subDays(Date.now(), 30), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(Date.now(), 'yyyy-MM-dd'));
    const [accountData, setAccountData] = useState([]);
    const [loading, setLoading] = useState(true);

    async function handleAt(){
        loadData();
    };

    async function loadData(){
        try{
            const response = await api.post('/bo/accounting', {
                'startDate': startDate,
                'endDate': endDate
            }, {
                headers: {
                'Authorization': 'Bearer ' + jwt
                }
            });
        
            if(response.data){
                setData(response.data);
                setAccountData(response.data.accountsData);
                console.log(response.data);
            };
            setLoading(false);
        } catch(err) {
            setData({});
            setAccountData([]);
            setLoading(true);
        }
    };
    
    useEffect(() => {
        loadData()
    }, [jwt]);

    return (
        <AuthLayout>
            <Box w='100%' flex='1' borderRadius={8} bg='gray.100' p='8' flexDirection='column' mb='20'>
                <Flex mb='8' justify='space-between' align='center'>
                    <Heading size='lg' color='#E52A24' fontWeight='normal'>Painel Contabil</Heading>
                    <Flex align='end'>
                        <Flex direction='column' align='left' mr='4'>
                            <Text>Data de Inicio</Text>
                            <Input borderColor='black' size='md' type='date' max={endDate} value={startDate} onChange={(e) => setStartDate(e.target.value)}/>
                        </Flex>
                        <Flex direction='column' align='left' mr='4'>
                            <Text>Data Fim</Text>
                            <Input borderColor='black' size='md' type='date' min={startDate} value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                        </Flex>                    
                        <Button type='submit' onClick={handleAt} colorScheme='red'>Filtrar</Button>
                    </Flex>
                </Flex>

                <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start" mb={4}>
                    <Box
                        p="8"
                        bg="gray.200"
                        borderRadius={8}
                        pb="4"
                    >
                        <Flex w="100%" align="center" pb="4">
                            <Text fontSize="lg" mr="1">Custódia</Text>
                            <Tooltip label="Valor de taxas debitadas." hasArrow placement='top' width='36' fontSize={10}>
                            <InfoOutlineIcon fontSize="sm" color="gray.400"/>
                            </Tooltip>
                        </Flex>
                        <Flex height={160} direction="column" pt="4">
                            { loading ? <Skeleton height='50px' /> : <Heading size='lg'>{formatValue(data.balance)}</Heading> }
                            <br/>    
                            <Text fontSize='lg'>Contas: {data.accountsCount}</Text>                                                                                                                                          
                            <Text fontSize='lg'>Usuários: {data.users}</Text>                                                                                                                                          
                        </Flex>
                    </Box>
                    <Box
                        p="8"
                        bg="gray.200"
                        borderRadius={8}
                        pb="4"
                    >
                        <Flex w="100%" align="center" pb="4">
                        <Text fontSize="lg" mr="1">Faturamento Total</Text>
                        <Tooltip label="Valor de saldo em todas as carteiras do sistema." hasArrow placement='top' width='36' fontSize={10}>
                            <InfoOutlineIcon fontSize="sm" color="gray.400"/>
                        </Tooltip>
                        </Flex>                  
                        <Flex height={160} direction="column">
                            <Text fontSize='lg'>Taxas</Text>
                            { loading ? <Skeleton height='50px' /> : <Heading size='lg'>{formatValue(data.feeAmount)}</Heading> }
                            <br/>    
                            <Text fontSize='lg'>Mensalidades</Text>
                            { loading ? <Skeleton height='50px' /> : <Heading size='lg'>{formatValue(data.chargeAmount)}</Heading> }
                        </Flex>
                    </Box>
                    <Box
                        p="8"
                        bg="gray.200"
                        borderRadius={8}
                        pb="4"
                    >
                        <Flex w="100%" align="center" pb="4">
                            <Text fontSize="lg" mr="1">Custo Total</Text>
                            <Tooltip label="Valor acumulados das transações podendo ou não ser válidas." hasArrow placement='top' width='36' fontSize={10}>
                                <InfoOutlineIcon fontSize="sm" color="gray.400"/>
                            </Tooltip>
                        </Flex>
                        <Flex height={160} direction="column">
                            <Text fontSize='lg'>Taxas pagas em Pix [Bass]</Text>
                            { loading ? <Skeleton height='50px' /> : <Heading size='lg'>{formatValue(data.pixAmount)}</Heading> }
                            <br/>    
                            <Text fontSize='lg'>Taxas pagas em Pix [API]</Text>
                            { loading ? <Skeleton height='50px' /> : <Heading size='lg'>{formatValue(data.apiAmount)}</Heading> }                                                                                                                                           
                        </Flex>
                    </Box>                                        
                </SimpleGrid>

                <Table colorScheme='gray.200'>
                    <Thead>
                        <Tr>
                            <Th>Conta</Th>
                            <Th>Data de cadastro</Th>
                            <Th>Status Conta</Th>
                            <Th>Faturamento</Th>
                            <Th>Lucro</Th>
                            <Th>Mensalidade</Th>
                            <Th>Total (NF)</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        { accountData.map((e) => {
                            return(
                                <Tr>
                                    {/* <Td>
                                        <Image boxSize='100px' alt='product' src='https://cdn.shopify.com/s/files/1/0252/1726/9832/products/fone-de-ouvido-bluetooth-5-0-xiaomi-redmi-airdots-auto-pareamento-intra-auricular-com-microfone-recarregavel-preto-xm348pre-1_1024x1024_461eaa68-681d-4917-bf4b-2405f7b95225_900x.jpg?v=1612740941'/>
                                    </Td> */}
                                    <Td>
                                        <Box>
                                            <Text fontWeight='bold'>{e.name}</Text>
                                            <Text fontWeight='sm'>{e.at}</Text>
                                        </Box>
                                    </Td>
                                    <Td>
                                        {formatDate(e.date)}
                                    </Td>
                                    <Td>
                                        {e.status == true ? 'Ativo' : 'Inativo'}
                                    </Td>
                                    <Td>
                                        {formatValue(e.accountFee)}
                                    </Td>
                                    <Td>
                                        {formatValue(e.accountFee - e.bankFee)}
                                    </Td>                                    
                                    <Td>
                                        {formatValue(e.charge)}
                                    </Td>                                    
                                    <Td>
                                        {formatValue(e.total)}
                                    </Td>                                    
                                </Tr>                        
                            )
                        })}
                    </Tbody>
                </Table>
            </Box>
        </AuthLayout>
    )
}
