import { useCategories, useModal, useTransactions } from '@/hook'

import { X } from 'phosphor-react'
import React, { FC } from 'react'

import { Button, BackDrop } from '@/components'
import { ModalBody, ModalCategoryWrapper, ModalFooter, ModalHeader } from './styles'
import { Loading } from '..'

const ModalDeleteCategory: FC = () => {
  const { state, handleDeleteCategory } = useCategories()
  const { handleOpenModal, state: modalState } = useModal()
  const { prevModal } = modalState
  const { isLoading, currentCategory } = state

  if (isLoading || !currentCategory) return <Loading />

  return (
    <>
      <ModalCategoryWrapper>
        <ModalHeader>
          <h1>Deletar Categoria</h1>
          <div onClick={() => handleOpenModal()}>
            <X size={24} weight='bold' />
          </div>
        </ModalHeader>

        <ModalBody>
          <p>Tem certeza que deseja excluir esta categoria?</p>
          <span>{currentCategory?.name}</span>
          <strong>OBS.: Não será possivel reverter esta ação.</strong>
        </ModalBody>
        <ModalFooter>
          <Button
            variant='primary'
            onClick={() => {
              handleDeleteCategory(Number(currentCategory.id))
              handleOpenModal(prevModal)
            }}
          >
            Sim
          </Button>
          <Button variant='tertiary' onClick={() => handleOpenModal(prevModal)}>
            Não
          </Button>
        </ModalFooter>
      </ModalCategoryWrapper>
      <BackDrop onClick={handleOpenModal} />
    </>
  )
}

export default ModalDeleteCategory
