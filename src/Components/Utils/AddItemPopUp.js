import * as React from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material/";
import { useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import classes from "../Style/Utils.module.css";
import { currency_list } from "../Helpers/currencies";

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
  p: 4,
  height: "200px",
  textAlign: "center",
};

function AddItemPopUp(props) {
  const nameRef = React.useRef();
  const priceRef = React.useRef();
  const [currency, setCurrency] = React.useState("INR");
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className={classes.CreatePost}>
          <h3>{props.heading.toUpperCase()}</h3>
          <input
            type="text"
            placeholder="Item Name"
            className={classes.input}
            ref={nameRef}
          />
          <div className={classes.currency}>
            <input
              type="text"
              placeholder="Price"
              className={classes.input1}
              ref={priceRef}
            />
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={currency}
              sx={{ height: "2.5rem", alignSelf: "center" }}
              onChange={(e) => {
                setCurrency(e.target.value);
              }}
              autoWidth
              label="Age"
            >
              {Object.keys(currency_list).map((data) => (
                <MenuItem key={data} value={data}>
                  {data}
                </MenuItem>
              ))}
            </Select>
          </div>
          <button
            className={classes.btn}
            onClick={() => {
              props.handleAddItem(
                nameRef.current.value,
                Number(priceRef.current.value),
                currency
              );
            }}
          >
            Add Item
          </button>
        </div>
      </Box>
    </Modal>
  );
}

export default AddItemPopUp;
