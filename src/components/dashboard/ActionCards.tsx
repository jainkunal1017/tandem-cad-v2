
import { Card, CardContent } from '@/components/ui/card';
import { Zap, FileText } from 'lucide-react';

const ActionCards = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Doc Studio</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Design Session Card */}
        <Card className="p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-0">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Design Session</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Capture your design intent in flow while you are designing in CAD. Click to open SOLIDWORKS.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Create a Tandem Doc Card */}
        <Card className="p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-0">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Create a Tandem Doc</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Select files to create Diffs, Contextual Design Docs.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActionCards;
