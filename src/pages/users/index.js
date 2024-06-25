import React, { useEffect, useState } from 'react';
import { Avatar, Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Text, Checkbox, Tbody, HStack, Link, Skeleton } from '@chakra-ui/react';
import { RiAddLine, RiPencilLine } from 'react-icons/ri';
import api from '../../services/api';
import { formatDate } from '../../utils/format';

import { Link as RouterLink} from 'react-router-dom';

import AuthLayout from '../_layouts/AuthLayout';
import Pagination from '../../components/Pagination';

export default function UserList({ jwt, user }) {
    const [plan, setPlan] = useState('');
    const [date, setDate] = useState('');
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const STATUS_PAYMENTS = {
        'false': "Inativo",        
        'true': "Ativo",        
      };
       
    async function loadData(){
        try{
            const responseUsers = await api.post('/bo/list-account', {}, {
                headers: {
                'Authorization': 'Bearer ' + jwt
                }
            });
        
            if(responseUsers.data){
                setUsers(responseUsers.data);
            };
            setLoading(false);
        } catch(err) {
            setUsers([]);
            setLoading(true);
        }
    }
    
    useEffect(() => {
        loadData()
    }, [jwt]);


  return (
    <AuthLayout>
        <Flex display="flex" w='100%' flexDirection="column">
            <Box w='100%' mb={16} p='50px' bg='gray.100' p='8' >
                <Flex mb='8' justify='space-between' align='center'>
                    <Heading size='lg' color='#E52A24' fontWeight='normal'>Contas Cadastradas</Heading>
                    
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
                            <Th>Conta</Th>
                            <Th>Data de cadastro</Th>
                            <Th>Documento</Th>
                            <Th>Status Conta</Th>
                            <Th>Acesso</Th>
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
                            {users.map((e) => {
                                return(
                                    <Tr>
                                        <Td>
                                            <Box>
                                                <Text fontWeight='bold'>{e.company_name}</Text>
                                                <Text fontWeight='sm'>{e.account_token}</Text>
                                            </Box>
                                        </Td>
                                        <Td>
                                            {formatDate(e.createdAt)}
                                        </Td>
                                        <Td>
                                            {e.document}
                                        </Td>
                                        <Td>
                                            {STATUS_PAYMENTS[e.status]}
                                        </Td>
                                        <Td>
                                            <HStack spacing='2'>
                                                <Link as={RouterLink} to={`/clients/${e.account_token}`} display="flex" algin="center">
                                                    <Button
                                                    as='a'
                                                    size='sm'
                                                    fontSize='sm'
                                                    colorScheme='red'
                                                    leftIcon={<Icon as={RiPencilLine} />}
                                                    >
                                                        BO Conta
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
