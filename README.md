# Vidurai Memory Manager for VS Code

Intelligent AI memory management for your coding workflow.

## Features

- 🧠 **Automatic context tracking** - Files, commands, errors tracked automatically
- 📊 **Token savings** - 36.6% average compression via intelligent forgetting
- 🚀 **One-click context export** - Copy relevant context for Claude Code
- 🔒 **Privacy-first** - Local by default, no data leaves your machine

## Installation

1. Install extension from VS Code Marketplace
2. Reload VS Code
3. Extension will auto-detect Python and install Vidurai SDK
4. Done! Start coding and Vidurai tracks your context

## Usage

### Copy Context for Claude Code

1. Open command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`)
2. Run **"Vidurai: Copy Relevant Context"**
3. Paste into Claude Code prompt

### Restart Bridge

If the bridge stops working:
1. Open command palette
2. Run **"Vidurai: Restart Python Bridge"**

### View Logs

1. Open command palette
2. Run **"Vidurai: Show Logs"**

## Requirements

- VS Code 1.80.0+
- Python 3.8+

## Settings

- `vidurai.enabled` - Enable/disable tracking (default: `true`)
- `vidurai.debounceMs` - File edit debounce time in ms (default: `2000`)
- `vidurai.pythonPath` - Custom Python path (auto-detected if empty)
- `vidurai.logLevel` - Logging level: debug/info/warn/error (default: `info`)

## Status Bar

The status bar shows memory count: `$(database) 23`

- Click to copy context
- Shows "Offline" if bridge crashed

## Troubleshooting

### Bridge won't start

1. Check Python is installed: `python --version` or `python3 --version`
2. Install Vidurai manually: `pip install vidurai==1.6.1`
3. Check logs: Run "Vidurai: Show Logs"

### "Python not found" error

- Install Python 3.8+ from [python.org](https://python.org)
- Or set custom path in settings: `vidurai.pythonPath`

## Privacy

- All data stored locally in `~/.vidurai/sessions/`
- Secrets automatically detected and excluded
- No telemetry, no data sent to external servers

## Support

- 📖 [Documentation](https://docs.vidurai.ai)
- 🐛 [Report Bug](https://github.com/chandantochandan/vidurai/issues)
- 💬 [Discord](https://discord.gg/vidurai)

## License

MIT
