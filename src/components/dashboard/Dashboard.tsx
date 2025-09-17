import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardHome } from './DashboardHome';
import { SalesAnalytics } from './SalesAnalytics';
import { ProductsPage } from './ProductsPage';
import { ChartsPage } from './ChartsPage';
import { BarChartsPage } from './charts/BarChartsPage';
import { LineChartsPage } from './charts/LineChartsPage';
import { PieChartsPage } from './charts/PieChartsPage';
import { RealtimeChartsPage } from './charts/RealtimeChartsPage';
import { AnalyticsPage } from './AnalyticsPage';
import { RealtimePage } from './RealtimePage';
import { CommunityPage } from './CommunityPage';
import { SettingsPage } from './SettingsPage';

export function Dashboard() {
  return (
    <Routes>
      <Route index element={<DashboardHome />} />
      <Route path="sales" element={<SalesAnalytics />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="charts" element={<ChartsPage />} />
      <Route path="charts/bar" element={<BarChartsPage />} />
      <Route path="charts/line" element={<LineChartsPage />} />
      <Route path="charts/pie" element={<PieChartsPage />} />
      <Route path="charts/realtime" element={<RealtimeChartsPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="realtime" element={<RealtimePage />} />
      <Route path="community" element={<CommunityPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Routes>
  );
}