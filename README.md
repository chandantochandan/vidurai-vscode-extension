# Vidurai Memory Manager for VS Code

🧠 **Intelligent AI memory for your coding workflow**

Vidurai automatically tracks your context—files, commands, errors—and makes it instantly available when you need to prompt Claude Code or other AI assistants.

## ⚡ Proven Results

**Real-world Flask debugging test:**
- ⚡ **90% faster** context sharing (60s → 5s)
- 📊 **59% token reduction** (210 → 85 tokens)
- 🎯 **95.6/100** integration score
- 🧠 **100% accuracy** - no human error

> *"Vidurai transforms debugging from 'explaining problems' to 'sharing perfect context instantly.'"*  
> — Production validation test

**[Read full test report →](https://github.com/chandantochandan/vidurai/blob/main/docs/test-results.md)**

---

## Why Vidurai?

Vidurai automatically tracks your context—files, commands, errors—and makes it instantly available when you need to prompt Claude Code or other AI assistants. No manual context gathering. No token waste.

**36.6% average token reduction. Privacy-first. Works offline.**

---

## Why Vidurai?

**Traditional AI workflows:**
- ❌ Manually copy-paste context
- ❌ Forget what you did yesterday
- ❌ Repeat information across prompts
- ❌ Waste tokens on irrelevant details

**With Vidurai:**
- ✅ Automatic context tracking
- ✅ Intelligent forgetting (keeps what matters)
- ✅ One-click context export
- ✅ 36.6% fewer tokens

---

## Features

### 🧠 Smart Memory
- Tracks files, commands, errors automatically
- Salience-based importance (CRITICAL → NOISE)
- Gist extraction (meaning, not words)

### 🔒 Privacy-First
- Local-only by default (no cloud)
- Automatic secrets detection
- Your code never leaves your machine

### ⚡ Zero-Config
- Auto-detects Python
- Auto-installs Vidurai SDK
- Works offline

### 📊 Research-Backed
- Based on Fuzzy-Trace Theory
- Neuroscience-inspired architecture
- Proven 36.6% token reduction

---

## Quick Start

1. **Install extension** from VS Code Marketplace
2. **Reload VS Code**
3. **Click "Quick Setup"** when prompted (auto-installs dependencies)
4. **Done!** Start coding.

### Using Vidurai

When you need context for AI:
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Run **"Vidurai: Copy Relevant Context"**
3. Paste into Claude Code or any AI assistant
4. AI gets full context automatically

---

## Commands

- **Vidurai: Copy Relevant Context** - Copy tracked memories to clipboard
- **Vidurai: Restart Python Bridge** - Restart the memory bridge
- **Vidurai: Show Logs** - View extension logs for debugging

---

## Settings

- `vidurai.enabled` - Enable/disable context tracking (default: `true`)
- `vidurai.debounceMs` - File edit debounce time in ms (default: `2000`)
- `vidurai.pythonPath` - Custom Python path (auto-detected if empty)
- `vidurai.maxFileSize` - Maximum file size to track in bytes (default: `51200`)
- `vidurai.trackTerminal` - Track terminal commands (default: `true`)
- `vidurai.trackDiagnostics` - Track errors/warnings (default: `true`)
- `vidurai.ignoredPaths` - Paths to ignore (default: `["node_modules", ".git", "dist", "build"]`)
- `vidurai.logLevel` - Logging level (default: `info`)

---

## Requirements

- **VS Code** 1.80.0 or higher
- **Python** 3.8 or higher

The extension will automatically detect Python and install the Vidurai SDK if needed.

---

## Philosophy

**विस्मृति भी विद्या है**
*"Forgetting too is knowledge"*

Vidurai isn't just a cache—it's an intelligent memory system that knows what to remember and what to forget, just like your brain does.

Based on the **Three-Kosha Architecture** from Vedantic philosophy, Vidurai manages memory in layers:
- **Annamaya** (Raw) - Verbatim content
- **Pranamaya** (Active) - Frequently accessed
- **Manomaya** (Wisdom) - Compressed gists

---

## Privacy & Security

- ✅ All data stored locally in `~/.vidurai/sessions/`
- ✅ Secrets automatically detected and excluded (API keys, passwords, tokens)
- ✅ No telemetry, no data sent to external servers
- ✅ Works completely offline

---

## Troubleshooting

### Extension won't activate
1. Check Python is installed: `python --version` or `python3 --version`
2. Install Vidurai SDK manually: `pip install vidurai==1.6.1`
3. Check logs: Run **"Vidurai: Show Logs"**

### Bridge crashes
1. Run **"Vidurai: Restart Python Bridge"**
2. If it continues crashing, check logs for errors
3. Report bugs at [GitHub Issues](https://github.com/chandantochandan/vidurai/issues)

### "Python not found" error
- Install Python 3.8+ from [python.org](https://python.org)
- Or set custom path in settings: `vidurai.pythonPath`

---

## Support

- 📖 [Documentation](https://docs.vidurai.ai)
- 🐛 [Report Bug](https://github.com/chandantochandan/vidurai/issues)
- 💬 [Discord Community](https://discord.gg/vidurai)

---

## License

MIT

---

**Built with 🧠 by the Vidurai team**
