const loginRequestBodyWithoutEmail = {
  password: 'tewtfsdçfjigwfljhwfghwiiugfwef.151jfjh5f65fg',
};

const loginRequestBodyWithoutPassword = {
  email: 'manager@email.com',
}

const loginRequestBody = {
  ...loginRequestBodyWithoutEmail,
  ...loginRequestBodyWithoutPassword
}

const invalidLoginBody = {
  email: 'teste@teste.com',
  password: '123456',
}

const user = {
  id: 1,
  username: 'Manager',
  role: 'Admin',
  ...loginRequestBody,
}

export {
  user,
  loginRequestBody,
  loginRequestBodyWithoutEmail,
  loginRequestBodyWithoutPassword,
  invalidLoginBody
}