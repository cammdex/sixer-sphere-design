import type {
  AuctionPlayer,
  AuctionState,
} from "@/types/auction";

export class AuctionEngine {
  private players: AuctionPlayer[];

  private currentIndex = -1;

  private state: AuctionState;

  constructor(players: AuctionPlayer[]) {
    this.players = players;

    this.state = {
      status: "WAITING",
      soldPlayers: 0,
      unsoldPlayers: 0,
      totalPlayers: players.length,
      highestBid: 0,
    };
  }

  getState() {
    return this.state;
  }

  getCurrentPlayer() {
    return this.state.currentPlayer;
  }

  selectPlayer(playerId: string) {
    const player = this.players.find((p) => p.id === playerId);

    if (!player) return;

    this.currentIndex = this.players.indexOf(player);

    this.state.currentPlayer = player;

    this.state.status = "LIVE";

    player.status = "LIVE";
  }

  sellCurrentPlayer(teamId: string, amount: number) {
    const player = this.state.currentPlayer;

    if (!player) return;

    player.status = "SOLD";

    player.soldPrice = amount;

    player.soldTo = teamId;

    this.state.status = "SOLD";

    this.state.soldPlayers++;

    if (amount > this.state.highestBid) {
      this.state.highestBid = amount;

      this.state.highestBidPlayer = player.name;
    }
  }

  markUnsold() {
    const player = this.state.currentPlayer;

    if (!player) return;

    player.status = "UNSOLD";

    this.state.status = "UNSOLD";

    this.state.unsoldPlayers++;
  }

  nextPlayer() {
    this.state.currentPlayer = undefined;

    this.state.status = "WAITING";
  }

  getSoldPlayers() {
    return this.players.filter((p) => p.status === "SOLD");
  }

  getUnsoldPlayers() {
    return this.players.filter((p) => p.status === "UNSOLD");
  }
}