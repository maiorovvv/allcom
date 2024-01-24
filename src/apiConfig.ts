const apiBaseUrl = 'http://127.0.0.1:8080';

export default {
	apiBaseUrl,
	addProductEndpoint: `${apiBaseUrl}/api/products/add`,
	loginEndpoint: `${apiBaseUrl}/api/auth/login`,
	registerEndpoint: `${apiBaseUrl}/api/auth/register`,
	logoutEndpoint: `${apiBaseUrl}/api/auth/logout`,
	restoreEndpoint: `${apiBaseUrl}/api/auth/restore`,
	restoreNewPasswordEndpoint: `${apiBaseUrl}/api/auth/restoreNewPassword`,
	getUserProfileEndpoint: `${apiBaseUrl}/api/users/getUserProfile`,
};
