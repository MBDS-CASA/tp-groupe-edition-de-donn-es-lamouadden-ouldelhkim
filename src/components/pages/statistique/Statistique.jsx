// components/grades/Statistics.jsx
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
    fetch("http://localhost:8010/api/grades")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! statut: ${response.status}`);
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
    const totalGrades = data.length;
    const overallAverage =
      totalGrades > 0
        ? data.reduce((acc, curr) => acc + curr.grade, 0) / totalGrades
        : 0;

    const courseStats = data.reduce((acc, curr) => {
      const courseName = curr.course.name;
      if (!acc[courseName]) {
        acc[courseName] = { total: 0, count: 0 };
      }
      acc[courseName].total += curr.grade;
      acc[courseName].count += 1;
      return acc;
    }, {});

    const rankings = [...data].sort((a, b) => b.grade - a.grade);

    return {
      totalGrades,
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
          row._id,
          row.course.name + " (" + row.course.code + ")",
          row.student.firstName,
          row.student.lastName,
          new Date(row.date).toLocaleDateString(),
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
                Nombre de notes
              </Typography>
              <Typography variant="h4">{stats.totalGrades}</Typography>
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
                      <TableCell>Nombre de notes</TableCell>
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
                    {stats.rankings.map((grade, index) => (
                      <TableRow key={grade._id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{grade.student.lastName}</TableCell>
                        <TableCell>{grade.student.firstName}</TableCell>
                        <TableCell>
                          {grade.course.name} ({grade.course.code})
                        </TableCell>
                        <TableCell>{grade.grade}</TableCell>
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
