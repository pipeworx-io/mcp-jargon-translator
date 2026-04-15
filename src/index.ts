interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

/**
 * jargon-translator MCP — wraps StupidAPIs (requires X-API-Key)
 *
 * Translate between corporate jargon and plain English. Supports bidirectional tra
 */


const API_KEY = '6e0ddbe88486dc354370290979829dc892b0386bd789ae5a';

const tools: McpToolExport['tools'] = [
  {
    name: 'jargon_translator_translate',
    description: 'Translate between corporate jargon and plain English. Supports bidirectional translation with formality modes: passive_aggressive, enthusiastic, or defeated.',
    inputSchema: {
      type: 'object' as const,
      properties: {"content": {"type": "string", "description": "Text to translate"}, "direction": {"type": "string", "description": "Translation direction", "enum": ["corporate_to_english", "english_to_corporate"]}, "formality": {"type": "string", "description": "Tone of the translation", "enum": ["passive_aggressive", "enthusiastic", "defeated"]}},
      required: ["content", "direction"],
    },
  },
];

async function callApi(url: string, args: Record<string, unknown>): Promise<unknown> {
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(args)) {
    if (v !== undefined && v !== null && v !== '') {
      params.set(k, String(v));
    }
  }
  const fullUrl = params.toString() ? url + '?' + params.toString() : url;
  const res = await fetch(fullUrl, {
    headers: { 'X-API-Key': API_KEY },
  });
  if (!res.ok) throw new Error('jargon-translator API error: ' + res.status);
  return res.json();
}

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'jargon_translator_translate':
      return callApi('https://api.stupidapis.com/jargon-translator/translate', args);
    default:
      throw new Error('Unknown tool: ' + name);
  }
}

export default { tools, callTool } satisfies McpToolExport;
