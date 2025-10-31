import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { format } from 'date-fns';

interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
  referral_source: string | null;
}

const WaitlistAdmin = () => {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWaitlistEntries();
  }, []);

  const fetchWaitlistEntries = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('waitlist')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching waitlist entries:', error);
      toast.error('Failed to load waitlist entries');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Waitlist Dashboard</CardTitle>
            <CardDescription>
              Manage and view all waitlist signups
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                <div className="mb-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-2xl font-bold text-primary">
                    Total Signups: {entries.length}
                  </p>
                </div>

                {entries.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <p>No waitlist entries yet.</p>
                  </div>
                ) : (
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Signup Date</TableHead>
                          <TableHead>Referral Source</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {entries.map((entry) => (
                          <TableRow key={entry.id}>
                            <TableCell className="font-medium">{entry.email}</TableCell>
                            <TableCell>
                              {format(new Date(entry.created_at), 'MMM d, yyyy h:mm a')}
                            </TableCell>
                            <TableCell className="text-muted-foreground">
                              {entry.referral_source || '-'}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WaitlistAdmin;
