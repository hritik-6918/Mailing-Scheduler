"use client";

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Mailing, Mailer, MailingList } from '@/types';
import { fetchMailings, fetchMailers, fetchLists, deleteMailing } from '@/lib/api-mock';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export function MailingList() {
  const [isLoading, setIsLoading] = useState(true);
  const [mailings, setMailings] = useState<Mailing[]>([]);
  const [mailers, setMailers] = useState<Record<string, Mailer>>({});
  const [lists, setLists] = useState<Record<string, MailingList>>({});

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [mailingsData, mailersData, listsData] = await Promise.all([
        fetchMailings(),
        fetchMailers(),
        fetchLists(),
      ]);

      setMailings(mailingsData);
      setMailers(mailersData.reduce((acc, mailer) => ({ ...acc, [mailer.id]: mailer }), {}));
      setLists(listsData.reduce((acc, list) => ({ ...acc, [list.id]: list }), {}));
    } catch (error) {
      toast.error('Failed to load mailings');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteMailing(id);
      await loadData(); // Reload the data after deletion
      toast.success('Mailing deleted successfully');
    } catch (error) {
      toast.error('Failed to delete mailing');
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Template</TableHead>
              <TableHead>List</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                <div className="flex items-center justify-center text-muted-foreground">
                  Loading campaigns...
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Template</TableHead>
            <TableHead>List</TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mailings.map((mailing) => (
            <TableRow key={mailing.id}>
              <TableCell>{mailers[mailing.mailerId]?.name}</TableCell>
              <TableCell>{lists[mailing.listId]?.name}</TableCell>
              <TableCell>
                {format(new Date(mailing.scheduledAt), 'PPP p')}
              </TableCell>
              <TableCell>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                  ${mailing.status === 'sent' ? 'bg-green-100 text-green-800' : 
                    mailing.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'}`}>
                  {mailing.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(mailing.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {mailings.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <p>No campaigns scheduled</p>
                  <p className="text-sm">Create a new campaign to get started</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}