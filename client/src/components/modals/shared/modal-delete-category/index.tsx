import { useCategories, useModal } from '@/hook'

import { CaretLeft } from '@phosphor-icons/react'
import { FC, useEffect } from 'react'

import { BackDrop, Button } from '@/components'
import { ModalType } from '@/interfaces'
import { Loading } from '..'
import { ModalBody, ModalCategoryWrapper, ModalFooter, ModalHeader } from './styles'

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
          <div onClick={() => handleOpenModal(ModalType.LIST_CATEGORY)}>
            <CaretLeft size={24} weight='bold' />
            <span>Voltar</span>
          </div>
        </ModalHeader>

        <ModalBody>
          <p>Tem certeza que deseja excluir esta categoria?</p>
          <p>
            Existem <span>{currentCategory?.quantity}</span> transações vinculadas a esta categoria!
          </p>

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
      <BackDrop />
    </>
  )
}

export default ModalDeleteCategory
