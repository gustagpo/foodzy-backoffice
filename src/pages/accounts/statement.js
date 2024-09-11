import React, { useEffect, useState } from 'react';
import { Input, Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Text, Checkbox, Tbody, HStack, Link, Skeleton, Select, SelectField } from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import api from '../../services/api';
import { formatCompletDate, formatValue } from '../../utils/format';

import { Link as RouterLink, useParams} from 'react-router-dom';
import {format, subDays} from 'date-fns';

import AuthLayout from '../_layouts/AuthLayout';

export default function AccountStatement({ jwt, user }) {
    const { at } = useParams();
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState(0);
    const [statement, setStatement] = useState([]);
    const [select, setSelect] = useState(1000);
    const [initDate, setInitDate] = useState(format(subDays(Date.now(), 30), 'yyyy-MM-dd'));
    const [endDate, setEndDate] = useState(format(Date.now(), 'yyyy-MM-dd'));

    const STATUS_PAYMENTS = {
        'false': "Inativo",        
        'true': "Ativo",        
      };
       
    async function loadData(){
        setLoading(true);
        try{      
            const responseAccount = await api.post(`/bo/transactions-by-period`, {
                'at': at,
                'pageNumber': 1,
                'pageSize': select,
                'startDate': initDate,
                'endDate': endDate
            }, {
                headers: { 
                    'Authorization': 'Bearer ' + jwt,
                }      
            });
        
            if(responseAccount.data){
                setStatement(responseAccount.data.statement);
                setBalance(responseAccount.data.balance);
                setLoading(false);
            };
        } catch(err) {
            setStatement([]);
        }
    };

    async function handleDate(){
        loadData();
    };
    
    useEffect(() => {
        loadData()
    }, [jwt]);


  return (
    <AuthLayout>
        <Flex display="flex" w='100%' flexDirection="column">
            <Box w='100%' mb={16} bg='gray.100' p='8' >
                <Flex mb='4' justify='space-between' align='center'>
                    <Heading size='lg' fontWeight='normal'>Extrato da Conta: {at}</Heading>
                    <Heading size='lg' fontWeight='normal'>Saldo: {formatValue(balance)}</Heading>
                    <Link as={RouterLink} to={`/clients/${at}`} display="flex" algin="center" mr={2}>
                        <Button colorScheme='blackAlpha'>Voltar a Conta</Button>
                    </Link>                        
                </Flex>
                <Flex mb='4' justify='center' align='end'>
                    <Flex direction='column' align='left' mr='4'>
                        <Text>Quantidade</Text>
                        <Select borderColor='black' size='md' value={select} onChange={(e) => setSelect(e.target.value)}>
                            <option value={1000}>1.000</option>
                            <option value={5000}>5.000</option>
                            <option value={10000}>10.000</option>
                        </Select>
                    </Flex>
                    <Flex direction='column' align='left' mr='4'>
                        <Text>Data de Inicio</Text>
                        <Input borderColor='black' size='md' type='date' max={endDate} value={initDate} onChange={(e) => setInitDate(e.target.value)}/>
                    </Flex>
                    <Flex direction='column' align='left' mr='4'>
                        <Text>Data Fim</Text>
                        <Input borderColor='black' size='md' type='date' min={initDate} value={endDate} onChange={(e) => setEndDate(e.target.value)}/>
                    </Flex>
                    <Button type='submit' onClick={handleDate} backgroundColor='#D8E800'>Filtrar</Button>
                </Flex>
                    
                <Table colorScheme='gray.200'>
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th>Descrição / Origem</Th>
                            <Th>Tipo</Th>
                            <Th>Data - Hora</Th>
                            <Th>Valor</Th>
                            <Th>Tarifa</Th>
                            <Th>Saldo</Th>
                        </Tr>
                    </Thead>
                    { loading ?                     
                        <Tbody>
                            <Tr>
                                <Td>
                                    <Skeleton height='50px' />
                                </Td>                               
                                <Td>
                                    <Skeleton height='50px' />
                                </Td>                               
                                <Td>
                                    <Skeleton height='50px' />
                                </Td>                               
                                <Td>
                                    <Skeleton height='50px' />
                                </Td>                               
                                <Td>
                                    <Skeleton height='50px' />
                                </Td>                                                                                              
                                <Td>
                                    <Skeleton height='50px' />
                                </Td>                                                                                              
                                <Td>
                                    <Skeleton height='50px' />
                                </Td>
                            </Tr>                                                                                   
                            <Tr>
                                <Td>
                                    <Skeleton height='50px' />
                                </Td>                               
                                <Td>
                                    <Skeleton height='50px' />
                                </Td>                               
                                <Td>
                                    <Skeleton height='50px' />
                                </Td>                               
                                <Td>
                                    <Skeleton height='50px' />
                                </Td>                               
                                <Td>
                                    <Skeleton height='50px' />
                                </Td>                               
                                <Td>
                                    <Skeleton height='50px' />
                                </Td>                                                                                              
                                <Td>
                                    <Skeleton height='50px' />
                                </Td>                                                                                            
                            </Tr>                                                                                   
                        </Tbody>                        
                    :                        
                        <Tbody>                        
                            {statement.map((e) => {
                                return(
                                    <Tr>
                                        <Td>
                                            { e.type == 'IN' ? 
                                                <Icon boxSize={6} color={'green'} as={FaChevronCircleDown} />
                                            :
                                                <Icon boxSize={6} color={'red'} as={FaChevronCircleUp} />
                                            }
                                        </Td>
                                        <Td>
                                            <Text fontWeight='bold'>{e.description}</Text>
                                        </Td>
                                        <Td>
                                            {e.method}
                                        </Td>
                                        <Td>
                                            {formatCompletDate(e.date) }
                                        </Td>
                                        <Td>
                                            {formatValue(e.amount)}
                                        </Td>                                        
                                        <Td>
                                            {formatValue(e.fee)}
                                        </Td>                                        
                                        <Td>
                                            {formatValue(e.balance)}
                                        </Td>                                        
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    }
                </Table>

            </Box>
        </Flex>
    </AuthLayout>
  )
}
