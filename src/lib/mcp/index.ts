import { defineMcp } from "@lovable.dev/mcp-js";
import getTournamentInfo from "./tools/get-tournament-info";
import listTeams from "./tools/list-teams";
import getPointsTable from "./tools/get-points-table";
import listPlayers from "./tools/list-players";

export default defineMcp({
  name: "gpl-mcp",
  title: "Udaipur Bohra League MCP",
  version: "0.1.0",
  instructions:
    "Tools for the Udaipur Bohra League cricket tournament app. Use them to fetch tournament info, teams, the points table, and the player catalog.",
  tools: [getTournamentInfo, listTeams, getPointsTable, listPlayers],
});
