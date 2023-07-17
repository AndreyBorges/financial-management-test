import { useMediaQuery, useModal, useTransactions } from '@/hook'
import { ModalType, TransactionType } from '@/interfaces'
import { capitalizeString, formatDate, handleMaskValue } from '@/utils'
import { Eye, PencilSimpleLine, Trash } from '@phosphor-icons/react'
import { FC, useEffect, useState } from 'react'
import { Filter, Loading } from '..'
import { PriceHighlight, TransactionsContainer, TransactionsTableWrapper } from './styles'
import { TransactionsNotFound } from './shared'

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
  const { transactions, isLoading } = state


  return (
    <TransactionsContainer>
      <Filter />
      {isLoading ? (
        <Loading />
      ) : transactions.length > 0 ? (
        <TransactionsTableWrapper>
          <tbody>
            {transactions.map(transaction =>
              isDesktop ? (
                <tr key={transaction.id}>
                  <td width='50%'>
                    <p> {transaction.description}</p>
                  </td>
                  <AmountItem
                    {...{ amount: transaction.amount, type: transaction.type as TransactionType }}
                  />
                  <td>
                    <p>{capitalizeString(transaction.category)}</p>
                  </td>
                  {isTablet && (
                    <td>
                      <p> {formatDate({ dateString: String(transaction.createdAt) }).date}</p>
                      <p>
                        <span>
                          às {formatDate({ dateString: String(transaction.createdAt) }).hour}
                        </span>
                      </p>
                    </td>
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
                  <td width='60%'>
                    <p> {transaction.description}</p>
                  </td>
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
      ) : (
        <TransactionsNotFound />
      )}
    </TransactionsContainer>
  )
}

export default TransactionsTable
