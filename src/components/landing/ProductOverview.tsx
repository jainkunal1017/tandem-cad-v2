import { Card, CardContent } from '@/components/ui/card';
import { FileType, Search, Share2 } from 'lucide-react';
const ProductOverview = () => {
  return <section id="features" className="py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-center">Meet Tandem</h2>
        <p className="text-xl text-muted-foreground mb-8 text-center max-w-2xl mx-auto">Tandem is a knowledge hub that captures and stores design intent from CAD sessions.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-background to-secondary/20 border-primary/10 shadow-sm">
            <CardContent className="pt-6">
              <div className="mb-4">
                <FileType className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Intent, in Plain English</h3>
              <p className="text-muted-foreground font-normal">Tandem turns raw actions &amp; context into Design-Intent File, stored alongside your CAD files.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-background to-secondary/20 border-primary/10 shadow-sm">
            <CardContent className="pt-6">
              <div className="mb-4">
                <Search className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search by Intent, not ID</h3>
              <p className="text-muted-foreground">With Tandem, there's no need to memorize file names or part numbers. Just describe what you're looking for and our semantic search finds the right files instantly.</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-background to-secondary/20 border-primary/10 shadow-sm">
            <CardContent className="pt-6">
              <div className="mb-4">
                <Share2 className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Review Ready</h3>
              <p className="text-muted-foreground">Share design decisions instantly with your team and suppliers, eliminating back-and-forth and accelerating reviews. </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>;
};
export default ProductOverview;