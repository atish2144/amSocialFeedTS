import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./login.scss";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { authenticationService } from "../../../utils/auth.service";
import LoadingButton from "@mui/lab/LoadingButton";
import { GoogleLogin } from 'react-google-login';
import { InputAdornment } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';


interface State {

  password: string;
  showPassword: boolean;

}

const Root = styled('div')(({ theme }) => ({
  width: '100%',
  ...theme.typography.body2,
  '& > :not(style) + :not(style)': {
    marginTop: theme.spacing(2),
  },
}));


export default function Login() {
  // Initial hooks
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { handleSubmit } = useForm();
  const theme = createTheme();
  const [data, setdata] = useState({
    email: "",
    password: ""
  })

  const [toggle, setToggle] = useState(false)
  const [values, setValues] = React.useState<State>({
    password: '',
    showPassword: false,
  });

  /*
   * Verify Credentials
   */
  const doLogin = (formData: any) => {
    console.log(data);

    setButtonDisabled(true);
    authenticationService
      .verifyCredentials(data)
      .then((response: any) => {
        setButtonDisabled(false);
      })
      .catch((error) => {
        setButtonDisabled(false);
      });
  };

  const signup = () => {
    authenticationService.handleSignup();

  };

  const ForgetPassword = () => {
    authenticationService.handleForget();
  }


  // const handleChange =
  //   (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setValues({ ...values, [prop]: event.target.value });
  //   };

  const handleClickShowPassword = () => {
    // console.log(values);

    // console.log(values.password);

    setValues({
      ...values,
      showPassword: true,
    });
    setToggle(true)
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // console.log(values);

    setValues({
      ...values,
      showPassword: false,
    });
  };




  /*
   * Render
   */
  return (
    <ThemeProvider theme={theme}>

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            boxShadow: 3,
            paddingLeft: 5,
            paddingRight: 5
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginTop: 5, fontWeight: "bolder" }}>
            Sign in to Social Feed
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(doLogin)}
            noValidate
            sx={{ mt: 1 }}

          >
            <TextField
              margin="normal"
              required
              fullWidth
              defaultValue="navanath@angularminds.com"
              value={data.email}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              size="small"
              sx={{ Width: "200px" }}
              onChange={(e) => setdata({ ...data, email: e.target.value })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              defaultValue="Pass"
              value={values.showPassword ? values.password : data.password}
              type={values.showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              size="small"
              onChange={(e) => { setdata({ ...data, password: e.target.value }); setValues({ ...values, password: e.target.value }) }}
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

            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, backgroundColor: "#1890FF" }}
              loading={isButtonDisabled}
            >
              Sign In
            </LoadingButton>
            <Grid container>

              <Grid item >
                {/* <Link href="#" variant="body2" onClick={handleSubmit(ForgetPassword)} > */}
                <Typography sx={{ marginLeft: "180px", mb: 3 }} onClick={handleSubmit(ForgetPassword)}>
                  {"Forgot  password?"}
                </Typography>

                {/* </Link> */}
              </Grid>

              <Grid item sx={{ mb: "30px" }}
              >
                Don't have an account?<Link href="/auth/signup" variant="body2" onClick={handleSubmit(signup)}>
                  {" Sign Up"}
                </Link>
              </Grid>

              {/* <Grid item sx={{ mb: "50px" }}> */}
              <Root >
                <Divider>OR</Divider>
              </Root>
              {/* </Grid> */}


              <Grid item sx={{ mt: "20px", ml: "60px", mb: "50px" }}>
                <GoogleLogin
                  clientId="85092170565-0jqeuldra1nj5rt4999rhh4snpnn62dl.apps.googleusercontent.com"
                  buttonText="Sign in With Google"
                  // onSuccess={responseGoogle}
                  // onFailure={responseGoogle}
                  style={{ marginBottom: "30px", marginLeft: "auto", marginRight: "auto" }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

    </ThemeProvider >
  );
}
