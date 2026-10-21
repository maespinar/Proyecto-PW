export function formatearMoneda(monto) {
  if (typeof monto !== 'number') return 'S/ 0.00'
  return `S/ ${monto.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`
}
