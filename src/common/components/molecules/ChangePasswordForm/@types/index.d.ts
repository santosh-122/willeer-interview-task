interface ChangePasswordProps {
  newPassword: string
  oldPassword: string}
interface ChangePasswordFormProps {
  data: ChangePasswordProps
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onSubmit: (data: UserChangePassword) => void  
}
