# mcp-jargon-translator

jargon-translator MCP — wraps StupidAPIs (requires X-API-Key)

Part of the [Pipeworx](https://pipeworx.io) open MCP gateway.

## Tools

| Tool | Description |
|------|-------------|
| `jargon_translator_translate` | Translate between corporate jargon and plain English. Supports bidirectional translation with formality modes: passive_aggressive, enthusiastic, or defeated. |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "jargon-translator": {
      "url": "https://gateway.pipeworx.io/jargon-translator/mcp"
    }
  }
}
```

Or use the CLI:

```bash
npx pipeworx use jargon-translator
```

## License

MIT
