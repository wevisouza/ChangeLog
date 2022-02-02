type Variant = 'success' | 'warning' | 'error' | 'info'

export const notistackOptions = (
  variant: Variant = 'info',
  anchorOrigin = {
    vertical: 'top',
    horizontal: 'center',
  }
): object => ({
  variant,
  anchorOrigin,
})