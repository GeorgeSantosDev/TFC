const loginBody = {
  email: 'admin@admin.com',
  password: 'secret_admin',
}

const loginBodyNoEmail = {
  email: '',
  password: 'secret_admin'
}

const loginBodyNoPassword ={
  email: 'admin@admin.com',
  password: '',
}

const loginBodyInvalidEmail = {
  email: 'teste@teste.com',
  password: 'secret_admin',
}

const loginBodyInvalidPassword = {
  email: 'admin@admin.com',
  password: '123456',
}

const user = {
  id: 1,
  username: 'Manager',
  role: 'Admin',
  ...loginBody,
}

export {
  loginBody,
  user,
  loginBodyNoEmail,
  loginBodyNoPassword,
  loginBodyInvalidEmail,
  loginBodyInvalidPassword
}