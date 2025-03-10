import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IMAGE_FORMATS, formatToSlug, ImageFormat } from '@/utils/formatUtils';
import { ArrowRight, Search, X } from 'lucide-react';

export function FormatGallery() {
  const [filter, setFilter] = useState('');
  const [activeTab, setActiveTab] = useState<ImageFormat | 'all'>('all');
  
  // Generate all format combinations
  const allCombinations = IMAGE_FORMATS.flatMap(source => 
    IMAGE_FORMATS.filter(target => source !== target).map(target => ({
      source,
      target,
      slug: formatToSlug(source, target)
    }))
  );
  
  // Filter combinations based on search and active tab
  const filteredCombinations = allCombinations.filter(combo => {
    const matchesFilter = filter === '' || 
      combo.source.toLowerCase().includes(filter.toLowerCase()) ||
      combo.target.toLowerCase().includes(filter.toLowerCase()) ||
      `${combo.source} to ${combo.target}`.toLowerCase().includes(filter.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
      combo.source === activeTab || 
      combo.target === activeTab;
    
    return matchesFilter && matchesTab;
  });
  
  // Function to scroll to top when link is clicked
  const handleLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-foreground opacity-70" />
          <Input
            placeholder="Search formats..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-9 pr-9"
          />
          {filter && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
              onClick={() => setFilter('')}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as ImageFormat | 'all')}>
        <TabsList className="flex flex-wrap h-auto mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          {IMAGE_FORMATS.map(format => (
            <TabsTrigger key={format} value={format}>
              {format.toUpperCase()}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {filteredCombinations.map(({ source, target, slug }) => (
              <Link key={slug} to={`/${slug}`} onClick={handleLinkClick}>
                <Card className="overflow-hidden transition-all hover:shadow-md hover:border-primary/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-center space-x-2">
                      <span className="font-medium text-sm uppercase text-foreground">{source}</span>
                      <ArrowRight className="h-4 w-4 text-foreground opacity-70" />
                      <span className="font-medium text-sm uppercase text-foreground">{target}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          
          {filteredCombinations.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No conversion formats match your search.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
} 