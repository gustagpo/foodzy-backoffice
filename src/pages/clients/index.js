import React, { useState, useEffect } from 'react';
import { useToast, Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Td, Text, Checkbox, Tbody, HStack, Link, Image } from '@chakra-ui/react';
import { RiAddLine, RiCloseLine, RiPencilLine } from 'react-icons/ri';
import { MdBlock, MdCheck } from "react-icons/md";
import { Link as RouterLink} from 'react-router-dom';
import api from '../../services/api';
import { formatDate } from '../../utils/format';

import AuthLayout from '../_layouts/AuthLayout';

export default function PartnerList({jwt, config}) {
    const [partners, setPartners] = useState([]);
    const toast = useToast();

    async function deletePartner( id ){
        try{
            const response = await api.post('/bo/block-user/', {
                userId: id
            },{
              headers: {
                'Authorization': 'Bearer '+jwt
              }
            })
      
            if(response.data == 'APPROVED'){
                toast({
                  title: 'Usuário ativo.',
                  description: 'Alteração realizada com sucesso',
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });

            } else {
                toast({
                  title: 'Usuário bloqueado.',
                  description: 'Alteração realizada com sucesso',
                  status: 'success',
                  duration: 5000,
                  isClosable: true,
                });                
            };

            console.log(id);
            console.log(response.data);
            loadData();

        } catch (err) {
            console.log(err.data)
            toast({
              title: 'Erro no bloqueio.',
              description: err.response.data.error,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
        }
    }

    async function loadData(){
        try{
            const responsePartners = await api.post('/bo/list-users', {}, {
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
                    <Heading size='lg' color='#E52A24' fontWeight='normal'>Usuários Cadastrados</Heading>
                    
                    {/* <Link as={RouterLink} to='/partners/create' display="flex" algin="center">
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
                    </Link> */}

                </Flex>

                <Table colorScheme='gray.200'>
                    <Thead>
                        <Tr>
                            <Th>Username</Th>
                            <Th>CPF</Th>
                            <Th>E-mail</Th>
                            <Th>Status</Th>
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
                                            <Text fontWeight='bold'>{e.username}</Text>
                                        </Box>
                                    </Td>
                                    <Td>
                                        {e.cpf}
                                    </Td>
                                    <Td>
                                        {e.email}
                                    </Td>
                                    <Td>
                                        {e.status == true ? 'Ativo' : 'Inativo'}
                                    </Td>
                                    <Td>
                                        {formatDate(e.createdAt)}
                                    </Td>
                                    <Td>
                                        <HStack spacing='2'>
                                            {/* <Link as={RouterLink} to={`/users/${e.id}`} display="flex" algin="center">
                                                <Button
                                                as='a'
                                                size='sm'
                                                fontSize='sm'
                                                colorScheme='blue'
                                                leftIcon={<Icon as={RiPencilLine} />}
                                                >
                                                    Editar
                                                </Button>
                                            </Link> */}
                                            { config.users_block ? (
                                             e.status == true ? 
                                                 <Button                                            
                                                     size='sm'
                                                     fontSize='sm'
                                                     colorScheme='red'
                                                     leftIcon={<Icon as={MdBlock} />}
                                                     onClick={() => deletePartner(e.id)}
                                                 >
                                                     Bloquear
                                                 </Button>                                            
                                             : 
                                                 <Button                                            
                                                     size='sm'
                                                     fontSize='sm'
                                                     colorScheme='whatsapp'
                                                     leftIcon={<Icon as={MdCheck} />}
                                                     onClick={() => deletePartner(e.id)}
                                                 >
                                                     Desbloquear
                                                 </Button> 
                                             )                                       
                                             : 
                                             <></>
                                            }

                                            
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
