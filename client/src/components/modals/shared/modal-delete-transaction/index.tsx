import { useMediaQuery, useModal, useTransactions } from '@/hook'

import { CaretLeft, X } from 'phosphor-react'
import { FC } from 'react'

import { BackDrop, Button } from '@/components'
import { ModalType } from '@/interfaces'
import { Loading } from '..'
import { ModalBody, ModalCategoryWrapper, ModalFooter, ModalHeader } from './styles'

const ModalDeleteTransaction: FC = () => {
  const { state, handleDeleteTransaction } = useTransactions()
  const isMobile = useMediaQuery('(max-width: 750px)')
  const { handleOpenModal, state: modalState } = useModal()
  const { isLoading, currentTransaction } = state
  const { prevModal } = modalState

  if (isLoading || !currentTransaction) return <Loading />

  return (
    <>
      <ModalCategoryWrapper>
        <ModalHeader>
          <h1>Deletar Transação</h1>
          {ModalType.NULL === prevModal ? (
            <div onClick={() => handleOpenModal(isMobile ? prevModal : ModalType.NULL)}>
              <X size={24} weight='bold' />
            </div>
          ) : (
            <div onClick={() => handleOpenModal(prevModal)}>
              <CaretLeft size={24} weight='bold' />
              <span>Voltar</span>
            </div>
          )}
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
      <BackDrop />
    </>
  )
}

export default ModalDeleteTransaction
