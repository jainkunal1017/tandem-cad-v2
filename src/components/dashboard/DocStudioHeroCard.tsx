
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, Settings } from 'lucide-react';

const DocStudioHeroCard = () => {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
      <CardContent className="p-8">
        <div className="flex items-start justify-between">
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Doc Studio
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
                Create comprehensive design documentation from your CAD files. Generate contextual design docs, 
                capture design intent, and maintain engineering knowledge.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Design Session
              </Button>
              <Button variant="outline" className="border-blue-200 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-950/30">
                <FileText className="w-4 h-4 mr-2" />
                Create Tandem Doc
              </Button>
              <Button variant="outline" className="border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
                <Settings className="w-4 h-4 mr-2" />
                Configure CAD Integration
              </Button>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-blue-600/10 dark:bg-blue-400/10 rounded-2xl flex items-center justify-center">
              <FileText className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DocStudioHeroCard;
