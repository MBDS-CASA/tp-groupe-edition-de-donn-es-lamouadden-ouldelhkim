import React, { useState } from "react";
import {
  Paper,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Tooltip,
  Collapse,
  useTheme,
} from "@mui/material";
import {
  Notes as NotesIcon,
  People as StudentsIcon,
  Book as SubjectsIcon,
  Info as AboutIcon,
  ExpandLess,
  ExpandMore,
  Grade,
  Assignment,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { BarChartIcon, HomeIcon } from "lucide-react";
import Statistics from "./pages/statistique/Statistique";

const Nav = () => {
  const theme = useTheme();
  const navigate = useNavigate(); // React Router hook for navigation
  const [selectedItem, setSelectedItem] = useState(null);
  const [openNotes, setOpenNotes] = useState(false);

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, route: "/" },
    { text: "Note", icon: <NotesIcon />, route: "/notes" },
    { text: "Etudiants", icon: <StudentsIcon />, route: "/etudiants" },
    { text: "Matières", icon: <SubjectsIcon />, route: "/matieres" },
    { text: "Statistique", icon: <BarChartIcon />, route: "/stats" },
    { text: "A propos", icon: <AboutIcon />, route: "/apropos" },
  ];

  const handleMenuClick = (item) => {
    setSelectedItem(item.text);
    if (item.text === "Notes") {
      setOpenNotes(!openNotes);
    }
    if (item.route) {
      navigate(item.route); // Navigate to the route associated with the item
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        transition: "all 0.3s ease-in-out",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          background: theme.palette.background.paper,
        }}
      >
        <List
          component="nav"
          aria-label="main navigation"
          sx={{
            p: 1,
            "& .MuiListItemButton-root": {
              borderRadius: 1,
              mb: 0.5,
              "&:last-child": {
                mb: 0,
              },
            },
          }}
        >
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              <ListItem disablePadding>
                <Tooltip title={`Accéder à ${item.text}`} placement="right">
                  <ListItemButton
                    selected={selectedItem === item.text}
                    onClick={() => handleMenuClick(item)}
                    sx={{
                      "&.Mui-selected": {
                        backgroundColor: `${theme.palette.primary.main}!important`,
                        color: "white",
                        "& .MuiListItemIcon-root": {
                          color: "white",
                        },
                        "&:hover": {
                          backgroundColor: `${theme.palette.primary.dark}!important`,
                        },
                      },
                      "&:hover": {
                        backgroundColor: theme.palette.action.hover,
                        transform: "translateX(6px)",
                        transition: "transform 0.2s ease-in-out",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        "& .MuiTypography-root": {
                          fontWeight:
                            selectedItem === item.text ? "bold" : "normal",
                        },
                      }}
                    />
                    {item.subItems &&
                      (openNotes ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
              {item.subItems && (
                <Collapse in={openNotes} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.subItems.map((subItem) => (
                      <ListItem key={subItem.text} disablePadding>
                        <ListItemButton
                          selected={selectedItem === subItem.text}
                          onClick={() => handleMenuClick(subItem)}
                          sx={{
                            pl: 4,
                            "&.Mui-selected": {
                              backgroundColor: `${theme.palette.primary.main}!important`,
                              color: "white",
                              "& .MuiListItemIcon-root": {
                                color: "white",
                              },
                            },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 40 }}>
                            {subItem.icon}
                          </ListItemIcon>
                          <ListItemText primary={subItem.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default Nav;
