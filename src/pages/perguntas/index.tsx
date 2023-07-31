import { api } from "@/lib/api";
import { queryClient } from "@/lib/queryclient";
import { questions } from "@/utils/questions";
import {
    Button,
    Flex,
    FormControl,
    Heading,
    Icon,
    IconButton,
    Progress,
    Radio,
    RadioGroup,
    Stack,
    useToast
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies } from 'nookies';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { MdKeyboardBackspace, MdOutlineNavigateNext } from 'react-icons/md';

export default function Multistep() {
    const [multistep, setmultistep] = useState(1)
    const toast = useToast();
    const router = useRouter();
    const [isLoadingButton, setIsLoadingButton] = useState(false)
    const [progressBar, setProgressbar] = useState(0)
    let progressBarState = progressBar * 33.3
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
            flexDir='column'
            w='100%'
            h='100vh'
            align='center'
            justify='center'
        >
            {questions.map(item => {
                return (
                    <>
                        {multistep === item.multistepSelected && (
                            <motion.div
                                key={item.id}
                                initial={{ translateX: 20, opacity: 0 }}
                                whileInView={{ translateX: 0, transitionDuration: '1.5s', opacity: 1 }}
                                viewport={{ once: false }}
                            >
                                <Flex
                                    as='form'
                                    onSubmit={handleSubmit(handleAnswers)}
                                    position='relative'
                                    flexDir='column'
                                    bgColor='gray.800'
                                    w='xl'
                                    h='sm'
                                    justify='space-around'
                                    align='flex-start'
                                    px={4}
                                    rounded='md'
                                    hidden={multistep === item.multistepSelected ? false : true}
                                >
                                    <Stack spacing={6}>
                                        <Heading fontSize='2xl'>
                                            {item.title}
                                        </Heading>
                                        <FormControl>
                                            <RadioGroup onClick={() => setProgressbar(item.id)}>
                                                <Stack>
                                                    {item.radios.map(res => {
                                                        return (
                                                            <Radio
                                                                key={res.id}
                                                                value={res.value}
                                                                {...register(`${item.registerName}`)}
                                                            >
                                                                {res.alternative}
                                                            </Radio>
                                                        )
                                                    })}
                                                </Stack>
                                            </RadioGroup>
                                        </FormControl>
                                    </Stack>
                                    <IconButton
                                        onClick={() => setmultistep(multistep + 1)}
                                        aria-label="Next"
                                        icon={<Icon as={MdOutlineNavigateNext} />}
                                        w='fit-content'
                                        alignSelf='center'
                                        colorScheme="pink"
                                        rounded='full'
                                        hidden={item.multistepSelected === 3 ? true : false}
                                    />
                                    <IconButton
                                        onClick={() => setmultistep(multistep - 1)}
                                        aria-label="Back"
                                        position='absolute'
                                        top={2}
                                        left={2}
                                        variant='link'
                                        icon={<Icon as={MdKeyboardBackspace} />}
                                        fontSize='xl'
                                        w='fit-content'
                                        hidden={item.multistepSelected === 1 ? true : false}
                                    />
                                    <Button
                                        w='100%'
                                        colorScheme="pink"
                                        type="submit"
                                        textTransform='uppercase'
                                        fontWeight='bold'
                                        isLoading={isLoadingButton}
                                        loadingText='Verificando suas respostas'
                                        hidden={item.multistepSelected != 3 ? true : false}
                                    >
                                        Finalizar Quiz
                                    </Button>
                                </Flex>
                            </motion.div>
                        )}
                    </>
                )
            })}
            <Stack w='100%' maxW='xl' spacing={4}>
                <Progress hasStripe value={progressBarState} colorScheme="pink" mt={6} rounded='lg' bgColor='gray' />
                <Button
                    variant='outline'
                    onClick={SignOut}
                    colorScheme="red"
                    _hover={{ opacity: '0.7' }}
                >
                    Sair
                </Button>
            </Stack>
        </Flex>
    )
}