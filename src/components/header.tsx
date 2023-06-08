import { ComponentChildren } from 'preact'
import { theme } from '../theme'
import Flex from './flex'

interface Props {
  children?: ComponentChildren
  hideOnScroll?: boolean
}

const Header = ({ children, hideOnScroll = false }: Props) => {
  return (
    <Flex
      flexDirection="column"
      style={{
        width: '100%',
        position: 'sticky',
        top: 0,
        boxShadow: '0px 0px 2px 1px rgb(9 46 11 / 71%)',
        zIndex: hideOnScroll ? 0 : 1,
      }}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        style={{
          width: '100%',
          color: theme.colors.darkGreen,
          backgroundColor: 'rgb(216, 219, 216)',
          padding: '8px 16px',
          height: '66px',
        }}
      >
        <p>Christmas in</p>
        <h2
          style={{
            fontSize: '28px',
            textTransform: 'uppercase',
            letterSpacing: '4px',
          }}
        >
          Vienna
        </h2>
      </Flex>
      {children}
    </Flex>
  )
}

export default Header
