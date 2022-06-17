import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import axios from "axios";

export default function SavedPost() {
  const user: any = JSON.parse(localStorage.getItem("currentUser") || "[]");
  const token: any = JSON.parse(localStorage.getItem("token") || "[]");
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios(`http://localhost:8080/users/${user._id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res.data.Savedata);
        setUserData(res.data.Savedata);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(userData);

  const handleOpenPost = (id) => {
    console.log(id);
  };

  return (
    <Box
      sx={{
        position: "relative",
        left: "25%",
        width: 900,
        mt: 5,
      }}
    >
      {userData?.map((item, index) =>
        item?.FeedId?.image.map((img1, ind) => (
          <img
            style={{ margin: 10, width: 270, height: 270 }}
            // src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
            src={`http://localhost:8080/${img1.filename}`}
            // srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={"pic"}
            loading="lazy"
            onClick={() => handleOpenPost(item?.FeedId._id)}
          />
        ))
      )}
    </Box>
  );
}

//  {UserData.map((item) => (
//       // <ImageListItem key={item.img}>
