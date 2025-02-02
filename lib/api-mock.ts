import { Mailer, MailingList, Mailing, CreateMailingDTO } from '@/types';

// Simulated database tables
const mailers: Mailer[] = [
  { id: '1', name: 'Welcome Email' },
  { id: '2', name: 'Monthly Newsletter' },
  { id: '3', name: 'Product Update' },
  { id: '4', name: 'Feature Announcement' },
  { id: '5', name: 'Customer Feedback Request' },
];

const lists: MailingList[] = [
  { id: '1', name: 'All Subscribers' },
  { id: '2', name: 'Premium Users' },
  { id: '3', name: 'Trial Users' },
  { id: '4', name: 'Inactive Users' },
  { id: '5', name: 'Beta Testers' },
];

// Initial mailing data with different statuses
let mailings: Mailing[] = [
  {
    id: '1',
    mailerId: '1',
    listId: '1',
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    status: 'scheduled',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    mailerId: '2',
    listId: '2',
    scheduledAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    status: 'sent',
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Simulated network delay
const NETWORK_DELAY = 500;

// Helper function to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions with error handling and validation
export async function fetchMailers(): Promise<Mailer[]> {
  try {
    await delay(NETWORK_DELAY);
    return [...mailers];
  } catch (error) {
    throw new Error('Failed to fetch mailers');
  }
}

export async function fetchLists(): Promise<MailingList[]> {
  try {
    await delay(NETWORK_DELAY);
    return [...lists];
  } catch (error) {
    throw new Error('Failed to fetch mailing lists');
  }
}

export async function fetchMailings(): Promise<Mailing[]> {
  try {
    await delay(NETWORK_DELAY);
    // Sort mailings by scheduledAt date, most recent first
    return [...mailings].sort((a, b) => 
      new Date(b.scheduledAt).getTime() - new Date(a.scheduledAt).getTime()
    );
  } catch (error) {
    throw new Error('Failed to fetch mailings');
  }
}

export async function createMailing(data: CreateMailingDTO): Promise<Mailing> {
  try {
    await delay(NETWORK_DELAY);

    // Validate mailer exists
    if (!mailers.find(m => m.id === data.mailerId)) {
      throw new Error('Invalid mailer ID');
    }

    // Validate list exists
    if (!lists.find(l => l.id === data.listId)) {
      throw new Error('Invalid list ID');
    }

    // Validate schedule date is in the future
    if (new Date(data.scheduledAt) <= new Date()) {
      throw new Error('Schedule date must be in the future');
    }

    const newMailing: Mailing = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
      status: 'scheduled',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    mailings = [...mailings, newMailing];
    return newMailing;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to create mailing');
  }
}

export async function deleteMailing(id: string): Promise<void> {
  try {
    await delay(NETWORK_DELAY);

    // Check if mailing exists
    const mailing = mailings.find(m => m.id === id);
    if (!mailing) {
      throw new Error('Mailing not found');
    }

    // Check if mailing can be deleted (don't allow deleting sent mailings)
    if (mailing.status === 'sent') {
      throw new Error('Cannot delete sent mailings');
    }

    mailings = mailings.filter(mailing => mailing.id !== id);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to delete mailing');
  }
}

// Additional helper function to update mailing status (for demo purposes)
export async function updateMailingStatus(id: string, status: Mailing['status']): Promise<Mailing> {
  try {
    await delay(NETWORK_DELAY);

    const mailingIndex = mailings.findIndex(m => m.id === id);
    if (mailingIndex === -1) {
      throw new Error('Mailing not found');
    }

    const updatedMailing = {
      ...mailings[mailingIndex],
      status,
      updatedAt: new Date().toISOString(),
    };

    mailings = [
      ...mailings.slice(0, mailingIndex),
      updatedMailing,
      ...mailings.slice(mailingIndex + 1),
    ];

    return updatedMailing;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to update mailing status');
  }
}