import React from 'react';
import { AllSell1 } from './widgets/AllSell1';
import { AllSell2 } from './widgets/AllSell2';
import { TopProducts1 } from './widgets/TopProducts1';
import { TopProducts2 } from './widgets/TopProducts2';
import { WeeklySales1 } from './widgets/WeeklySales1';
import { WeeklySales2 } from './widgets/WeeklySales2';
import { PositiveNegativeStats } from './widgets/PositiveNegativeStats';
import { QuickStats } from './widgets/QuickStats';
import { RecentActivity } from './widgets/RecentActivity';
import { AsideLeft } from './widgets/AsideLeft';

export function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Quick Stats Row */}
      <QuickStats />

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sales Widgets Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AllSell1 />
            <AllSell2 />
          </div>

          {/* Products Widgets Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TopProducts1 />
            <TopProducts2 />
          </div>

          {/* Weekly Sales Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WeeklySales1 />
            <WeeklySales2 />
          </div>

          {/* Positive/Negative Stats */}
          <PositiveNegativeStats />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <AsideLeft />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}