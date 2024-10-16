import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CircularProgress from '@mui/material/CircularProgress';
import { Box, TextField, Button } from '@mui/material';
import CreateTeamDialog from './CreateTeamDialog';
import { useNavigate } from 'react-router-dom';

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'description', label: 'Description', minWidth: 200 },
    { id: 'tournamentName', label: 'Tournament Name', minWidth: 100, align: 'right' },
];

const Teams = () => {
    const [rows, setRows] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const navigate = useNavigate();

    const handleRowClick = (id, tournamentId) => {
        navigate(`/teams/${id}?tournamentId=${tournamentId}`);
    };
    const fetchTeams = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `http://localhost:5090/api/team/all?PageNumber=${page + 1}&PageSize=${rowsPerPage}&Name=${searchQuery}`
            );
            const { data, totalCount } = response.data;
            setRows(data || []);
            setTotalRows(totalCount || 0);
        } catch (error) {
            console.error('Error fetching team data:', error);
            setRows([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, [page, rowsPerPage, searchQuery]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleTeamCreated = () => {
        fetchTeams();
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextField
                    id="outlined-search"
                    label="Search Team"
                    type="search"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    sx={{ mr: 2 }}
                />
                <Button variant="contained" onClick={fetchTeams}>
                    Search
                </Button>
                <Button sx={{ marginLeft: 'auto' }} variant="contained" onClick={handleOpenDialog}>
                    Create New Team
                </Button>
            </Box>
            <TableContainer>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                        <CircularProgress />
                    </Box>
                ) : (
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.length > 0 ? (
                                rows.map((row) => (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id} onClick={() => handleRowClick(row.id, row.tournament?.id)} style={{ cursor: 'pointer' }}>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.description}</TableCell>
                                        <TableCell align="right">{row.tournament?.name}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} align="center">
                                        No data available
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={totalRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    '& .MuiTablePagination-toolbar': {
                        justifyContent: 'flex-end',
                        padding: '0 !important',
                    },
                    '& .MuiTablePagination-selectLabel': {
                        display: 'flex',
                        alignItems: 'center',
                        margin: '0',
                        padding: '0 !important',
                    },
                    '& .MuiTablePagination-input': {
                        margin: '0',
                        padding: '0 !important',
                    },
                    '& .MuiTablePagination-displayedRows': {
                        margin: '0',
                        padding: '0 !important',
                        lineHeight: 'normal',
                    },
                }}
            />
            <CreateTeamDialog open={openDialog} onClose={handleCloseDialog} onTeamCreated={handleTeamCreated} />
        </Paper>
    );
};

export default Teams;
