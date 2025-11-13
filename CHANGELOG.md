# Changelog

All notable changes to Vidurai Memory Manager will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.1.0] - 2024-11-13 ✅ **PRODUCTION-VALIDATED**

### 🎉 Initial Alpha Release

**First public release of Vidurai Memory Manager for VS Code!**

This release has been validated in real-world production workflows with exceptional results:
- ⚡ **90% faster** context sharing (60s → 5s)
- 📊 **59% token reduction** (210 → 85 tokens)
- 🎯 **95.6/100** integration score
- ✅ **Production-ready** for AI-assisted development workflows

**Test AI:** Claude Code (results apply to ChatGPT, Copilot, and all text-based AI assistants)

[View full validation report →](docs/VALIDATION_REPORT.md)

---

### ✨ Added

#### Core Features
- **Automatic Context Tracking**
  - File edits monitoring with 2-second debounce
  - Terminal command capture (final output mode)
  - Diagnostic tracking (errors and warnings)
  - Git operations monitoring (experimental)

- **Intelligent Memory Management**
  - Salience-based classification (CRITICAL → NOISE)
  - Rule-based gist extraction (90%+ compression)
  - Cross-project memory isolation (workspace-specific)
  - Automatic secrets detection and redaction

- **Python Bridge Integration**
  - Vidurai SDK v1.6.1 integration
  - Local-only memory storage (`~/.vidurai/sessions/`)
  - Subprocess management with graceful shutdown
  - Auto-recovery on bridge crashes (3 retry attempts)

#### User Interface
- **Status Bar Indicator**
  - Real-time memory count display
  - Clickable for quick context copy
  - Session status indicator

- **Commands**
  - `Vidurai: Copy Relevant Context` - Export context as markdown
  - `Vidurai: Restart Python Bridge` - Restart memory service
  - `Vidurai: Show Logs` - Open output panel for debugging
  - `Vidurai: Clear All Memories` - Reset workspace memory

#### Developer Experience
- **Zero-Config Installation**
  - Automatic Python detection (system/venv)
  - Auto-install Vidurai SDK on first run
  - Welcome message with quick setup wizard
  - Cross-platform support (Windows/macOS/Linux)

- **Configurable Settings**
  - `vidurai.enabled` - Toggle tracking on/off
  - `vidurai.debounceMs` - File edit debounce time
  - `vidurai.pythonPath` - Custom Python executable
  - `vidurai.maxFileSize` - File size limit for tracking
  - `vidurai.terminalMode` - Terminal tracking mode
  - `vidurai.logLevel` - Debug/info/warn/error logging

#### Privacy & Security
- **Local-First Architecture**
  - All data stored locally by default
  - No cloud sync (unless explicitly enabled in future)
  - Workspace isolation prevents context bleeding

- **Secrets Protection**
  - Auto-detection of API keys (OpenAI, Anthropic, GitHub, AWS)
  - Password pattern matching
  - Database URL redaction
  - JWT token filtering
  - `.env` files auto-ignored

#### Documentation
- Comprehensive README with quick start guide
- Integration test validation report (95.6/100 score)
- Flask bug fix case study (90% time savings)
- Troubleshooting guide
- API reference for contributors

---

### 🔧 Technical Details

#### Architecture
- **Extension:** TypeScript (VS Code Extension API)
- **Bridge:** Python 3.8+ (stdin/stdout communication)
- **Memory:** Vidurai SDK v1.6.1 (VismritiMemory)
- **Storage:** Pickle (local sessions)

#### Performance
- Memory footprint: <50MB total (extension + bridge)
- CPU usage: <1% idle, <5% during saves
- Latency: <100ms added to file saves
- File size limit: 50KB default (configurable)

#### Compatibility
- **VS Code:** 1.80.0 or higher
- **Python:** 3.8, 3.9, 3.10, 3.11 (tested)
- **Platforms:** Windows 10/11, macOS 11+, Linux (Ubuntu 20.04+)

#### Dependencies
- `vidurai>=1.6.1,<2.0.0` - Core memory SDK
- VS Code Extension API - Editor integration
- Node.js (bundled with VS Code) - Extension runtime

---

### 📊 Validation Results

**Real-World Flask Debugging Test:**

| Metric | Result | Evidence |
|--------|--------|----------|
| **Time Savings** | 90% faster (60s → 5s) | [Case Study](docs/CASE_STUDY.md) |
| **Token Reduction** | 59% (210 → 85 tokens) | [Validation Report](docs/VALIDATION_REPORT.md) |
| **Accuracy** | 100% (perfect capture) | Multi-issue detection validated |
| **Integration Score** | 95.6/100 | Context + Understanding + Time + UX |
| **AI Understanding** | 100% (fixed on first try) | Bug resolved without clarification (Claude Code) |

**Criteria Met:** 8/8 validation tests passed ✅

---

### ⚠️ Known Limitations

#### Documented Issues
1. **Terminal Output Capture:** Partial
   - Currently captures via diagnostics only
   - Runtime errors may require manual attention
   - Full terminal integration planned for v0.2.0

