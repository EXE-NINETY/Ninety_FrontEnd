import { Box, Button, CircularProgress, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import { AccessTime, CalendarToday, LocationOn } from '@mui/icons-material';
import AddTeamDialog from './AddTeamDialog';
import { toast } from 'react-toastify';
import ViewDetailScoreDialog from './EditScoreDialog';

const TournamentDetail = () => {
    const { id } = useParams();
    const [tournament, setTournament] = useState(null);
    const [teams, setTeams] = useState([]);
    const [matches, setMatches] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMembers, setLoadingMembers] = useState(true);
    const [loadingMatches, setLoadingMatches] = useState(true);
    const [loadingRanking, setLoadingRanking] = useState(true);
    const [loadingCreateMatch, setLoadingCreateMatch] = useState(false);
    const [error, setError] = useState('');
    const [value, setValue] = React.useState('one');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedMatchId, setSelectedMatchId] = useState(null);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchTeamMembers = async () => {
        setLoadingMembers(true);
        try {
            const response = await axios.get(`https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/team/tournaments/${id}`);
            setTeams(response.data.data);
        } catch (err) {
            setError('Error fetching team members');
        } finally {
            setLoadingMembers(false);
        }
    };

    const fetchMatches = async () => {
        setLoadingMatches(true);
        try {
            const response = await axios.get(`https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/match/tournament/${id}`);
            setMatches(response.data.data);
        } catch (err) {
            setError('Error fetching match data');
        } finally {
            setLoadingMatches(false);
        }
    };

    const fetchRanking = async () => {
        setLoadingRanking(true);
        try {
            const response = await axios.get(`https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/ranking/tournament/${id}`);
            setRanking(response.data.data);
        } catch (err) {
            setError('Error fetching ranking data');
        } finally {
            setLoadingRanking(false);
        }
    };

    useEffect(() => {
        const fetchTeamDetail = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/tournament/${id}`);
                setTournament(response.data.data);
                console.log(response.data.data)
            } catch (err) {
                setError('Error fetching team details');
            } finally {
                setLoading(false);
            }
        };

        fetchTeamDetail();
        fetchTeamMembers();
        fetchMatches();
        fetchRanking();
    }, [id]);

    const createMatch = async () => {
        setLoadingCreateMatch(true);
        try {
            const matchData = {
                tournamentId: id,
            };
            if (tournament.format === 'league') {
                await axios.post(`https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/match/${id}`, matchData);
            } else if (tournament.format === 'knockout') {
                await axios.post(`https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/match/bracket/${id}`, matchData);
            }
            fetchMatches();
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Error creating match. Please try again.';
            toast.error(errorMessage);
        } finally {
            setLoadingCreateMatch(false);
        }
    };

    if (loading || loadingMembers || loadingMatches || loadingRanking) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>;
    }

    if (!tournament) {
        return <Typography>No team details available</Typography>;
    }

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'description', label: 'Description', minWidth: 100 },
        { id: 'tournament', label: 'Tournament Name', minWidth: 170 },
    ];

    const groupMatchesByRound = (matches) => {
        return matches.reduce((acc, match) => {
            const round = match.round;
            if (!acc[round]) {
                acc[round] = [];
            }
            acc[round].push(match);
            return acc;
        }, {});
    };

    const handleOpenDialog = (matchId) => {
        setOpenDialog(true);
        setSelectedMatchId(matchId);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const onMemberAdd = () => {
        fetchTeamMembers();
        handleCloseDialog();
    };

    const groupedMatches = groupMatchesByRound(matches);

    return (
        <Box sx={{ width: '100%', p: 2 }}>
            <div>
                <Typography variant="h3" className="text-primary" gutterBottom>
                    {tournament.name}
                </Typography>
                <Typography className="">{tournament.description}</Typography>
                <Typography className="mb-5">{tournament.sport.name}</Typography>
            </div>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="team detail tabs"
            >
                <Tab value="one" label="Introduce" wrapped />
                <Tab value="two" label="Teams" wrapped />
                <Tab value="three" label="Match Info" wrapped />
                <Tab value="four" label="Ranking" wrapped />
            </Tabs>

            <Box sx={{ p: 2 }}>
                {value === 'one' && (
                    <Card sx={{ mb: 2, p: 2, bgcolor: '#fff' }}>
                        <Typography variant="h6">Name:</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{tournament.name}</Typography>

                        <Typography variant="h6">Description:</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{tournament.description}</Typography>

                        <Typography variant="h6">Rules:</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{tournament.rules}</Typography>

                        <Typography variant="h6">Number of Teams:</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{tournament.numOfParticipants}</Typography>

                        <Typography variant="h6">Slots Left:</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{tournament.slotLeft}</Typography>

                        <Typography variant="h6">Start Date:</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{new Date(tournament.startDate).toLocaleDateString()}</Typography>

                        <Typography variant="h6">End Date:</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{new Date(tournament.endDate).toLocaleDateString()}</Typography>

                        <Typography variant="h6">Fee:</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{tournament.fee}.000 VNĐ</Typography>

                        <Typography variant="h6">Place:</Typography>
                        <Typography variant="body1">{tournament.place}</Typography>

                        <Typography variant="h6">Sport:</Typography>
                        <Typography variant="body1">{tournament.sport.name}</Typography>
                    </Card>
                )}

                {value === 'two' && (
                    <>
                        {tournament.isRegister !== false && (
                            <Button onClick={handleOpenDialog} variant="contained" color="error" className="mb-3">
                                Add Team
                            </Button>
                        )}
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {teams.length > 0 ? (
                                            teams.map((team) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={team.id}>
                                                    <TableCell>{team.name}</TableCell>
                                                    <TableCell>{team.description}</TableCell>
                                                    <TableCell>{team.tournament.name}</TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={columns.length} align="center">
                                                    No team members available
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <AddTeamDialog
                                open={openDialog}
                                onClose={handleCloseDialog}
                                onTeamUpdated={onMemberAdd}
                                id={id}
                            />
                        </Paper>
                    </>
                )}
                {value === 'three' && (
                    <div className="container mt-5">

                        {tournament.isRegister !== false && (
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={createMatch}
                                disabled={loadingCreateMatch}
                            >
                                {loadingCreateMatch ? 'Creating Match...' : 'Create Match'}
                            </Button>
                        )}

                        <h1 className="mb-4 text-center">Match List</h1>
                        {matches.length === 0 ? (
                            <Typography variant="body1" color="textSecondary" align="center">
                                No matches available for this tournament.
                            </Typography>
                        ) : (
                            Object.keys(groupedMatches).map((round) => (
                                <div key={round}>
                                    <h4 className="mt-4">Round {round}</h4>
                                    {groupedMatches[round].map((match) => (
                                        <Card
                                            className="mb-3 shadow-sm"
                                            key={match.id}
                                            style={{ transition: 'transform 0.2s' }}
                                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                                        >
                                            <Card.Header className="bg-primary text-white">
                                                <h5 className="m-0 text-lg font-bold">
                                                    <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded">{`Team ${match.teamAName}`}</span>
                                                    <span className="mx-2 text-gray-700 font-medium">{match.totalResult === "Not happened yet" ? "vs" : match.totalResult}</span>
                                                    <span className="bg-red-100 text-red-500 px-2 py-1 rounded">{`Team ${match.teamBName}`}</span>
                                                </h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Row>
                                                    <Col md={4} className="d-flex align-items-center">
                                                        <CalendarToday className="mr-2" />
                                                        <p className="m-0">
                                                            <strong>Date:</strong> {new Date(match.date).toLocaleDateString()}
                                                        </p>
                                                    </Col>
                                                    <Col md={4} className="d-flex align-items-center">
                                                        <AccessTime className="mr-2" />
                                                        <p className="m-0">
                                                            <strong>Time:</strong> {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </Col>
                                                    <Col md={4} className="d-flex align-items-center text-right">
                                                        <LocationOn className="mr-2" />
                                                        <p className="m-0">
                                                            <strong>Location:</strong> TBD
                                                        </p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="text-right mt-3">
                                                        <Button
                                                            onClick={() => handleOpenDialog(match.id)}
                                                            variant="contained"
                                                            color="success"
                                                            className="mb-3"
                                                        >
                                                            View Details
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                    <ViewDetailScoreDialog
                                        open={openDialog}
                                        onClose={handleCloseDialog}
                                        id={selectedMatchId}
                                    />
                                </div>
                            ))
                        )}
                    </div>
                )}
                {value === 'four' && (
                    <>
                        <h3>Team Ranking</h3>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Rank</TableCell>
                                        <TableCell>Team Name</TableCell>
                                        <TableCell>Points</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ranking.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                <Typography variant="body1" color="textSecondary">
                                                    No rankings available for this tournament.
                                                </Typography>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        ranking.map((rank) => (
                                            <TableRow key={rank.id}>
                                                <TableCell>{rank.rank}</TableCell>
                                                <TableCell>{rank.team.name}</TableCell>
                                                <TableCell>{rank.point}</TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Box>
        </Box>
    )
}

export default TournamentDetail