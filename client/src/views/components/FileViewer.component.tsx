import { Viewer } from '@react-pdf-viewer/core'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout/lib'

type propsType = {
  fileUrl: string
}
const FileViewer = ({ fileUrl }: propsType) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  return (
    <Viewer
      fileUrl={fileUrl}
      plugins={[defaultLayoutPluginInstance]}
      httpHeaders={{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':
          'GET, PUT, POST, DELETE, HEAD, OPTIONS, PATCH, PROPFIND, PROPPATCH, MKCOL, COPY, MOVE, LOCK',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Expose-Headers': '*',
      }}
    />
  )
}

export default FileViewer
