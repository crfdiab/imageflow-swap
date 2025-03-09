import { useState } from 'react';
import { getAllFormatPermutations } from '@/utils/formatUtils';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const SlugViewer = () => {
  const [filter, setFilter] = useState('');
  const [showAll, setShowAll] = useState(false);
  
  const allSlugs = getAllFormatPermutations();
  const filteredSlugs = allSlugs.filter(slug => 
    slug.toLowerCase().includes(filter.toLowerCase())
  );
  
  const displaySlugs = showAll ? filteredSlugs : filteredSlugs.slice(0, 20);
  
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }
  
  return (
    <div className="p-4 border rounded-lg bg-card my-8">
      <h2 className="text-xl font-bold mb-4">Available Conversion Slugs ({filteredSlugs.length})</h2>
      
      <div className="mb-4">
        <Input
          placeholder="Filter slugs..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mb-2"
        />
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Show Less' : 'Show All'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setFilter('')}
          >
            Clear Filter
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 max-h-[400px] overflow-y-auto">
        {displaySlugs.map(slug => (
          <Card key={slug} className="p-2 text-sm">
            <a href={`/${slug}`} className="hover:underline">
              /{slug}
            </a>
          </Card>
        ))}
      </div>
      
      {!showAll && filteredSlugs.length > 20 && (
        <p className="mt-2 text-sm text-muted-foreground">
          Showing 20 of {filteredSlugs.length} slugs. 
          <Button 
            variant="link" 
            size="sm" 
            onClick={() => setShowAll(true)}
            className="p-0 h-auto ml-1"
          >
            Show all
          </Button>
        </p>
      )}
    </div>
  );
}; 