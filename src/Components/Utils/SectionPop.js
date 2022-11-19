import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material/";
import { useDispatch } from "react-redux";
import classes from "../Style/Utils.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25vw",
  maxWidth: "680px",
  minWidth: "250px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: "40px",
  p: 4,
  height: "150px",
  textAlign: "center",
};

function SectionPop(props) {
  const nameRef = React.useRef();
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={classes.CreatePost}>
          <input
            type="text"
            placeholder="Section Name"
            className={classes.input}
            ref={nameRef}
          />

          <button
            className={classes.btn}
            onClick={() => {
              props.handleCreateSection(nameRef.current.value);
            }}
          >
            Create Section
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default SectionPop;
