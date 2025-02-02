export interface Mailer {
  id: string;
  name: string;
}

export interface MailingList {
  id: string;
  name: string;
}

export interface Mailing {
  id: string;
  mailerId: string;
  listId: string;
  scheduledAt: string;
  status: 'draft' | 'scheduled' | 'sent';
  createdAt: string;
  updatedAt: string;
}

export interface CreateMailingDTO {
  mailerId: string;
  listId: string;
  scheduledAt: string;
}