import React from 'react';
import { TopProducts1 } from './widgets/TopProducts1';
import { TopProducts2 } from './widgets/TopProducts2';

export function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProducts1 />
        <TopProducts2 />
      </div>
    </div>
  );
}