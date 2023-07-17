import { format } from 'date-fns'

interface Props {
  dateString: string
}

export const formatDate = ({ dateString }: Props) => {
  const date = new Date(dateString)

  const formattedDate = format(date, 'dd/MM/yyyy')
  const formattedHours = format(date, 'HH:mm')

  return {
    date: formattedDate,
    hour: formattedHours
  }
}
