import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material/";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import { Player } from "@lottiefiles/react-lottie-player";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30vw",
  maxWidth: "680px",
  minWidth: "250px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "40px",
  p: 3,
  height: "200px",
  textAlign: "center",
};

function SuccessPopUp(props) {
  const auth = useSelector((data) => data.auth);
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div>
          <Player
            style={{
              height: "100px",
              marginTop: "10px",
            }}
            src="https://assets3.lottiefiles.com/packages/lf20_Yk0pxWYfo6.json"
            autoplay
            loop
          ></Player>
          <p>{auth.success.message}</p>
          <CloseIcon
            fontSize="large"
            sx={{ position: "fixed", bottom: "1rem", ml: "-1.4rem" }}
            onClick={props.handleClose}
          />
        </div>
      </Box>
    </Modal>
  );
}

export default SuccessPopUp;
