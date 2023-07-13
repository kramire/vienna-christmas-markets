import { MutableRefObject } from 'react'

type Alignment =
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'left'
  | 'right'
  | 'normal'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'

interface Props {
  ref?: MutableRefObject<HTMLDivElement | null>
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
  className?: string
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justifyContent?: Alignment
  alignItems?: Alignment
  gap?: string | number | null | undefined
  style?: React.CSSProperties
}

const Flex = ({ children, ref, onClick, className, style, ...rest }: React.PropsWithChildren<Props>) => {
  return (
    <div ref={ref} onClick={onClick} className={className} style={{ display: 'flex', ...rest, ...style }}>
      {children}
    </div>
  )
}

export default Flex
