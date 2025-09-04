import React, { useState } from 'react';
import { QueryAnimation } from './QueryAnimation';
import { DashboardAnimation } from './DashboardAnimation';
import { TableScanAnimation } from './TableScanAnimation';

export const AnimationContainer: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      {/* Data Query Animation */}
      <QueryAnimation onComplete={() => {}} />

      {/* Table Scan Animation */}
      <TableScanAnimation onReset={() => {}} />

      {/* Dashboard Animation */}
      <DashboardAnimation onReset={() => {}} />
    </div>
  );
};