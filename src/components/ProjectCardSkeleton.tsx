
import { FC } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ProjectCardSkeletonProps {
  count?: number;
}

const ProjectCardSkeleton: FC<ProjectCardSkeletonProps> = ({ count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card key={index} className="overflow-hidden">
          <div className="h-1 w-full bg-muted" />
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full" />
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex gap-1 mt-1">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <div className="flex justify-between w-full">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default ProjectCardSkeleton;
