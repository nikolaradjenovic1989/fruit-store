type ButtonProps = {
  className: string
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  value: string
}

const Button = ({
  className,
  disabled = false,
  onClick,
  type = 'button',
  value,
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  )
}

export default Button
