import { useState, useEffect, FC } from 'react';
import * as Stomp from 'stompjs';
// eslint-disable-next-line import/extensions
import * as SockJS from 'sockjs-client/dist/sockjs.js';

type AuctionState = {
	id: number;
	number: string;
	productId: number;
	lastBetAmount: number;
	isFinished: boolean;
};

const Auction: FC = (): JSX.Element => {
	const [auction, setAuction] = useState<AuctionState>({
		id: 3,
		number: '',
		productId: 2,
		lastBetAmount: 960,
		isFinished: false,
	});
	const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

	useEffect(() => {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		const socket = new SockJS('/ws');
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		const client = Stomp.over(socket);

		client.connect({}, (frame) => {
			console.log('Connected: ', frame);

			client.subscribe(`/topic/auction/${auction.id}`, (auctionData) => {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				setAuction(JSON.parse(auctionData.body));
			});

			// Подписка на уведомления о завершении аукциона
			client.subscribe('/topic/auction/finished', () => {
				setAuction((prevState) => ({ ...prevState, isFinished: true }));
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

	const placeBet = (): void => {
		if (stompClient) {
			stompClient.send(
				'/app/makeBet',
				{},
				JSON.stringify({
					auctionId: auction.id,
					userId: 3,
					betAmount: auction.lastBetAmount + 10,
				})
			);
		}
	};

	return (
		<div>
			<h2>Auction {auction.number}</h2>
			<p>Product ID: {auction.productId}</p>
			<p>Last Bet: {auction.lastBetAmount}</p>
			{auction.isFinished ? <p>Аукцион завершен</p> : <p>Active</p>}
			<button onClick={placeBet} disabled={auction.isFinished}>
				Place Bet (+10)
			</button>
		</div>
	);
};

export default Auction;
