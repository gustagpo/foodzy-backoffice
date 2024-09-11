import React, { useState, useEffect } from 'react';
import { useToast, Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Text, Checkbox, Tbody, HStack, Link, Image } from '@chakra-ui/react';
import { RiAddLine, RiCloseLine, RiPencilLine } from 'react-icons/ri';
import { Link as RouterLink} from 'react-router-dom';
import api from '../../services/api';
import { formatDate, formatValue } from '../../utils/format';

import AuthLayout from '../_layouts/AuthLayout';

export default function PartnerList({jwt, user}) {
    const [data, setData] = useState([]);
    const toast = useToast();

    async function loadData(){
        try{
            const response = await api.post('/bo/list-plan', {}, {
                headers: {
                'Authorization': 'Bearer '+jwt
                }
            });
        
            if(response.data){
                setData(response.data);
            };
        } catch(err) {
            setData([]);
        }
    }
    
    useEffect(() => {
        loadData()
    }, [jwt]);

    return (
        <AuthLayout>
            <Box w='100%' flex='1' borderRadius={8} bg='gray.100' p='8' flexDirection='column' mb='20'>
                <Flex mb='8' justify='space-between' align='center'>
                    <Heading size='lg' color='#2D2D2D' fontWeight='normal'>Planos Cadastrados</Heading>
                    
                    <Link as={RouterLink} to='/plans/create' display="flex" algin="center">
                        <Button
                        as='a'
                        size='sm'
                        fontSize='sm'
                        colorScheme='green'
                        leftIcon={<Icon
                        as={RiAddLine}
                        />}
                        >
                        Adicionar novo
                        </Button>
                    </Link>

                </Flex>

                <Table colorScheme='gray.200'>
                    <Thead>
                        <Tr>
                            <Th>Plano</Th>
                            <Th>Mensalidade</Th>
                            <Th>Limite PIX Diário</Th>
                            <Th>Limite por Transação Diário</Th>
                            <Th>Qtd. de Cartão</Th>
                            <Th>Pix IN (%)</Th>
                            <Th>Pix OUT (R$)</Th>
                            <Th>Taxa TED OUT (R$)</Th>
                            <Th>Taxa Boleto (R$)</Th>                            
                            <Th>Ações</Th>                            
                        </Tr>
                    </Thead>
                    <Tbody>
                        { data.map((e) => {
                            return(
                                <Tr color='black'>                                    
                                    <Td>                                    
                                        <Text fontWeight='bold'>{e.name}</Text>
                                    </Td>
                                    <Td>
                                        {formatValue(e.amount)}
                                    </Td>
                                    <Td>
                                        {formatValue(e.pix_limit)}
                                    </Td>
                                    <Td>
                                        {formatValue(e.transaction_limit)}
                                    </Td>
                                    <Td>
                                        {e.card_limit}
                                    </Td>
                                    <Td>
                                        {e.receive_pix_fee}
                                    </Td>
                                    <Td>
                                        {e.pix_fee}
                                    </Td>
                                    <Td>
                                        {e.ted_fee}
                                    </Td>
                                    <Td>
                                        {e.boleto_fee}
                                    </Td>                                    
                                    <Td>
                                        <HStack spacing='2'>
                                            <Link as={RouterLink} to={`/plans/edit/${e.id}`} display="flex" algin="center">
                                                <Button
                                                as='a'
                                                size='sm'
                                                fontSize='sm'
                                                colorScheme='blue'
                                                leftIcon={<Icon as={RiPencilLine} />}
                                                >
                                                    Editar
                                                </Button>
                                            </Link>                                            
                                        </HStack>
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
