
import { Card, CardContent } from '@/components/ui/card';

const ActionCards = () => {
  return (
    <div className="grid grid-cols-2 gap-6 max-w-4xl">
      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-0">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Design Session
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Capture your design intent in flow while you are designing in CAD. Click to open SOLIDWORKS.
          </p>
        </CardContent>
      </Card>

      <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
        <CardContent className="p-0">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg mb-4">
            <div className="w-6 h-6 bg-green-600 rounded"></div>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Create a Tandem Doc
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Select files to create Diffs, Contextual Design Docs.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionCards;
