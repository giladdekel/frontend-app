import "./Header.scss";

// import { Route, NavLink } from "react-router-dom";

import React from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import "./Header.scss";
import Link from "@material-ui/core/Link";

import { Route, NavLink } from "react-router-dom";
import { signout } from "../../actions/userActions";
// import { detailsUser, signout } from "./../../actions/userActions";
const activeStyle = {
  color: "#ff8000",
};

{
  /* <NavLink activeStyle={activeStyle} exact to="/">
{" "}
<i className="fas fa-home fa-2x icon"></i>{" "}
<span className="header-title home-title">Home</span>
</NavLink> */
}

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function Header(props) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  // console.log("userInfo :", userInfo);
  // const userDetails = useSelector((state) => state.userDetails);

  // const { loading, error, user } = userDetails;

  const dispatch = useDispatch();

  // const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  // const { success: successUpdateProfile } = userUpdateProfile;

  // // useEffect(() => {
  // //   dispatch(detailsUser(userInfo._id));
  // // }, [successUpdateProfile]);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMenuOpenAdmin = Boolean(anchorElAdmin);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdminMenuOpen = (event) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuCloseAdmin = () => {
    setAnchorElAdmin(null);
    handleMobileMenuClose();
  };

  const handleMenuCloseSignOut = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    dispatch(signout());
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleMenuCloseSignOut}>Sign Out</MenuItem>
    </Menu>
  );

  const renderAdminMenu = (
    <Menu
      anchorEl={anchorElAdmin}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpenAdmin}
      onClose={handleMenuCloseAdmin}
    >
      <MenuItem onClick={handleMenuCloseAdmin}>Users List</MenuItem>
      <MenuItem onClick={handleMenuCloseAdmin}>My account</MenuItem>
    </Menu>
  );



  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
  
      <MenuItem onClick={handleAdminMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Admin</p>
      </MenuItem>
 
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Gilad App
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>


            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}

            <Link href="/" style={{ color: "white" }}>
              <IconButton aria-label="home" color="inherit">
                <HomeIcon />
              </IconButton>
            </Link>

            <IconButton
              aria-label="dashboard"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleAdminMenuOpen}
              color="inherit"
            >
              {userInfo && !userInfo.isAdmin && (
                <>
                  <DashboardIcon />
                </>
              )}

              {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.small} /> */}
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {userInfo && userInfo.image ? (
                <>
                  {" "}
                  <Avatar className={classes.small}>OP</Avatar>
                </>
              ) : (
                <>
                  {" "}
                  <AccountCircle />
                </>
              )}

              {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.small} /> */}
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderAdminMenu}

      {renderMenu}
    </div>
  );
}
export default Header;
