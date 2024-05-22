import {format} from 'date-fns';

export const { format: formatValue} = new Intl.NumberFormat('pt-BR',{
  style: 'currency',
  currency: 'BRL'
});

export function formatDate(date) {
  const formatedDate = format(Date.parse(date), 'dd/MM/yyyy');

  return (formatedDate);
}