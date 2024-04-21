interface UserRegistration {
  email: string
  password: string
  name: string
  address: string
  phone: string
}

interface RegistrationFormProps {
  data: UserRegistration
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onSubmit: (data: UserRegistration) => void
}
