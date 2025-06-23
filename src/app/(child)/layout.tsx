import React from 'react';
import RoleBasedLayout from '@/components/layout/RoleBasedLayout';

export default function ChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RoleBasedLayout role="child">{children}</RoleBasedLayout>;
}