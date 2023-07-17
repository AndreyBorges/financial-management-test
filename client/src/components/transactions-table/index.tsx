import { useMediaQuery, useModal, useTransactions } from '@/hook'
import { ModalType, TransactionType } from '@/interfaces'
import { formatDate, handleMaskValue } from '@/utils'
import { Eye, MagnifyingGlass, PencilSimpleLine, Trash } from 'phosphor-react'
import { FC, useEffect, useState } from 'react'
import {
  PriceHighlight,
  TransactionSearch,
  TransactionsContainer,
  TransactionsTableWrapper
} from './styles'

interface IAmountItemProps {
  type: TransactionType
  amount: number
}

const AmountItem: FC<IAmountItemProps> = ({ type, amount }) => {
  const [splited, setSplited] = useState<string[]>([])

  useEffect(() => {
    const formattedValue = handleMaskValue(amount)
    if (!formattedValue) return

    const char = formattedValue.split('')[2]
    const splitedValue = formattedValue.split(char)

    setSplited(splitedValue)
  }, [amount])

  return (
    <PriceHighlight variant={type as TransactionType} style={{}}>
      <div>
        <span>{splited[0]}</span>
        <span>{splited[1]}</span>
      </div>
    </PriceHighlight>
  )
}

const TransactionsTable = () => {
  const isDesktop = useMediaQuery('(min-width: 750px)')
  const isTablet = useMediaQuery('(min-width: 900px)')
  const { handleOpenModal } = useModal()
  const { handleSetCurrentTransaction, state } = useTransactions()
  const { transactions } = state

  return (
    <TransactionsContainer>
      <TransactionSearch>
        <input type='text' placeholder='Buscar Transações' />
        <button>
          <MagnifyingGlass size={24} weight='bold' />
          Buscar
        </button>
      </TransactionSearch>
      <TransactionsTableWrapper>
        <tbody>
          {transactions.map(transaction =>
            isDesktop ? (
              <tr key={transaction.id}>
                <td width='50%'>{transaction.description}</td>
                <AmountItem
                  {...{ amount: transaction.amount, type: transaction.type as TransactionType }}
                />
                <td>{transaction.category}</td>
                {isTablet && (
                  <td>{formatDate({ dateString: String(transaction.createdAt) }).date}</td>
                )}
                <td>
                  <div>
                    <PencilSimpleLine
                      size={32}
                      weight='bold'
                      onClick={() => {
                        handleSetCurrentTransaction(transaction)
                        handleOpenModal(ModalType.EDIT_TRANSACTION)
                      }}
                    />
                    <Trash
                      size={32}
                      weight='bold'
                      onClick={() => {
                        handleSetCurrentTransaction(transaction)
                        handleOpenModal(ModalType.DELETE_TRANSACTION)
                      }}
                    />
                  </div>
                </td>
              </tr>
            ) : (
              <tr key={transaction.id}>
                <td width='50%'>{transaction.description}</td>
                <AmountItem
                  {...{ amount: transaction.amount, type: transaction.type as TransactionType }}
                />
                <td>
                  <Eye
                    size={28}
                    weight='bold'
                    onClick={() => {
                      handleSetCurrentTransaction(transaction)
                      handleOpenModal(ModalType.DETAILS_TRANSACTION)
                    }}
                  />
                </td>
              </tr>
            )
          )}
        </tbody>
      </TransactionsTableWrapper>
    </TransactionsContainer>
  )
}

export default TransactionsTable
