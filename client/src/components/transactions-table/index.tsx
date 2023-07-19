import { useFilter, useMediaQuery, useModal, useTransactions } from '@/hook'
import { ModalType, TransactionType } from '@/interfaces'
import { capitalizeString, formatDate, handleMaskValue } from '@/utils'
import { CaretLeft, CaretRight, Eye, PencilSimpleLine, Plus, Trash } from '@phosphor-icons/react'
import { FC, useEffect, useState } from 'react'
import { Button, Filter, Loading } from '..'
import { TransactionsNotFound } from './shared'
import {
  CategoryTag,
  Navigation,
  NewTransactionButtonWrapper,
  PriceHighlight,
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
  const { transactions, isLoading, info } = state

  const { handleChangePageWithFilter } = useFilter()

  const pageNumbers = Array.from({ length: info?.totalPages as number }, (_, index) => index + 1)

  const page = info?.page as number

  return (
    <TransactionsContainer>
      <Filter />
      <NewTransactionButtonWrapper>
        <Button onClick={() => handleOpenModal(ModalType.CREATE_TRANSACTION)}>
          {isDesktop ? (
            <>
              <Plus weight='bold' size={24} />
              Adicionar Transação
            </>
          ) : (
            <Plus weight='bold' size={24} />
          )}
        </Button>
      </NewTransactionButtonWrapper>
      {isLoading || !info ? (
        <Loading />
      ) : info?.totalInPage !== 0 ? (
        <TransactionsTableWrapper>
          <tbody>
            {transactions.map(transaction =>
              isDesktop ? (
                <tr key={transaction.id}>
                  <td width='50%'>
                    <p> {capitalizeString(transaction.description)}</p>
                  </td>
                  <AmountItem
                    {...{ amount: transaction.amount, type: transaction.type as TransactionType }}
                  />
                  <CategoryTag>
                    <p>{capitalizeString(transaction.category)}</p>
                  </CategoryTag>
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
                      <div>
                        <PencilSimpleLine
                          size={32}
                          weight='bold'
                          onClick={() => {
                            handleSetCurrentTransaction(transaction)
                            handleOpenModal(ModalType.EDIT_TRANSACTION)
                          }}
                        />
                      </div>
                      <div>
                        <Trash
                          size={32}
                          weight='bold'
                          onClick={() => {
                            handleSetCurrentTransaction(transaction)
                            handleOpenModal(ModalType.DELETE_TRANSACTION)
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={transaction.id}>
                  <td width='60%'>
                    <p>{capitalizeString(transaction.description)}</p>
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
      {info?.totalPages && info?.totalPages > 1 ? (
        <Navigation>
          <button
            disabled={!info?.prevPage}
            onClick={() => handleChangePageWithFilter(info?.prevPage as number)}
          >
            <CaretLeft size={isDesktop ? 24 : 18} weight='bold' />
          </button>

          {pageNumbers.map(pg =>
            Math.abs(page - pg) < 2 ? (
              <button
                key={pg}
                onClick={() => handleChangePageWithFilter(pg)}
                className={pg === page ? 'active' : ''}
              >
                {pg}
              </button>
            ) : null
          )}

          <button
            disabled={!info?.nextPage}
            onClick={() => handleChangePageWithFilter(info?.nextPage as number)}
          >
            <CaretRight size={isDesktop ? 24 : 18} weight='bold' />
          </button>
        </Navigation>
      ) : (
        ''
      )}
    </TransactionsContainer>
  )
}

export default TransactionsTable
