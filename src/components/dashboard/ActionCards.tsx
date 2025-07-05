
import { Card, CardContent } from '@/components/ui/card';
import { Zap, FileText } from 'lucide-react';

const ActionCards = () => {
  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="px-8 py-6 bg-gray-50">
        <h1 className="text-2xl font-semibold text-gray-900">Doc Studio</h1>
      </div>
      
      {/* Cards Container */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="grid grid-cols-2 gap-8 max-w-2xl w-full">
          {/* Design Session Card */}
          <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer bg-white">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <Zap className="h-10 w-10 text-blue-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Design Session</h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                    Capture your design intent in flow while you are designing in CAD. Click to open SOLIDWORKS.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Create a Tandem Doc Card */}
          <Card className="border border-gray-200 hover:shadow-md transition-shadow cursor-pointer bg-white">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <FileText className="h-10 w-10 text-green-600" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Create a Tandem Doc</h3>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                    Select files to create Diffs, Contextual Design Docs.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ActionCards;
