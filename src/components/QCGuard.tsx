import React, { useEffect, useState } from 'react';
import { Maintenance } from './Maintenance';

export function QCGuard({ children }: { children: React.ReactNode }) {
  const [hasAccess, setHasAccess] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // 1. URL मध्ये पासवर्ड आहे का ते चेक करा (ही आपली नवीन जादू!)
    const params = new URLSearchParams(window.location.search);
    if (params.get('unlock') === 'NetworxlyBoss') {
      localStorage.setItem('veritas_qc_access', 'granted');
      setHasAccess(true);
    }

    // 2. ब्राउझरमध्ये आधीच ॲक्सेस आहे का ते बघा
    const access = localStorage.getItem('veritas_qc_access');
    if (access === 'granted') {
      setHasAccess(true);
    }
    setChecking(false);
  }, []);

  if (checking) return null; 

  // जर ॲक्सेस नसेल तर Maintenance Page दाखवा
  if (!hasAccess) {
    return <Maintenance />;
  }

  // जर ॲक्सेस असेल तर Website दाखवा
  return <>{children}</>;
}