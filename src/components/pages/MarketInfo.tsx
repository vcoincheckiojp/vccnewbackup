import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

const marketData = [
  { name: 'Cardano (ADA)', price: '$0.45', change: '+5.2%', trend: 'up', volume: '$1.2B' },
  { name: 'Bitcoin (BTC)', price: '$67,250', change: '+2.1%', trend: 'up', volume: '$23.5B' },
  { name: 'Ethereum (ETH)', price: '$3,850', change: '-1.8%', trend: 'down', volume: '$18.2B' },
  { name: 'Solana (SOL)', price: '$185', change: '+8.4%', trend: 'up', volume: '$4.6B' },
];

const newsData = [
  { title: 'Cardano Ecosystem Growth Reaches New Milestone', time: '2 hours ago', category: 'Development' },
  { title: 'New DeFi Protocol Launches on Cardano', time: '4 hours ago', category: 'DeFi' },
  { title: 'Catalyst Fund 12 Results Announced', time: '6 hours ago', category: 'Governance' },
  { title: 'NFT Marketplace Sees Record Volume', time: '8 hours ago', category: 'NFT' },
];

export function MarketInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Market Information</h1>
        <p className="text-muted-foreground mt-2">Live cryptocurrency prices and blockchain news</p>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {marketData.map((coin, index) => (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{coin.name}</h3>
                  {coin.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </div>
                <div className="text-2xl font-bold">{coin.price}</div>
                <div className="flex items-center justify-between">
                  <Badge 
                    variant={coin.trend === 'up' ? 'default' : 'destructive'}
                    className={coin.trend === 'up' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ''}
                  >
                    {coin.change}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{coin.volume}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Chart Placeholder */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Market Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-gradient-to-r from-[#6C5CE7]/20 to-[#00CEC9]/20 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Interactive market chart will be displayed here</p>
          </div>
        </CardContent>
      </Card>

      {/* Latest News */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Latest News</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {newsData.map((news, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="space-y-1">
                  <h4 className="font-medium">{news.title}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{news.time}</span>
                    <Badge variant="outline" className="text-xs">
                      {news.category}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}