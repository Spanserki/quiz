import { api } from "@/lib/api";
import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
    Input,
    Stack,
    useToast,
    Icon,
    Divider
} from "@chakra-ui/react";
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiUser } from 'react-icons/bi'
import * as yup from 'yup';

type FormProps = {
    name: string;
    cellphone: string;
    email: string;
};

const ContentFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().email().required('E-mail obrigatório'),
    cellphone: yup
        .string()
        .min(12, 'Digite o número completo com DDD')
        .max(15, 'Máximo 15 números ')
        .required('Telefone obrigatório'),
});

export default function Registro() {
    const toast = useToast();
    const router = useRouter();
    const [isLoadingButton, setIsLoadingButton] = useState(false)
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors = null, isSubmitting },
    } = useForm<FormProps>({
        resolver: yupResolver(ContentFormSchema),
    });
    const handleCreateUser: SubmitHandler<FormProps> = async (values) => {
        setIsLoadingButton(true)
        const { name, email, cellphone } = values;
        await api.post('/user', {
            name,
            email,
            cellphone,
        }).then(res => {
            setCookie(undefined, 'token_user_quiz', res.data.id, {
                maxAge: 60 * 60 * 30,
                path: '/'
            })
            setCookie(undefined, 'start_time_quiz', `${new Date()}`, {
                maxAge: 60 * 60 * 30,
                path: '/'
            })
            toast({
                position: 'bottom',
                colorScheme: 'pink',
                title: 'Obrigado ❤️',
                description: `Vamos começar!`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            });
            setTimeout(() => {
                setValue('name', '');
                setValue('email', '');
                setValue('cellphone', '');
                router.push('/perguntas')
            }, 3000);
        }).catch(err => {
            if (err.response.data.message === 'email already exists') {
                destroyCookie(undefined, 'token_user_quiz',);
                destroyCookie(undefined, 'start_time_quiz',);
                toast({
                    position: 'bottom',
                    colorScheme: 'pink',
                    title: 'Obrigado ❤️',
                    description: `Vamos começar!`,
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
                setTimeout(() => {
                    setValue('name', '');
                    setValue('email', '');
                    setValue('cellphone', '');
                    setCookie(undefined, 'token_user_quiz', err.response.data.id, {
                        maxAge: 60 * 60 * 30,
                        path: '/'
                    })
                    setCookie(undefined, 'start_time_quiz', `${new Date()}`, {
                        maxAge: 60 * 60 * 30,
                        path: '/'
                    })
                    router.push('/perguntas')
                }, 3000);
            } else {
                toast({
                    position: 'top-right',
                    title: 'Ops!',
                    description: 'Não consigeguimos fazer seu cadastro!',
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                });
                setIsLoadingButton(false)
            }
        })
    };
    return (
        <Flex
            as='form'
            onSubmit={handleSubmit(handleCreateUser)}
            flexDir='column'
            w='100%'
            h='100vh'
            align='center'
            justify='center'
            gap={6}
            bgColor='gray.900'
            color='gray.100'
        >
            <Icon as={BiUser} fontSize='7xl' color='gray.700' />
            <Heading fontSize='3xl'>
                Informe seus dados para identificarmos você no ranking
            </Heading>
            <Divider maxW='3xl' borderColor='gray.700' />
            <Stack spacing={4} w='100%' maxW='3xl' align='center' mt={8} bgColor='gray.800' p={4} rounded='lg'>
                <FormControl isInvalid={!!errors?.name?.message}>
                    <FormLabel>Nome</FormLabel>
                    <Input
                        autoComplete="none"
                        {...register('name')}
                        borderColor='gray.700'
                        focusBorderColor="#702459"
                        _hover={{ borderColor: '#702459' }}
                    />
                    <FormErrorMessage>
                        {!!errors && <FormErrorMessage>{errors.name?.message} 😬</FormErrorMessage>}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors?.email?.message}>
                    <FormLabel>E-mail</FormLabel>
                    <Input
                        autoComplete="none"
                        {...register('email')}
                        borderColor='gray.700'
                        focusBorderColor="#702459"
                        _hover={{ borderColor: '#702459' }}
                    />
                    <FormErrorMessage>
                        {!!errors && <FormErrorMessage>{errors.email?.message} 😬</FormErrorMessage>}
                    </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors?.cellphone?.message}>
                    <FormLabel>Telefone</FormLabel>
                    <Input
                        autoComplete="none"
                        {...register('cellphone')}
                        borderColor='gray.700'
                        focusBorderColor="#702459"
                        _hover={{ borderColor: '#702459' }}
                    />
                    <FormErrorMessage>
                        {!!errors && <FormErrorMessage>{errors.cellphone?.message} 😬</FormErrorMessage>}
                    </FormErrorMessage>
                </FormControl>
                <Button
                    type="submit"
                    w='100%'
                    textTransform='uppercase'
                    bgGradient='linear(to-l, #7928CA, #FF0080)'
                    color='gray.100'
                    fontWeight='bold'
                    py={8}
                    transition='0.7s'
                    _hover={{ bgGradient: 'linear(to-r, #7928CA, #FF0080)' }}
                    isLoading={isLoadingButton}
                    loadingText='Carregando sua quiz'
                >
                    Pronto para responder!
                </Button>
            </Stack>
        </Flex>
    )
}
