import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function ViewDetailDialog({ open, onClose, id }) {
    const [loading, setLoading] = useState(false);
    const [matchDetails, setMatchDetails] = useState(null);

    const fetchMatchDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/matchDetails/${id}`);
            setMatchDetails(response.data.data);
        } catch (error) {
            toast.error('Error fetching match details');
            console.error('Error fetching match details:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) {
            fetchMatchDetails();
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Match Score Details</DialogTitle>
            <DialogContent>
                {loading ? (
                    <CircularProgress />
                ) : matchDetails ? (
                    <div>
                        <p><strong>{matchDetails.teamAName} Points:</strong></p>
                        <ul>
                            <li>Set 1: {matchDetails.apointSet1}</li>
                            <li>Set 2: {matchDetails.apointSet2}</li>
                            <li>Set 3: {matchDetails.apointSet3}</li>
                        </ul>
                        <p><strong>{matchDetails.teamBName} Points:</strong></p>
                        <ul>
                            <li>Set 1: {matchDetails.bpointSet1}</li>
                            <li>Set 2: {matchDetails.bpointSet2}</li>
                            <li>Set 3: {matchDetails.bpointSet3}</li>
                        </ul>
                        <p><strong>Winning Team:</strong> {matchDetails.match.winningTeamName}</p>
                        <p><strong>Total Result:</strong> {matchDetails.match.totalResult}</p>
                        <p><strong>Match Date:</strong> {new Date(matchDetails.match.date).toLocaleDateString()}</p>
                    </div>
                ) : (
                    <DialogContentText>No match details available.</DialogContentText>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}