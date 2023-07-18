import { NavBar } from '..'
import { HeaderContainer, LogoContainer } from './styles'

const Header = () => {
  return (
    <HeaderContainer>
      <div>
        <LogoContainer>
          <div>
            <img src='logo-icon.png' alt='Logo' />
            <h1>Gerenciamento Financeiro </h1>
          </div>
        </LogoContainer>
      </div>
      <NavBar />
    </HeaderContainer>
  )
}

export default Header
