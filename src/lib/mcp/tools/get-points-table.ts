import { defineTool } from "@lovable.dev/mcp-js";
import { teams } from "@/lib/gpl-data";

export default defineTool({
  name: "get_points_table",
  title: "Get points table",
  description:
    "Return the current GPL points table sorted by points then net run rate.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const table = [...teams]
      .sort((a, b) => b.points - a.points || b.nrr - a.nrr)
      .map((t, i) => ({
        rank: i + 1,
        team: t.name,
        short: t.short,
        played: t.wins + t.losses,
        wins: t.wins,
        losses: t.losses,
        nrr: t.nrr,
        points: t.points,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(table, null, 2) }],
      structuredContent: { table },
    };
  },
});
