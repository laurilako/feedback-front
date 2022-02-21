import React from 'react'
import {
    Flex,
    Heading,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    Text,
    ButtonGroup,
} from "@chakra-ui/react"
import { HashLink } from 'react-router-hash-link';

function Header() {
    return(
        <Flex   
            justifyContent={'center'}
            align='center'
            h='150px'
            p='5'
            bg='#406343'>
            <Flex>
                <HashLink smooth to='/'>
                    <Heading fontSize={'50'} color='#191A19'>
                        Feedback
                    </Heading>
                </HashLink>
            </Flex>
        </Flex>
    )
}

export default Header