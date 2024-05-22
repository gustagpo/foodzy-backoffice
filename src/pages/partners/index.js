import React, { useState, useEffect } from 'react';
import { useToast, Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Text, Checkbox, Tbody, HStack, Link, Image } from '@chakra-ui/react';
import { RiAddLine, RiCloseLine, RiPencilLine } from 'react-icons/ri';
import { Link as RouterLink} from 'react-router-dom';
import api from '../../services/api';
import { formatDate } from '../../utils/format';

import AuthLayout from '../_layouts/AuthLayout';

export default function PartnerList({jwt, user}) {
    const [partners, setPartners] = useState([]);
    const toast = useToast();

    async function deletePartner( id ){
        try{
            const response = await api.delete(`/partners/admin/${id}`, {
              headers: {
                'Authorization': 'Bearer '+jwt
              }
            })
      
            if(response.data){
              toast({
                title: 'Exclusão realizada.',
                description: 'Exclusão realizada com sucesso',
                status: 'success',
                duration: 5000,
                isClosable: true,
              });
              loadData();
            }

        } catch (err) {
            console.log(err.data)
            toast({
              title: 'Erro na exclusão.',
              description: err.response.data.error,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
        }
    }

    async function loadData(){
        try{
            const responsePartners = await api.get('/partners/list', {
                headers: {
                'Authorization': 'Bearer '+jwt
                }
            });
        
            if(responsePartners.data){
                setPartners(responsePartners.data);
            };
        } catch(err) {
            setPartners([]);
        }
    }
    
    useEffect(() => {
        loadData()
    }, [jwt]);

    return (
        <AuthLayout>
            <Box w='100%' flex='1' borderRadius={8} bg='gray.100' p='8' flexDirection='column' mb='20'>
                <Flex mb='8' justify='space-between' align='center'>
                    <Heading size='lg' color='#004AAD' fontWeight='normal'>Parceiros Cadastrados</Heading>
                    
                    <Link as={RouterLink} to='/partners/create' display="flex" algin="center">
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
                            <Th>Nome</Th>
                            <Th>Documento</Th>
                            <Th>Data de Cadastro</Th>
                            <Th>Ações</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        { partners.map((e) => {
                            return(
                                <Tr>
                                    {/* <Td>
                                        <Image boxSize='100px' alt='product' src='https://cdn.shopify.com/s/files/1/0252/1726/9832/products/fone-de-ouvido-bluetooth-5-0-xiaomi-redmi-airdots-auto-pareamento-intra-auricular-com-microfone-recarregavel-preto-xm348pre-1_1024x1024_461eaa68-681d-4917-bf4b-2405f7b95225_900x.jpg?v=1612740941'/>
                                    </Td> */}
                                    <Td>
                                        <Box>
                                            <Text fontWeight='bold'>{e.partner.name}</Text>
                                        </Box>
                                    </Td>
                                    <Td>
                                        {e.partner.document}
                                    </Td>
                                    <Td>
                                        {formatDate(e.partner.created_at)}
                                    </Td>
                                    <Td>
                                        <HStack spacing='2'>
                                            <Link as={RouterLink} to={`/plans/edit/?doc=${e.partner.document}`} display="flex" algin="center">
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

                                            <Button
                                            as='a'
                                            size='sm'
                                            fontSize='sm'
                                            colorScheme='red'
                                            leftIcon={<Icon as={RiCloseLine} />}
                                            onClick={() => deletePartner(e.partner.id)}
                                            >
                                                Excluir
                                            </Button>
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
