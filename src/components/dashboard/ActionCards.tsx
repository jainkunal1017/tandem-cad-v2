import { Card, CardContent } from '@/components/ui/card';
import { FileText, PenTool } from 'lucide-react';
const ActionCards = () => {
  return <div className="flex-1 flex flex-col bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <h1 className="text-lg font-medium text-gray-900">Doc Studio</h1>
      </div>
      
      {/* Cards Container */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="grid grid-cols-2 gap-6 max-w-2xl w-full">
          {/* Design Session Card */}
          <Card className="border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer bg-white rounded-xl">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded">
                    <PenTool className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Design in Tandem</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Capture your design intent in flow while you are designing in CAD. Click to open SOLIDWORKS.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Create a Tandem Doc Card */}
          <Card className="border border-gray-200 hover:shadow-sm transition-shadow cursor-pointer bg-white rounded-xl">
            <CardContent className="p-6">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 rounded">
                    <FileText className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-gray-900">Tandem Assistant</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">Chat with Tandem about your designs and select files to create Diffs, Contextual Design Docs.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>;
};
export default ActionCards;