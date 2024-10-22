import { Box, Flex } from "@chakra-ui/react"
import type { ReactNode } from "react"

import { Footer } from "./components/footer"
import { Header } from "./components/header"

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" width="full" height="full" transition="0.5s ease-out">
      <Flex wrap="wrap" margin="8" minHeight="90vh">
        <Header />
        <Box width="full" as="main" marginY={22}>
          {children}
        </Box>
        <Footer />
      </Flex>
    </Box>
  )
}
