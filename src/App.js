import React, { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { jsPDF } from "jspdf";
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  // 1. Helper function to convert File object to Base64 (required by Gemini)
  const fileToGenerativePart = async (file) => {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]);
      reader.readAsDataURL(file);
    });
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
  };

  // 2. Handle File Selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  // 3. Main Logic: Send PDF to Gemini and get Answers
  const handleGenerate = async () => {
    if (!file || !apiKey) {
      alert("Please provide both an API Key and a PDF file.");
      return;
    }

    setLoading(true);
    setResponse("");

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      
      // Use gemini-1.5-flash for speed and efficiency with documents
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const pdfPart = await fileToGenerativePart(file);

      // The Prompt: Instructions for "Exam Ready" format
      const prompt = `
        You are an expert tutor. I have attached a PDF containing questions.
        
        Task:
        1. Read all questions in the PDF.
        2. Provide a solution for every single question.
        3. Use simple, easy-to-understand language.
        4. Format the output to be "Exam Ready":
           - **Question**: [Write the question]
           - **Answer**: [Clear answer]
           - **Key Concept**: [One sentence summary]
           - **Example**: [Real-world example if applicable]
        5. If a diagram is needed, describe it clearly in text format like this: [Diagram: Description of visual].
      `;

      const result = await model.generateContent([prompt, pdfPart]);
      const text = result.response.text();
      setResponse(text);

    } catch (error) {
      console.error("Error:", error);
      alert("Error generating solution. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Generate and Download Output PDF
  const handleDownload = () => {
    const doc = new jsPDF();
    
    // Set font size and type
    doc.setFont("helvetica");
    doc.setFontSize(12);

    const marginLeft = 10;
    const marginTop = 10;
    const maxWidth = 180; // Width of text on page
    const pageHeight = doc.internal.pageSize.height;

    // Split text to fit page width
    const textLines = doc.splitTextToSize(response, maxWidth);

    let cursorY = marginTop;

    // Loop through lines to handle pagination
    textLines.forEach(line => {
      if (cursorY + 10 > pageHeight) {
        doc.addPage();
        cursorY = marginTop;
      }
      doc.text(line, marginLeft, cursorY);
      cursorY += 7; // Line height
    });

    doc.save("Exam_Solutions.pdf");
  };

  return (
    <div className="App">
      <header className="header">
        <h1>📚 AI Exam Solver</h1>
        <p>Upload a question paper PDF and get exam-ready solutions.</p>
      </header>

      <div className="container">
        
        {/* Input Section */}
        <div className="input-group">
          <label>1. Enter Gemini API Key:</label>
          <input 
            type="password" 
            placeholder="Paste API Key here..." 
            value={apiKey} 
            onChange={(e) => setApiKey(e.target.value)} 
          />
        </div>

        <div className="input-group">
          <label>2. Upload Question PDF:</label>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
        </div>

        <button 
          className="generate-btn" 
          onClick={handleGenerate} 
          disabled={loading || !file}
        >
          {loading ? "Analyzing & Solving..." : "Get Solutions"}
        </button>

        {/* Results Section */}
        {response && (
          <div className="result-area">
            <h3>Generated Solutions:</h3>
            <pre className="preview-box">{response}</pre>
            <button className="download-btn" onClick={handleDownload}>
              Download Solution PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;