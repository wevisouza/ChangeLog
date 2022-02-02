import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { getReleases } from '../../graphql/models/Release'
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Box, Grid } from '@material-ui/core';
import Loader from './Loader';
import ReleaseFile from './ReleaseFile';
import { GET_RELEASES } from '../../graphql/operations/queries/release';

const Releases = (apolloClient: any) => {

  const [releaseId, setReleaseId] = useState('')
  const { data: getReleases, loading } = useQuery<getReleases>(
    GET_RELEASES, { client: apolloClient }
  )

  const renderRelease = (item: any) => {
    setReleaseId(item.activeElement.id)
  }

  if (loading) {
    return <Box mt={5} width="100%" height={500}>
      <Loader />
    </Box>
  }

  return (
    <Box p={10}>
      <Box  >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Box>
              <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
              >
                {getReleases?.getReleases.map((item) =>
                  <TreeItem key={item.project} nodeId={item.project} label={item.project}>
                    {item.yearReleaseResponses.map((itemYear) =>
                      <TreeItem key={itemYear.year.toString()} nodeId={itemYear.year.toString()} label={itemYear.year.toString()}>
                        {itemYear.releaseResponses.map((releaseItem) =>
                          <TreeItem key={releaseItem.releaseId.toString()} id={releaseItem.releaseId.toString()} nodeId={releaseItem.releaseId.toString()} label={releaseItem.description.toString()} onClick={(e) => renderRelease(e.nativeEvent.currentTarget)} />
                        )}
                      </TreeItem>
                    )}
                  </TreeItem>
                )}
              </TreeView>
            </Box>
          </Grid>
          <Grid item xs={9}>
            {releaseId !== '' &&
              <ReleaseFile releaseId={releaseId} apolloClient={apolloClient} />}
          </Grid>

        </Grid>
      </Box>

    </Box >
  )
}

export default Releases