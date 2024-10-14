import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, CircularProgress, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { AccessTime, CalendarToday, LocationOn } from '@mui/icons-material';

const TeamDetail = () => {
    const { id } = useParams();
    const [team, setTeam] = useState(null);
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMembers, setLoadingMembers] = useState(true);
    const [error, setError] = useState('');
    const [value, setValue] = React.useState('one');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const matches = [
        {
            id: 1,
            teamA: 'Team A',
            teamB: 'Team B',
            round: '1',
            date: 'October 15, 2024',
            time: '3:00 PM',
            location: 'Stadium XYZ'
        },
        {
            id: 2,
            teamA: 'Team C',
            teamB: 'Team D',
            round: '1',
            date: 'October 16, 2024',
            time: '5:00 PM',
            location: 'Arena ABC'
        },
        {
            id: 3,
            teamA: 'Team A',
            teamB: 'Team C',
            round: '2',
            date: 'October 16, 2024',
            time: '5:00 PM',
            location: 'Arena ABC'
        },
        {
            id: 4,
            teamA: 'Team B',
            teamB: 'Team D',
            round: '2',
            date: 'October 16, 2024',
            time: '5:00 PM',
            location: 'Arena ABC'
        },
    ];

    useEffect(() => {
        const fetchTeamDetail = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:5090/api/team/${id}`);
                setTeam(response.data.data);
            } catch (err) {
                setError('Error fetching team details');
            } finally {
                setLoading(false);
            }
        };

        const fetchTeamMembers = async () => {
            setLoadingMembers(true);
            try {
                const response = await axios.get(`http://localhost:5090/api/team/member/${id}`);
                setMembers(response.data.data);
            } catch (err) {
                setError('Error fetching team members');
            } finally {
                setLoadingMembers(false);
            }
        };

        fetchTeamDetail();
        fetchTeamMembers();
    }, [id]);

    if (loading || loadingMembers) {
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
                                        <Card className="mb-3 shadow-sm" key={match.id} style={{ transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                                            <Card.Header className="bg-primary text-white">
                                                <h5 className="m-0">{`Match: ${match.teamA} vs ${match.teamB}`}</h5>
                                            </Card.Header>
                                            <Card.Body>
                                                <Row>
                                                    <Col md={4} className="d-flex align-items-center">
                                                        <CalendarToday className="mr-2" />
                                                        <p className="m-0"><strong>Date:</strong> {match.date}</p>
                                                    </Col>
                                                    <Col md={4} className="d-flex align-items-center">
                                                        <AccessTime className="mr-2" />
                                                        <p className="m-0"><strong>Time:</strong> {match.time}</p>
                                                    </Col>
                                                    <Col md={4} className="d-flex align-items-center text-right">
                                                        <LocationOn className="mr-2" />
                                                        <p className="m-0"><strong>Location:</strong> {match.location}</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col className="text-right mt-3">
                                                        <Button variant="light" className="text-primary border">View Details</Button>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </Box>
        </Box>
    );
};

export default TeamDetail;
