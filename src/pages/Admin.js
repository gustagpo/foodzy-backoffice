import React from 'react';
import { Box, Flex, SimpleGrid, Text, theme, Tooltip } from '@chakra-ui/react';
import Chart from 'react-apexcharts';
import { InfoOutlineIcon } from '@chakra-ui/icons';

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

export default function Home() {
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
                      <Text fontSize="lg" mr="1">Receita</Text>
                      <Tooltip label="Valor de pedidos pagos." hasArrow placement='top' width='36' fontSize={10}>
                        <InfoOutlineIcon fontSize="sm" color="gray.400"/>
                      </Tooltip>
                    </Flex>
                    <Chart options={options} series={series} type="bubble" height={160} />
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
                      <Text fontSize="lg" mr="1">Leads</Text>
                      <Tooltip label="Quantidade de pessoas que se cadastraram." hasArrow placement='top' width='36' fontSize={10}>
                        <InfoOutlineIcon fontSize="sm" color="gray.400"/>
                      </Tooltip>
                    </Flex>
                    <Chart options={options} series={series} type="radar" height={160} />
                </Box>
                <Box
                  p="8"
                  bg="gray.200"
                  borderRadius={8}
                  pb="4"
                >
                    <Flex w="100%" align="center" pb="4">
                      <Text fontSize="lg" mr="1">Lucro</Text>
                      <Tooltip label="Valor final após retirado o custos dos produtos." hasArrow placement='top' width='36' fontSize={10}>
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