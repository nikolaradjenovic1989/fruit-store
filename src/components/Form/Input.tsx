import { Dispatch, SetStateAction } from 'react'
import cn from 'classnames'

type InputProps = {
  className?: string
  name: string
  onChange: Dispatch<SetStateAction<string>>
  type?: 'text' | 'number'
  value: string | number
}

const Input = ({
  className,
  name,
  onChange,
  type = 'text',
  value,
}: InputProps) => {
  const classes = cn(
    'rounded-lg bg-btn-secondary hover:bg-btn-secondary-hover focus:ring-transparent border-0 w-full h-12',
    className
  )

  return (
    <input
      id={name}
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={classes}
    />
  )
}

export default Input
