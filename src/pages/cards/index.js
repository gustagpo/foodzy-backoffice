import React, { useEffect, useState } from 'react';
import { Input, Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Text, Checkbox, Tbody, HStack, Link, Skeleton } from '@chakra-ui/react';
import { RiReceiptLine } from 'react-icons/ri';
import { MdCheck, MdBlock } from "react-icons/md";
import api from '../../services/api';
import { formatDate, formatValue } from '../../utils/format';

import { Link as RouterLink} from 'react-router-dom';

import AuthLayout from '../_layouts/AuthLayout';
import Pagination from '../../components/Pagination';

export default function CardList({ jwt, user }) {
    const [at, setAt] = useState(null);
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    async function handleAt(){
        loadData();
    };
       
    async function loadData(){
        try{
            const response = await api.post(`/bo/list-card`, {
                'at': at
            } , {
                headers: {
                'Authorization': 'Bearer ' + jwt
                }
            });
        
            if(response.data){
                setCards(response.data);
                setLoading(false);
            };
        } catch(err) {
            setCards([]);
            setLoading(true);
        }
    }
    
    useEffect(() => {
        loadData()
    }, [jwt]);


  return (
    <AuthLayout>
        <Flex display="flex" w='100%' flexDirection="column">
            <Box w='100%' mb={16} bg='gray.100' p='8'>
                <Flex mb='8' justify='space-between' align='center'>
                    <Heading size='lg' color='#E52A24' fontWeight='normal'>Cartões Cadastrados</Heading>
                    <Flex align='end'>
                        <Flex direction='column' align='left' mr='4'>
                            <Text>Filtrar por Conta</Text>
                            <Input borderColor='black' size='md' type='text' value={at} onChange={(e) => setAt(e.target.value)}/>
                        </Flex>
                        <Button type='submit' onClick={handleAt} colorScheme='red'>Filtrar</Button>
                    </Flex>

                </Flex>
                    
                <Table colorScheme='gray.200'>
                    <Thead>
                        <Tr>
                            <Th>Cartão</Th>
                            <Th>Final</Th>
                            <Th>Status</Th>
                            <Th>Saldo</Th>
                            <Th>Holder</Th>
                            <Th>Ações</Th>
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
                            {cards.map((e) => {
                                return(
                                    <Tr>
                                        <Td>
                                            {e.display_name}
                                        </Td>
                                        <Td>
                                            {e.number.split(" ")[3]}
                                        </Td>
                                        <Td>
                                            {e.status == 'active' ? <Icon boxSize={6} color={'green'} as={MdCheck} /> : <Icon boxSize={6} color={'red'} as={MdBlock} />}
                                        </Td>
                                        <Td>
                                            {formatValue(e.balance)}
                                        </Td>
                                        <Td>
                                            <Box>
                                                <Text fontWeight='bold'>{e.holder_name}</Text>
                                                <Text fontWeight='sm'>{e.holder_tax_id}</Text>
                                            </Box>
                                        </Td>
                                        <Td>
                                            <HStack spacing='2'>
                                                {/* {e.status == 'active' ? 
                                                    <Button type='submit' size='sm' fontSize='sm' colorScheme='red' leftIcon={<Icon as={MdBlock} />} onClick={() => {}}>Bloquear</Button>
                                                : 
                                                    <Button type='submit' size='sm' fontSize='sm' colorScheme='green' leftIcon={<Icon as={MdCheck} />} onClick={() => {}}>Liberar</Button>
                                                } */}
                                                <Link as={RouterLink} to={`/cards/${e.id}`} display="flex" algin="center">
                                                    <Button
                                                    as='a'
                                                    size='sm'
                                                    fontSize='sm'
                                                    colorScheme='blue'
                                                    leftIcon={<Icon as={RiReceiptLine} />}
                                                    >
                                                        Ver Extrato
                                                    </Button>
                                                </Link>
                                            </HStack>
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
