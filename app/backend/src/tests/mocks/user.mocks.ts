const loginBody = {
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const loginBodyNoEmail = {
  email: '',
  password: 'secret_admin'
};

const loginBodyNoPassword ={
  email: 'admin@admin.com',
  password: '',
};

const loginBodyInvalidEmail = {
  email: 'teste@teste.com',
  password: 'secret_admin',
};

const loginBodyInvalidPassword = {
  email: 'admin@admin.com',
  password: '123456',
};

const user = {
  id: 1,
  username: 'Manager',
  role: 'Admin',
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW',
};

export {
  loginBody,
  user,
  loginBodyNoEmail,
  loginBodyNoPassword,
  loginBodyInvalidEmail,
  loginBodyInvalidPassword
};
