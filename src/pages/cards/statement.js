import React, { useEffect, useState } from 'react';
import { Input, Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Text, Checkbox, Tbody, HStack, Link, Skeleton, Select, SelectField } from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import api from '../../services/api';
import { formatCompletDate, formatValue } from '../../utils/format';

import { Link as RouterLink, useParams} from 'react-router-dom';
import {format, subDays} from 'date-fns';

import AuthLayout from '../_layouts/AuthLayout';

export default function CardStatement({ jwt, user }) {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [card, setCard] = useState({});
    const [statement, setStatement] = useState([]);
       
    async function loadData(){
        setLoading(true);
        try{      
            const responseAccount = await api.post(`/bo/statement-card`, {
                'cardId': id,
            }, {
                headers: { 
                    'Authorization': 'Bearer ' + jwt,
                }      
            });
        
            if(responseAccount.data){
                setStatement(responseAccount.data);
                setLoading(false);
            };
        } catch(err) {
            setStatement([]);
        }
    };

    async function loadCard(){
        setLoading(true);
        try{      
            const response = await api.post(`/bo/get-card`, {
                'cardId': id,
            }, {
                headers: { 
                    'Authorization': 'Bearer ' + jwt,
                }      
            });
        
            if(response.data){
                setCard(response.data);
                setLoading(false);
            };
        } catch(err) {
            setCard({});
        }
    };
    
    useEffect(() => {
        loadCard();
        loadData();
    }, [jwt]);


  return (
    <AuthLayout>
        <Flex display="flex" w='100%' flexDirection="column">
            <Box w='100%' mb={16} bg='gray.100' p='8' >
                { loading ? 
                    <Flex mb='8' justify='space-between' align='center'>
                        <Heading size='lg' fontWeight='normal'>Extrato do Cartão: </Heading>
                        <Heading size='lg' fontWeight='normal'>Saldo: </Heading>
                        <Link as={RouterLink} to={`/cards`} display="flex" algin="center" mr={2}>
                            <Button colorScheme='blackAlpha'>Voltar</Button>
                        </Link>
                    </Flex>
                 :
                    <Flex mb='8' justify='space-between' align='center'>
                        <Heading size='lg' fontWeight='normal'>Extrato do Cartão: <b>{card.display_name}</b></Heading>
                        <Heading size='lg' fontWeight='normal'>Saldo: {formatValue(card.balance)}</Heading>
                        <Link as={RouterLink} to={`/cards`} display="flex" algin="center" mr={2}>
                            <Button colorScheme='blackAlpha'>Voltar</Button>
                        </Link>
                    </Flex>
                 }
                    
                <Table colorScheme='gray.200'>
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th>Descrição / Origem</Th>
                            <Th>Data - Hora</Th>
                            <Th>Valor</Th>
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
                                            {formatCompletDate(e.date) }
                                        </Td>
                                        <Td>
                                            {formatValue(e.amount)}
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
