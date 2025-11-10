import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, BarChart3, LogOut } from 'lucide-react';
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
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error('Failed to logout');
    } else {
      toast.success('Logged out successfully');
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Waitlist Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage and view all waitlist signups</p>
          </div>
          <div className="flex gap-2">
            <Button asChild>
              <Link to="/admin/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
              </Link>
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Waitlist Entries</CardTitle>
            <CardDescription>
              All users who signed up for the waitlist
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
