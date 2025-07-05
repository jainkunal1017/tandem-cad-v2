
import { v4 as uuidv4 } from 'uuid';
import projectsData from '@/mockData/projects.json';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  createdAt: string;
  status: 'active' | 'paused' | 'archived';
  owner: string;
  tags: string[];
  parts: any[];
  collaborators: any[];
}

// This is a mock implementation that would be replaced with real API calls in production
export const createProject = async (title: string, description: string): Promise<ProjectData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const newProject: ProjectData = {
    id: uuidv4(),
    title,
    description,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    status: 'active',
    owner: "Current User", // This would come from auth in a real app
    tags: [],
    parts: [],
    collaborators: [
      {
        id: "user-1",
        name: "You",
        avatar: "/lovable-uploads/fa942f5a-e8a2-4c51-81b4-9411ed94c43a.png"
      }
    ]
  };
  
  // In a real app, this would be an API call to create the project
  // For now, we'll update our mock data
  const projects = [...projectsData];
  projects.unshift(newProject);
  
  // Store updated projects in localStorage to persist between page refreshes
  localStorage.setItem('tandemProjects', JSON.stringify(projects));
  
  return newProject;
};

// This function retrieves projects with any local updates from localStorage
export const getProjects = () => {
  const localProjects = localStorage.getItem('tandemProjects');
  if (localProjects) {
    return JSON.parse(localProjects);
  }
  return projectsData;
};
