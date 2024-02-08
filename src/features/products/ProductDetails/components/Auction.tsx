/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { FC, useEffect, useState } from 'react';
import Timer from '../../../../components/Timer/Timer';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import * as Stomp from 'stompjs';
// eslint-disable-next-line import/extensions
import * as SockJS from 'sockjs-client/dist/sockjs.js';

import { ProductDto } from '../../../../types/product/ProductApiResponse';
import ConfirmationModal from '../../../../components/ConfirmationModal/ConfirmationModal';

interface AuctionProps {
	product: ProductDto;
}
const BET_INCREMENT_1 = 5;
const BET_INCREMENT_2 = 10;
const BET_INCREMENT_3 = 50;
const BET_INCREMENT_4 = 100;

const PRICE_THRESHOLD_1 = 100;
const PRICE_THRESHOLD_2 = 500;
const PRICE_THRESHOLD_3 = 1000;

type AuctionState = {
	id: number;
	productId: number;
	lastBetAmount: number;
	state: string;
	startPrice: number;
	currentPlannedEndAt: string;
};

const Auction: FC<AuctionProps> = ({
	product: {
		id: productId,
		lastCreatedAuction: { id, startAt, currentPlannedEndAt, lastBetAmount, startPrice, state },
	},
}): JSX.Element => {
	const { t } = useTranslation('auction');
	const [confirmationModalActive, setConfirmationModalActive] = useState<boolean>(false);
	//AUCTION
	const [auction, setAuction] = useState<AuctionState>({
		id,
		productId,
		lastBetAmount,
		state,
		startPrice,
		currentPlannedEndAt,
	});

	const getNextCurrentBet = (currentPrice: number): number => {
		let betIncrement: number;
		if (currentPrice < PRICE_THRESHOLD_1) {
			betIncrement = BET_INCREMENT_1;
		} else if (currentPrice < PRICE_THRESHOLD_2) {
			betIncrement = BET_INCREMENT_2;
		} else if (currentPrice < PRICE_THRESHOLD_3) {
			betIncrement = BET_INCREMENT_3;
		} else {
			betIncrement = BET_INCREMENT_4;
		}

		return betIncrement;
	};

	const [stompClient, setStompClient] = useState(null);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const socket = new SockJS('/ws');
		const client = Stomp.over(socket);

		client.connect({}, (frame) => {
			// console.log('Connected: ', frame);

			client.subscribe(`/topic/auction/${auction.id}`, (auctionData) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				setAuction(JSON.parse(auctionData.body));
			});
		});

		setStompClient(client);

		return () => {
			if (client) {
				client.disconnect();
				console.log('Disconnected');
			}
		};
	}, []);

	const nexCurrentBet = auction.lastBetAmount + getNextCurrentBet(auction.lastBetAmount);

	const placeBet = (confirm: boolean): void => {
		if (confirm && stompClient) {
			stompClient.send(
				'/app/makeBet',
				{},
				JSON.stringify({
					auctionId: auction.id,
					userId: 3,
					betAmount: nexCurrentBet,
				})
			);
		}
	};

	//TIMER
	const formattedDate = moment(startAt).format('DD-MM-YYYY HH:mm');
	const currentPlannedEnd = moment(auction.currentPlannedEndAt);
	const timeUntilCurrentPlannedEnd = currentPlannedEnd.diff(moment(), 'seconds');

	return (
		<>
			<div className="auction__time">
				{timeUntilCurrentPlannedEnd < 0 ? (
					<div>
						<strong className="me-5">{t('start_at')}:</strong>
						<span className="auction__time__start">{formattedDate}</span>
					</div>
				) : (
					<div className="d-flex">
						<span className="me-5">{t('left_time')}:</span>
						<Timer time={timeUntilCurrentPlannedEnd} />
					</div>
				)}
			</div>
			<div className="auction__price">
				<strong>{t('current_price')}</strong>
				<span className="auction__price--actual">{auction.lastBetAmount} &euro;</span>
				<span className="auction__price--aufgeld">+ {t('tax')}</span>
			</div>
			<button className="auction__btn" onClick={() => setConfirmationModalActive((prev) => !prev)}>
				{t('bet_now')}
			</button>
			<ConfirmationModal
				confirmationModalActive={confirmationModalActive}
				setConfirmationModal={setConfirmationModalActive}
				text={t('is_confirm')}
				value={`${nexCurrentBet} €`}
				onConfirm={placeBet}
			/>
		</>
	);
};

export default Auction;
