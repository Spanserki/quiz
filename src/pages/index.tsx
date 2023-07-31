import { Button, Flex, Heading, Link, Icon } from "@chakra-ui/react";
import { useState } from "react";
import { AiFillTrophy } from "react-icons/ai";

export default function Home() {
  const [isLoadingButton, setIsLoadingButton] = useState('button')
  return (
    <Flex
      flexDir='column'
      w='100%'
      h='100vh'
      align='center'
      justify='center'
      gap={10}
      bgColor='gray.900'
      color='gray.100'
    >
      <Button
        variant='outline'
        onClick={() => setIsLoadingButton('ranking')}
        as={Link}
        href="/ranking"
        size='lg'
        h={100}
        w={400}
        colorScheme="pink"
        fontSize='2xl'
        rightIcon={<Icon as={AiFillTrophy} color='yellow.300'/>}
        _hover={{ textDecor: 'none', opacity: '0.7' }}
        isLoading={isLoadingButton === 'ranking' ? true : false}
        loadingText={<Icon as={AiFillTrophy} color='yellow.300'/>}
      >
        Ranking
      </Button>
      <Heading fontSize='5xl'>
        Jogo de perguntas
      </Heading>
      <Heading
      >
        Mostre que você é fera e tente acertar as perguntas desse quiz!
      </Heading>
      <Heading>???????????</Heading>
      <Button
        onClick={() => setIsLoadingButton('comecar')}
        as={Link}
        href="/registro"
        w='2xl'
        textTransform='uppercase'
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        color='gray.100'
        fontWeight='bold'
        py={8}
        transition='0.7s'
        _hover={{ bgGradient: 'linear(to-r, #7928CA, #FF0080)', textDecor: 'none' }}
        isLoading={isLoadingButton === 'comecar' ? true : false}
      >
        Iniciar uma quiz
      </Button>
    </Flex>
  )
}
