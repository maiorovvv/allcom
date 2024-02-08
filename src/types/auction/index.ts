export interface AuctionDto {
	startAt: Date;
	plannedEndAt: Date;
	startPrice: number;
}

export interface AuctionWsDto {
	id: number;
	currentPlannedEndAt: string;
	productId: number;
	lastBetAmount: number;
	state: string;
}
