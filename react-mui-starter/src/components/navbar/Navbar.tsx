import React, { useState } from "react";
import "./Navbar.scss";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Logout } from "@mui/icons-material";
// import Tooltip from "@mui/material/Tooltip";
import { Avatar, Box, Button, Menu, MenuItem, Stack } from "@mui/material";
// import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Modal from '@mui/material/Modal';
import EditProfile from "./EditProfile/EditProfile"
import UploadImage from "./upload_photo/UploadImage"
import SavedPost from "./savedPost/SavedPost";
import { authenticationService } from "../../utils/auth.service";



// import logo from "./AM.jpg"

export type NavbarProps = {
  /**
   * To be triggered on logout click
   */
  onLogout?: any;

};
const settings = ['Edit profile', 'Change password', 'Logout'];


export const Navbar = ({ onLogout }: NavbarProps) => {



  const data: String = JSON.parse(localStorage.getItem("currentUser")) || [];
  //navbar menu items
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  //modal edit profile
  const [open, setOpen] = React.useState(false);

  //modal post photo
  const [open1, setOpen1] = React.useState(false)

  //bookmark
  const [bookmarkOpen, setbookmarkOpen] = useState(false)

  //navbar menu items 
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //modal edit profile
  const handleOpen = () => setOpen(true);
  const handleClose = (): void => setOpen(false);

  //modal post photo
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = (): void => {
    setOpen1(false);
  }

  //handleBookmark
  const handlebookmark = () => {
    // setbookmarkOpen(true);
    console.log("hi");

    if (bookmarkOpen) {
      setbookmarkOpen(false);
    }
    else {
      setbookmarkOpen(true);
    }

    authenticationService.savedPost();
  }
  // console.log(data);
  console.log(bookmarkOpen);


  const handleHome = () => {
    authenticationService.home()
  }

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#fff", minWidth: "400px" }}>
        <Toolbar variant="dense">
          <Avatar style={{ marginLeft: "10%", marginRight: "10px", width: "3%", height: "3%" }}
            src={require("./images/logo.png")}  >
          </Avatar>

          <img src={require("./images/Life@AM.png")} alt="img"></img>

          {/* <Tooltip title="Logout"> */}
          <Stack direction="row" alignItems={"center"} sx={{ marginLeft: "47%" }}>


            <Button variant="text" style={{ color: 'black' }} onClick={() => { authenticationService.home() }} >
              <HomeIcon />
            </Button>

            <Button variant="text" style={{ color: 'black' }} >
              <CameraAltOutlinedIcon onClick={() => handleOpen1()} />
            </Button>


            <Button variant="text" style={{ color: 'black' }} onClick={() => handlebookmark()} >
              {/* <BookmarkAddOutlinedIcon /> */}

              {!bookmarkOpen ?
                <img src={require("./images/BeforeSave.png")} alt="pic" />
                :
                <img src={require("./images/AfterSave.png")} alt="pic1" />
              }
            </Button>

            {/* <Avatar style={{ cursor: "pointer" }} >
              AJ
            </Avatar> */}

            <Box sx={{ flexGrow: 0 }}>
              {/* <Tooltip title="Open settings"> */}
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="J" src="/static/images/avatar/2.jpg" /> */}
                <Avatar style={{ width: "28px", height: "28px" }}>AJ</Avatar>
              </IconButton>
              {/* </Tooltip> */}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                <MenuItem key={0} onClick={() => { handleCloseUserMenu(); handleOpen(); }}>
                  <Typography textAlign="center"  > <ManageAccountsRoundedIcon />  {settings[0]}</Typography>
                </MenuItem>

                <MenuItem key={1} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center"><LockResetRoundedIcon style={{ marginTop: "1%" }} /> {settings[1]}</Typography>
                </MenuItem>

                <MenuItem key={2} onClick={() => { handleCloseUserMenu(); }}>
                  <Typography textAlign="center" style={{ marginBottom: "px" }} onClick={onLogout}><LogoutRoundedIcon onClick={onLogout} /> {settings[2]}</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Typography style={{ fontSize: "18px", fontWeight: "600", color: "black" }}>{data.name}</Typography>
          </Stack>

        </Toolbar>
      </AppBar >


      <div>
        {
          open1 ?
            <Modal
              open={open1}
              onClose={handleClose1}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              
            >
              <UploadImage handleClose1={handleClose1} />
            </Modal>
            : ""
        }
      </div>

      <div>
        {
          open ?
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <EditProfile handleClose={handleClose} />
            </Modal>
            : ""
        }    </div>

      {/* {
        bookmarkOpen ?
          <SavedPost bookmarkOpen={bookmarkOpen} />
          : ""
      } */}
    </>
  );
};
