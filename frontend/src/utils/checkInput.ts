export const isEmail = (email: string): boolean => {
  const emailComponent = email.split('@')
  return email.includes('@') && emailComponent.length === 2 && emailComponent[0].length > 0 && emailComponent[1].length > 0
}

export const isPassword = (password: string): boolean => {
  return password.length >= 8 && password.length <= 20 && /^[A-Z][a-zA-Z0-9@!*]+/.test(password)
}

export const isPhoneNumber = (phoneNumber: string): boolean => {
  return /0[0-9]{9}/.test(phoneNumber)
}
