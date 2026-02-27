export const defaultCV = {
  personal: {
    fullName: "Your Name",
    title: "Your Professional Title",
    email: "your@email.com",
    phone: "+1 234 567 890",
    address: "City, Country",
    website: "www.yourwebsite.com",
    image: null,
    summary: "Brief professional summary about yourself. Highlight your key strengths and what you're looking for."
  },
  experience: [
    {
      id: "exp-1",
      company: "Company Name",
      position: "Job Title",
      location: "City, Country",
      startDate: "2020",
      endDate: "Present",
      current: true,
      description: "Describe your responsibilities and achievements in this role."
    }
  ],
  education: [
    {
      id: "edu-1",
      school: "University Name",
      degree: "Degree Title",
      location: "City, Country",
      startDate: "2016",
      endDate: "2020",
      description: "Describe your studies, honors, or relevant coursework."
    }
  ],
  skills: [
    { id: "skill-1", name: "Skill Name", level: "Expert" }
  ],
  languages: [
    { id: "lang-1", name: "Language Name", level: "Native" }
  ],
  settings: {
    layout: "modern", // "modern", "minimalist", "executive"
    primaryColor: "#3b82f6",
    secondaryColor: "#1e293b",
    textColor: "#111827",
    fontFamily: "Inter"
  }
};
