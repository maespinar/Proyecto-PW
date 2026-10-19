import './StatusBadge.css'

function StatusBadge({ estado }) {
  const getBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'recibida':
        return 'badge-info'
      case 'en revisión':
      case 'en revision':
        return 'badge-warning'
      case 'aceptada':
        return 'badge-success'
      case 'descartada':
        return 'badge-danger'
      case 'retirada':
        return 'badge-neutral'
      case 'vigente':
        return 'badge-vigente'
      default:
        return 'badge-neutral'
    }
  }

  return (
    <span className={`status-badge ${getBadgeClass(estado)}`}>
      {estado}
    </span>
  )
}

export default StatusBadge
