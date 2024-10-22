import { ChakraProvider } from "@chakra-ui/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router } from "react-router-dom"
import { Layout } from "~/lib/layout"
import { Routings } from "~/lib/router/routings"
import { theme } from "~/lib/styles/theme"

export const App = () => {
  const queryClient = new QueryClient()

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Layout>
            <Routings />
          </Layout>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  )
}
