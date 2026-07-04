import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { players, teams } from "@/lib/gpl-data";

export default defineTool({
  name: "list_players",
  title: "List players",
  description:
    "Search the GPL player catalog. Optionally filter by role, team id, or a name substring, and cap results with limit.",
  inputSchema: {
    role: z
      .enum(["Batsman", "Bowler", "All-Rounder", "Wicket Keeper"])
      .optional()
      .describe("Filter by player role."),
    teamId: z
      .string()
      .optional()
      .describe("Filter by team id (e.g. 'rr', 'ts'). Use list_teams to discover ids."),
    search: z.string().optional().describe("Case-insensitive substring match on player name."),
    limit: z.number().int().min(1).max(100).optional().describe("Max rows to return (default 25)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ role, teamId, search, limit }) => {
    const q = search?.toLowerCase();
    const teamNameById = new Map(teams.map((t) => [t.id, t.name]));
    let rows = players.filter((p) => {
      if (role && p.role !== role) return false;
      if (teamId && p.teamId !== teamId) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
    const total = rows.length;
    rows = rows.slice(0, limit ?? 25);
    const out = rows.map((p) => ({
      id: p.id,
      name: p.name,
      age: p.age,
      role: p.role,
      team: p.teamId ? teamNameById.get(p.teamId) : null,
      basePrice: p.basePrice,
      soldPrice: p.soldPrice,
      stats: p.stats,
    }));
    return {
      content: [
        { type: "text", text: JSON.stringify({ total, returned: out.length, players: out }, null, 2) },
      ],
      structuredContent: { total, returned: out.length, players: out },
    };
  },
});
