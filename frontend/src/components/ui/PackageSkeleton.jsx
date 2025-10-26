import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

const PackageSkeleton = () => {
  return (
    <Card className="overflow-hidden border border-gray-200">
      <div className="flex">
        {/* Image Section */}
        <div className="relative w-64 flex-shrink-0">
          <Skeleton className="h-48 w-full" />
          <div className="absolute top-2 left-2">
            <Skeleton className="h-5 w-16 rounded" />
          </div>
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="mb-3">
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
          
          {/* Bottom Section - Pricing */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
            <div className="flex-1">
              <Skeleton className="h-7 w-32" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
    </Card>
  );
};

const PackageGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <PackageSkeleton key={index} />
      ))}
    </div>
  );
};

export { PackageSkeleton, PackageGridSkeleton };
