export type AuctionStatus =
  | "WAITING"
  | "LIVE"
  | "SOLD"
  | "UNSOLD";

export interface AuctionPlayer {
  id: string;
  name: string;

  role: string;

  age: number;

  batting: string;

  bowling: string;

  basePrice: number;

  soldPrice?: number;

  soldTo?: string;

  status: AuctionStatus;

  stats: {
    matches: number;
    runs: number;
    wickets: number;
    avg: number;
    sr: number;
  };
}

export interface AuctionTeam {
  id: string;

  name: string;

  owner: string;

  purse: number;

  players: string[];
}

export interface AuctionState {
  currentPlayer?: AuctionPlayer;

  status: AuctionStatus;

  soldPlayers: number;

  unsoldPlayers: number;

  totalPlayers: number;

  highestBid: number;

  highestBidPlayer?: string;
}