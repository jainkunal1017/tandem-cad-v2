
import { useState, useEffect, useMemo } from 'react';
import { Dialog } from '@/components/ui/dialog';
import TopBar from '@/components/TopBar';
import FilterBar from '@/components/FilterBar';
import ProjectCard from '@/components/ProjectCard';
import ProjectTable from '@/components/ProjectTable';
import ProjectCardSkeleton from '@/components/ProjectCardSkeleton';
import EmptyState from '@/components/EmptyState';
import ViewToggle from '@/components/ViewToggle';
import CreateProjectModal from '@/components/CreateProjectModal';
import { getProjects } from '@/lib/projectActions';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

interface Part {
  partNumber: string;
  title: string;
  updatedAt: string;
  difCount: number;
  status: string;
  lastEditedBy?: Collaborator;
}

interface Project {
  id: string;
  title: string;
  description: string;
  updatedAt: string;
  status: string;
  owner: string;
  tags?: string[]; 
  parts: Part[];
  collaborators: Collaborator[];
}

const ProjectDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(() => {
    return localStorage.getItem('tandemView') as 'grid' | 'list' || 'grid';
  });
  const [statusFilters, setStatusFilters] = useState({
    active: true,
    paused: true,
    archived: false,
  });
  const [sortConfig, setSortConfig] = useState<{
    key: 'updatedAt' | 'title' | 'difCount';
    direction: 'asc' | 'desc';
  }>({
    key: 'updatedAt',
    direction: 'desc',
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const loadProjects = () => {
    // Simulate API fetch with delay
    setTimeout(() => {
      const projectsData = getProjects();
      setProjects(projectsData);
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    localStorage.setItem('tandemView', viewMode);
  }, [viewMode]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleToggleStatus = (status: 'active' | 'paused' | 'archived') => {
    setStatusFilters(prev => ({
      ...prev,
      [status]: !prev[status]
    }));
  };

  const handleSortChange = (key: 'updatedAt' | 'title' | 'difCount') => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
    }));
  };

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    setViewMode(mode);
  };

  const handleNewProject = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
  };

  const filteredAndSortedProjects = useMemo(() => {
    // Apply filters
    let result = projects.filter(project => {
      // Status filter
      if (!statusFilters[project.status as keyof typeof statusFilters]) {
        return false;
      }

      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          (project.tags?.some((tag: string) => tag.toLowerCase().includes(searchLower)) || false)
        );
      }

      return true;
    });

    // Apply sorting
    result = [...result].sort((a, b) => {
      if (sortConfig.key === 'title') {
        return sortConfig.direction === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortConfig.key === 'difCount') {
        const aDifCount = a.parts.reduce((sum, part) => sum + part.difCount, 0);
        const bDifCount = b.parts.reduce((sum, part) => sum + part.difCount, 0);
        return sortConfig.direction === 'asc'
          ? aDifCount - bDifCount
          : bDifCount - aDifCount;
      } else {
        // Default: sort by updatedAt
        return sortConfig.direction === 'asc'
          ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
    });

    return result;
  }, [projects, searchTerm, statusFilters, sortConfig]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <TopBar 
        onSearch={handleSearch} 
        title="Projects"
        buttonText="New Project"
        showTitle={false}
        onButtonClick={handleNewProject}
        extraContent={
          <ViewToggle onChange={handleViewModeChange} defaultValue={viewMode} />
        }
      />
      
      <FilterBar
        statusFilters={statusFilters}
        sortConfig={sortConfig}
        onToggleStatus={handleToggleStatus}
        onSortChange={handleSortChange}
      />
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProjectCardSkeleton count={6} />
        </div>
      ) : filteredAndSortedProjects.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                updatedAt={project.updatedAt}
                status={project.status as 'active' | 'paused' | 'archived'}
                owner={project.owner}
                parts={project.parts}
                collaborators={project.collaborators || []}
              />
            ))}
          </div>
        ) : (
          <ProjectTable projects={filteredAndSortedProjects as any} />
        )
      ) : (
        <EmptyState 
          message={
            searchTerm
              ? "No projects match your search"
              : "No projects found with current filters"
          }
        />
      )}

      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        {isCreateModalOpen && <CreateProjectModal onClose={handleCloseModal} />}
      </Dialog>
    </div>
  );
};

export default ProjectDashboard;
