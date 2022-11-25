import {Box, Heading, SimpleGrid, VStack} from '@chakra-ui/react' 



import TableListItem from "@components/TableListItem"




type propsTypes = {
    title?: string
    children?: React.ReactNode
}

const TableList = ({title}: propsTypes)=>{

    return(
        <>
        <Box sx={tableLayout} >
            <Heading>{title}</Heading>
            <VStack>
                <TableListItem/>
                <TableListItem/>
                <TableListItem/>

            </VStack>

        </Box>
        </>
    )
}

export default TableList


let tableLayout = {
    width: '1270px',
    height: '510px',
    padding: '25px',
    borderRadius: '8px',
    backgroundColor: 'accent.white',
}