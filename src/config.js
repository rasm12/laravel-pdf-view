import { domain } from './env';
export const apiDomain = domain + '/';
export const appMonchisUserListUrl = apiDomain + 'test';
export const appMonchisUserResetPasswordUrl = apiDomain + 'user/password/reset';
export const monchisLoginUrl = apiDomain + 'api/auth/login'
export const clientsUrl = apiDomain + 'callcenter/users'
export const listAdminUsersUrl = apiDomain + 'users/admin/list'
export const adminUserChangePasswordUrl = apiDomain + 'users/admin/change-password'
export const newUserUrl = apiDomain + 'api/auth/user/create'
export const listRole = apiDomain + 'api/auth/role/list'
export const pdfReadUrl = apiDomain + 'api/auth/pdf'

export const getHeaders = function () {
	const tokenData = JSON.parse(window.localStorage.getItem('authUser'));
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + tokenData.token
  };
  return headers;
};
