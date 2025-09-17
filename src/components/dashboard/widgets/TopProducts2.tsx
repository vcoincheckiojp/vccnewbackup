import React from 'react';
import { ShoppingBag, MoreHorizontal } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Premium Plan', value: 45, color: '#3b82f6' },
  { name: 'Basic Plan', value: 30, color: '#10b981' },
  { name: 'Enterprise Plan', value: 15, color: '#f59e0b' },
  { name: 'Add-ons', value: 10, color: '#ef4444' }
];

const productList = [
  { name: 'Premium Plan', value: 45, sales: '$32,450', color: '#3b82f6' },
  { name: 'Basic Plan', value: 30, sales: '$18,940', color: '#10b981' },
  { name: 'Enterprise Plan', value: 15, sales: '$45,600', color: '#f59e0b' },
  { name: 'Add-ons Pack', value: 10, sales: '$8,760', color: '#ef4444' }
];

export function TopProducts2() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5 text-orange-600" />
          Product Distribution
        </CardTitle>
        <CardDescription>
          Revenue breakdown by product category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2">
            {productList.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: product.color }}
                  />
                  <span className="text-sm">{product.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">{product.value}%</span>
                  <p className="text-xs text-muted-foreground">{product.sales}</p>
                </div>
              </div>
            ))}
          </div>
          
          <Button variant="outline" size="sm" className="w-full">
            <MoreHorizontal className="mr-2 h-4 w-4" />
            View All Products
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}