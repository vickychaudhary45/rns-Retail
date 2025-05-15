import { useState } from "react";
import {
  Slider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  LinearProgress,
} from "@mui/material";
import AvatarEditor from "react-avatar-editor";

const UploadImage = ({ uploadProcess, onImageChange, openStatus, setUploadModal }) => {
  const [image, setImage] = useState("");
  const [crop, setCrop] = useState(null);
  const [slider, setSlider] = useState(1.2);
  const [msg, setMsg] = useState('');

  const closeModal = (e) => {
    e.preventDefault();
    setUploadModal(false);
    setImage("");
    setCrop({});
  };

  const changeSlider = (event, value) => {
    event.preventDefault();
    if (value > 1.2) {
      setSlider(value);
    } else {
      setSlider(1.2);
    }
  };

  const onUploadImage = async (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (file && allowedTypes.includes(file.type)) {
      setImage(URL.createObjectURL(file));
    } else {
      setMsg("Invalid file type");
      setTimeout(() => {
        setMsg("");
      }, 2000);
    }
  };

  const cropImage = async (e) => {
    if (crop) {
      onImageChange(crop.getImage().toDataURL());
    }
  };

  const setEditorRef = (editor) => {
    setCrop(editor);
  };

  return (
    <>
      <Dialog aria-labelledby="customized-dialog-title" open={openStatus}>
        <DialogTitle id="customized-dialog-title">Upload Image</DialogTitle>
        <DialogContent dividers>
          {image ? (
            <div>
              <AvatarEditor
                ref={setEditorRef}
                image={image}
                width={250}
                height={250}
                border={60}
                borderRadius={120}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={slider}
                rotate={0}
              />
              <Slider
                defaultValue={2}
                step={0.4}
                value={slider}
                onChange={changeSlider}
                min={1.2}
                max={20}
                aria-labelledby="continuous-slider"
                size="small"
              />
            </div>
          ) : (
            <>
            <div style={{color: "red"}}>{msg}</div>
            <Button variant="contained" component="label" sx={{
              color: `rgba(0, 0, 0, 0.87)`,
              boxShadow: `0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)`,
              backgroundColor: "#e0e0e0",
              "&:hover": {
                boxShadow: `0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)`,
                backgroundColor: `#d5d5d5`
              }
            }}>
              Upload File
              <input type="file" hidden onChange={(e) => onUploadImage(e)} />
            </Button>
            </>
          )}
          {uploadProcess ? <LinearProgress /> : ""}
        </DialogContent>
        {!uploadProcess ? (
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={(e) => closeModal(e)} 
            sx={{
              color: "#fff",
              backgroundColor: "#f50057",
              "&:hover": {
                backgroundColor: "#c51162"
              }
          }}
            >
              Cancel
            </Button>
            {image ? (
              <Button variant="contained" color="primary" onClick={(e) => cropImage(e)}
              sx={{
                color: "#fff",
                backgroundColor: "#3f51b5",
                "&:hover": {
                  backgroundColor: "#303f9f"
                }
            }}
              >
                Save
              </Button>
            ) : (
              ""
            )}
          </DialogActions>
        ) : (
          ""
        )}
      </Dialog>
    </>
  );
};

export default UploadImage;
