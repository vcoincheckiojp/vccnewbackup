import React from 'react';
import { Package, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Progress } from '../../ui/progress';
import { Badge } from '../../ui/badge';

const products = [
  {
    name: 'Premium Plan',
    sales: 1247,
    revenue: '$32,450',
    growth: '+15.3%',
    progress: 85,
    category: 'Subscription'
  },
  {
    name: 'Basic Plan',
    sales: 892,
    revenue: '$18,940',
    growth: '+8.7%',
    progress: 65,
    category: 'Subscription'
  },
  {
    name: 'Enterprise Plan',
    sales: 456,
    revenue: '$45,600',
    growth: '+23.1%',
    progress: 45,
    category: 'Enterprise'
  },
  {
    name: 'Add-ons Pack',
    sales: 234,
    revenue: '$8,760',
    growth: '+5.2%',
    progress: 25,
    category: 'Add-on'
  }
];

export function TopProducts1() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-purple-600" />
          Top Products
        </CardTitle>
        <CardDescription>
          Best performing products this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{product.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{product.revenue}</p>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="mr-1 h-3 w-3" />
                    {product.growth}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{product.sales} sales</span>
                <span>{product.progress}% of target</span>
              </div>
              
              <Progress value={product.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}