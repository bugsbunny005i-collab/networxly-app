import React, { useEffect, useState } from 'react';
import { Maintenance } from './Maintenance';

export function QCGuard({ children }: { children: React.ReactNode }) {
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const access = localStorage.getItem('veritas_qc_access');
    if (access === 'granted') {
      setHasAccess(true);
    }
    setChecking(false);
  }, []);

  if (checking) return null; // Loading state

  // जर Access नसेल तर Maintenance Page दाखवा
  if (!hasAccess) {
    return <Maintenance />;
  }

  // जर Access असेल तर Website दाखवा
  return <>{children}</>;
}