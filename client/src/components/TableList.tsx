import {Box, Heading, SimpleGrid, VStack,Divider,Image} from '@chakra-ui/react' 



import TableListItem from "@components/TableListItem"
import React, { Children } from 'react'




type propsTypes = {
    title?: string
    children?: React.ReactNode | React.ReactNode[]
}

const TableList = ({title,children}: propsTypes)=>{

    return(
        <>
        <Box sx={tableLayout} >
            <Heading>{title}</Heading>
            <br/>
            <Divider />
            <br/>
            <VStack gap = '10px'>
                
                {children}

            </VStack>

        </Box>
        </>
    )
}

export default TableList


let tableLayout = {
    width: '100%',
        padding: '25px',
    borderRadius: '8px',
    backgroundColor: 'accent.white',
}