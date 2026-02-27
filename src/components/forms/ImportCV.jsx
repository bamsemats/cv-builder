import React, { useRef, useState } from "react";
import { Upload, FileText, AlertCircle, Check } from "lucide-react";
import mammoth from "mammoth";

const ImportCV = ({ onImport }) => {
  const fileInputRef = useRef(null);
  const [isParsing, setIsParsing] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, success, error

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "text/plain",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a .txt or .docx file.");
      return;
    }

    setIsParsing(true);
    setStatus("idle");

    try {
      let text = "";
      
      if (file.type === "text/plain") {
        text = await file.text();
      } else {
        // Handle .docx with mammoth
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        text = result.value;
      }

      const parsedData = parseCVText(text);
      onImport(parsedData);
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      console.error("Parsing failed:", error);
      setStatus("error");
    } finally {
      setIsParsing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const parseCVText = (text) => {
    const lines = text.split("").map(line => line.trim()).filter(line => line.length > 0);
    const data = {
      personal: {},
      experience: [],
      education: [],
      skills: []
    };

    // 1. Basic Personal Info Extraction
    // Assume first line is Name
    if (lines.length > 0) data.personal.fullName = lines[0];

    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const phoneRegex = /(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g;

    const emailMatch = text.match(emailRegex);
    if (emailMatch) data.personal.email = emailMatch[0];

    const phoneMatch = text.match(phoneRegex);
    if (phoneMatch) data.personal.phone = phoneMatch[0];

    // 2. Section Splitting
    let currentSection = "";
    
    lines.forEach((line, index) => {
      const lowerLine = line.toLowerCase();
      
      if (lowerLine.includes("experience") || lowerLine.includes("work history") || lowerLine.includes("employment")) {
        currentSection = "experience";
        return;
      }
      if (lowerLine.includes("education") || lowerLine.includes("academic")) {
        currentSection = "education";
        return;
      }
      if (lowerLine.includes("skills") || lowerLine.includes("expertise")) {
        currentSection = "skills";
        return;
      }

      // Simple heuristic for parsing entries
      if (currentSection === "experience" && line.length > 5) {
        // Very basic: just add as a description/summary for now
        // A better parser would look for dates and titles
        if (data.experience.length === 0 || line.match(/\d{4}/)) {
           data.experience.push({ id: `exp-${Date.now()}-${index}`, position: line, company: "Company Name", location: "Location", startDate: "Date", endDate: "Date", description: "" });
        } else {
           data.experience[data.experience.length - 1].description += line + "";
        }
      }

      if (currentSection === "education" && line.length > 5) {
        if (data.education.length === 0 || line.match(/\d{4}/)) {
          data.education.push({ id: `edu-${Date.now()}-${index}`, degree: line, school: "Institution", location: "Location", startDate: "Date", endDate: "Date", description: "" });
        } else {
          data.education[data.education.length - 1].description += line + "";
        }
      }

      if (currentSection === "skills" && line.length > 2) {
        // Split by commas if present
        if (line.includes(",")) {
          line.split(",").forEach(s => {
            if (s.trim()) data.skills.push({ id: `skill-${Date.now()}-${index}-${s}`, name: s.trim(), level: "Intermediate" });
          });
        } else {
          data.skills.push({ id: `skill-${Date.now()}-${index}`, name: line, level: "Intermediate" });
        }
      }
    });

    return data;
  };

  return (
    <div className="import-section">
      <div className="section-header">
        <h3><Upload size={18} /> Import Data</h3>
      </div>
      
      <div 
        className={`import-dropzone ${status === "success" ? "success" : ""}`}
        onClick={() => fileInputRef.current.click()}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept=".txt,.docx"
          style={{ display: "none" }}
        />
        
        {isParsing ? (
          <div className="import-status">
            <span className="animate-spin">⌛</span>
            <p>Parsing your CV...</p>
          </div>
        ) : status === "success" ? (
          <div className="import-status success">
            <Check size={24} color="#10b981" />
            <p>Imported Successfully!</p>
          </div>
        ) : (
          <div className="import-status">
            <FileText size={24} className="icon" />
            <p>Click to upload .txt or .docx CV</p>
            <span>Beta: Section-based parsing</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImportCV;
