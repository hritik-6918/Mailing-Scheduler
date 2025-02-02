"use client";

import { useState } from 'react';
import { MailingList } from './mailing-list';
import { CreateMailingButton } from './create-mailing-button';

export default function MailingsPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleMailingCreated = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Email Campaigns</h1>
        <CreateMailingButton onMailingCreated={handleMailingCreated} />
      </div>
      
      <MailingList key={refreshTrigger} />
    </div>
  );
}