import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function AddMemberDialog({ open, onClose, teamId, onTeamUpdated }) {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [userLoading, setUserLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        if (open) {
            const fetchUsers = async () => {
                setUserLoading(true);
                try {
                    const response = await axios.get('http://localhost:5090/api/user');
                    setUsers(response.data.data);
                } catch (err) {
                    setError('Error fetching users');
                } finally {
                    setUserLoading(false);
                }
            };
            fetchUsers();
        }
    }, [open]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleAddUser = async () => {
        if (!selectedUser) return;

        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:5090/api/team/teamDetails?teamId=${teamId}&userId=${selectedUser.id}`);
            console.log(teamId)
            toast.success(`User ${selectedUser.name} registered successfully for team ${teamId}`);
            if (onTeamUpdated) {
                onTeamUpdated();
            }
            setSelectedUser(null);
            onClose();
        } catch (error) {
            toast.error('Error registering user for the team');
            console.error('Error registering user:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle>Register User for Team</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Click on a user to select them for the team, then confirm by clicking "Add".
                </DialogContentText>

                <TableContainer component={Paper} sx={{ mt: 2 }}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userLoading ? (
                                <TableRow>
                                    <TableCell colSpan={3}>Loading users...</TableCell>
                                </TableRow>
                            ) : users.length > 0 ? (
                                users.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        hover
                                        role="checkbox"
                                        onClick={() => handleUserClick(user)}
                                        style={{
                                            cursor: 'pointer',
                                            backgroundColor: selectedUser?.id === user.id ? '#e0f7fa' : 'inherit'
                                        }}
                                    >
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.role}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={3}>No users available</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleAddUser}
                    disabled={!selectedUser || loading}
                    color="primary"
                    variant="contained"
                >
                    {loading ? 'Adding...' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
