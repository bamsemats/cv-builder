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
    const lines = text.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
    const data = {
      personal: {
        fullName: "",
        title: "Your Professional Title",
        email: "",
        phone: "",
        address: "City, Country",
        website: "www.yourwebsite.com",
        summary: "Brief professional summary about yourself. Highlight your key strengths and what you're looking for."
      },
      experience: [],
      education: [],
      skills: []
    };

    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
    const phoneRegex = /(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g;
    const urlRegex = /(www\.[a-z0-9.-]+\.[a-z]{2,}|https?:\/\/[^\s]+)/gi;

    // 1. Extract Personal Info from the top of the file
    let headerLines = lines.slice(0, 10);
    let nameFound = false;
    
    headerLines.forEach((line) => {
      // First non-empty line that isn't contact info is likely the name
      if (!nameFound && !line.match(emailRegex) && !line.match(phoneRegex) && !line.match(urlRegex) && line.length > 2 && !/experience|education|skills/i.test(line)) {
        data.personal.fullName = line;
        nameFound = true;
        return;
      }

      const emailMatch = line.match(emailRegex);
      if (emailMatch && !data.personal.email) data.personal.email = emailMatch[0];

      const phoneMatch = line.match(phoneRegex);
      if (phoneMatch && !data.personal.phone) data.personal.phone = phoneMatch[0];

      const urlMatch = line.match(urlRegex);
      if (urlMatch && !data.personal.website) data.personal.website = urlMatch[0];

      // Address heuristic: common patterns for city/state
      if (!line.match(emailRegex) && !line.match(phoneRegex) && !line.match(urlRegex)) {
        if (line.match(/[A-Z][a-z]+, [A-Z]{2}/) || line.match(/[A-Z][a-z]+ [A-Z]{2} \d{5}/)) {
           data.personal.address = line;
        }
      }
    });

    // 2. Section Parsing
    let currentSection = "";
    
    lines.forEach((line, index) => {
      const lowerLine = line.toLowerCase();
      
      if (/experience|work history|employment|career/i.test(lowerLine)) {
        currentSection = "experience";
        return;
      }
      if (/education|academic|studies/i.test(lowerLine)) {
        currentSection = "education";
        return;
      }
      if (/skills|expertise|technologies|proficiencies/i.test(lowerLine)) {
        currentSection = "skills";
        return;
      }

      if (currentSection === "experience") {
        // Experience heuristics:
        // Pattern: Title | Company | Location
        if (line.includes("|")) {
          const parts = line.split("|").map(p => p.trim());
          data.experience.push({
            id: `exp-${Date.now()}-${index}`,
            position: parts[0] || "Job Title",
            company: parts[1] || "Company Name",
            location: parts[2] || "Location",
            startDate: "",
            endDate: "",
            description: ""
          });
        } else if (/\d{4}/.test(line) && (line.includes("-") || line.toLowerCase().includes("present"))) {
          // Date line
          const lastExp = data.experience[data.experience.length - 1];
          if (lastExp && !lastExp.startDate) {
            const dates = line.split(/[–-]/).map(d => d.trim());
            lastExp.startDate = dates[0] || "";
            lastExp.endDate = dates[1] || "";
          } else {
            // If we have a date line but no entry yet, or it's a new entry
            data.experience.push({
              id: `exp-${Date.now()}-${index}`,
              position: "Job Title",
              company: "Company Name",
              location: "Location",
              startDate: line.split(/[–-]/)[0]?.trim() || "",
              endDate: line.split(/[–-]/)[1]?.trim() || "",
              description: ""
            });
          }
        } else if (line.startsWith("-") || line.startsWith("•") || line.startsWith("*")) {
          const lastExp = data.experience[data.experience.length - 1];
          if (lastExp) {
            lastExp.description += (lastExp.description ? "\n" : "") + line;
          }
        } else if (line.length > 5 && data.experience.length > 0) {
          // If it's a long line and we have an entry, it might be a description or a title
          const lastExp = data.experience[data.experience.length - 1];
          if (lastExp.description || line.length > 40) {
            lastExp.description += (lastExp.description ? "\n" : "") + line;
          } else if (lastExp.position === "Job Title") {
             lastExp.position = line;
          }
        }
      }

      if (currentSection === "education") {
        if (line.includes("|")) {
          const parts = line.split("|").map(p => p.trim());
          data.education.push({
            id: `edu-${Date.now()}-${index}`,
            degree: parts[0] || "Degree Title",
            school: parts[1] || "Institution",
            location: parts[2] || "Location",
            startDate: "",
            endDate: "",
            description: ""
          });
        } else if (/\d{4}/.test(line)) {
          const lastEdu = data.education[data.education.length - 1];
          if (lastEdu && !lastEdu.startDate) {
            const dates = line.split(/[–-]/).map(d => d.trim());
            lastEdu.startDate = dates[0] || "";
            lastEdu.endDate = dates[1] || "";
          } else {
             data.education.push({
              id: `edu-${Date.now()}-${index}`,
              degree: "Degree Title",
              school: "Institution",
              location: "Location",
              startDate: line.split(/[–-]/)[0]?.trim() || "",
              endDate: line.split(/[–-]/)[1]?.trim() || "",
              description: ""
            });
          }
        } else if (line.length > 5 && data.education.length > 0) {
           const lastEdu = data.education[data.education.length - 1];
           if (lastEdu.degree === "Degree Title") {
             lastEdu.degree = line;
           } else {
             lastEdu.description += (lastEdu.description ? "\n" : "") + line;
           }
        }
      }

      if (currentSection === "skills") {
        const skillsList = line.split(/[,|•]/).map(s => s.trim()).filter(s => s.length > 1);
        skillsList.forEach(s => {
          data.skills.push({ id: `skill-${Date.now()}-${index}-${s}`, name: s, level: "Intermediate" });
        });
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
