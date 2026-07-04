import { defineTool } from "@lovable.dev/mcp-js";
import { tournament } from "@/lib/gpl-data";

export default defineTool({
  name: "get_tournament_info",
  title: "Get tournament info",
  description:
    "Return the Galaxy Premier League tournament overview: name, season, tagline, auction date/venue, and headline stats.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(tournament, null, 2) }],
    structuredContent: tournament,
  }),
});
