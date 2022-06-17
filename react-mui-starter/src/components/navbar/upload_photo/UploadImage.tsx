import {
  Box,
  Button,
  Grid,
  Stack,
  Typography,
  Avatar,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
// import Paper from '@mui/material/Paper';
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import "./UploadImage.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { authenticationService } from "../../../utils/auth.service";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

interface FileList {
  lastModified: number;
  lastModifiedDate: object;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

// type Props = {}
interface PropsFunction {
  handleClose1: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%)",
  width: "632px",
  height: "410px",
  bgcolor: "background.paper",
  border: "2px solid #fff	",
  boxShadow: 10,
  // p: 2,
};

const style1 = {
  position: "absolute" as "absolute",
  top: "10%",
  left: "50%",
  transform: "translate(-50%)",
  width: "732px",
  height: "400px",
  bgcolor: "background.paper",
  border: "2px solid #fff	",
  boxShadow: 10,
  // p: 2,
};

const style2 = {
  position: "absolute" as "absolute",
  top: "0",
  left: "",
  transform: "translate(-50%)",
  width: "732px",
  height: "500px",
  bgcolor: "background.paper",
  border: "2px solid #fff	",
  boxShadow: 10,
  // p: 2,
};

const UploadImage = ({ handleClose1 }: PropsFunction) => {
  //image upload
  const [image, setImage] = React.useState([]); //<FileList | null>(null)
  // const [img, setimg] = useState<any>([])
  const inputFile = useRef<any>(null);

  //image slider
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = image.length; //max min disable

  //if image selected
  const [toggle, setToggle] = useState(false);
  const [count, setcount] = useState(0);
  //upload
  const [next, setNext] = useState(false);

  //add more image and preview
  const [addImage, setAddImage] = useState(false);

  const [caption, setCaption] = useState("");

  const handleFileUpload = (e: any) => {
    const { files } = e.target;
    console.log(e);
    if (files && files.length) {
      // const filename = files[0].name;
      console.log(e.target.files);
      const temp: any = Array.from(e.target.files);

      console.log(temp);
      setImage(temp);
      console.log(typeof files);
      setToggle(true);
    }
  };

  console.log(image);
  // console.log(image.length);
  // console.log(count);

  const onButtonClick = () => {
    inputFile.current.click();
  };

  const handleFileUpload1 = (e: any) => {
    const { files } = e.target;
    console.log(e);
    if (files && files.length) {
      // const filename = files[0].name;
      console.log(e.target.files);
      const temp: any = Array.from(e.target.files);
      console.log(temp);

      setImage([...image, ...temp]);
    }
  };

  // console.log(image);

  const onButtonClick1 = () => {
    inputFile.current.click();
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  //delete image
  const deleteImage = (index: number) => {
    setImage(image.filter((img, ind) => ind !== index));
  };

  //shwoImage container
  const shwoImage = () => {
    console.log(image);
    if (addImage) {
      setAddImage(false);
    } else {
      setAddImage(true);
    }
  };

  //add Post
  const handlePost = () => {
    // console.log(typeof image);
    console.log(image);
    console.log(caption);

    let formData = new FormData();
    // words = ["apple", "ball", "cat"]
    image.forEach((item) => formData.append("Image", item));
    formData.append("caption", caption);
    // verify the data
    console.log(formData.getAll("Image"));
    console.log(formData.getAll("caption"));

    authenticationService.addPost(formData);
  };

  // function demo(x: any) {
  // 	console.log("demo", x);

  // }

  return (
    <div>
      {/* image upload 1 modal */}
      {!next ? (
        <Box sx={style}>
          {!toggle && !next ? (
            <>
              <button
                style={{
                  float: "right",
                  border: "none",
                  backgroundColor: "#fff",
                }}
                onClick={handleClose1}
              >
                X
              </button>
              <Grid container style={{ justifyContent: "center" }}>
                <Stack spacing={2}>
                  <img alt="d" src={require("./images/Uploading.png")}></img>

                  <Typography>Drag photo from device to upload</Typography>

                  <Grid item xs={12} sm={12}>
                    <input
                      style={{ display: "none" }}
                      // accept=".zip,.rar"
                      ref={inputFile}
                      onChange={handleFileUpload}
                      // onChange={(e) => { setImage([...image, ...e.target.files]); setToggle(true) }}
                      type="file"
                      multiple
                    />
                    <Button
                      style={{
                        marginLeft: "9%",
                        marginTop: "20%",
                        borderRadius: "12px",
                      }}
                      onClick={onButtonClick}
                      color="primary"
                      variant="contained"
                    >
                      Upload from Device
                    </Button>

                    {/* <button>
									<input
									type="file"
									id="upload-button"
									// hidden
									onChange={handleChange}
								     ></input>Upload</button> */}
                  </Grid>
                </Stack>
              </Grid>
            </>
          ) : (
            ""
          )}

          {/* image upload 2nd modal next */}
          {toggle ? (
            // <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Stack
                direction="row"
                style={{ borderBottom: "0.05px solid black" }}
              >
                <button style={{ width: "55px", border: "none" }}>
                  <ArrowBackIcon />
                </button>
                <button
                  className="btn"
                  style={{
                    width: "55px",
                    border: "none",
                    marginLeft: "85%",
                    color: "primary",
                  }}
                  onClick={() => {
                    setToggle(false);
                    setNext(true);
                    setcount(0);
                  }}
                >
                  Next
                </button>
              </Stack>
              <Box>
                <AutoPlaySwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                  autoplay={false}
                >
                  {image != null &&
                    image.map((step: any, index) => (
                      // console.log(activeStep),
                      <div key={index}>
                        {Math.abs(activeStep - index) <= 2 ? (
                          <Box
                            component="img"
                            sx={{
                              mt: "2px",
                              height: 380,
                              display: "block",
                              // maxWidth: 803,
                              overflow: "hidden",
                              width: "100%",
                            }}
                            src={URL.createObjectURL(step)}
                            // src={require(`/home/am-pc-56/Downloads/${step}`)}
                            alt="pic"
                          />
                        ) : null}
                      </div>
                    ))}
                </AutoPlaySwipeableViews>

                {/* image container preview */}
                {addImage ? (
                  <div className="imageContainer">
                    {image != null &&
                      image.map((step: any, index) => (
                        // console.log(activeStep)
                        <div key={index}>
                          <div
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <button
                              className="deleteButton"
                              onClick={() => deleteImage(index)}
                            >
                              x
                            </button>
                            {
                              // Math.abs(activeStep - index) <= 2 ? (
                              <Box
                                component="img"
                                sx={{
                                  mt: "1px",
                                  ml: "5px",
                                  height: 90,
                                  display: "block",
                                  // maxWidth: 503,
                                  // marginRight: "5px",
                                  overflow: "hidden",
                                  width: 120,
                                  marginRight: "10px",
                                }}
                                src={URL.createObjectURL(step)}
                                // src={require(`/home/am-pc-56/Downloads/${step}`)}
                                alt="pic"
                              />
                              // )
                              // : null
                            }
                          </div>
                        </div>
                      ))}
                    {/* box on Container */}

                    {image.length < 4 ? (
                      <Box
                        sx={{
                          // mt: "15px",
                          width: 120,
                          height: 90,
                          overflow: "hidden",
                          backgroundColor: "white",
                        }}
                      >
                        <input
                          style={{ display: "none" }}
                          // accept=".zip,.rar"
                          ref={inputFile}
                          onChange={handleFileUpload1}
                          type="file"
                          multiple
                        />
                        <button
                          onClick={onButtonClick1}
                          className="addImageIconButton"
                        >
                          <AddAPhotoIcon />
                        </button>
                        <button
                          style={{
                            border: "none",
                            position: "absolute",
                            marginLeft: "24px",
                            marginTop: "30px",
                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                          }}
                        >
                          <ArrowCircleRightIcon />
                        </button>
                      </Box>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                  ""
                )}
              </Box>
              {/* image upload */}
              {count < image.length - 1 ? (
                <KeyboardArrowRight
                  onClick={() => {
                    handleNext();
                    setcount((prev) => prev + 1);
                  }}
                  // disabled={count === image.length - 2}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "95%",
                    transform: "translate(-50%, -50%)",
                    //  -ms-transform: "translate(-50%, -50%)";
                    // backgroundColor: "#555",
                    color: "black",
                    fontSize: "30px",
                    padding: " 12px 24px",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                />
              ) : (
                ""
              )}

              {count === 0 ? (
                ""
              ) : (
                <KeyboardArrowLeft
                  onClick={() => {
                    handleBack();
                    setcount((prev) => prev - 1);
                  }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "3%",
                    transform: "translate(-50%, -50%)",
                    // -ms-transform: "translate(-50%, -50%)";
                    // backgroundColor: "#555",
                    color: "black",
                    fontSize: "30px",
                    padding: " 12px 24px",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                />
              )}
              <img
                className="uploadImage"
                src={require("./images/showImage.png")}
                alt="show"
                onClick={() => shwoImage()}
              ></img>
            </div>
          ) : (
            ""
          )}
        </Box>
      ) : (
        ""
      )}

      {/* image upload */}
      {next ? (
        <Box sx={style1}>
          <div
            className="container"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <button
              className="btn"
              style={{
                width: "55px",
                border: "none",
                marginLeft: "91%",
                color: "primary",
              }}
              onClick={() => {
                setToggle(false);
                setNext(true);
                handlePost();
              }}
            >
              Upload
            </button>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "400px",
                  border: "none",
                }}
              >
                <AutoPlaySwipeableViews
                  axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                  autoplay={false}
                >
                  {image != null &&
                    image.map((step: any, index) => (
                      // console.log(activeStep),

                      <div key={index}>
                        {Math.abs(activeStep - index) <= 2 ? (
                          <Box
                            component="img"
                            sx={{
                              mt: "2px",
                              height: 380,
                              display: "block",
                              // maxWidth: 803,
                              overflow: "hidden",
                              width: "395px",
                            }}
                            src={URL.createObjectURL(step)}
                            // src={require(`/home/am-pc-56/Downloads/${step}`)}
                            alt="pic"
                          />
                        ) : null}
                      </div>
                    ))}
                </AutoPlaySwipeableViews>
                {count < image.length - 1 ? (
                  <KeyboardArrowRight
                    onClick={() => {
                      handleNext();
                      setcount((prev) => prev + 1);
                    }}
                    // disabled={activeStep === maxSteps - 1}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      //  -ms-transform: "translate(-50%, -50%)";
                      // backgroundColor: "#555",
                      color: "black",
                      fontSize: "30px",
                      padding: " 12px 24px",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  />
                ) : (
                  ""
                )}

                {count === 0 ? (
                  ""
                ) : (
                  <KeyboardArrowLeft
                    onClick={() => {
                      handleBack();
                      setcount((prev) => prev - 1);
                    }}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "3%",
                      transform: "translate(-50%, -50%)",
                      // -ms-transform: "translate(-50%, -50%)";
                      // backgroundColor: "#555",
                      color: "black",
                      fontSize: "30px",
                      padding: " 12px 24px",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  />
                )}
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "10px",
                  marginBottom: "10px",
                }}
              >
                <Stack direction="row" spacing="1">
                  <Avatar style={{ width: "28px", height: "28px" }}>AJ</Avatar>

                  <Typography
                    style={{
                      fontWeight: "14px",
                      marginTop: "2px",
                      marginLeft: "15px",
                      fontFamily: "Public-Sans",
                    }}
                  >
                    Atish Jagtap
                  </Typography>
                </Stack>

                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Write a Caption"
                  onChange={(e) => setCaption(e.target.value)}
                  style={{
                    width: "300px",
                    height: 100,
                    marginTop: "10px",
                    marginBottom: "30px",
                  }}
                />

                <Stack
                  direction="row"
                  spacing="1"
                  sx={{ marginBottom: "10px" }}
                >
                  {/* <img src={require("./images/emoji.png")} alt="emoji"></img> */}
                  <button style={{ border: "none", marginRight: "4px" }}>
                    <SentimentSatisfiedAltIcon />
                  </button>
                  <TextField
                    size="small"
                    placeholder="0/2000"
                    inputProps={{ readOnly: true }}
                    style={{ width: "275px" }}
                  ></TextField>
                </Stack>

                <Stack
                  direction="row"
                  spacing="1"
                  sx={{
                    marginBottom: "10px",
                  }}
                >
                  <TextField
                    size="small"
                    inputProps={{ readOnly: true }}
                    style={{ width: "275px", marginRight: "5px" }}
                    placeholder="Add Location"
                  ></TextField>
                  {/* <img src={require("./images/location.png")} alt="emoji"></img> */}
                  <button style={{ border: "none" }}>
                    <LocationOnIcon />
                  </button>
                </Stack>

                <Stack direction="row" spacing="1">
                  <TextField
                    size="small"
                    inputProps={{ readOnly: true }}
                    style={{ width: "275px", marginRight: "5px" }}
                    placeholder="Add Image"
                  ></TextField>
                  {/* <img src={require("./images/addImage.png")} alt="emoji"></img> */}
                  <button style={{ border: "none" }}>
                    <AddAPhotoIcon />
                  </button>
                </Stack>
              </div>
            </div>
          </div>
        </Box>
      ) : (
        ""
      )}
    </div>
  );
};

export default UploadImage;
