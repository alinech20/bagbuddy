export const useValidationRules = () => {
  const emailRules = () => {
    return [
      (v: string) => !!v || 'E-mail is required',
      (v: string) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ]
  }

  const passwordRules = () => {
    return [
      (v: string) => !!v || 'Password is required',
      (v: string) => v.length >= 8 || 'Password must be at least 8 characters',
      (v: string) => {
        return (
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(v) ||
          'Password must contain at least one uppercase letter, ' +
            'one lowercase letter, one number and one special character'
        )
      },
    ]
  }

  return {
    emailRules,
    passwordRules,
  }
}
