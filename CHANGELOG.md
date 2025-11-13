# Changelog

All notable changes to the Vidurai Memory Manager extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2024-11-09

### Added
- Initial alpha release
- Automatic context tracking (files, terminal output, diagnostics)
- Rule-based gist extraction for code events
- Salience classification system (CRITICAL → NOISE)
- Automatic secrets detection (API keys, passwords, tokens)
- "Copy Relevant Context" command for AI assistants
- Status bar indicator showing memory count
- Python auto-detection and installation
- Cross-project memory isolation
- File watchers with debouncing (2s default)
- Large file filtering (>50KB ignored by default)
- Ignored paths configuration (node_modules, .git, etc.)
- Comprehensive error handling and logging

### Known Limitations
- Local-only mode (proxy sync planned for v0.2.0)
- No memory ledger UI (planned for v0.2.0)
- Copy-paste workflow (automatic context injection planned for v0.2.0)
- Terminal tracking limited by VS Code API constraints

### Technical Details
- Python Bridge: stdin/stdout JSON communication
- Memory Backend: Vidurai SDK v1.6.1+
- Session Storage: `~/.vidurai/sessions/`
- Supported Platforms: Windows, macOS, Linux
- Python Requirement: 3.8+

---

## [Unreleased]

### Planned for v0.2.0
- Memory ledger visualization UI
- Proxy sync mode for multi-device workflows
- Automatic context injection (no copy-paste)
- Enhanced terminal command tracking
- LLM-based gist extraction (optional)
- Token savings metrics dashboard

### Planned for v0.3.0
- Multi-workspace support
- Context search and filtering
- Memory export/import
- Custom salience rules
- Integration with more AI assistants
