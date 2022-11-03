import {
  Box,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react'
import Login from '@components/Login'
import Register from '@components/Register'
import { useLoginPageStore } from '@stores/LoginPageStore'
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'

const LoginPage = () => {
  let fullPageContainer = {
    width: '100%',
    height: '100vh',
    background: 'background.gray',
  }

  let layout = {
    width: '934px',
    height: '592px',
    gap: '0px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '18px',
    overflow: 'hidden',
    boxShadow:
      '0px 10px 10px 2px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)',
  }

  let logoBox = {
    width: '458px',
    height: '100%',
    background: 'accent.blue',
    margin: '0',
    textAlign: 'center',
    padding: '42px',
  }

  let tabBox = {
    width: '476px',
    height: '100%',
    background: 'accent.white',
    margin: '0',
  }

  let logoText = {
    fontFamily: 'Sarabun',
    fontWeight: 'bold',
    fontSize: '96px',
    whiteSpace: 'wrap',
    color: 'accent.white',
    lineHeight: '1.3',
    textAlign: 'left',
  }

  let tabLayout = {
    width: '204px',
    margin: '36px auto 32px auto',
  }

  let tabContentLayout = {
    padding: '0 48px',
  }

  const { tabIndex, setTabIndex } = useLoginPageStore()
  const { data, isLoading, error } = useQuery({
    queryKey: ['message'],
    queryFn: async () => {
      let response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/login`
      )
      return response.data
    },
  })

  console.log('url', `${import.meta.env.VITE_API_ENDPOINT}/test`)

  if (data) {
    console.log(data)
    console.log(`${import.meta.env.VITE_API_ENDPOINT}/test`)
  }

  return (
    <>
      <Box sx={fullPageContainer}>
        <Flex sx={layout}>
          <Box sx={logoBox}>
            <Image src="/assets/logo.png" margin="34px auto 38px auto" />
            <Text as="h1" sx={logoText}>
              Modern Doc
            </Text>
          </Box>
          <Box sx={tabBox}>
            <Tabs isLazy index={tabIndex}>
              <TabList sx={tabLayout}>
                <Tab onClick={() => setTabIndex(0)}>เข้าสู่ระบบ</Tab>
                <Tab onClick={() => setTabIndex(1)}>ลงทะเบียน</Tab>
              </TabList>

              <TabPanels sx={tabContentLayout}>
                <TabPanel>
                  <Login />
                </TabPanel>
                <TabPanel>
                  <Register />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default LoginPage
