import { useLazyQuery, useQuery } from '@apollo/client'
import { Box } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { GET_RELEASE_MD_FILE } from '../../graphql/operations/queries/release'
import Loader from './Loader'

interface ReleaseFileProps {
  releaseId: string
  apolloClient: any
}

const ReleaseFile: React.FC<ReleaseFileProps> = ({ releaseId, apolloClient }) => {

  const [releaseMdFile, setReleaseMdFile] = useState('')

  const [getReleaseFile, { data, loading: loadingFile }] = useLazyQuery<any>(GET_RELEASE_MD_FILE, {
    client: apolloClient,
    fetchPolicy: 'cache-and-network',
    variables: {
      releaseId: releaseId
    },
  })

  useEffect(() => {
    if (!loadingFile) {
      if (data !== undefined && data !== null) {
        setReleaseMdFile(data?.getReleaseMdFile)
      }
      else { setReleaseMdFile('') }
    }
  }, [data, loadingFile])

  useEffect(() => {
    var newElement = document.createElement('mdFileRelease')
    newElement.innerHTML = releaseMdFile
    document.getElementById('divFile')?.append(newElement)
  }, [releaseMdFile])

  useEffect(() => {
    getReleaseFile()
  }, [releaseId])

  return (
    <>

      {loadingFile ?
        <Box mt={5} width="100%" height={500}>
          <Loader />
        </Box> : <div id='divFile' />
      }
    </>
  )
}

export default ReleaseFile