import { useMediaQuery, useModal } from '@/hook'
import { ModalType } from '@/interfaces'
import { CurrencyDollar } from 'phosphor-react'
import { Button } from '..'
import { HeaderContainer, LogoContainer } from './styles'

const Header = () => {
  const { handleOpenModal } = useModal()

  const isDesktop = useMediaQuery('(min-width: 750px)')

  return (
    <HeaderContainer>
      <div>
        <LogoContainer>
          {isDesktop ? (
            <>
              <img src='logo-icon.png' alt='Logo' />
              <h1>Gerenciamento Financeiro </h1>
            </>
          ) : (
            <>
              <img src='logo-icon.png' alt='Logo' />
              <h1>
                Gerenciamento <br /> Financeiro
              </h1>
            </>
          )}
        </LogoContainer>

        <Button onClick={() => handleOpenModal(ModalType.CREATE_TRANSACTION)}>
          {isDesktop ? (
            <>
              <CurrencyDollar weight='bold' size={24} />
              Adicionar Transação
            </>
          ) : (
            <CurrencyDollar weight='bold' size={24} />
          )}
        </Button>
      </div>
    </HeaderContainer>
  )
}

export default Header
