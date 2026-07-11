'use client';

import { useEffect } from 'react';
import { useProgress } from '@/components/progress/progress-provider';

export function TrackReading(props: {
  url: string;
  title: string;
  description?: string;
  topic?: string | null;
}) {
  const { trackPage } = useProgress();

  useEffect(() => {
    trackPage(props);
    // Track once per mount / url change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.url, props.title]);

  return null;
}
