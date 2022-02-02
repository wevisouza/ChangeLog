import { gql } from '@apollo/client'



export const GET_USER_PREFERENCE = gql`
  query getUserPreference{
    getUserPreference
  }
`

export const GET_RELEASES = gql`
  query getReleases  
   {
    getReleases{
      project
      yearReleaseResponses{
        year
        releaseResponses{
          releaseId
          description
          lastUpdatedDate
        }
      }
    } 
  }
`

export const GET_RELEASE_MD_FILE = gql`
  query getReleaseMdFile($releaseId: String!) {
    getReleaseMdFile(releaseId: $releaseId)
  }
`