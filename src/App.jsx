import React, { useState, useEffect } from "react";
import { defaultCV } from "./constants/defaultCV";
import PersonalInfoForm from "./components/forms/PersonalInfoForm";
import ExperienceForm from "./components/forms/ExperienceForm";
import EducationForm from "./components/forms/EducationForm";
import SkillsForm from "./components/forms/SkillsForm";
import SettingsForm from "./components/forms/SettingsForm";
import ImportCV from "./components/forms/ImportCV";
import ModernTemplate from "./components/templates/ModernTemplate";
import MinimalistTemplate from "./components/templates/MinimalistTemplate";
import ExecutiveTemplate from "./components/templates/ExecutiveTemplate";
import { Download, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./App.css";

function App() {
  const [cvData, setCvData] = useState(() => {
    const saved = localStorage.getItem("cv-data");
    return saved ? JSON.parse(saved) : defaultCV;
  });
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    localStorage.setItem("cv-data", JSON.stringify(cvData));
  }, [cvData]);

  const handlePersonalUpdate = (field, value) => {
    setCvData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const handleImport = (parsedData) => {
    if (window.confirm("Do you want to import this data? This will update your personal info and replace your current experience, education, and skills sections.")) {
      setCvData((prev) => ({
        ...prev,
        personal: { ...prev.personal, ...parsedData.personal },
        experience: parsedData.experience.length > 0 ? parsedData.experience : prev.experience,
        education: parsedData.education.length > 0 ? parsedData.education : prev.education,
        skills: parsedData.skills.length > 0 ? parsedData.skills : prev.skills
      }));
    }
  };

  const handleListUpdate = (type, id, field, value) => {
    setCvData((prev) => ({
      ...prev,
      [type]: prev[type].map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addListItem = (type, newItem) => {
    setCvData((prev) => ({
      ...prev,
      [type]: [...prev[type], { ...newItem, id: `${type}-${Date.now()}` }],
    }));
  };

  const removeListItem = (type, id) => {
    setCvData((prev) => ({
      ...prev,
      [type]: prev[type].filter((item) => item.id !== id),
    }));
  };

  const handleSettingsUpdate = (field, value) => {
    setCvData((prev) => ({
      ...prev,
      settings: { ...prev.settings, [field]: value },
    }));
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to clear all data and reset to defaults? This action cannot be undone.")) {
      setCvData(defaultCV);
      localStorage.removeItem("cv-data");
    }
  };

  const exportPDF = async () => {
    const element = document.getElementById("cv-preview");
    if (!element) return;

    setIsExporting(true);

    try {
      const scale = 2; // Keep high resolution
      const canvas = await html2canvas(element, {
        scale: scale,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight
      });

      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Calculate how many pixels represent one A4 page in our canvas
      // canvas.width / scale is the original CSS width
      // ratio is pdfHeight / pdfWidth
      const canvasPageHeight = (canvas.width / pdfWidth) * pdfHeight;
      const totalCanvasHeight = canvas.height;
      
      let heightLeft = totalCanvasHeight;
      let position = 0;
      let pageNumber = 1;

      // Add the first page
      pdf.addImage(
        imgData, 
        "JPEG", 
        0, 
        0, 
        pdfWidth, 
        (totalCanvasHeight * pdfWidth) / canvas.width,
        undefined,
        'FAST'
      );
      heightLeft -= canvasPageHeight;

      // Add subsequent pages if necessary
      while (heightLeft > 0) {
        position = -(pageNumber * pdfHeight);
        pdf.addPage();
        pdf.addImage(
          imgData, 
          "JPEG", 
          0, 
          position, 
          pdfWidth, 
          (totalCanvasHeight * pdfWidth) / canvas.width,
          undefined,
          'FAST'
        );
        heightLeft -= canvasPageHeight;
        pageNumber++;
      }

      pdf.save(`${cvData.personal.fullName.replace(/\s+/g, "_")}_CV.pdf`);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const renderTemplate = () => {
    switch (cvData.settings.layout) {
      case "minimalist":
        return <MinimalistTemplate data={cvData} />;
      case "executive":
        return <ExecutiveTemplate data={cvData} />;
      case "modern":
      default:
        return <ModernTemplate data={cvData} />;
    }
  };

  return (
    <div className="app-container">
      {/* Control Panel (Dark Theme) */}
      <aside className="control-panel">
        <header className="panel-header">
          <h1>CV Architect</h1>
          <p>Professional CV Builder</p>
        </header>
        
        <div className="form-sections">
          <ImportCV onImport={handleImport} />
          <SettingsForm 
            settings={cvData.settings} 
            onUpdate={handleSettingsUpdate} 
          />
          <PersonalInfoForm 
            personal={cvData.personal} 
            onUpdate={handlePersonalUpdate} 
          />
          <ExperienceForm 
            experience={cvData.experience} 
            onUpdate={handleListUpdate}
            onAdd={addListItem}
            onRemove={removeListItem}
          />
          <EducationForm 
            education={cvData.education} 
            onUpdate={handleListUpdate}
            onAdd={addListItem}
            onRemove={removeListItem}
          />
          <SkillsForm 
            skills={cvData.skills} 
            onUpdate={handleListUpdate}
            onAdd={addListItem}
            onRemove={removeListItem}
          />
        </div>

        <div className="panel-actions">
          <button 
            className="btn-export" 
            onClick={exportPDF}
            disabled={isExporting}
          >
            {isExporting ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <Download size={18} />
            )}
            {isExporting ? "Exporting..." : "Export PDF"}
          </button>
          
          <button 
            className="btn-reset"
            onClick={handleReset}
          >
            Reset to Defaults
          </button>
        </div>
      </aside>

      {/* Preview Pane (Light Theme) */}
      <main className="preview-pane">
        <div className="preview-container" id="cv-preview">
          {renderTemplate()}
        </div>
      </main>
    </div>
  );
}

export default App;
