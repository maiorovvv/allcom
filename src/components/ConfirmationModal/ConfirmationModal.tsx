import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import CrossIcon from '../../img/svg/cross.svg?react';

import '../../assets/scss/elements/_confirmation_modal.module.scss';

interface ModalProps {
	confirmationModalActive: boolean;
	setConfirmationModal: (flag: boolean) => void;
	text: string;
	onConfirm: (confirmed: boolean) => void;
}
const ConfirmationModal: FC<ModalProps> = ({
	confirmationModalActive,
	setConfirmationModal,
	text,
	onConfirm,
}): JSX.Element | null => {
	const { t } = useTranslation('confirmation_modal');

	const handleClick = (selection: boolean): void => {
		onConfirm(selection);
		setConfirmationModal(false);
	};

	if (!confirmationModalActive) {
		return <div className="confirmation_modal"></div>;
	}

	return (
		<div
			className="confirmation_modal confirmation_modal--active"
			onClick={() => {
				setConfirmationModal(false);
			}}
		>
			<div className="confirmation_modal__content" onClick={(e) => e.stopPropagation()}>
				<CrossIcon
					className="confirmation_modal__content--cross_icon"
					onClick={() => setConfirmationModal(false)}
				/>
				<p className="confirmation_modal__text">{t(`${text}`)} </p>
				<div className="confirmation_modal__buttons">
					<button className="confirmation_modal__buttons--btn" onClick={() => handleClick(true)}>
						{t('yes')}
					</button>
					<button className="confirmation_modal__buttons--btn" onClick={() => handleClick(false)}>
						{t('no')}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmationModal;
