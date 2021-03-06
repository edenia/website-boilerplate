import { Box } from '@material-ui/core'

type ContainerProps = {
  children: JSX.Element
}

const Container: React.FC<ContainerProps> = ({ children }: ContainerProps) => {
  return <Box component='main'>{children}</Box>
}

export default Container
