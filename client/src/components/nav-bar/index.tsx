import { useTransactions } from '@/hook'
import { NavBarItem } from '@/interfaces'
import { navBarAtom } from '@/store'
import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import { Container } from './styles'

const NavBar = () => {
  const navigate = useRouter()
  const { state: transactionsState, handleGetAllTransactions } = useTransactions()

  const { info } = transactionsState

  const [_, setState] = useAtom(navBarAtom)
  const { state } = _

  if (!info) return

  const handleClick = () => {
    handleGetAllTransactions({
      page: 1,
      limit: info?.total
    })
    setState({ state: NavBarItem.REPORTS })
    navigate.push('/reports')
  }
  return (
    <Container>
      <ul>
        <li
          className={state === NavBarItem.TRANSACTIONS ? 'active' : ''}
          onClick={() => {
            setState({ state: NavBarItem.TRANSACTIONS })
            navigate.push('/')
          }}
        >
          Minhas transações
        </li>
        <li onClick={handleClick} className={state === NavBarItem.REPORTS ? 'active' : ''}>
          Relatorios
        </li>
      </ul>
    </Container>
  )
}

export default NavBar
