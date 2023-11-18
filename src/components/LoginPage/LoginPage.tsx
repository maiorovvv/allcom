// LoginPage.tsx
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../app/hooks'; // Импортируем для использования useDispatch из react-redux
import { useNavigate } from 'react-router';

const LoginPage: React.FC = (): JSX.Element => {
	const { t } = useTranslation('LoginPage');
	const dispatch = useDispatch();
	const appDispatch = useAppDispatch(); // Используем хук для получения dispatch из Redux
	const navigate = useNavigate(); // для редиректа - можно использовать хук useNavigate

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState<string>(''); // Добавляем состояние для сообщений

	const handleLogin = (): void => {
		// Логика для отправки данных о пользователе на сервер
		// После успешной аутентификации вызывайте action для обновления состояния в Redux store
		appDispatch(login({ email, password }))
			.then((res) => {
				// fullfiled
				// мы смотрели ответ с сервера - нас интересовало
				// лежит ли в ответе Юзер или ошибка с полем message
				const payload = res.payload as { message: string };
				if (payload.message) {
					setMessage(payload.message);
				} else {
					navigate('/');
				}
			})
			.catch((err) => {
				// rejected // в данном примере мы не попадем сюда
				console.log(err);
			});
	};

	const handleLogout = (): void => {
		// Логика для разлогина (если требуется)
		// Вызовите action для обновления состояния в Redux store
		dispatch(logout());
	};

	return (
		<div className="login__section section--padding">
			<div className="container">
				<form action="#">
					<div className="login__section--inner">
						<div className="row row-cols-md-2 row-cols-1">
							<div className="col">
								<div className="login__account" style={{ height: '510px' }}>
									<div className="login__account--header mb-25">
										<h2 className="login__account--header__title h3 mb-10">{t('login')}</h2>
										<p className="login__account--header__desc">{t('header_desc')}</p>
									</div>
									<div className="login__account--inner ">
										<input
											className="login__account--input"
											placeholder={t('placeholder_email')}
											type="text"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
										<input
											className="login__account--input"
											placeholder={t('placeholder_password')}
											type="password"
											value={password}
											onChange={(e) => setPassword(e.target.value)}
										/>
										<div className="login__account--remember__forgot mb-15 d-flex justify-content-between align-items-center">
											<div className="login__account--remember position__relative mb-15 d-flex justify-content-between align-items-center">
												<input className="checkout__checkbox--input" id="check1" type="checkbox" />
												<span className="checkout__checkbox--checkmark"></span>
												<label
													className="checkout__checkbox--label login__remember--label ms-3"
													htmlFor="check1"
												>
													{t('remember_me')}
												</label>
											</div>
											<button
												className="login__account--forgot"
												type="button"
												onClick={handleLogout}
											>
												{t('forgot_your_password')}
											</button>
										</div>
										<button
											className="login__account--btn primary__btn"
											type="button"
											onClick={handleLogin}
										>
											{t('login')}
										</button>
										<div className="login__account--divide p-5">
											<span className="login__account--divide__text text-black">{t('or')}</span>
										</div>
										<p className="login__account--signup__text">
											{t('dont_have_account')}
											<button className="ms-3" type="button">
												{t('sign_up_now')}{' '}
											</button>
										</p>
									</div>
								</div>
							</div>
							<div className="col">
								<div className="login__account register" style={{ height: '510px' }}>
									<div className="login__account--header mb-25">
										<h2 className="login__account--header__title h3 mb-10">
											{t('create_account')}
										</h2>
										<p className="login__account--header__desc">{t('register_here_text')}</p>
									</div>
									<div className="login__account--inner">
										<input
											className="login__account--input"
											placeholder={t('username')}
											type="text"
										/>
										<input
											className="login__account--input"
											placeholder={t('placeholder_email')}
											type="text"
										/>
										<input
											className="login__account--input"
											placeholder={t('placeholder_password')}
											type="password"
										/>
										<input
											className="login__account--input"
											placeholder={t('placeholder_confirm_password')}
											type="password"
										/>
										<button className="login__account--btn primary__btn mb-10" type="button">
											{t('submit_register')}
										</button>
										<div className="login__account--remember position__relative d-flex justify-content-left">
											<div>
												<input className="checkout__checkbox--input" id="check2" type="checkbox" />
												<span className="checkout__checkbox--checkmark"></span>
											</div>
											<label
												className="checkout__checkbox--label login__remember--label ms-3"
												htmlFor="check2"
											>
												{t('i_have_read_text')}
											</label>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
