import React, { useState, useRef, useEffect } from 'react'
// import Modal from '@mui/material/Modal';
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MuiPhoneNumber from 'material-ui-phone-number';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Avatar, Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextareaAutosize, TextField, Typography } from "@mui/material";
import axios from 'axios';
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
// import Container from "@mui/material/Container";
// import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { json } from 'node:stream/consumers';
import { SettingsVoiceTwoTone } from '@mui/icons-material';


const settings = ["Upload Photo", "Remove Photo", "Cancle"];

// type Props = {}
interface PropsFunction {
	handleClose: () => void

}

//Mpodal Style
const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: "400px",
	height: "550px",
	bgcolor: 'background.paper',
	border: '2px solid #fff	',
	boxShadow: 24,
	p: 4,
};


const EditProfile = ({ handleClose }: PropsFunction) => {
	//image
	const [image, setImage] = useState("");
	const inputFile = useRef<any>(null);
	const [count, setcount] = useState(0)
	let token = JSON.parse(localStorage.getItem("token") || " ")
	// console.log(token);

	//menu 
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	//Edit Profile
	const [data, setdata] = useState({
		"img": "",
		"name": "",
		"biodata": "",
		"gender": "",
		"dateofbirth": "",
		"mobile": "",

	}
	);

	const userName = data.name.split(" ")
	// console.log("2", userName);
	const fn = userName[0];
	const ln = userName[1];
	// console.log(fn);
	// console.log(ln);


	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("");

	useEffect(() => {
		axios("http://localhost:8080/users/6299987a0dec390e1b6e7b87", {
			method: "GET",
			headers: {
				"Authorization": `Bearer ${token}`,
			}
		})
			.then((res) => {
				console.log(res);
				if (res.data !== "") {
					setdata({
						img: res.data.img || image,
						name: res.data.name || "",
						biodata: res.data.biodata || "",
						gender: res.data.gender || "",
						dateofbirth: res.data.dateofbirth || "",
						mobile: res.data.mobile || "",
					})


				}
			})
			.catch((err) => {
				console.log(err);
				console.log(`Bearer${token}`)
			})
	}, [count])

	useEffect(() => {
		setFirstName(fn);
		setLastName(ln);
		console.log("1");

	}, [fn, ln])


	// console.log("firstName", firstName);
	// console.log("lastName", lastName);


	//updated data
	const handleSubmit = () => {


		setdata({ ...data, name: firstName + " " + lastName })

		// let formData = new FormData()
		// formData.append('gender', data.gender);



	}

	//mobile Number

	function handleOnChange(value: string | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
		// if (no !== undefined && no !== "") {

		const formData = new FormData();

		console.log(formData.append("username", "Groucho"));

		setdata({ ...data, mobile: value })
		// }
		setdata({ ...data, img: image })
		console.log(formData);



	}


	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: any) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};


	const handleFileUpload = (e: any) => {
		const { files } = e.target;
		if (files && files.length) {
			const filename = files[0].name;

			var parts = filename.split(".");
			const fileType = parts[parts.length - 1];
			// console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.
			// setImage(files[0]);
			setImage(URL.createObjectURL(files[0]));

		}

	};
	const onButtonClick = () => {
		inputFile.current.click();
	};

	// console.log("image", image);
	console.log("1", data);

	return (
		<div>
			<div>


				<Box sx={style}>
					<Box sx={{ flexGrow: 0 }}>
						{/* <Tooltip title="Open settings">
             			 <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
             			 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                        </IconButton>
                        </Tooltip> */}

						<Menu
							sx={{ mt: "35px", ml: "30px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right"
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{/* {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))} */}

							<MenuItem key={0} onClick={() => { handleCloseUserMenu(); onButtonClick() }}>
								<Typography textAlign="center"  >   {settings[0]}</Typography>
							</MenuItem>

							<MenuItem key={1} onClick={() => { handleCloseUserMenu(); setImage("") }}>
								<Typography textAlign="center" > {settings[1]}</Typography>
							</MenuItem>

							<MenuItem key={2} onClick={() => { handleCloseUserMenu(); }}>
								<Typography textAlign="center" style={{ marginBottom: "px" }} > {settings[2]}</Typography>
							</MenuItem>

						</Menu>
					</Box>

					<Grid container alignItems="center" spacing={1} >
						<button style={{ marginLeft: "100%", border: "none", backgroundColor: "#fff" }}
							onClick={handleClose}>
							x
						</button>

						<Grid item xs={12} sm={12}>
							<Typography sx={{ fontWeight: "bold", fontSize: "25px", marginLeft: "25%" }}>
								Profile Update
							</Typography>
						</Grid>

						<Grid item xs={12} sm={12}>
							<Grid container style={{ justifyContent: "center", }}>
								{/* <Avatar src='/AM.jpg' style={{ width: "100px", height: "99px" }} /> */}

								<Avatar style={{ width: "100px", height: "99px" }} >

									<img src={image} alt="log" style={{ width: "100px", height: "99px" }} />

								</Avatar>
								<input
									style={{ display: "none" }}
									// accept=".zip,.rar"
									ref={inputFile}
									onChange={handleFileUpload}
									type="file"
								/>
								<AddAPhotoIcon
									onClick={handleOpenUserMenu}
									style={{
										position: "absolute",
										left: "55%",
										right: "4.17%",
										top: "27%",
										bottom: "40px",
										// background: "#1890FF"
									}}
								/>
							</Grid>
						</Grid>


						<Grid item xs={12} sm={12}>
							<TextField id="outlined-basic" label="FirstName" variant="outlined"
								fullWidth required
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								size={"small"} />
						</Grid>

						<Grid item xs={12} sm={12}>
							<TextField id="outlined-basic" label="LastName" variant="outlined"
								fullWidth required
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								size={"small"}
							/>
						</Grid>

						<Grid item xs={12} sm={12}>
							<TextareaAutosize
								aria-label="empty textarea"
								placeholder="Bio"
								style={{ width: 393, height: 70 }}
								onChange={(e) => setdata({ ...data, biodata: e.target.value })}
							/>
						</Grid>


						<Grid item xs={12} sm={12}>
							<FormControl>
								<FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
								<RadioGroup
									row
									aria-labelledby="demo-row-radio-buttons-group-label"
									name="row-radio-buttons-group"
									value={data.gender}
									onChange={(e) => setdata({ ...data, gender: e.target.value })}
								>
									<FormControlLabel value="male" control={<Radio />} label="Male" />
									<FormControlLabel value="female" control={<Radio />} label="Female" />
									<FormControlLabel value="Other" control={<Radio />} label="Other" />

								</RadioGroup>
							</FormControl>
						</Grid>



						<Grid item xs={12} sm={6}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<FormControl>
									<FormLabel>Date of Birth</FormLabel>
									<TextField
										id="date"
										type="date"
										size="small"
										value={data.dateofbirth}
										onChange={(value) =>
											setdata({
												...data,
												dateofbirth: value.target.value,
											})
										}
									// fullWidth
									// required
									/>
								</FormControl>
							</MuiPickersUtilsProvider>
						</Grid>

						<Grid item xs={12} sm={12}>
							<MuiPhoneNumber defaultCountry={'in'}
								placeholder='mobile'
								value={data.mobile}
								// onChange={(e) => setdata({ ...data, mobile: e.target.value })}
								onChange={(value) => handleOnChange(value)}
								fullWidth
								required
							/>
						</Grid>

						<Grid item xs={12} sm={12}>
							<Button type='submit' variant='contained' color='primary'
								sx={{ marginLeft: "35%" }}
								onClick={handleSubmit}
							>
								Save Profile
							</Button>
						</Grid>
					</Grid>
				</Box>
			</div>
		</div>
	)
}

export default EditProfile