import { defineTool } from "@lovable.dev/mcp-js";
import { teams } from "@/lib/gpl-data";

export default defineTool({
  name: "list_teams",
  title: "List teams",
  description: "List all 8 GPL franchises with captain, owner, and current season record.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const rows = teams.map((t) => ({
      id: t.id,
      name: t.name,
      short: t.short,
      captain: t.captain,
      owner: t.owner,
      wins: t.wins,
      losses: t.losses,
      points: t.points,
      nrr: t.nrr,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { teams: rows },
    };
  },
});
