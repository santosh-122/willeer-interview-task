interface ForgotPasswordProps {
  email: string
}
interface ForgotPasswordFormProps {
  data: ForgotPasswordProps
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onSubmit: (data: UserForgotPassword) => void  
}