2. **Token Count (Initial):** Slightly Higher
   - Vidurai context: 85 tokens vs manual: 60-80 tokens
   - However, saves 125 tokens by preventing follow-ups
   - Net savings: 59% including round trips

3. **Memory Visualization:** Not Available
   - No UI to see what's being tracked
   - Status bar shows count only
   - Memory Ledger UI planned for v0.2.0

4. **Bridge Initialization Time:** ~10-30 seconds
   - First activation requires Vidurai SDK installation
   - Subsequent activations: ~5 seconds
   - One-time setup cost, then instant

#### Compatibility Notes
- **Large Files:** Files >50KB ignored by default (configurable)
- **Large Workspaces:** Performance not optimized for >10,000 files yet
- **Python Version:** Requires 3.8+ (won't work on Python 2.x)
- **VS Code Version:** Requires 1.80.0+ (2023 or newer)

---

### 🔒 Security Considerations

#### What's Protected
- ✅ API keys auto-redacted (OpenAI, Anthropic, GitHub, AWS)
- ✅ Passwords pattern-matched and excluded
- ✅ `.env` files ignored by default
- ✅ Private keys detected and skipped
- ✅ JWTs filtered from context

#### What to Be Careful With
- ⚠️ Custom secret formats (not in default patterns)
- ⚠️ Hardcoded credentials in unusual formats
- ⚠️ Sensitive data in non-standard locations

**Recommendation:** Review context before pasting into external AI services (good practice regardless of tool).

---

### 📚 Resources

**Documentation:**
- [Installation Guide](README.md#installation)
- [Quick Start Tutorial](README.md#quick-start)
- [Validation Report](docs/VALIDATION_REPORT.md)
- [Flask Case Study](docs/CASE_STUDY.md)
- [Troubleshooting](README.md#troubleshooting)

**Community:**
- [GitHub Repository](https://github.com/chandantochandan/vidurai-vscode-extension)
- [Issue Tracker](https://github.com/chandantochandan/vidurai-vscode-extension/issues)
- [Discussions](https://github.com/chandantochandan/vidurai-vscode-extension/discussions)
- [Discord Server](https://discord.gg/vidurai) _(coming soon)_

**Research:**
- [Vidurai Research Paper](https://github.com/chandantochandan/vidurai/blob/main/research/VIDURAI_RESEARCH.md)
- [Three-Kosha Architecture](https://github.com/chandantochandan/vidurai#philosophy)

---

### 🙏 Acknowledgments

**Built with inspiration from:**
- Fuzzy-Trace Theory (Brainerd & Reyna) - Gist-based memory
- Vedantic Philosophy - Three-Kosha consciousness model
- Neuroscience Research - Synaptic pruning and memory consolidation

**Special thanks to:**
- VS Code Extension API team
- Anthropic Claude, OpenAI ChatGPT, GitHub Copilot (excellent AI assistant integrations)
- Open source community (testing and feedback)

---

### 🎯 What's Next?

**v0.2.0 Roadmap (Coming Soon):**
- Memory Ledger UI (TreeView in sidebar)
- One-click "Ask AI with Context" command
- Full terminal output capture
- Custom salience rules (user-configurable)
- Proxy sync integration (optional cloud backup)
- Advanced metrics dashboard

**v1.0.0 Roadmap (Stable Release):**
- LLM-based gist extraction (optional OpenAI)
- ML salience classification (reinforcement learning)
- Context search and filtering
- Multi-workspace memory sharing
- Team collaboration features

**v2.0.0 Roadmap (Multi-IDE):**
- JetBrains plugin (IntelliJ, PyCharm, WebStorm)
- Vim/Neovim plugin
- Emacs package
- Unified cross-IDE memory system

[View full roadmap →](https://github.com/chandantochandan/vidurai-vscode-extension/projects)

---

### 📝 Upgrade Instructions

**First-Time Installation:**
```bash
# Install from VS Code Marketplace
ext install vidurai.vidurai

# Or from .vsix file
code --install-extension vidurai-memory-0.1.0.vsix
```

**Post-Installation:**
1. Reload VS Code window
2. Click "Quick Setup" in welcome message
3. Wait for Python detection and Vidurai SDK installation
4. Start coding! Context tracking is automatic.

---

### 🐛 Bug Reports

Found a bug? Please report it!

**GitHub Issues:** https://github.com/chandantochandan/vidurai-vscode-extension/issues

**What to include:**
- Extension version (v0.1.0)
- VS Code version
- Operating system
- Python version
- Steps to reproduce
- Logs from Output panel (Vidurai channel)

---

### 💬 Feedback Welcome!

**Rate the extension:** [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=vidurai.vidurai)

**Feature requests:** [GitHub Discussions](https://github.com/chandantochandan/vidurai-vscode-extension/discussions)

**Community:** [Discord](https://discord.gg/vidurai) _(coming soon)_

---

## [Unreleased]

### Planned for v0.2.0
- Memory Ledger UI visualization
- One-click context injection
- Full terminal integration
- Custom salience rules

---

**विस्मृति भी विद्या है** — *"Forgetting too is knowledge"*

**जय विदुराई!** 🕉️

---

[0.1.0]: https://github.com/chandantochandan/vidurai-vscode-extension/releases/tag/v0.1.0
