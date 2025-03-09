import { useState } from 'react';
import { routes, getAllRoutes } from '@/routes';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const RouteMap = () => {
  const [filter, setFilter] = useState('');
  const [showAll, setShowAll] = useState(false);
  
  const allRoutes = getAllRoutes();
  const filteredRoutes = allRoutes.filter(route => 
    route.toLowerCase().includes(filter.toLowerCase())
  );
  
  const displayRoutes = showAll ? filteredRoutes : filteredRoutes.slice(0, 20);
  
  return (
    <div className="p-4 border rounded-lg bg-card">
      <h2 className="text-xl font-bold mb-4">Available Routes ({filteredRoutes.length})</h2>
      
      <div className="mb-4">
        <Input
          placeholder="Filter routes..."
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[500px] overflow-y-auto">
        {displayRoutes.map(route => (
          <Card key={route} className="p-2 text-sm">
            <a href={route} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {route}
            </a>
          </Card>
        ))}
      </div>
      
      {!showAll && filteredRoutes.length > 20 && (
        <p className="mt-2 text-sm text-muted-foreground">
          Showing 20 of {filteredRoutes.length} routes. 
          <Button 
            variant="link" 
            size="sm" 
            onClick={() => setShowAll(true)}
            className="p-0 h-auto"
          >
            Show all
          </Button>
        </p>
      )}
    </div>
  );
}; 