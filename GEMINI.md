# Professional CV Architect - Project Overview

Dynamic React application for generating polished, print-ready PDF CVs in real-time.

## Core Requirements
- [x] **Dynamic Form Engine**: Multi-step/categorized form (Personal Info, Experience, Education, Skills) updating a central state.
- [x] **Image Handling**: Upload utility for profile pictures with **integrated cropping** (using `react-easy-crop`).
- [x] **Multi-Template Support**: Three professional layouts: **Modern**, **Minimalist**, and **Executive**.
- [x] **Customization**: User-adjustable color schemes (primary/secondary), layout settings, and **modern typography selection**.
- [x] **Advanced Layouts**: Full-height sidebars and optimized grid structures for professional readability.
- [x] **PDF Generation**: Integration with `html2canvas` and `jspdf` for A4 export.
- [x] **Design Language**: Dark-themed Control Panel vs. Clean/Minimalist "Paper" preview.

## Progress (2026-02-27)
- Initialized Vite project and defined state schema.
- Implemented core form components and image cropping.
- **Typography Overhaul**: Added Google Fonts (Inter, Montserrat, Playfair, Lora, Roboto) and a font picker in settings.
- **Redesigned Modern Template**: Implemented a true full-height sidebar with a dedicated color scheme and better info hierarchy.
- **Enhanced Minimalist & Executive Templates**: Integrated profile pictures and modernized the overall aesthetic with better spacing and softer borders.
- **Global Style Update**: Refined the control panel with better shadows, rounded corners, and a more "senior" professional look.
- **PDF Export Logic**: Implemented high-quality (2x scale) PDF export using `html2canvas` and `jspdf`.
- **Persistence**: Implemented `localStorage` state persistence for CV data.
- **Reset Logic**: Added a "Reset to Defaults" feature to clear all session data.

## TODO List
- [ ] **Multi-Page Handling**: Improve PDF generation for extremely long CVs that exceed one A4 page.
- [ ] **Real-time Validation**: Add visual feedback for required fields (e.g., highlights on empty fields).
- [ ] **Shareable Links**: (Optional) Look into potential for generating unique URLs for online sharing.

## Technical Notes
- **State Management**: Centralized in `App.jsx` using `useState`.
- **Icons**: Using `lucide-react`.
- **Styling**: Vanilla CSS for flexibility.
- **Preview ID**: The element for PDF capture is `#cv-preview`.
