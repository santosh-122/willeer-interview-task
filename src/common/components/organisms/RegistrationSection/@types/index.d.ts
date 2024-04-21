interface UserRegistration {
  email: string
  password: string
  name: string
  address: string
  phone: string

}
interface RegistrationSectionProps {
  title: string
  data: UserRegistration
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onLogin: (data: UserRegistration) => void
}
