
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import ProjectDetailTabs from "../components/ProjectDetailTabs";
import AssetsTab from "../components/AssetsTab";
import ChatTab from "../components/ChatTab";
import DocumentationTab from "../components/DocumentationTab";

interface Project {
  id: string;
  title: string;
  description: string;
}

const PartsListPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("chat");
  
  useEffect(() => {
    // This would typically be an API call to fetch project details
    const mockProject = {
      id: projectId || "",
      title: "EV Battery Pack V2",
      description: "High-density lithium-ion battery system for EV applications"
    };
    
    setProject(mockProject);
  }, [projectId]);
  
  if (!project) {
    return <div className="p-8">Loading project...</div>;
  }
  
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-muted-foreground mt-1">{project.description}</p>
      </div>
      
      <ProjectDetailTabs activeTab={activeTab} onTabChange={setActiveTab}>
        <ChatTab projectId={project.id} />
        <AssetsTab projectId={project.id} />
        <DocumentationTab projectId={project.id} />
      </ProjectDetailTabs>
    </div>
  );
};

export default PartsListPage;
