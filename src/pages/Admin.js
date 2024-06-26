import React, { useEffect, useState } from 'react';
import { Box, Flex, Heading, SimpleGrid, Text, theme, Tooltip } from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import { InfoOutlineIcon } from '@chakra-ui/icons';
import api from '../services/api';
import { formatValue } from '../utils/format';

import AuthLayout from './_layouts/AuthLayout';

const options = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false,
    },
    foreColor: theme.colors.gray[500],
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    type: 'datetime',
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2022-12-18T00:00:00.0000Z',
      '2022-12-19T00:00:00.0000Z',
      '2022-12-20T00:00:00.0000Z',
      '2022-12-21T00:00:00.0000Z',
      '2022-12-22T00:00:00.0000Z',
      '2022-12-23T00:00:00.0000Z',
      '2022-12-24T00:00:00.0000Z'
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3,
    }
  }
};

const series = [
  { name: 'Vendas', data: [35, 50, 10, 28, 61, 18, 25] },
]

export default function Home({ jwt, user }) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  async function loadData(){
    try{
        const response = await api.post('/bo/dashboard', {}, {
            headers: {
            'Authorization': 'Bearer ' + jwt
            }
        });
    
        if(response.data){
            setData(response.data);
            console.log(response.data);
        };
        setLoading(false);
    } catch(err) {
        setData({});
        setLoading(true);
    }
  };

  useEffect(() => {
    loadData();
  },[jwt])
  return (
    <AuthLayout>
      <Flex w='100%' mb={10}>
          <SimpleGrid flex="1" gap="4" minChildWidth="320px" align="flex-start">
              <Box
                p="8"
                bg="gray.200"
                borderRadius={8}
                pb="4"
              >
                <Flex w="100%" align="center" pb="4">
                  <Text fontSize="lg" mr="1">Custódia</Text>
                  <Tooltip label="Valor de saldo em todas as carteiras do sistema." hasArrow placement='top' width='36' fontSize={10}>
                    <InfoOutlineIcon fontSize="sm" color="gray.400"/>
                  </Tooltip>
                </Flex>                  
                <Flex height={160} direction="column" pt="4">
                  <Heading size='xl'>{formatValue(data.balance)}</Heading>
                  <br/>    
                  <Text fontSize='lg'>Contas: {data.accounts}</Text>                                                                                                                                          
                  <Text fontSize='lg'>Usuários: {data.users}</Text>                                                                                                                                          
                </Flex>
              </Box>
              <Box
                p="8"
                bg="gray.200"
                borderRadius={8}
                pb="4"
              >
                <Flex w="100%" align="center" pb="4">
                  <Text fontSize="lg" mr="1">Transações</Text>
                  <Tooltip label="Valor acumulados das transações podendo ou não ser válidas." hasArrow placement='top' width='36' fontSize={10}>
                    <InfoOutlineIcon fontSize="sm" color="gray.400"/>
                  </Tooltip>
                </Flex>
                <Flex height={160} direction="column">
                  <Text fontSize='lg'>IN (entrada)</Text>                                                                                                                                          
                  <Heading size='lg'>{formatValue(data.inAmount)}</Heading>
                  <br/>    
                  <Text fontSize='lg'>OUT (saída)</Text>                                                                                                                                          
                  <Heading size='lg'>{formatValue(data.outAmount)}</Heading>                                                                                                                                                          
                </Flex>
              </Box>
              <Box
                p="8"
                bg="gray.200"
                borderRadius={8}
                pb="4"
              >
                  <Flex w="100%" align="center" pb="4">
                    <Text fontSize="lg" mr="1">Receita</Text>
                    <Tooltip label="Valor de taxas debitadas." hasArrow placement='top' width='36' fontSize={10}>
                      <InfoOutlineIcon fontSize="sm" color="gray.400"/>
                    </Tooltip>
                  </Flex>
                  <Flex height={160} direction="column" pt="4">
                    <Heading size='xl'>{formatValue(data.feeAmount)}</Heading>
                    <br/>    
                    <Text fontSize='lg'>PIX (in): </Text>                                                                                                                                          
                    <Text fontSize='lg'>PIX (out):</Text>                                                                                                                                          
                </Flex>
              </Box>
              <Box
                p="8"
                bg="gray.200"
                borderRadius={8}
                pb="4"
              >
                <Flex w="100%" align="center" pb="4">
                  <Text fontSize="lg" mr="1">Vendas</Text>
                  <Tooltip label="Valor de pedidos gerados podendo ou não ser receita." hasArrow placement='top' width='36' fontSize={10}>
                    <InfoOutlineIcon fontSize="sm" color="gray.400"/>
                  </Tooltip>
                </Flex>
                <Chart options={options} series={series} type="bar" height={160} />
              </Box>
              <Box
                p="8"
                bg="gray.200"
                borderRadius={8}
                pb="4"
              >
                  <Flex w="100%" align="center" pb="4">
                    <Text fontSize="lg" mr="1">Sessões Diárias</Text>
                    <Tooltip label="Quantidade de pessoas que visistaram a página." hasArrow placement='top' width='36' fontSize={10}>
                      <InfoOutlineIcon fontSize="sm" color="gray.400"/>
                    </Tooltip>
                  </Flex>
                  <Chart options={options} series={series} type="area" height={160} />
              </Box>                
              <Box
                p="8"
                bg="gray.200"
                borderRadius={8}
                pb="4"
              >
                  <Flex w="100%" align="center" pb="4">
                    <Text fontSize="lg" mr="1">Taxa de Conversão</Text>
                    <Tooltip label="Relação entre a quantidade de pedidos e pedidos pagos." hasArrow placement='top' width='36' fontSize={10}>
                      <InfoOutlineIcon fontSize="sm" color="gray.400"/>
                    </Tooltip>
                  </Flex>
                  <Chart options={options} series={series} type="area" height={160} />
              </Box>
          </SimpleGrid>
      </Flex>
    </AuthLayout>
  )
}