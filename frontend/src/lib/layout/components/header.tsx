import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react"

import { ThemeToggle } from "./theme-toggle"

export const Header = () => {
  return (
    <Flex
      as="header"
      width="full"
      align="center"
      alignSelf="flex-start"
      justifyContent="center"
      gridGap={2}
    >
      <HStack spacing={2}>
        <Image
          flexShrink={0}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Logo_UIT_updated.svg/1268px-Logo_UIT_updated.svg.png"
          width={16}
        />
        <Flex flexDirection="column" gap={1}>
          <Text fontSize="xl">Môn: Khai thác dữ liệu và ứng dụng​</Text>
          <Text fontSize="md">GVHD: TS Võ Nguyễn Lê Duy​</Text>
        </Flex>
      </HStack>
      <Box marginLeft="auto">
        <ThemeToggle />
      </Box>
    </Flex>
  )
}
