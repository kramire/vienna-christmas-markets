import { ComponentChildren } from 'preact'
import { MutableRef } from 'preact/hooks'
import { JSXInternal } from 'preact/src/jsx'

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
  children: ComponentChildren
  ref?: MutableRef<HTMLDivElement | null>
  onClick?: JSXInternal.MouseEventHandler<HTMLDivElement> | undefined
  className?: string
  flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse'
  justifyContent?: Alignment
  alignItems?: Alignment
  gap?: string | number | null | undefined
  style?: JSXInternal.CSSProperties
}

const Flex = ({ children, ref, onClick, className, style, ...rest }: Props) => {
  return (
    <div ref={ref} onClick={onClick} className={className} style={{ display: 'flex', ...rest, ...style }}>
      {children}
    </div>
  )
}

export default Flex
