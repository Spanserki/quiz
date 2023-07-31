import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryclient";
import {
    Button,
    Flex,
    FormControl,
    Heading,
    Progress,
    Radio,
    RadioGroup,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useToast,
    Icon
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BsQuestionDiamondFill } from 'react-icons/bs'

export default function Registro() {
    const toast = useToast();
    const router = useRouter();
    const [isLoadingButton, setIsLoadingButton] = useState(false)
    const [progressBar, setProgressbar] = useState(1)
    const [id, setId] = useState('')
    const [startTimeQuiz, setTimeStartQuiz] = useState('')
    useEffect(() => {
        const { 'token_user_quiz': id } = parseCookies();
        const { 'start_time_quiz': startTimeQuiz } = parseCookies();
        if (!id) {
            toast({
                position: 'bottom',
                title: 'Ops!',
                description: 'Token não encontrado, reinicie a quiz',
                status: 'info',
                duration: 9000,
                isClosable: true,
            });
            router.push('/')
        }
        setId(id)
        setTimeStartQuiz(startTimeQuiz)
    }, [])
    const { register, handleSubmit } = useForm<any>();
    const handleAnswers: SubmitHandler<any> = async (values) => {
        setIsLoadingButton(true)
        let validation = false;
        Object.keys(values.response).forEach((key: any) => {
            if (values.response[key].answer === null) {
                validation = true;
            }
        })
        if (!!validation) {
            toast({
                position: 'bottom',
                title: 'Ops!',
                description: 'Esqueceu de responder alguma pergunta ?',
                status: 'warning',
                duration: 6000,
                isClosable: true,
            });
            return;
        }
        await api.post('/quiz', {
            id,
            startTimeQuiz,
            values,
        }).then(res => {
            queryClient.invalidateQueries(['getQuizis'])
            setTimeout(() => {
                router.push(`/perguntas/${res.data.id}`)
            }, 3000);
        }).catch(err => {
            toast({
                position: 'bottom',
                title: 'Ops!',
                description: 'Erro ao tentar revisar suas respostas, tente novamente!',
                status: 'error',
                duration: 6000,
                isClosable: true,
            });
        })

    };
    async function SignOut() {
        destroyCookie(undefined, 'token_user_quiz',);
        destroyCookie(undefined, 'time_user_quiz',);
        router.push('/')
    }
    return (
        <Flex
            as='form'
            onSubmit={handleSubmit(handleAnswers)}
            flexDir='column'
            w='100%'
            h='100vh'
            align='center'
            justify='center'
            gap={10}
            bgColor='gray.900'
            color='gray.100'
        >
            <Tabs colorScheme="pink" w='100%' maxW='2xl' gap={6} variant="soft-rounded">
                <TabPanels minW='2xl' maxW='2xl' minH={200} maxH={400} bgColor='gray.800' rounded='md'>
                    <TabPanel>
                        <Stack spacing={6}>
                            <Heading>
                                Qual é a capital do Brasil?
                            </Heading>
                            <FormControl>
                                <RadioGroup onClick={() => setProgressbar(progressBar > 33 ? progressBar : 33)}>
                                    <Stack>
                                        <Radio value='1' {...register('response.1.answer')}>São Paulo</Radio>
                                        <Radio value='2' {...register('response.1.answer')}>Rio de Janeiro</Radio>
                                        <Radio value='10' {...register('response.1.answer')}>Brasília</Radio>
                                    </Stack>
                                </RadioGroup>
                            </FormControl>
                        </Stack>
                    </TabPanel>
                    <TabPanel>
                        <Stack spacing={6}>
                            <Heading>
                                Qual é o maior planeta do Sistema Solar?
                            </Heading>
                            <RadioGroup onClick={() => setProgressbar(progressBar > 66 ? progressBar : 66)}>
                                <Stack>
                                    <Radio value='1' {...register('response.2.answer')}>Terra</Radio>
                                    <Radio value='2' {...register('response.2.answer')}>Marte</Radio>
                                    <Radio value='10' {...register('response.2.answer')}>Júpiter</Radio>
                                </Stack>
                            </RadioGroup>
                        </Stack>
                    </TabPanel>
                    <TabPanel>
                        <Stack spacing={6}>
                            <Heading>
                                Qual é o animal considerado "o rei da selva"?
                            </Heading>
                            <RadioGroup onClick={() => setProgressbar(100)}>
                                <Stack>
                                    <Radio value='1' {...register('response.3.answer')}>Elefante</Radio>
                                    <Radio value='10' {...register('response.3.answer')}>Leão</Radio>
                                    <Radio value='2' {...register('response.3.answer')}>Tigre</Radio>
                                </Stack>
                            </RadioGroup>
                        </Stack>
                    </TabPanel>
                </TabPanels>
                <TabList mt={10} w='100%' alignItems='center' justifyContent='center'>
                    <Tab color='pink.500'><Icon as={BsQuestionDiamondFill} /></Tab>
                    <Tab color='pink.500'><Icon as={BsQuestionDiamondFill} /></Tab>
                    <Tab color='pink.500'><Icon as={BsQuestionDiamondFill} /></Tab>
                </TabList>
                <Progress hasStripe value={progressBar} colorScheme="pink" mt={6} rounded='lg' bgColor='gray' />
                <Stack>
                    <Button
                        mt={6}
                        colorScheme="pink"
                        type="submit"
                        textTransform='uppercase'
                        fontWeight='bold'
                        isLoading={isLoadingButton}
                        loadingText='Verificando suas respostas'
                    >
                        Finalizar Quiz
                    </Button>
                    <Button
                        mt={40}
                        variant='outline'
                        onClick={SignOut}
                        colorScheme="red"
                        _hover={{opacity: '0.7'}}
                    >
                        Sair
                    </Button>
                </Stack>
            </Tabs>
        </Flex>
    )
}
