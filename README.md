# TidyDrive - Privacy-Focused Storage Manager

**Understand your storage. Clean it safely. Keep it under control.**

A modern, premium desktop application for Windows and macOS that helps you manage your storage with complete privacy and safety.

## Features (Phases 1-4 Complete)

- **📊 Dashboard** - Real-time storage overview with health score
- **🔍 Storage Analyzer** - Detailed breakdown by category and folder
- **🎯 Duplicate Finder** - Find and safely remove duplicate files
- **⚡ Smart Cleanup** - Intelligent recommendations with safety levels
- **🌓 Dark/Light Mode** - Beautiful UI for your preference
- **🔒 100% Private** - All scanning happens locally, zero uploads

## System Requirements

### Prerequisites
- **Node.js** 18+ (https://nodejs.org)
- **Rust** (https://rustup.rs)
- **Windows 10/11** or **macOS 10.15+**

### Verify Installation
```bash
node --version    # v18+
npm --version
rustc --version
cargo --version
```

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Mode
```bash
npm run tauri:dev
```

This will:
- Start the Vite dev server
- Compile Rust backend
- Launch the desktop app
- Enable hot reload

### 3. Build for Release
```bash
npm run tauri:build
```

Output files:
- **Windows**: `src-tauri/target/release/tidydrive.exe`
- **macOS**: `src-tauri/target/release/tidydrive.dmg`

## Project Structure

```
tidydrive/
├── src/
│   ├── components/      # React UI components
│   ├── context/         # React context (theme)
│   ├── types/           # TypeScript interfaces
│   ├── utils/           # Utilities and store
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # React entry point
│   └── main.css         # Tailwind + custom styles
├── src-tauri/
│   ├── src/
│   │   └── main.rs      # Rust backend
│   └── Cargo.toml       # Rust dependencies
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Development

### Tech Stack
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Desktop**: Tauri
- **Backend**: Rust
- **Database**: SQLite (local)
- **State**: Zustand

### Key Features
- ✅ Cross-platform (Windows + macOS)
- ✅ Fully offline capable
- ✅ No external APIs required
- ✅ Dark mode support
- ✅ Responsive design
- ✅ TypeScript throughout

## Build Phases

### Completed (Phases 1-4)
- ✅ Phase 1: Foundation & UI
- ✅ Phase 2: Directory scanning
- ✅ Phase 3: Storage analyzer
- ✅ Phase 4: Duplicate finder

### Coming Soon
- 📋 Phase 5: Similar file detection
- 📋 Phase 6: Large & old files
- 📋 Phase 7: Smart categories
- 📋 Phase 8: Safe cleanup
- 📋 Phase 9: Health & trends
- 📋 Phase 10: Prevention
- 📋 Phase 11: Pro licensing
- 📋 Phase 12: Localization (Hindi)

## Troubleshooting

### Build fails
```bash
cargo clean
npm cache clean --force
npm install
npm run tauri:dev
```

### Rust issues
```bash
rustup update
rustup toolchain install stable
cargo build
```

### Port 5173 already in use
```bash
# macOS/Linux
lsof -i :5173
kill -9 <PID>

# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

## Privacy & Safety

- ✅ 100% local processing
- ✅ No cloud uploads
- ✅ No analytics tracking
- ✅ No third-party APIs
- ✅ Open source on GitHub
- ✅ Safe Trash/Recycle Bin deletion

## License

MIT - See LICENSE file

## Support

For issues and feedback: GitHub Issues

---

**Built with ❤️ for storage management**
