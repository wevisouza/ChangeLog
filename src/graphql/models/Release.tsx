export interface projectReleaseResponse {
  project: string
  yearReleaseResponses: yearReleaseResponse[]
}

export interface yearReleaseResponse {
  year: number
  releaseResponses: releaseResponse[]
}

export interface releaseResponse {
  releaseId: number
  description: string
  lasUpdatedDate: Date
}

export type getReleases = {
  getReleases: projectReleaseResponse[]
}

