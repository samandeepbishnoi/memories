import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";
import memories from "../../images/memories.png";
import memoriesText from "../../images/memoriesText.png";
import useStyles from "./styles";
import { useDispatch } from "react-redux";
import { useNavigate,useLocation } from "react-router-dom";
import jwtDecode  from 'jwt-decode';
const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user?.token;
       if (token) { 
          const decodedToken = jwtDecode(token);
          if (decodedToken.exp * 1000 < new Date().getTime()) {
            logout();
          }
       }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history("/");
    setUser(null);
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img src={memoriesText} alt="memories text" height="45px" />
        <img
          className={classes.image}
          src={memories}
          alt="logo"
          height="55px"
        />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              onClick={logout}
              color="secondary"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
