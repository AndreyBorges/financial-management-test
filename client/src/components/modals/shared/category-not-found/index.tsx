import { WarningCircle } from '@phosphor-icons/react'
import { Container } from './styles'

const CategoryNotFound = () => {
  return (
    <Container>
      <WarningCircle size={64} weight='bold' />

      <p>Nenhuma categoria cadastrada</p>
    </Container>
  )
}

export default CategoryNotFound
