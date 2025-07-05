
import { FC, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X, Search, UserPlus } from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
}

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectTitle: string;
  collaborators: Collaborator[];
  onAddCollaborator?: (email: string) => void;
  onRemoveCollaborator?: (id: string) => void;
}

const ShareModal: FC<ShareModalProps> = ({ 
  open, 
  onOpenChange, 
  projectTitle, 
  collaborators, 
  onAddCollaborator,
  onRemoveCollaborator
}) => {
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddCollaborator = () => {
    if (email && onAddCollaborator) {
      onAddCollaborator(email);
      setEmail('');
    }
  };

  const filteredCollaborators = collaborators.filter(
    collaborator => collaborator.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Project</DialogTitle>
          <DialogDescription>
            Add team members to collaborate on "{projectTitle}"
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-2 mt-2">
          <div className="grid flex-1 gap-2">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" size="sm" onClick={handleAddCollaborator}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
        
        <div className="mt-4">
          <div className="relative mb-3">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search collaborators"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="max-h-60 overflow-y-auto space-y-2">
            {filteredCollaborators.length > 0 ? (
              filteredCollaborators.map((collaborator) => (
                <div 
                  key={collaborator.id} 
                  className="flex items-center justify-between p-2 rounded-md hover:bg-muted"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={collaborator.avatar} alt={collaborator.name} />
                      <AvatarFallback>{collaborator.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{collaborator.name}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onRemoveCollaborator?.(collaborator.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground text-sm py-4">No collaborators found</p>
            )}
          </div>
        </div>
        
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={() => onOpenChange(false)}>
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
