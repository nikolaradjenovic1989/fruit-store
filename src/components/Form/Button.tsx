type ButtonProps = {
  className: string
  disabled?: boolean
  onClick: () => void
  value: string
}

const Button = ({
  className,
  disabled = false,
  onClick,
  value,
}: ButtonProps) => {
  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {value}
    </button>
  )
}

export default Button
