import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Grid,
} from "@mui/material";

const Statistics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return <CircularProgress sx={{ display: "block", margin: "auto" }} />;
  if (error) return <Alert severity="error">Erreur: {error}</Alert>;

  const calculateStats = () => {
    const totalStudents = data.length;
    const overallAverage =
      data.reduce((acc, curr) => acc + curr.grade, 0) / totalStudents;

    const courseStats = data.reduce((acc, curr) => {
      if (!acc[curr.course]) {
        acc[curr.course] = { total: 0, count: 0 };
      }
      acc[curr.course].total += curr.grade;
      acc[curr.course].count += 1;
      return acc;
    }, {});

    const rankings = [...data].sort((a, b) => b.grade - a.grade);

    return {
      totalStudents,
      overallAverage,
      courseStats,
      rankings,
    };
  };

  const stats = calculateStats();

  const downloadCSV = () => {
    const headers = ["ID", "Cours", "Prénom", "Nom", "Date", "Note"];
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        [
          row.unique_id,
          row.course,
          row.student.firstname,
          row.student.lastname,
          row.date,
          row.grade,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "statistiques_etudiants.csv";
    link.click();
  };

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        {/* General Statistics */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Nombre d'étudiants
              </Typography>
              <Typography variant="h4">{stats.totalStudents}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Moyenne générale
              </Typography>
              <Typography variant="h4">
                {stats.overallAverage.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={downloadCSV}
                fullWidth
              >
                Télécharger CSV
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Course Statistics */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Statistiques par cours
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Cours</TableCell>
                      <TableCell>Nombre d'étudiants</TableCell>
                      <TableCell>Moyenne</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(stats.courseStats).map(
                      ([course, stats]) => (
                        <TableRow key={course}>
                          <TableCell>{course}</TableCell>
                          <TableCell>{stats.count}</TableCell>
                          <TableCell>
                            {(stats.total / stats.count).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Student Rankings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Classement des étudiants
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Rang</TableCell>
                      <TableCell>Nom</TableCell>
                      <TableCell>Prénom</TableCell>
                      <TableCell>Cours</TableCell>
                      <TableCell>Note</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats.rankings.map((student, index) => (
                      <TableRow key={student.unique_id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{student.student.lastname}</TableCell>
                        <TableCell>{student.student.firstname}</TableCell>
                        <TableCell>{student.course}</TableCell>
                        <TableCell>{student.grade}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Statistics;
