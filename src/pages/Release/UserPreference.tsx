import { useQuery } from '@apollo/client'
import { Box, Button, Checkbox, FormControlLabel } from '@material-ui/core'
import { Save } from '@material-ui/icons'
import { useFormik } from 'formik'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { notistackOptions } from '../../config/notistackOptions'
import { useSetUserPreference } from '../../graphql/operations/mutations/release'
import { GET_USER_PREFERENCE } from '../../graphql/operations/queries/release'

interface DefaultValuesProps {
  option: boolean
}

const initialValuesDefault = {
  option: false
}

const UserPreference: React.FC = (apolloClient: any) => {

  const [initialValues, setInitialValues] = useState<DefaultValuesProps>(
    initialValuesDefault
  )

  const { data: preference, loading } = useQuery<boolean>(
    GET_USER_PREFERENCE, { client: apolloClient }
  )
  const { enqueueSnackbar } = useSnackbar()
  const notifySuccess = notistackOptions('success')

  const {
    setUserPreference,
    loading: loadingSaveTemplate,
  } = useSetUserPreference({
    onCompleted: () => {
      enqueueSnackbar('User Preference saved', notifySuccess)
    },
  })

  useEffect(() => {
    setInitialValues((prevState) => ({
      ...prevState,
      option: Boolean(preference)
    }))
  }, [preference])

  const formCollection = useFormik({
    initialValues,
    enableReinitialize: true,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: (values, { setSubmitting }) => {
      const { option } = values
      setUserPreference({
        variables: {
          option
        },
      })
      setSubmitting(false)
    },
  })

  if (preference || loading) {
    return <></>
  }

  return (<>
    <form onSubmit={formCollection.handleSubmit}>
      <Box display="flex"
        flexWrap="wrap"
        justifyContent="flex-end"
        alignItems="center">
        <Box
          key='chkOption'
          p={1}
        >
          <FormControlLabel
            control={
              <Checkbox
                name="option"
                checked={formCollection.values.option}
                value={formCollection.values.option}
                onChange={formCollection.handleChange}
              />
            }
            label='Do not show this page again'
          />
        </Box>
        <Box
          p={1}
        >
          <Button
            color="primary"
            variant="contained"
            type="submit"
            startIcon={<Save fontSize="small" />}
          >
            Save
          </Button>
        </Box>
      </Box>

    </form>
  </>)
}

export default UserPreference