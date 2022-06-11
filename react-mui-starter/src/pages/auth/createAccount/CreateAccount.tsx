import { Button, CssBaseline, Grid, IconButton, InputAdornment, Stack, TextField, ThemeProvider, Typography } from '@mui/material'
import React, { useState } from 'react'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import LoadingButton from '@mui/lab/LoadingButton';
import Link from "@mui/material/Link";
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface State {

  password: string;
  showPassword: boolean;

}
type Props = {}

const CreateAccount = (props: Props) => {
  const theme = createTheme();
  const [user, setuser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  })
  const [errors, seterrors] = useState<any>({ email: "", password: "", firstName: '', lastName: '' });

  const [arr, setarr] = useState<any>([]);
  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
  });

  const handleSubmit = () => {
    if (validate()) {
      return
    }
    else {
      console.log(user);
      setarr([...arr, user])
      console.log(arr);
    }



  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  // const firstNameHandle=(e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
  //     setuser({...user,firstname:e.target.value})
  // }



  // const validateFirstName = () => {
  //   let flag = false;
  //   if (user.firstname === '') {
  //     seterrors((prevState: { errors: any }) => ({
  //       errors: { ...prevState.errors, firstName: "FirstName cannot be empty" },
  //     }));
  //     flag = true;
  //   } else {
  //     seterrors((prevState: { errors: any }) => ({
  //       errors: { ...prevState.errors, firstName: "" },
  //     }));
  //   }
  //   if (flag) {
  //     return false;
  //   }
  //   else {
  //     return true;
  //   }
  // }


  const validate = () => {
    console.log(user.email);
    let flag = false;
    if (user.firstname === '') {
      seterrors((prevState: { errors: any; }) => ({
        errors: { ...prevState.errors, firstName: "FirstName cannot be empty" },
      }));
      flag = true;
    } else {
      seterrors((prevState: { errors: any; }) => ({
        errors: { ...prevState.errors, firstName: "" },
      }));
    }
    if (user.lastname === '') {
      seterrors((prevState: { errors: any; }) => ({
        errors: { ...prevState.errors, lastName: "LastName cannot be empty" },
      }));
      flag = true;
    } else {
      seterrors((prevState: { errors: any; }) => ({
        errors: { ...prevState.errors, lastName: "" },
      }));
    }
    if (user.password === "") {
      // seterrors({...errors,password:'Password cannot be empty'})
      seterrors((prevState: { errors: any; }) => ({
        errors: { ...prevState.errors, password: "Password cannot be empty" },
      }));
      flag = true;
    } else if (
      /^(?=.*\d)(?=.*[a-z]).{6,20}$/.test(user.password) === false
    ) {
      // seterrors({...errors,password:'Invalid Password'})
      seterrors((prevState: { errors: any; }) => ({
        errors: { ...prevState.errors, password: "Invalid Password" },
      }));
      flag = true;
    } else {
      seterrors((prevState: { errors: any; }) => ({
        errors: { ...prevState.errors, password: "" },
      }));
    }
    if (user.email === "") {
      // seterrors({...errors,email:'Email cannot be empty'})
      seterrors((prevState: { errors: any; }) => ({
        ...prevState.errors,
        email: "Email cannot be empty",
      }));
      flag = true;
    } else if (
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(user.email) ===
      false
    ) {
      // seterrors({...errors,email:'Invalid Email'})
      seterrors((prevState: { errors: any; }) => ({
        ...prevState.errors,
        email: "Invalid Email",
      }));
      flag = true;
    } else {
      seterrors((prevState: { errors: any; }) => ({ ...prevState.errors, email: "" }));
    }
    if (flag) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <ThemeProvider theme={theme}>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          paddingLeft: 5,
          paddingRight: 5
        }}>
          <Typography component="h1" variant="h5" sx={{ marginTop: 5 }}>
            Sign Up to Social Feed
          </Typography>

          <Stack direction="row" spacing={1}>
            <Grid item xs={6} sm={6}>
              <TextField
                error={errors.firstName ? true : false}
                margin="normal"
                required
                size="small"
                type='text'
                id="outlined-error"
                label="First Name"
                placeholder='Enter First Name'
                value={user.firstname}
                onChange={(e) => setuser({ ...user, firstname: e.target.value })}
                // onChange={(e)=>firstNameHandle(e)}  
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                error={errors.lastname ? true : false}
                margin="normal"
                required
                size="small"
                type='text'
                id="outlined-error"
                label="Last Name"
                placeholder='Enter Last Name'
                value={user.lastname}
                onChange={(e) => setuser({ ...user, lastname: e.target.value })}
                // onChange={(e)=>firstNameHandle(e)}  
                helperText={errors.lastname}
              />
            </Grid>
          </Stack>

          <TextField
            margin="normal"
            required
            fullWidth
            // defaultValue="navanath@angularminds.com"
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            size="small"
            sx={{ Width: "200px" }}
            // value={user.email}
            onChange={(e) => setuser({ ...user, email: e.target.value })}
          />


          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            defaultValue="Pass"
            // type="password"
            id="password"
            autoComplete="current-password"
            size="small"
            // value={user.password}
            value={values.showPassword ? values.password : user.password}
            type={values.showPassword ? "text" : "password"}
            // onChange={(e) => setuser({ ...user, password: e.target.value })}
            onChange={(e) => { setuser({ ...user, password: e.target.value }); setValues({ ...values, password: e.target.value }) }}

            InputProps={{
              endAdornment:
                (<InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
                )
            }}
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            // loading={isButtonDisabled}
            onClick={() => handleSubmit()}
          >
            Sign In
          </LoadingButton>

          <Grid item sx={{ mb: "50px" }}>
            Already have an account?<Link href="/auth/login" variant="body2" >
              {" Sign In  "}
            </Link>
          </Grid>

        </Box>
      </Container>

    </ThemeProvider >
  )
}
export default CreateAccount



{/* <div style={{ margin: "20px 0 10px 20px" }}>
<Stack direction="column" spacing={2} style={{ alignItems: "center" }}>
<TextField
  error={errors.firstName ? true : false}
  type='text'
  id="outlined-error"
  label="First Name"
  placeholder='Enter First Name'
  value={user.firstname}
  onChange={(e) => setuser({ ...user, firstname: e.target.value })}
  // onChange={(e)=>firstNameHandle(e)}  

  required
// helperText={errors.firstName}
/>

<TextField
  error={errors.firstName ? true : false}
  type='text'
  id="outlined-error"
  label="Last Name"
  placeholder='Enter Last Name'
  value={user.lastname}
  onChange={(e) => { setuser({ ...user, lastname: e.target.value }) }}

  required
  helperText={errors.firstName}
/>

<TextField
  // error={errors.email ? true : false}
  type='email'
  id="outlined-error"
  label="Email"
  placeholder='Enter your email'
  value={user.email}
  onChange={(e) => { setuser({ ...user, email: e.target.value }) }}

  required
// helperText={errors.email}
/>

<TextField
  error={errors.password ? true : false}
  size="small"
  required
  name="password"
  placeholder="password"
  type="password"
  id="password"
  value={user.password}
  autoComplete="current-password"
  onChange={(e) => { setuser({ ...user, password: e.target.value }) }}
  // helperText={errors.password}
  autoFocus
// sx={{ minWidth: "100%" }}
/>

<Button type='submit' variant='contained' color='primary' onClick={() => handleSubmit()}>Submit</Button>

</Stack>
</div> */}

