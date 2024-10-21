import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export default function CreateTournamentDialog({ open, onClose, onTournamentCreated }) {
    const accountDTO = JSON.parse(sessionStorage.getItem('accountDTO'));
    const [formData, setFormData] = React.useState({
        name: '',
        description: '',
        format: '',
        rules: '',
        numOfParticipants: 0,
        CreateMatch: 0,
        IsRegister: 1,
        startDate: null,
        endDate: null,
        fee: 0,
        place: '',
        sportId: '',
        userId: accountDTO.id,
    });
    const [loading, setLoading] = React.useState(false);
    const [sports, setSports] = React.useState([]);

    React.useEffect(() => {
        const fetchSports = async () => {
            try {
                const response = await axios.get('https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/sport');
                setSports(response.data.data);
            } catch (error) {
                console.error('Error fetching sports:', error);
            }
        };

        if (open) {
            fetchSports();
        }
    }, [open]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormatChange = (event) => {
        setFormData((prevData) => ({ ...prevData, format: event.target.value }));
    };

    const handleDateChange = (newValue, field) => {
        setFormData((prevData) => ({ ...prevData, [field]: newValue }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/tournament', formData);
            console.log('Tournament created:', response.data);

            if (onTournamentCreated) {
                onTournamentCreated();
            }
            onClose();
        } catch (error) {
            console.error('Error creating new tournament:', error);
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
            <DialogTitle>Create New Tournament</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    To create a new tournament, please fill out the details below.
                </DialogContentText>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="name"
                    label="Tournament Name"
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
                    id="rules"
                    name="rules"
                    label="Rules"
                    fullWidth
                    value={formData.rules}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="format-select-label">Choose Format</InputLabel>
                    <Select
                        labelId="format-select-label"
                        id="format-select"
                        value={formData.format}
                        label="Choose Format"
                        onChange={handleFormatChange}
                    >
                        <MenuItem value="" disabled><em>None</em></MenuItem>
                        <MenuItem value="knockout">Knock Out</MenuItem>
                        <MenuItem value="league">League</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    required
                    margin="dense"
                    id="numOfParticipants"
                    name="numOfParticipants"
                    label="Number of Participants"
                    type="number"
                    fullWidth
                    value={formData.numOfParticipants}
                    onChange={handleInputChange}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Box display="flex" justifyContent="space-between" gap={2}>
                        <DatePicker
                            label="Start Date"
                            value={formData.startDate}
                            onChange={(newValue) => handleDateChange(newValue, 'startDate')}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <DatePicker
                            label="End Date"
                            value={formData.endDate}
                            onChange={(newValue) => handleDateChange(newValue, 'endDate')}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Box>
                </LocalizationProvider>
                <TextField
                    required
                    margin="dense"
                    id="fee"
                    name="fee"
                    label="Entry Fee"
                    type="number"
                    fullWidth
                    value={formData.fee}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    margin="dense"
                    id="place"
                    name="place"
                    label="Place"
                    fullWidth
                    value={formData.place}
                    onChange={handleInputChange}
                />
                <FormControl fullWidth margin="dense">
                    <InputLabel id="sport-select-label">Choose Sport</InputLabel>
                    <Select
                        labelId="sport-select-label"
                        id="sport-select"
                        value={formData.sportId}
                        label="Choose Sport"
                        onChange={(e) => setFormData((prevData) => ({ ...prevData, sportId: e.target.value }))}
                    >
                        {sports.map((sport) => (
                            <MenuItem key={sport.id} value={sport.id}>
                                {sport.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
