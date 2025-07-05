
import { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface PartCardSkeletonProps {
  count?: number;
}

const PartCardSkeleton: FC<PartCardSkeletonProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="h-1 w-full bg-muted" />
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-3/4" />
              </div>
              <Skeleton className="h-5 w-16" />
            </div>
          </CardHeader>
          <CardFooter className="pt-2 border-t mt-4">
            <div className="flex justify-between w-full">
              <Skeleton className="h-4 w-16" />
              <div className="flex gap-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default PartCardSkeleton;
