# Vidurai Memory Manager for VS Code

🧠 **Intelligent AI memory management for your coding workflow**

Vidurai automatically tracks your context—files, commands, errors—and makes it instantly available when you need to prompt AI assistants. No manual context gathering. No token waste.

**विस्मृति भी विद्या है** — *"Forgetting too is knowledge"*

[![VS Code Marketplace](https://img.shields.io/visual-studio-marketplace/v/vidurai.vidurai?color=blue&label=VS%20Code%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=vidurai.vidurai)
[![Downloads](https://img.shields.io/visual-studio-marketplace/d/vidurai.vidurai)](https://marketplace.visualstudio.com/items?itemName=vidurai.vidurai)
[![Rating](https://img.shields.io/visual-studio-marketplace/r/vidurai.vidurai)](https://marketplace.visualstudio.com/items?itemName=vidurai.vidurai)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ⚡ Proven Results (Production Validated)

**Real-world Flask debugging test:**

| Metric | Without Vidurai | With Vidurai | Improvement |
|--------|-----------------|--------------|-------------|
| **Time to share context** | 60 seconds | 5 seconds | **90% faster** ⚡ |
| **User effort** | Type explanation | 2 clicks | **95% less effort** |
| **Token efficiency** | 210 tokens* | 85 tokens | **59% reduction** 📊 |
| **Accuracy** | Variable | 100% | **Perfect capture** 🎯 |
| **Integration score** | — | **95.6/100** | **Exceptional** 🏆 |

_*Including round trips for clarification. See [full validation report](https://github.com/chandantochandan/vidurai/blob/main/docs/VALIDATION_REPORT.md)._

> **"Vidurai transforms debugging from 'explaining problems' to 'sharing perfect context instantly.' The 90% time savings compound across multiple debugging sessions, making it an indispensable tool for AI-assisted development."**
> — Integration Test Report

---

## 🎯 Why Vidurai?

### Traditional AI Workflow Problems:
- ❌ Manually copy-paste context
- ❌ Forget what you did yesterday
- ❌ Repeat information across prompts
- ❌ Waste tokens on irrelevant details
- ❌ Miss critical error details
- ❌ Spend 60+ seconds per explanation

### With Vidurai:
- ✅ **Automatic context tracking** (files, commands, errors)
- ✅ **Intelligent forgetting** (keeps what matters)
- ✅ **One-click context export** (2 clicks, 5 seconds)
- ✅ **59% fewer tokens** (validated in production)
- ✅ **Perfect accuracy** (no human error)
- ✅ **90% time savings** (stay in flow state)

---

## 🌟 Features

### 🧠 **Smart Memory System**
- **Automatic tracking:** Files, terminal commands, diagnostics
- **Salience-based importance:** CRITICAL → HIGH → MEDIUM → LOW → NOISE
- **Gist extraction:** Captures meaning, not just words
- **Multi-issue capture:** 3+ issues in single context

### 🔒 **Privacy-First Architecture**
- **Local-only by default:** Your code never leaves your machine
- **Automatic secrets detection:** API keys, passwords redacted
- **Workspace isolation:** Separate memory per project
- **Offline-capable:** Works without internet

### ⚡ **Zero-Config Installation**
- **Auto-detects Python:** Finds system or venv Python
- **Auto-installs dependencies:** One-click setup
- **Cross-platform:** Windows, macOS, Linux

### 📊 **Research-Backed**
- **Based on Fuzzy-Trace Theory:** Neuroscience-inspired
- **Three-Kosha architecture:** Vedantic philosophy meets AI
- **Validated results:** 59-90% improvements in real workflows

---

## 🚀 Quick Start

### Installation

1. **Install from VS Code Marketplace:**
```
   ext install vidurai.vidurai
```

2. **Reload VS Code** (if prompted)

3. **Quick Setup:**
   - Welcome message appears automatically
   - Click **"Quick Setup"**
   - Extension auto-detects Python and installs dependencies
   - Done! Start coding.

### Usage

**When you need context for AI assistants (Claude, ChatGPT, Copilot):**

1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type: **"Vidurai: Copy Relevant Context"**
3. Press `Enter`
4. Paste into your AI assistant prompt
5. AI gets full context automatically!

**That's it. 5 seconds. Perfect context. Every time.**

---

## 📖 How It Works

### Automatic Context Tracking

Vidurai monitors your workspace and captures:

- **File Edits:** What you're working on
- **Terminal Commands:** What you're running
- **Diagnostics:** Errors and warnings
- **Git Operations:** Commits and branches (coming soon)

### Intelligent Salience Classification

Not all context is equal. Vidurai classifies by importance:

| Level | Examples | Memory Duration |
|-------|----------|-----------------|
| **CRITICAL** | Errors, security issues | Weeks |
| **HIGH** | Test files, config changes, failed commands | Days |
| **MEDIUM** | Normal code edits, successful commands | Hours |
| **LOW** | File opens, documentation edits | Minutes |
| **NOISE** | Auto-saves, terminal spam | Seconds |

### Gist Extraction

Instead of storing entire file contents:
```
Verbatim: [500 lines of code]
Gist: "Added error handling to auth module"
```

**Result:** 90% compression while preserving meaning.

### Context Recall

When you copy context, Vidurai:

1. Recalls relevant memories (based on salience)
2. Formats as clean markdown
3. Includes line numbers and timestamps
4. Prioritizes by importance

---

## 🎓 Philosophy

### विस्मृति भी विद्या है
*"Forgetting too is knowledge"*

Vidurai isn't just a cache—it's an **intelligent memory system** that knows what to remember and what to forget, just like your brain does.

**Inspired by:**
- **Fuzzy-Trace Theory:** How humans remember "gists" not verbatim details
- **Vedantic Philosophy:** Three-Kosha architecture (three layers of consciousness)
- **Synaptic Pruning:** Brain's natural process of forgetting unimportant information

**The insight:** Your brain doesn't remember everything—and neither should your AI context. Intelligent forgetting makes memory more useful, not less.

---

## ⚙️ Settings

Configure Vidurai in VS Code Settings (`Ctrl+,`):
```json
{
  // Enable/disable tracking
  "vidurai.enabled": true,

  // File edit debounce time (milliseconds)
  "vidurai.debounceMs": 2000,

  // Custom Python path (auto-detected if empty)
  "vidurai.pythonPath": "",

  // Maximum file size to track (bytes, 0 = unlimited)
  "vidurai.maxFileSize": 51200,

  // Terminal tracking mode
  "vidurai.terminalMode": "final-only", // "off" | "final-only" | "incremental"

  // Logging level
  "vidurai.logLevel": "info" // "debug" | "info" | "warn" | "error"
}
```

---

## 🔧 Commands

| Command | Description | Shortcut |
|---------|-------------|----------|
| `Vidurai: Copy Relevant Context` | Copy formatted context to clipboard | — |
| `Vidurai: Restart Python Bridge` | Restart background memory service | — |
| `Vidurai: Show Logs` | Open Vidurai output panel | — |
| `Vidurai: Clear All Memories` | Reset memory for current workspace | — |

---

## 📊 Real-World Use Cases

### 1. Bug Fixing with AI Assistants
**Before Vidurai:**
```
You: "I have a Flask app with a NameError on line 6..."
AI: "What's the exact error message?"
You: "NameError: name 'undefined_var' is not defined"
AI: "Can you show the function code?"
You: [pastes code]
AI: [fixes bug]

Time: 60 seconds, 3 messages, 210 tokens
```

**With Vidurai:**
```
You: [Ctrl+Shift+P → Copy Context → Paste]
AI: [fixes bug immediately]

Time: 5 seconds, 1 message, 85 tokens
```

**Savings:** 55 seconds (90% faster), 125 tokens (59% reduction)

### 2. Code Review Preparation
Vidurai captures what changed across multiple files, making it easy to generate comprehensive PR descriptions.

### 3. Debugging Session Resume
Return to a project after days/weeks and instantly recall what you were working on—errors, changes, context—without digging through history.

### 4. Team Context Sharing
Export context as markdown and share with teammates for asynchronous debugging help.

---

## 🔐 Privacy & Security

### What Vidurai Stores (Locally)
- File paths (not full content)
- Gists (semantic summaries)
- Terminal commands (not output, unless enabled)
- Diagnostics (errors/warnings)
- Metadata (timestamps, salience)

### What Vidurai NEVER Stores
- API keys (auto-detected and redacted)
- Passwords (auto-detected and redacted)
- Secrets in `.env` files (auto-ignored)
- Private keys (auto-ignored)
- Your actual code (unless gist extraction enabled)

### Storage Location
```
~/.vidurai/sessions/
  ├── {workspace-hash-1}.pkl
  └── {workspace-hash-2}.pkl
```

**Your data stays on your machine.** No cloud sync unless you explicitly enable proxy mode (coming in v0.2.0).

---

## 🛠️ Requirements

- **VS Code:** 1.80.0 or higher
- **Python:** 3.8 or higher (auto-detected)
- **Vidurai SDK:** Auto-installed (requires internet for first setup)

### Supported Platforms
- ✅ Windows 10/11
- ✅ macOS 11+ (Intel & Apple Silicon)
- ✅ Linux (Ubuntu 20.04+, Fedora, Arch, etc.)

---

## 🐛 Troubleshooting

### Extension doesn't activate
1. Open Output panel (`View → Output`)
2. Select "Vidurai" from dropdown
3. Check for errors
4. Run: `Vidurai: Restart Python Bridge`

### Python not found
1. Install Python 3.8+ from [python.org](https://python.org)
2. Set custom path in settings: `vidurai.pythonPath`
3. Reload VS Code window

### Bridge timeout
1. Check Python version: `python --version` (must be 3.8+)
2. Manually install Vidurai SDK: `pip install vidurai>=1.6.1`
3. Increase timeout (file issue if persists)

### Context not copying
1. Verify extension is active (status bar shows database icon)
2. Check if any memories exist (edit a file, wait 2 seconds)
3. Check Output panel for errors

**Still having issues?** [Open an issue on GitHub](https://github.com/chandantochandan/vidurai/issues)

---

## 🗺️ Roadmap

### v0.2.0 (Coming Soon)
- 🎯 Memory Ledger UI (TreeView in sidebar)
- 🎯 Proxy sync integration (optional cloud backup)
- 🎯 Advanced metrics dashboard
- 🎯 Custom salience rules

### v1.0.0 (Stable Release)
- 🎯 LLM-based gist extraction (optional)
- 🎯 ML salience classification
- 🎯 Context search & filtering
- 🎯 Multi-workspace memory sharing

### v2.0.0 (Multi-IDE)
- 🎯 JetBrains plugin
- 🎯 Vim/Neovim plugin
- 🎯 Emacs package
- 🎯 Unified cross-IDE memory

**[View full roadmap →](https://github.com/chandantochandan/vidurai/projects)**

---

## 🤝 Contributing

Vidurai is open source (MIT License). We welcome contributions!

**Ways to contribute:**
- 🐛 Report bugs
- 💡 Suggest features
- 📝 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star the repo

**[Contribution Guidelines →](https://github.com/chandantochandan/vidurai/blob/main/CONTRIBUTING.md)**

---

## 📚 Resources

- **Documentation:** [docs.vidurai.ai](https://docs.vidurai.ai)
- **GitHub:** [chandantochandan/vidurai](https://github.com/chandantochandan/vidurai)
- **Discord Community:** [discord.gg/vidurai](https://discord.gg/vidurai)
- **Research Paper:** [View on GitHub](https://github.com/chandantochandan/vidurai/blob/main/research/VIDURAI_RESEARCH.md)
- **Case Studies:** [Flask Bug Fix](https://github.com/chandantochandan/vidurai/blob/main/docs/CASE_STUDY.md)
- **Validation Report:** [Integration Test Results](https://github.com/chandantochandan/vidurai/blob/main/docs/VALIDATION_REPORT.md)

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Built with inspiration from:
- **Fuzzy-Trace Theory** (Brainerd & Reyna)
- **Vedantic Philosophy** (Three-Kosha model)
- **Neuroscience Research** (Synaptic pruning, memory consolidation)

---

## 💬 Support

- **Issues:** [GitHub Issues](https://github.com/chandantochandan/vidurai/issues)
- **Discussions:** [GitHub Discussions](https://github.com/chandantochandan/vidurai/discussions)
- **Email:** support@vidurai.ai

---

**विस्मृति भी विद्या है** — *"Forgetting too is knowledge"*

**जय विदुराई!** 🕉️

---

Made with ❤️ by [Chandan Kumar](https://github.com/chandantochandan)
