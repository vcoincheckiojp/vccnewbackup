import React from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Eye, Calendar } from 'lucide-react';
import { ImageWithFallback } from '../ui/ImageWithFallback';

const heroProjectsData = [
  { id: 1, name: 'CardanoSwap', ecosystem: 'Cardano', category: 'DeFi', quality: 85, views: 1247, lastContributed: '2 hours ago' },
  { id: 2, name: 'AdaPool', ecosystem: 'Cardano', category: 'Staking', quality: 92, views: 2156, lastContributed: '5 hours ago' },
  { id: 3, name: 'CatalystVote', ecosystem: 'Cardano', category: 'Governance', quality: 88, views: 986, lastContributed: '1 day ago' },
  { id: 4, name: 'NFTMarket', ecosystem: 'Cardano', category: 'NFT', quality: 79, views: 1583, lastContributed: '3 days ago' },
  { id: 5, name: 'DefiProtocol', ecosystem: 'Cardano', category: 'DeFi', quality: 94, views: 3247, lastContributed: '12 hours ago' },
];

export function Home() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-metallic-gray via-primary to-metallic-silver p-8 md:p-16">
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              This is a project evaluation website based on reviews from the community and managed by the community
            </h1>
            <Button 
              size="lg" 
              className="bg-background text-primary hover:bg-background/90 rounded-full px-8 py-3 text-lg font-semibold shadow-lg border border-border"
            >
              Submit project
            </Button>
          </div>
          
          <div className="flex-1 flex justify-center">
            <div className="relative w-80 h-80">
              {/* 3D Blockchain Cube Illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-3 gap-2 transform rotate-12 scale-110">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 bg-gradient-to-br from-metallic-silver to-card rounded-lg animate-pulse border border-white/20 shadow-lg"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
                <div className="absolute inset-0 grid grid-cols-3 gap-2 transform -rotate-6 scale-90 opacity-60">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 bg-gradient-to-br from-primary to-primary/60 rounded-lg animate-pulse border border-white/10 shadow-md"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Carousel Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          <div className="w-3 h-3 rounded-full bg-white"></div>
          <div className="w-3 h-3 rounded-full bg-white/50"></div>
          <div className="w-3 h-3 rounded-full bg-white/50"></div>
        </div>
      </section>

      {/* Secondary Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-metallic-gray to-metallic-silver p-8 md:p-16">
        <div className="relative z-10 text-center space-y-8">
          <h2 className="text-2xl md:text-4xl font-bold text-white">
            YOUR CONTRIBUTION IS YOUR BENEFIT
          </h2>
          
          <div className="flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30">
              <div className="text-white text-2xl font-bold">Vcoincheck</div>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xs font-bold text-white">V</span>
            </div>
            <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xs font-bold text-white">V</span>
            </div>
            <div className="w-8 h-8 bg-accent-red rounded-full flex items-center justify-center shadow-lg">
              <span className="text-xs font-bold text-white">V</span>
            </div>
          </div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-4 left-8 w-16 h-16 bg-white/10 rounded-full"></div>
        <div className="absolute top-16 right-12 w-8 h-8 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-8 left-16 w-12 h-12 bg-white/15 rounded-full"></div>
        <div className="absolute bottom-4 right-8 w-6 h-6 bg-white/25 rounded-full"></div>
      </section>

      {/* Hot Projects Table */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-foreground">hotproject</h3>
        </div>
        
        <Card className="bg-card border border-border rounded-2xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-border">
                <TableHead className="text-muted-foreground font-semibold">no</TableHead>
                <TableHead className="text-muted-foreground font-semibold">projectname</TableHead>
                <TableHead className="text-muted-foreground font-semibold">ecosystem</TableHead>
                <TableHead className="text-muted-foreground font-semibold">categories</TableHead>
                <TableHead className="text-muted-foreground font-semibold">projectquality</TableHead>
                <TableHead className="text-muted-foreground font-semibold">noofviewed</TableHead>
                <TableHead className="text-muted-foreground font-semibold">lastcontributed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {heroProjectsData.map((project, index) => (
                <TableRow key={project.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>
                    <div className="font-semibold text-primary hover:text-primary/80 cursor-pointer">
                      {project.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                      {project.ecosystem}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
                      {project.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-muted rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-primary to-metallic-silver h-2 rounded-full transition-all"
                          style={{ width: `${project.quality}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{project.quality}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{project.views.toLocaleString()}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{project.lastContributed}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </section>
    </div>
  );
}