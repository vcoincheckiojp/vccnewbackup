import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../../ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Search, Plus, Calendar, List, Grid3X3, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';

const dictionaryTerms = [
  {
    id: 1,
    term: 'Blockchain',
    definition: 'A distributed ledger technology that maintains a continuously growing list of records, called blocks, which are linked and secured using cryptography.',
    category: 'Fundamental',
    letter: 'B',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  {
    id: 2,
    term: 'Cardano',
    definition: 'A third-generation blockchain platform that uses a proof-of-stake consensus mechanism and focuses on sustainability, scalability, and transparency.',
    category: 'Platform',
    letter: 'C',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-25'
  },
  {
    id: 3,
    term: 'ADA',
    definition: 'The native cryptocurrency of the Cardano blockchain, named after Ada Lovelace, a 19th-century mathematician.',
    category: 'Finance',
    letter: 'A',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-18'
  },
  {
    id: 4,
    term: 'Smart Contract',
    definition: 'Self-executing contracts with the terms of the agreement directly written into code, automatically enforcing the agreed-upon terms.',
    category: 'Technology',
    letter: 'S',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-22'
  },
  {
    id: 5,
    term: 'Staking',
    definition: 'The process of participating in a proof-of-stake blockchain network by locking up cryptocurrency to support network operations and earn rewards.',
    category: 'Finance',
    letter: 'S',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-16'
  },
  {
    id: 6,
    term: 'DeFi',
    definition: 'Decentralized Finance - a blockchain-based form of finance that does not rely on traditional financial intermediaries.',
    category: 'Finance',
    letter: 'D',
    createdAt: '2024-01-11',
    updatedAt: '2024-01-19'
  },
  {
    id: 7,
    term: 'NFT',
    definition: 'Non-Fungible Token - a unique digital certificate that proves ownership of a specific digital asset on a blockchain.',
    category: 'Technology',
    letter: 'N',
    createdAt: '2024-01-13',
    updatedAt: '2024-01-21'
  },
  {
    id: 8,
    term: 'Plutus',
    definition: 'Cardano\'s smart contract platform and programming language, based on Haskell and designed for high-assurance applications.',
    category: 'Technology',
    letter: 'P',
    createdAt: '2024-01-09',
    updatedAt: '2024-01-17'
  },
  {
    id: 9,
    term: 'Ouroboros',
    definition: 'Cardano\'s proof-of-stake consensus algorithm, designed to be energy-efficient and mathematically provable for security.',
    category: 'Technology',
    letter: 'O',
    createdAt: '2024-01-07',
    updatedAt: '2024-01-23'
  },
  {
    id: 10,
    term: 'Catalyst',
    definition: 'Cardano\'s innovation platform and voting system that allows the community to propose and vote on funding for ecosystem projects.',
    category: 'Governance',
    letter: 'C',
    createdAt: '2024-01-06',
    updatedAt: '2024-01-24'
  }
];

const categories = ['All', 'Fundamental', 'Platform', 'Technology', 'Finance', 'Governance'];
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function Dictionary() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLetter, setSelectedLetter] = useState('All');
  const [viewMode, setViewMode] = useState<'newest' | 'alphabet'>('newest');

  // Check if user has permission to create new terms
  const canCreateTerm = user && ['admin', 'library_moderator', 'super_moderator'].includes(user.role);

  // Get last updated date
  const lastUpdated = dictionaryTerms
    .map(term => new Date(term.updatedAt))
    .sort((a, b) => b.getTime() - a.getTime())[0]
    .toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });

  const filteredTerms = dictionaryTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
    const matchesLetter = selectedLetter === 'All' || term.letter === selectedLetter;
    
    return matchesSearch && matchesCategory && matchesLetter;
  });

  // Sort terms based on view mode
  const sortedTerms = viewMode === 'newest' 
    ? filteredTerms.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    : filteredTerms.sort((a, b) => a.term.localeCompare(b.term));

  // Group terms by letter for alphabet view
  const termsByLetter = alphabet.reduce((acc, letter) => {
    acc[letter] = sortedTerms.filter(term => term.letter === letter);
    return acc;
  }, {} as Record<string, typeof dictionaryTerms>);

  const CategoryBadge = ({ category }: { category: string }) => {
    const colors = {
      'Fundamental': 'bg-blue-500/10 text-blue-600 border-blue-200',
      'Platform': 'bg-purple-500/10 text-purple-600 border-purple-200',
      'Technology': 'bg-green-500/10 text-green-600 border-green-200',
      'Finance': 'bg-orange-500/10 text-orange-600 border-orange-200',
      'Governance': 'bg-cyan-500/10 text-cyan-600 border-cyan-200'
    };
    
    return (
      <Badge variant="outline" className={colors[category as keyof typeof colors] || 'bg-gray-500/10 text-gray-600 border-gray-200'}>
        {category}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/home">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Dictionary</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Title and Actions */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Blockchain Dictionary</h1>
            <p className="text-muted-foreground mt-2">Comprehensive glossary of blockchain and cryptocurrency terms</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>Last updated: {lastUpdated}</span>
            </div>
            {canCreateTerm && (
              <Link to="/library/dictionary/new">
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Term
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search terms and definitions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12"
        />
      </div>

      {/* Category Filter Tags */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-all duration-200 ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground shadow-md'
                : 'bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Layout Switch */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'newest' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('newest')}
            className="gap-2"
          >
            <List className="h-4 w-4" />
            Newest Terms
          </Button>
          <Button
            variant={viewMode === 'alphabet' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('alphabet')}
            className="gap-2"
          >
            <Grid3X3 className="h-4 w-4" />
            Alphabet View
          </Button>
        </div>
        <div className="text-sm text-muted-foreground">
          {filteredTerms.length} term{filteredTerms.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Dictionary Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedTerms.length > 0 ? (
          sortedTerms.map((term, index) => (
            <Card key={term.id} className="bg-gradient-to-br from-muted/30 to-muted/10 border-border hover:border-primary/30 transition-all duration-300 cursor-pointer group relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Card Number Badge */}
              <div className="absolute top-4 right-4 z-10">
                <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center text-sm font-semibold">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              <CardContent className="p-6 relative z-10">
                {/* Term Title */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
                    {term.term}
                  </h2>
                  {term.term.length > 15 && (
                    <p className="text-sm text-muted-foreground">
                      ({term.term})
                    </p>
                  )}
                </div>

                {/* Source and Date Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-xs text-primary-foreground font-semibold">V</span>
                    </div>
                    <span className="text-sm text-muted-foreground">Vcoincheck.io</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(term.updatedAt).toLocaleDateString('en-US', { 
                      month: '2-digit',
                      day: '2-digit', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="text-xs">
                    {term.term.substring(0, 3).toUpperCase()}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Vcoincheck.io
                  </Badge>
                  <CategoryBadge category={term.category} />
                  <Badge variant="outline" className="text-xs">
                    + 1
                  </Badge>
                </div>

                {/* Definition */}
                <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                  {term.definition}
                </p>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-green-500 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">0</span>
                    </button>
                    <button className="flex items-center gap-1 text-muted-foreground hover:text-red-500 transition-colors">
                      <ThumbsDown className="w-4 h-4" />
                      <span className="text-sm">0</span>
                    </button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No terms found matching your criteria.</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Alphabet Index - Only show when in alphabet view */}
      {viewMode === 'alphabet' && (
        <div className="flex flex-wrap gap-2 p-4 bg-muted/30 rounded-lg">
          <button
            onClick={() => setSelectedLetter('All')}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedLetter === 'All'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-background'
            }`}
          >
            All
          </button>
          {alphabet.map((letter) => {
            const hasTerms = termsByLetter[letter].length > 0;
            return (
              <button
                key={letter}
                onClick={() => setSelectedLetter(letter)}
                disabled={!hasTerms}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedLetter === letter
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : hasTerms
                    ? 'text-muted-foreground hover:text-foreground hover:bg-background'
                    : 'text-muted-foreground/50 cursor-not-allowed'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}