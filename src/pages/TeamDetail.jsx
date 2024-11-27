import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { AccessTime, CalendarToday, LocationOn } from '@mui/icons-material';
import AddMemberDialog from './AddMemberDialog';
import ViewDetailDialog from './ViewDetailDialog';

const TeamDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const tournamentId = queryParams.get('tournamentId');
    const [team, setTeam] = useState(null);
    const [members, setMembers] = useState([]);
    const [matches, setMatches] = useState([]);
    const [ranking, setRanking] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMembers, setLoadingMembers] = useState(true);
    const [loadingMatches, setLoadingMatches] = useState(true);
    const [loadingRanking, setLoadingRanking] = useState(true);
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
            const response = await axios.get(`https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/team/member/${id}`);
            setMembers(response.data.data);
        } catch (err) {
            setError('Error fetching team members');
        } finally {
            setLoadingMembers(false);
        }
    };

    const fetchMatches = async () => {
        setLoadingMatches(true);
        try {
            const response = await axios.get(`https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/match/teams/${id}?tournamentId=${tournamentId}`);
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
            const response = await axios.get(`https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/ranking/tournament/${tournamentId}`);
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
                const response = await axios.get(`https://ninety-bzfzbhe0dzgdd0hb.southeastasia-01.azurewebsites.net/api/team/${id}`);
                setTeam(response.data.data);
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

    if (!team) {
        return <Typography>No team details available</Typography>;
    }

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'role', label: 'Role', minWidth: 100 },
        { id: 'email', label: 'Email', minWidth: 170 },
        { id: 'phoneNumber', label: 'Phone Number', minWidth: 150 },
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
                <Typography variant="h4" gutterBottom>
                    {team.name} <span className="text-primary">({team.tournament.name})</span>
                </Typography>
                <Typography className="mb-5">{team.description}</Typography>
            </div>
            <Tabs
                value={value}
                onChange={handleChange}
                aria-label="team detail tabs"
            >
                <Tab value="one" label="Introduce" wrapped />
                <Tab value="two" label="Team Members" wrapped />
                <Tab value="three" label="Match Info" wrapped />
                <Tab value="four" label="Ranking" wrapped />
            </Tabs>

            <Box sx={{ p: 2 }}>
                {value === 'one' && (
                    <>
                        <Typography variant="body1">Team Name: {team.name}</Typography>
                        <Typography variant="body1">
                            Description: {team.description}
                        </Typography>
                    </>
                )}

                {value === 'two' && (
                    <>
                        <Button onClick={handleOpenDialog} variant="primary" className="mb-3">
                            Add Team Member
                        </Button>
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
                                        {members.length > 0 ? (
                                            members.map((member) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={member.id}>
                                                    <TableCell>{member.name}</TableCell>
                                                    <TableCell>{member.role}</TableCell>
                                                    <TableCell>{member.email}</TableCell>
                                                    <TableCell>{member.phoneNumber}</TableCell>
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
                            <AddMemberDialog open={openDialog} onClose={handleCloseDialog} onTeamUpdated={onMemberAdd} teamId={id} />
                        </Paper>
                    </>
                )}
                {value === 'three' && (
                    <>
                        <div className="container mt-5">
                            <h1 className="mb-4 text-center">Match List</h1>
                            {Object.keys(groupedMatches).map(round => (
                                <div key={round}>
                                    <h4 className="mt-4">Round {round}</h4>
                                    {groupedMatches[round].map(match => (
                                        <Card className="mb-3 shadow-sm" key={match.id} style={{ transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} >
                                            <Card.Header className="bg-primary text-white">
                                                <h5 className="m-0 text-lg font-bold">
                                                    <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded">{`Team ${match.teamAName}`}</span>
                                                    <span className="mx-2 text-gray-700 font-medium">
                                                        {match.totalResult && match.totalResult !== "Not happened yet" ? match.totalResult : "vs"}
                                                    </span>
                                                    <span className="bg-red-100 text-red-500 px-2 py-1 rounded">{`Team ${match.teamBName}`}</span>
                                                </h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Row>
                                                    <Col md={4} className="d-flex align-items-center">
                                                        <CalendarToday className="mr-2" />
                                                        <p className="m-0"><strong>Date:</strong> {new Date(match.date).toLocaleDateString()}</p>
                                                    </Col>
                                                    <Col md={4} className="d-flex align-items-center">
                                                        <AccessTime className="mr-2" />
                                                        <p className="m-0"><strong>Time:</strong> {new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                    </Col>
                                                    {/* <Col md={4} className="d-flex align-items-center text-right">
                                                        <LocationOn className="mr-2" />
                                                        <p className="m-0"><strong>Location:</strong> {match.tournament.place}</p>
                                                    </Col> */}
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
                                    <ViewDetailDialog
                                        open={openDialog}
                                        onClose={handleCloseDialog}
                                        id={selectedMatchId}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
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
                                    {ranking.map((rank) => (
                                        <TableRow
                                            key={rank.id}
                                            style={{
                                                backgroundColor: rank.teamId === team.id ? 'yellow' : 'inherit'
                                            }}
                                        >
                                            <TableCell>{rank.rank}</TableCell>
                                            <TableCell>{rank.team.name}</TableCell>
                                            <TableCell>{rank.point}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default TeamDetail;
