
interface UserForgotPassword {
  email: string
}
interface ForgotPasswordSectionProps {
  title: string
  data: UserForgotPassword
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onForgotPassword: (data: UserForgotPassword) => void
}
