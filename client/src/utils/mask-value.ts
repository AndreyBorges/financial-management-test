export const handleMaskValue = (
  value: number,
  setMasked?: (value: React.SetStateAction<string>) => void
) => {
  const formattedValue = value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  if (setMasked) {
    setMasked(formattedValue)
  }

  return formattedValue
}
