import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function CreateTeamDialog({ open, onClose, onTeamCreated }) {
    const [formData, setFormData] = React.useState({
        name: '',
        description: '',
        tournamentId: '',
        userId: 1,
    });
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const response = await axios.post('https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/team/tournaments', formData);
            console.log('Team created:', response.data);

            if (onTeamCreated) {
                onTeamCreated();
            }
            onClose();
            toast.success('Team created successfully!');
        } catch (error) {
            console.error('Error creating new team:', error);
            const errorMessage = error.response.data.message || 'An error occurred while creating the team.';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
            }}
        >
            <DialogTitle>Create New Team</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To create a new team, please fill out the details below.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Team Name"
                    fullWidth
                    value={formData.name}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                    value={formData.description}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    margin="dense"
                    id="tournamentId"
                    name="tournamentId"
                    label="Tournament ID"
                    type="number"
                    fullWidth
                    value={formData.tournamentId}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
