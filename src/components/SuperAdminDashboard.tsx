import React, { useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
} from '@mui/material';
import {
  CheckCircle,
  HourglassEmpty,
  Cancel,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Menu, MenuItem, IconButton, Chip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import toast from 'react-hot-toast';

interface ServiceProviderStats {
  active: number;
  pending: number;
  inactive: number;
}
const statusColors: Record<string, 'success' | 'warning' | 'error' | 'default'> = {
  active: 'success',
  pending: 'warning',
  inactive: 'error',
  rejected: 'default',
  hold: 'warning',
};

const actionToStatus: Record<string, string> = {
  Activate: 'active',
  Deactivate: 'inactive',
  Hold: 'hold',
  Reject: 'rejected',
};

const SuperAdminDashboard: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const [users, setUsers] = React.useState<any[]>([]);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [menuUserId, setMenuUserId] = React.useState<number | null>(null);

  const getActionsForStatus = (status: string) => {
    switch (status) {
      case 'active':
        return ['Deactivate', 'Hold'];
      case 'pending':
        return ['Activate', 'Reject'];
      case 'deactivated':
      case 'hold':
        return ['Activate'];
      case 'rejected':
      default:
        return [];
    }
  };


  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, userId: number) => {
    setAnchorEl(event.currentTarget);
    setMenuUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuUserId(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/all');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleActionClick = async (userId: number, action: string) => {
    const newStatus = actionToStatus[action];
    if (!newStatus) return;
    setLoading(true);
    try {
      console.log(`Updating user ${userId} status to ${newStatus}`);
      await axios.put(`http://localhost:3000/user/${userId}/status`, { status: newStatus });
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, status: newStatus } : user
        )
      );
      toast.success(`User status updated to ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
    } finally {
      setLoading(false);
      handleMenuClose();
    }
  };

  const serviceProviderStats: ServiceProviderStats = {
  active: users.filter((u) => u.status === 'active').length,
  pending: users.filter((u) => u.status === 'pending').length,
  inactive: users.filter((u) => u.status === 'deactivated' || u.status === 'inactive').length,
};

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        align="center"
        gutterBottom
        sx={{ mb: 4 }}
      >
        Super Admin Dashboard
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {/* Overview Box */}
        <Grid item xs={12} md={10}>
          <Card
            sx={{
              borderRadius: 4,
              boxShadow: 4,
              p: 2,
              mb: 4,
            }}
          >
            <CardContent>
              <Typography variant="h5" fontWeight={600} gutterBottom>
                Overview of Service Providers
              </Typography>
              <Grid container spacing={4} sx={{ mb: 2 }}>
                <Grid item xs={12} sm={4}>
                  <Card sx={{ p: 2, textAlign: 'center', boxShadow: 2 }}>
                    <CheckCircle color="success" sx={{ fontSize: 36 }} />
                    <Typography variant="h6">{serviceProviderStats.active}</Typography>
                    <Typography variant="body2" color="text.secondary">Active</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card sx={{ p: 2, textAlign: 'center', boxShadow: 2 }}>
                    <HourglassEmpty color="warning" sx={{ fontSize: 36 }} />
                    <Typography variant="h6">{serviceProviderStats.pending}</Typography>
                    <Typography variant="body2" color="text.secondary">Pending</Typography>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Card sx={{ p: 2, textAlign: 'center', boxShadow: 2 }}>
                    <Cancel color="error" sx={{ fontSize: 36 }} />
                    <Typography variant="h6">{serviceProviderStats.inactive}</Typography>
                    <Typography variant="body2" color="text.secondary">Deactivated</Typography>
                  </Card>
                </Grid>
              </Grid>

              {/* Users Table */}
              <Typography variant="h6" fontWeight={500} sx={{ mt: 3, mb: 1 }}>
                Service Providers List
              </Typography>
              <TableContainer component={Paper} sx={{ borderRadius: 2, width: '100%' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>Address</TableCell>
                      <TableCell>Contact Number</TableCell>
                      <TableCell>Created At</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.address}</TableCell>
                        <TableCell>{user.contactNumber}</TableCell>
                        <TableCell>{new Date(user.createdAt).toLocaleString()}</TableCell>
                        <TableCell>
                          <Chip
                            label={user.status ? user.status.charAt(0).toUpperCase() + user.status.slice(1) : 'Unknown'}
                            color={statusColors[user.status] || 'default'}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="center">
                          {getActionsForStatus(user.status).length > 0 ? (
                            <>
                              <IconButton
                                aria-label="more"
                                aria-controls={`action-menu-${user.id}`}
                                aria-haspopup="true"
                                onClick={(e) => handleMenuOpen(e, user.id)}
                                disabled={loading}
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                id={`action-menu-${user.id}`}
                                anchorEl={anchorEl}
                                open={menuUserId === user.id}
                                onClose={handleMenuClose}
                                anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'center',
                                }}
                                transformOrigin={{
                                  vertical: 'top',
                                  horizontal: 'center',
                                }}
                              >
                                {getActionsForStatus(user.status).map((action) => (
                                  <MenuItem
                                    key={action}
                                    onClick={() => handleActionClick(user.id, action)}
                                    disabled={loading}
                                  >
                                    {action}
                                  </MenuItem>
                                ))}
                              </Menu>
                            </>
                          ) : (
                            <Typography variant="body2" color="text.secondary">—</Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SuperAdminDashboard;