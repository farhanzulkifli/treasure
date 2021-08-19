import React ,{Component} from "react";
import { useState } from "react";
import { Link, Redirect,useHistory } from "react-router-dom";
import axios from "axios";

function CreateProfile() {
const history = useHistory()
  
    class CloudinaryUploadWidget extends Component {
    componentDidMount() {
      var myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: "farhanzulkifli",
          uploadPreset: "y3lwyvxh",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Done! Here is the image info: ", result.info)
            setPicture(result.info.url)
          }
        }
      );
      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }

    render() {
      return <button id="upload_widget">Upload a photo</button>;
    }
  }

  require("dotenv").config();
  const url = process.env.REACT_APP_BASE_URL;
  const [isSuccess, setIsSuccess] = useState(false);
  const [valid, setValid] = useState(false);
  const [picture, setPicture] = useState("")
  const [age, setAge] = useState("")


  const handleCreateProfile = (event) => {
    event.preventDefault();
    axios
      .post(
        `${url}/profile/`,
        {
          nickname: event.target.nickname.value,
          address: event.target.address.value,
          age: event.target.age.value,
          about_me: event.target.about_me.value,
          image_src: !picture ? "https://c.files.bbci.co.uk/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg": event.target.image_src.value,
        },
        {
          headers: {
            Authorization: localStorage.getItem("access_token")
              ? "Bearer " + localStorage.getItem("access_token")
              : null,
          },
        }
      )
      .then(function (res) {
        console.log(res);
        if (res.status === 200) {
        //   setIsSuccess(true);
        history.push("/home/dashboard")
        }
      })
      .catch(function (err) {
        console.log(err);
        setValid(true);
      });
  };

  return (
    <>
      <div className="SignUpForm">
        <h1 style={{ color: "#17252A" }}>Create Profile</h1>
        <div>
            <CloudinaryUploadWidget />
          </div>
        <form onSubmit={handleCreateProfile}>
          <div className="user-box">
            <input type="text" name="nickname" required/>
            <label>Nickname</label>
          </div>
          <div className="user-box">
            <input type="text" name="address"/>
            <label>Address</label>
          </div>
          <div className="user-box">
            <input type="number" name="age"required/>
            <label>Age</label>
          </div>
          <div className="user-box">
            <input type="text" name="about_me"/>
            <label>About Me</label>
          </div>
          <div className="user-box">
            <input type="text" name="image_src" defaultValue = {picture}/>
            <label>Image</label>
          </div>
          <div>
            <button className="btstyle">Go</button>
          </div>
        </form>
        {/* {isSuccess && <Redirect to="/home/dashboard" />} */}
      
      </div>
    </>
  );
}

export default CreateProfile;
