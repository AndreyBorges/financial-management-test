import { useModal, useTransactions } from '@/hook'

import { X } from 'phosphor-react'
import React, { FC } from 'react'

import { Button, BackDrop } from '@/components'
import { ModalBody, ModalCategoryWrapper, ModalFooter, ModalHeader } from './styles'
import { Loading } from '..'

const ModalDeleteTransaction: FC = () => {
  const { state, handleDeleteTransaction } = useTransactions()
  const { handleOpenModal } = useModal()
  const { isLoading, currentTransaction } = state

  if (isLoading || !currentTransaction) return <Loading />

  return (
    <>
      <ModalCategoryWrapper>
        <ModalHeader>
          <h1>Deletar Transação</h1>
          <div onClick={() => handleOpenModal()}>
            <X size={24} weight='bold' />
          </div>
        </ModalHeader>

        <ModalBody>
          <p>Tem certeza que deseja excluir esta transação?</p>
          <span>{currentTransaction?.description}</span>
          <strong>OBS.: Não será possivel reverter esta ação.</strong>
        </ModalBody>
        <ModalFooter>
          <Button variant='primary' onClick={() => handleDeleteTransaction(currentTransaction.id)}>
            Sim
          </Button>
          <Button variant='tertiary' onClick={() => handleOpenModal()}>
            Não
          </Button>
        </ModalFooter>
      </ModalCategoryWrapper>
      <BackDrop onClick={handleOpenModal} />
    </>
  )
}

export default ModalDeleteTransaction
