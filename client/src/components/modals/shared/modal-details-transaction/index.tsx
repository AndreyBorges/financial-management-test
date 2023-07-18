import { useModal, useTransactions } from '@/hook'

import { ArrowCircleDown, ArrowCircleUp, PencilSimpleLine, Trash, X } from '@phosphor-icons/react'
import { FC } from 'react'

import { BackDrop } from '@/components'
import { ModalType, TransactionType } from '@/interfaces'
import { capitalizeString, formatDate, handleMaskValue } from '@/utils'
import { Loading } from '..'
import {
  ModalBody,
  ModalDatesTransaction,
  ModalDetailsTransactionWrapper,
  ModalFooter,
  ModalHeader,
  ModalTypeTransaction
} from './styles'

const ModalDetailsCategory: FC = () => {
  const { state } = useTransactions()
  const { handleOpenModal } = useModal()
  const { isLoading, currentTransaction } = state

  if (isLoading || !currentTransaction) return <Loading />

  return (
    <>
      <ModalDetailsTransactionWrapper>
        <ModalHeader>
          <h1>Detalhes da Transação</h1>
          <div>
            <X onClick={() => handleOpenModal()} size={24} weight='bold' />
          </div>
        </ModalHeader>

        <ModalBody>
          <div>
            <span>Descrição:</span>
            <span>{currentTransaction.description}</span>
          </div>
          <div>
            <span>Valor:</span>
            <span>{handleMaskValue(currentTransaction.amount)}</span>
          </div>
          <div>
            <span>Categoria:</span>
            <span>{capitalizeString(currentTransaction.category)}</span>
          </div>
          <ModalTypeTransaction type={currentTransaction.type as TransactionType}>
            <span>Tipo:</span>
            <span>
              {currentTransaction.type === TransactionType.INCOME ? (
                <>
                  <ArrowCircleUp weight='bold' size={24} />
                  Entrada
                </>
              ) : (
                <>
                  <ArrowCircleDown weight='bold' size={24} />
                  Saida
                </>
              )}
            </span>
          </ModalTypeTransaction>
          <ModalDatesTransaction>
            <span>Data:</span>
            <div>
              <span>{formatDate({ dateString: String(currentTransaction.createdAt) }).date}</span>
              <span>{formatDate({ dateString: String(currentTransaction.createdAt) }).hour}</span>
            </div>
          </ModalDatesTransaction>
          <ModalDatesTransaction>
            <span>Atualizado em:</span>
            <div>
              <span>{formatDate({ dateString: String(currentTransaction.updatedAt) }).date}</span>
              <span>{formatDate({ dateString: String(currentTransaction.updatedAt) }).hour}</span>
            </div>
          </ModalDatesTransaction>
        </ModalBody>
        <ModalFooter>
          <div>
            <span
              onClick={() => {
                handleOpenModal(ModalType.EDIT_TRANSACTION)
              }}
            >
              <PencilSimpleLine size={32} weight='bold' />
              Editar
            </span>
            <span
              onClick={() => {
                handleOpenModal(ModalType.DELETE_TRANSACTION)
              }}
            >
              <Trash size={32} weight='bold' />
              Deletar
            </span>
          </div>
        </ModalFooter>
      </ModalDetailsTransactionWrapper>
      <BackDrop />
    </>
  )
}

export default ModalDetailsCategory
