# 📚 AI Exam Solver

**AI Exam Solver** is a React-based application that leverages Google's **Gemini 2.0 Flash** (Multimodal AI) to analyze PDF question papers and generate comprehensive, "Exam-Ready" solutions.

Unlike standard text extractors, this app uses Gemini's native vision capabilities to read complex PDFs—including diagrams, charts, and equations—and outputs a professionally formatted PDF containing answers, key concepts, and examples.

---

## 🚀 Features

* **Multimodal Input:** Directly uploads PDF files to Gemini (no text extraction libraries required).
* **Intelligent Solving:** Uses **Gemini 2.0 Flash** to answer questions with high accuracy.
* **Exam-Ready Output:** Generates structured solutions with:
    * **Bold Questions**
    * **Clear Answers**
    * **Key Concepts** (highlighted for revision)
    * **Examples**
* **Professional PDF Generation:** Uses `@react-pdf/renderer` to create high-quality, downloadable PDF documents.
* **Client-Side Secure:** Your API Key is processed locally in your browser and never stored on a server.

---

## 🛠️ Tech Stack

* **Frontend Library:** [React.js](https://reactjs.org/)
* **AI Model:** [Google Gemini 2.0 Flash](https://ai.google.dev/) (via `@google/genai` SDK)
* **PDF Generation:** [`@react-pdf/renderer`](https://react-pdf.org/)
* **Styling:** CSS3



---

## 📖 How to Use

1.  **Get an API Key:**
    * Visit [Google AI Studio](https://aistudio.google.com/).
    * Create a free API key.
2.  **Launch the App:**
    * Paste your API Key in the input field.
3.  **Upload PDF:**
    * Select a question paper (PDF format).
4.  **Generate:**
    * Click **"Get Solutions"**. The AI will analyze the document.
5.  **Download:**
    * Once processed, click **"Download Formatted PDF"** to save your study guide.

---

## 📂 Project Structure

```bash
PDF-Solver/
├── public/
│   ├── _redirects       # Fixes Netlify 404 errors
│   └── index.html
├── src/
│   ├── images/
│   │   └── starIcon.png # UI Assets
│   ├── App.js           # Main Logic (Gemini API + PDF Rendering)
│   ├── App.css          # Styling
│   └── index.js
├── package.json
└── README.md