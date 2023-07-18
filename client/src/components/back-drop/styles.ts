import { styled } from 'styled-components'

export const BackDropWrapper = styled.div`
  position: fixed;
  z-index: 2;
  background: rgba(0, 15, 7, 0.5);
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  backdrop-filter: blur(3px);
`
