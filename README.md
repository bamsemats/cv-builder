# Professional CV Architect

A dynamic, React-based application designed for generating polished, print-ready PDF CVs in real-time. This tool combines a user-friendly form engine with professional templates and a robust CV parsing system.

## 🚀 Key Features

- **Dynamic Form Engine**: Categorized interface for Personal Info, Experience, Education, and Skills with real-time state updates.
- **Intelligent CV Import**: Rule-based parsing for `.txt` and `.docx` (via `mammoth.js`) files with refined heuristic text extraction.
- **Advanced Image Handling**: Profile picture upload with integrated cropping powered by `react-easy-crop`.
- **Professional Templates**: Three distinct layouts—**Modern**, **Minimalist**, and **Executive**—optimized for readability.
- **Deep Customization**: Adjust primary/secondary color schemes, layout settings, and modern typography selections.
- **High-Quality PDF Export**: 2x scale PDF generation via `html2canvas` and `jsPDF`, featuring multi-page canvas slicing support.
- **State Persistence**: Automatic `localStorage` saving ensures your data is never lost, with "Reset to Defaults" functionality.
- **Modern UI**: Dark-themed senior Control Panel contrasted with a modernized "Paper" preview.

## 🛠️ Tech Stack

- **Frontend**: React 19 (Vite)
- **Styling**: Vanilla CSS (Surgical control over PDF layouts)
- **PDF Generation**: `html2canvas` & `jsPDF`
- **File Parsing**: `mammoth.js` (DOCX extraction)
- **Icons**: `lucide-react`
- **Animation**: `framer-motion`
- **Image Cropping**: `react-easy-crop`

## 🏁 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/bamsemats/cv-builder.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Deployment
Build the project and deploy to GitHub Pages:
```bash
npm run deploy
```

## 🏗️ Project Structure

- `src/components/forms/`: Individual modules for CV data entry and file importing.
- `src/components/templates/`: Print-ready layout components for the PDF preview.
- `src/constants/`: Default data structures and configuration.
- `src/App.jsx`: Central state management and application logic.

## 📈 Roadmap & Progress

- [x] Robust CV heuristic parsing for specialized TLDs and addresses.
- [x] Multi-page PDF export logic.
- [x] Real-time form validation and visual feedback.
- [ ] Data Export/Import: Download/Upload CV data as `.json` for backup.
- [ ] Advanced PDF Parsing: Investigating `pdfjs-dist` for direct PDF resume reading.
- [ ] Refined Professional Title Logic in heuristics.

---
Built with ❤️ for professional career development.
