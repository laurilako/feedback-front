import React, { useState } from 'react'
import Header from '../components/Header'
import {
    Flex,
    Heading,
    Container,
    Button,
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
} from "@chakra-ui/react";
import { Form, Formik, Field } from 'formik';
import Message from '../components/Message';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function NewFeedback(){
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleNew = async (props) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            const { data } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/api/feedback`,
                {
                    Name: props.nimi,
                    feedbackString: props.palaute
                },
                config
            )
            setMessage("Uusi palaute lisätty!")
            setTimeout(() => {
                setMessage("")
                navigate('/');
            }, 2500)
        } catch (error) {
            setMessage("Tapahtui virhe...");
            setError(true)
            setTimeout(() => {
                setMessage("")
                navigate('/');
                setError(false)
            }, 2500)
        }
        props.nimi = ''
        props.palaute = ''
    }

    function validateNimi(nimivalue) {
        let error
        if (!nimivalue) {
          error = 'Nimi on pakollinen kenttä!'
        return error
      }
    }
    
    function validatePalaute(palautevalue) {
        let error
        if (!palautevalue) {
          error = 'Palauteviesti on pakollinen kenttä!'
        return error
      }
    }

    return(
        <>
            <Header />
            <Container>
            <Flex mt='20' rounded='2xl' boxShadow={'dark-lg'} flexDir={'column'} align={"center"} p='5' bg='#2F3A8F'>
                <Heading mb='5'>
                    LISÄÄ UUSI PALAUTE
                </Heading>
                <Formik
                    initialValues={{nimi: '', palaute: ''}}
                    onSubmit={(values, actions) => {
                        setTimeout(() => {
                            handleNew(values);
                            actions.setSubmitting(false)
                        }, 1000);
                    }}>
                    {(props) => (
                        <Form>
                            <Field name='nimi' validate={validateNimi}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.nimi && form.touched.nimi}>
                                        <FormLabel htmlFor='nimi'></FormLabel>
                                        Nimi
                                        <Input {...field} color="black" variant='solid' id='nimi' placeholder='nimi' />
                                        <FormErrorMessage>{form.errors.nimi}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Field name='palaute' validate={validatePalaute}>
                                {({ field, form }) => (
                                    <FormControl isInvalid={form.errors.palaute && form.touched.palaute}>
                                        <FormLabel htmlFor='palaute'></FormLabel>
                                        Palauteviesti
                                        <Input {...field} color="black" variant='solid' id='palaute' placeholder='Palauteviesti..' />
                                        <FormErrorMessage>{form.errors.palaute}</FormErrorMessage>
                                    </FormControl>
                                )}
                            </Field>
                            <Flex justify='center' flexDir={'column'} align={'center'}>
                                    <Button
                                        mt={4}
                                        colorScheme='green'
                                        isLoading={props.isSubmitting}
                                        type='submit'>
                                        LISÄÄ
                                    </Button>
                                </Flex>
                        </Form>
                    )}
                </Formik>
            </Flex>
            {error === true && message ? (<Message status='error' message={message} />): null}
            {error === false  && message ? (<Message status='success' message={message} />): null}
            </Container>
        </>
    )
}

export default NewFeedback;