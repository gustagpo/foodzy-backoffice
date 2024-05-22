import React from 'react';
import { Box, Select, InputGroup, InputLeftElement, Heading, Input, SimpleGrid, VStack, FormControl, FormLabel, Flex, HStack, Button, Link, Icon} from '@chakra-ui/react';
import { PhoneIcon } from '@chakra-ui/icons';
import { FiUser } from 'react-icons/fi';
import { BsCalendarDate } from 'react-icons/bs';
import { AiOutlineIdcard, AiOutlineMail, AiOutlineLock } from 'react-icons/ai';
import { Link as RouterLink } from 'react-router-dom';

import AuthLayout from '../_layouts/AuthLayout';

export default function CreateUsers() {
  return (
    <AuthLayout>
        <Box w='100%' flex='1' p='8'>
          <Heading size='lg' fontWeight='normal'>Cadastrar um novo dependente</Heading>

          <VStack spacing='4' mt={8}>
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={FiUser} color='#004AAD' />
                  </InputLeftElement>
                  <Input
                      name='name'
                      id='name'
                      type='text'
                      size='md'
                      color='black'
                      borderColor='#004AAD'
                      borderRadius={20}
                      placeholder='Nome Completo'
                      _placeholder={{
                          fontSize: '18',
                          color: '#004AAD'
                      }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={AiOutlineMail} color='#004AAD' />
                  </InputLeftElement>
                  <Input
                      name='email'
                      id='email'
                      type='email'
                      size='md'
                      color='black'
                      borderColor='#004AAD'
                      borderRadius={20}
                      placeholder='E-mail'
                      _placeholder={{
                          fontSize: '18',
                          color: '#004AAD'
                      }}
                  />
                </InputGroup>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={AiOutlineIdcard} color='#004AAD' />
                  </InputLeftElement>
                  <Input
                      name='cpf'
                      id='cpf'
                      type='text'
                      size='md'
                      color='black'
                      borderColor='#004AAD'
                      borderRadius={20}
                      placeholder='CPF'
                      _placeholder={{
                          fontSize: '18',
                          color: '#004AAD'
                      }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <PhoneIcon color='#004AAD' />
                  </InputLeftElement>
                  <Input
                      name='phone'
                      id='phone'
                      type='text'
                      size='md'
                      color='black'
                      borderColor='#004AAD'
                      borderRadius={20}
                      placeholder='Celular'
                      _placeholder={{
                          fontSize: '18',
                          color: '#004AAD'
                      }}
                  />
                </InputGroup>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={BsCalendarDate} color='#004AAD' />
                  </InputLeftElement>
                  <Input
                      name='birthday'
                      id='birthday'
                      type='date'
                      size='md'
                      color='black'
                      borderColor='#004AAD'
                      borderRadius={20}
                      placeholder='Data de nascimento'
                      _placeholder={{
                          fontSize: '18',
                          color: '#004AAD'
                      }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <Select
                    name='password'
                    id='password'
                    type='text'
                    size='md'
                    color='black'
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='Tipo'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                >
                  <option value='1'>Adulto</option>
                  <option value='2'>Criança</option>
                </Select>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={AiOutlineLock} color='#004AAD' />
                  </InputLeftElement>
                  <Input
                      name='password'
                      id='password'
                      type='text'
                      size='md'
                      color='black'
                      borderColor='#004AAD'
                      borderRadius={20}
                      placeholder='Senha'
                      _placeholder={{
                          fontSize: '18',
                          color: '#004AAD'
                      }}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={AiOutlineLock} color='#004AAD' />
                  </InputLeftElement>
                  <Input
                      name='confirm-password'
                      id='confirm-password'
                      type='text'
                      size='md'
                      color='black'
                      borderColor='#004AAD'
                      borderRadius={20}
                      placeholder='Confirmar Senha'
                      _placeholder={{
                          fontSize: '18',
                          color: '#004AAD'
                      }}
                  />
                </InputGroup>
              </FormControl>
            </SimpleGrid>
          </VStack>
          <VStack spacing='4' mt={8}>
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={FiUser} color='#004AAD' />
                  </InputLeftElement>
                  <Input 
                    name='name'
                    id='name'
                    type='text'
                    size='md'
                    color='black'
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='Nome Completo'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={name}
                    onChange={(event)=> setName(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <PhoneIcon color='#004AAD' />
                  </InputLeftElement>
                  <Input
                    as={InputMask}
                    name='phone'
                    id='phone'
                    type='text'
                    size='md'
                    color='black'
                    mask="(99) 99999-9999"
                    maskChar={null}
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='Celular'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={phone}
                    onChange={(event)=> setPhone(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={AiOutlineIdcard} color='#004AAD' />
                  </InputLeftElement>
                  <Input
                    as={InputMask}
                    name='cpf'
                    id='cpf'
                    type='text'
                    size='md'
                    color='black'
                    disabled
                    mask="999.999.999-99"
                    maskChar={null}
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='CPF'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={document}
                    onChange={(event)=> checkCPF(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={AiOutlineMail} color='#004AAD' />
                  </InputLeftElement>
                  <Input
                      name='email'
                      id='email'
                      type='email'
                      size='md'
                      color='black'
                      borderColor='#004AAD'
                      borderRadius={20}
                      placeholder='E-mail'
                      _placeholder={{
                          fontSize: '18',
                          color: '#004AAD'
                      }}
                      value={email}
                      onChange={(event)=> setEmail(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={BsCalendarDate} color='#004AAD' />
                  </InputLeftElement>
                  <Input
                    name='birthday'
                    id='birthday'
                    type={birthday ? 'date' : 'text'}
                    size='md'
                    onFocus={handleDate}
                    color='black'
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='Data de Nascimento'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={birthday}
                    onChange={(event)=> setBirthday(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={AiOutlineLock} color='#004AAD' />
                  </InputLeftElement>
                  <Input
                    name='password'
                    id='password'
                    type='password'
                    size='md'
                    color='black'
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='Senha Antiga'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={oldPassword}
                    onChange={(event)=> setOldPassword(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </SimpleGrid>
            <SimpleGrid minChildWidth='240px' spacing='8' w='100%'>
              <FormControl isRequired>
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={AiOutlineLock} color='#004AAD' />
                  </InputLeftElement>
                  <Input
                    name='password'
                    id='password'
                    type='password'
                    size='md'
                    color='black'
                    disabled={ oldPassword ? false : true }
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='Nova Senha'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={password}
                    onChange={(event)=> setPassword(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
              <FormControl >
                <InputGroup>
                  <InputLeftElement pointerEvents='none'>
                    <Icon as={AiOutlineLock} color='#004AAD' />
                  </InputLeftElement>
                  <Input
                    name='confirm_password'
                    id='confirm_password'
                    type='password'
                    size='md'
                    color='black'
                    disabled={ password ? false : true }
                    borderColor='#004AAD'
                    borderRadius={20}
                    placeholder='Confirmar senha'
                    _placeholder={{
                        fontSize: '18',
                        color: '#004AAD'
                    }}
                    value={confirmPassword}
                    onChange={(event)=> setConfirmPassword(event.target.value)}
                  />
                </InputGroup>
              </FormControl>
            </SimpleGrid>
          </VStack>
          <Flex mt='8' justify='flex-end'>
            <HStack spacing='4'>
              <Link as={RouterLink} to='/users' display="flex" algin="center">
                <Button colorScheme='blackAlpha'>Cancelar</Button>
              </Link>
              <Button colorScheme='whatsapp'>Salvar</Button>
            </HStack>
          </Flex>
        </Box>
    </AuthLayout>
  )
}
