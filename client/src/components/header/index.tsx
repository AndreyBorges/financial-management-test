import React, { useState } from 'react'
import { HeaderContainer } from './styles'
import { ModalTransaction, Button } from '..'
import { useMediaQuery } from '@/hook'
import { CurrencyDollar } from 'phosphor-react'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpenModal = () => {
    setIsOpen(state => !state)
  }

  const isMobile = useMediaQuery('(min-width: 650px)')
  
  return (
    <>
      <HeaderContainer>
        <div>
          <h1>Gerenciamento Pessoal</h1>

          <Button onClick={handleOpenModal}>
            {isMobile ? (
              <>
                <CurrencyDollar size={24} />
                Adicionar Transação
              </>
            ) : (
              <CurrencyDollar size={24} />
            )}
          </Button>
        </div>
      </HeaderContainer>
      {isOpen && <ModalTransaction {...{ handleOpenModal }} />}
    </>
  )
}

export default Header
