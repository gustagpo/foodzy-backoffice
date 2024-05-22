import React from 'react';
import { Box, Button, Stack } from '@chakra-ui/react';

export default function Pagination() {
  return (
    <Stack
      direction='row'
      spacing='6'
      mt='8'
      justify='space-between'
      align='center'
    >
        <Box>
            <strong>0</strong> - <strong>2</strong> de <strong>2</strong>
        </Box>
        <Stack direction='row' spacing='2'>
            <Button
            size='sm'
            fontSize='xs'
            width='4'
            colorScheme='twitter'
            disabled
            _disabled={{
                bg: 'whatsapp',
                cursor: 'default',
            }}
            >
                1
            </Button>
            <Button
            size='sm'
            fontSize='xs'
            width='4'
            bg='gray.300'
            _hover={{
                bg: 'blue.400',
                color: 'white'
            }}
            >
                2
            </Button>
            <Button
            size='sm'
            fontSize='xs'
            width='4'
            bg='gray.300'
            _hover={{
                bg: 'blue.400',
                color: 'white'
            }}
            >
                3
            </Button>
        </Stack>
    </Stack>
  )
}
