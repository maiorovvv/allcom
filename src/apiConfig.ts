const apiBaseUrl = 'http://127.0.0.1:8080';

export default {
	apiBaseUrl,
	addProductEndpoint: `${apiBaseUrl}/api/products/add`,
	getAllProductEndpoint: `${apiBaseUrl}/api/products/search?`,
	getProductByIdEndpoint: `${apiBaseUrl}/api/products/`,
	loginEndpoint: `${apiBaseUrl}/api/auth/login`,
	registerEndpoint: `${apiBaseUrl}/api/auth/register`,
	logoutEndpoint: `${apiBaseUrl}/api/auth/logout`,
	restoreEndpoint: `${apiBaseUrl}/api/auth/restore`,
	restoreNewPasswordEndpoint: `${apiBaseUrl}/api/auth/restoreNewPassword`,
	getUserProfileEndpoint: `${apiBaseUrl}/api/users/getUserProfile`,
	getAllUsersEndpoint: `${apiBaseUrl}/api/users/getAll`,
	getAllCategoriesEndpoint: `${apiBaseUrl}/api/categories/all`,
	getAllCategoriesByParentEndpoint: `${apiBaseUrl}/api/categories/allByParent/`,
	findUserByIdEndpoint: `${apiBaseUrl}/api/users/foundUserById/`,
	findUserByEmailEndpoint: `${apiBaseUrl}/api/users/foundUserByEmail/`,
	updateUserEndpoint: `${apiBaseUrl}/api/users/updateUser/`,
	changeUserStatusEndpoint: `${apiBaseUrl}/api/users/changeStatus/`,
};
