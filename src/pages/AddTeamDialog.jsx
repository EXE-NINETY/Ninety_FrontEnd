import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TableContainer,
    TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AddTeamDialog({ open, onClose, id, onTeamUpdated }) {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleInputChange = (setter) => (e) => setter(e.target.value);

    const accountDTO = JSON.parse(sessionStorage.getItem('accountDTO'));

    const handleAddUser = async () => {
        setLoading(true);
        console.log("summit success");
        try {
            const response = await axios.post("http://localhost:5090/api/team/tournaments", {
                userId: accountDTO.id,
                tournamentId: id,
                name,
                description,
            });

            if (response.status === 200) {
                if (onTeamUpdated) {
                    onTeamUpdated();
                }
                onClose();
            } else {
                toast.error("Unexpected response from server");
            }
        } catch (error) {
            console.error("Error registering user:", error);
            toast.error(error?.response?.data?.message || "Error registering user for the team");
        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Register User for Team</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Click on a user to select them for the team, then confirm by clicking "Add".
                </DialogContentText>
                <TableContainer sx={{ mt: 2 }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Team Name"
                        fullWidth
                        variant="outlined"
                        value={name}
                        onChange={handleInputChange(setName)}
                    />

                    <TextField
                        margin="dense"
                        label="Team Description"
                        fullWidth
                        variant="outlined"
                        value={description}
                        onChange={handleInputChange(setDescription)}
                    />
                </TableContainer>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button
                    onClick={handleAddUser}
                    color="primary"
                    variant="contained"
                >
                    {loading ? "Adding..." : "Add"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
