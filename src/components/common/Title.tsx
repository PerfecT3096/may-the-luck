import { ReactNode, FC } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

const Title: FC<Props> = (props: Props) => {
  const { children, className } = props

  return (
    <h1 className={`text-3xl md:text-4xl font-bold ${className}`}>
      {children}
    </h1>
  )
}

export default Title
