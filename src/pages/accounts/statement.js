import React, { useEffect, useState } from 'react';
import { Avatar, Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Text, Checkbox, Tbody, HStack, Link, Skeleton } from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import api from '../../services/api';
import { formatCompletDate, formatValue } from '../../utils/format';

import { Link as RouterLink, useParams} from 'react-router-dom';

import AuthLayout from '../_layouts/AuthLayout';

export default function UserList({ jwt, user }) {
    const { at } = useParams();
    const [plan, setPlan] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(true);
    const [statusAccount, setStatusAccount] = useState(false);
    const [statusDocument, setStatusDocument] = useState(false);
    const [balance, setBallance] = useState('');
    const [statement, setStatement] = useState([]);

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
                'pageSize': 1000,
                'startDate': '2024-05-03',
                'endDate': '2024-07-17'
            }, {
                headers: { 
                    'Authorization': 'Bearer ' + jwt,
                }      
            });
        
            if(responseAccount.data){
                setStatement(responseAccount.data.statement);
                setLoading(false);
            };
        } catch(err) {
            setStatement([]);
        }
    };
    
    useEffect(() => {
        loadData()
    }, [jwt]);


  return (
    <AuthLayout>
        <Flex display="flex" w='100%' flexDirection="column">
            <Box w='100%' mb={16} bg='gray.100' p='8' >
                <Flex mb='8' justify='space-between' align='center'>
                    <Heading size='lg' fontWeight='normal'>Extrato da Conta: {at}</Heading>
                    <Heading size='lg' fontWeight='normal'>Saldo: {formatValue(balance)}</Heading>
                    <Link as={RouterLink} to={`/clients/${at}`} display="flex" algin="center" mr={2}>
                        <Button colorScheme='blackAlpha'>Voltar a Conta</Button>
                    </Link>                        
                    
                    {/* { plan && plan.type == 1 && plan.plan_type == 7 ?
                        users && users.length < 4 ?
                        <Link as={RouterLink} to='/users/create' display="flex" algin="center">
                            <Button
                            as='a'
                            size='sm'
                            fontSize='sm'
                            colorScheme='green'
                            leftIcon={<Icon
                            as={RiAddLine}
                            />}
                            >
                            Criar novo dependente
                            </Button>
                        </Link>
                        : 
                        <></>
                    :
                        <></>
                    } */}

                </Flex>
                    
                <Table colorScheme='gray.200'>
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th>Descrição/Origem</Th>
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
