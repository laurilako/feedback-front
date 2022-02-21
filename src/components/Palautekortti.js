import React from 'react'
import {
    Text,
    Heading,
    IconButton,
    Box,
    ButtonGroup
} from "@chakra-ui/react";
import { FaTrash, FaCheck } from 'react-icons/fa'

function Palautekortti(props){

    const checkHandler = (props) => {
        props.check(props)
    }

    const deleteHandler = (id) => {
        props.delete(id)
    }

    return(
            <Box maxWidth='400px' bg='#406343' borderWidth="2px" borderColor={'blackAlpha.400'} borderRadius="lf">
                <Heading fontSize='28' align='center' color={'#191A19'}>
                    {props.name}
                </Heading>
                <Text align='center'color={'#191A19'}>
                    {props.string}
                </Text>
                {props.nahty ? 
                <ButtonGroup>
                    <IconButton as='button' onClick={() => deleteHandler(props.id)} color='black' variant='ghost' icon={<FaTrash />}></IconButton>
                </ButtonGroup>
                :                 
                <ButtonGroup>
                    <IconButton as='button' onClick={() => checkHandler(props)} color='black' variant='ghost' icon={<FaCheck />}></IconButton>
                    <IconButton as='button' onClick={() => deleteHandler(props.id)} color='black' variant='ghost' icon={<FaTrash />}></IconButton>
                </ButtonGroup>
                }
            </Box>
    )
}

export default Palautekortti