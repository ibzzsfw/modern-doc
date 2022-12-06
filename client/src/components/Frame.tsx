import DocumentBar from "@components/DocumentBar"
import TableList from "@components/TableList"

type propsType ={
    title: string
    view: 'box' | 'table'
    children: React.ReactNode | React.ReactNode[]
}



const Frame = ({ title,view,children }: propsType) => {
  return view === 'box' ? (<DocumentBar title = {title}>{children}</DocumentBar>) : (<TableList title = {title}>{children}</TableList>)
}


export default Frame
