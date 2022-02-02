import { gql, useMutation } from '@apollo/client'
interface Params {
  onCompleted?: (data: any) => void
  onError?: (data: any) => void
}
export const SET_USER_PREFERENCE = gql`
  mutation SetUserPreference($option: Boolean!) {
    setUserPreference(option: $option) 
  }
`

export function useSetUserPreference(option: Params) {
  const { onCompleted } = option
  const [setUserPreference, { data, error, loading }] = useMutation(
    SET_USER_PREFERENCE,
    {
      onCompleted,
    }
  )

  return { setUserPreference, data, error, loading }
}

