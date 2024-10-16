import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress, TextField } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ViewDetailScoreDialog({ open, onClose, id }) {
    const [loading, setLoading] = useState(false);
    const [matchDetails, setMatchDetails] = useState(null);
    const [editScores, setEditScores] = useState({
        apointSet1: 0,
        bpointSet1: 0,
        apointSet2: 0,
        bpointSet2: 0,
        apointSet3: 0,
        bpointSet3: 0
    });
    const [isEditMode, setIsEditMode] = useState(false);

    const fetchMatchDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5090/api/matchDetails/${id}`);
            setMatchDetails(response.data.data);
            setEditScores({
                apointSet1: response.data.data.apointSet1,
                bpointSet1: response.data.data.bpointSet1,
                apointSet2: response.data.data.apointSet2,
                bpointSet2: response.data.data.bpointSet2,
                apointSet3: response.data.data.apointSet3,
                bpointSet3: response.data.data.bpointSet3
            });
        } catch (error) {
            toast.error('Error fetching match details');
            console.error('Error fetching match details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setEditScores({
            ...editScores,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:5090/api/matchDetails/id?id=${id}`, editScores);
            toast.success('Match details updated successfully');
            onClose();
        } catch (error) {
            toast.error('Error updating match details');
            console.error('Error updating match details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            fetchMatchDetails();
            setIsEditMode(false);
        }
    }, [open]);

    const handleEditClick = () => {
        setIsEditMode(true);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Match Score Details</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress />
                ) : matchDetails ? (
                    <div>
                        <p><strong>Team A Points:</strong></p>
                        <ul>
                            <li>
                                Set 1: <TextField
                                    name="apointSet1"
                                    value={editScores.apointSet1}
                                    onChange={handleChange}
                                    type="number"
                                    disabled={!isEditMode}
                                />
                            </li>
                            <li>
                                Set 2: <TextField
                                    name="apointSet2"
                                    value={editScores.apointSet2}
                                    onChange={handleChange}
                                    type="number"
                                    disabled={!isEditMode}
                                />
                            </li>
                            <li>
                                Set 3: <TextField
                                    name="apointSet3"
                                    value={editScores.apointSet3}
                                    onChange={handleChange}
                                    type="number"
                                    disabled={!isEditMode}
                                />
                            </li>
                        </ul>
                        <p><strong>Team B Points:</strong></p>
                        <ul>
                            <li>
                                Set 1: <TextField
                                    name="bpointSet1"
                                    value={editScores.bpointSet1}
                                    onChange={handleChange}
                                    type="number"
                                    disabled={!isEditMode}
                                />
                            </li>
                            <li>
                                Set 2: <TextField
                                    name="bpointSet2"
                                    value={editScores.bpointSet2}
                                    onChange={handleChange}
                                    type="number"
                                    disabled={!isEditMode}
                                />
                            </li>
                            <li>
                                Set 3: <TextField
                                    name="bpointSet3"
                                    value={editScores.bpointSet3}
                                    onChange={handleChange}
                                    type="number"
                                    disabled={!isEditMode}
                                />
                            </li>
                        </ul>
                        <p><strong>Winning Team:</strong> {matchDetails.match.winningTeam === 1 ? 'Team A' : 'Team B'}</p>
                        <p><strong>Total Result:</strong> {matchDetails.match.totalResult}</p>
                        <p><strong>Match Date:</strong> {new Date(matchDetails.match.date).toLocaleDateString()}</p>
                    </div>
                ) : (
                    <DialogContentText>No match details available.</DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
                {!isEditMode ? (
                    <Button onClick={handleEditClick} color="primary">Edit</Button>
                ) : (
                    <>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSubmit} color="primary" disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Save'}
                        </Button>
                    </>
                )}
            </DialogActions>
        </Dialog>
    );
}
