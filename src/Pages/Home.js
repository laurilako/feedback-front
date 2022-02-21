import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Palautekortti from '../components/Palautekortti';
import axios from 'axios'
import {
    Flex,
    Button,
    Heading,
    Container,
    SimpleGrid,
    Box,
    GridItem,
    filter,
} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
const burl = 'http://localhost:40537'

function Home(){
    const navigate = useNavigate();
    const [feedbacks, setFeedbacks] = useState([])
    const [checked, setChecked] = useState([])

    useEffect(() => {
        getFeedbacks()
    }, [])

    useEffect(() => {
        filter()
    }, [feedbacks])
    
    const filter = () => {
        const a = feedbacks.filter(function (feedback) {
            if(feedback.status){
                return feedback
            }
        })
        setChecked(a);
    }

    const handleCheck = async (props) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            }
            await axios.put(
                `${burl}/api/feedback/${props.id}`,
                {
                    Name: props.name,
                    feedbackString: props.string, 
                    status: true
                },
                config
            )
        } catch (error) {
            console.log(error)
        }
        getFeedbacks()
    }

    const handleDelete = async (id) => {
        if(window.confirm("Poista palaute?")){
            const res =  await axios.delete(`${burl}/api/feedback/${id}`)
            if(res.status === 204){
                getFeedbacks()
            }
        }
    }

    const getFeedbacks = async () => {
        const { data } = await axios.get(`${burl}/api/feedback`)
        setFeedbacks(data);
    }

    const handleClick = () => {
        navigate('/new')
    }

    return(
        <>
            <Header />
            <Flex mt='10' justifyContent={'center'}>
                    <Button
                        onClick={() => handleClick()}
                        size='md'
                        height='50px'
                        width='300px'
                        border='2px'
                        borderColor='#406343'>
                        UUSI PALAUTE
                    </Button>
            </Flex>
            <Heading mt='5' align='center' mb='2'>Uudet palautteet</Heading>
            {checked.length >= feedbacks.length ?  
            (
            <>
                <Heading align='center' mt='5'>Ei uusia palautteita!</Heading>
            </>)
            :
            <Flex justifyContent={'center'} justify={'center'}>
                <Container align='center'>
                    <SimpleGrid>
                        {feedbacks.map((feedback => (
                            <GridItem p='2' key={feedback.id}>
                                {feedback.status == false ? 
                                <>
                                    <Palautekortti check={handleCheck} delete={handleDelete} id={feedback.id} name={feedback.name} string={feedback.feedbackString}>
                                    </Palautekortti>
                                </> : null}
                            </GridItem>
                        )))}
                    </SimpleGrid>
                </Container>
            </Flex>
        }
        <Heading align='center' mt='10'>Nähdyt palautteet</Heading>
            <Flex justifyContent={'center'} justify={'center'}>
                    <Container align='center'>
                        <SimpleGrid>
                            {feedbacks.map((feedback => (
                                <GridItem p='2' key={feedback.id}>
                                    {feedback.status == true ? 
                                    <>
                                        <Palautekortti nahty={true} check={handleCheck} delete={handleDelete} id={feedback.id} name={feedback.name} string={feedback.feedbackString}>
                                        </Palautekortti>
                                    </> : null}
                                </GridItem>
                            )))}
                        </SimpleGrid>
                    </Container>
                </Flex>
        </>
    )
}

export default Home