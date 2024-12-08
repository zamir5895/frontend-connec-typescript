import React from 'react';

interface TabsProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  children: React.ReactNode;
  value: string;
  activeTab: string;
  onClick: () => void;
}

interface TabsContentProps {
  children: React.ReactNode;
  value: string;
  activeTab: string;
}

export const Tabs: React.FC<TabsProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return <div className={`flex ${className}`}>{children}</div>;
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  children,
  value,
  activeTab,
  onClick,
}) => {
  const isActive = activeTab === value;
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? 'border-b-2 border-blue-500 text-blue-600'
          : 'text-gray-500 hover:text-blue-600'
      }`}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({
  children,
  value,
  activeTab,
}) => {
  return activeTab === value ? <div className="p-4">{children}</div> : null;
};
