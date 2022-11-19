import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { APIUrls } from "../Helpers/urls";
import ShareIcon from "@mui/icons-material/Share";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import classes from "../Style/Customer.module.css";
import AddIcon from "@mui/icons-material/Add";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { useDispatch } from "react-redux";
import { sendOrder } from "../../actions/auth";
function View() {
  const { custom, id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState({});
  const [invoice, setInvoice] = useState({});
  const [currency, setCurrency] = useState("");
  const [total, setTotal] = useState(0);
  const [trigger, setTrigger] = useState(true);
  const [summary, setSummary] = useState(false);
  const tableRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOrder = (item, price, currency) => {
    setInvoice((prev) => {
      if (prev[item] === undefined) {
        prev[item] = {
          qty: 1,
          price: price,
        };
        return {
          ...prev,
        };
      } else {
        prev[item].qty = prev[item].qty + 1;
        return {
          ...prev,
        };
      }
    });
    setTrigger((prev) => {
      return !prev;
    });
    setCurrency(currency);
  };
  const handleSendOrder = () => {
    const obj = {
      restId: id,
      email: response.profile.email,
      message: "Item \t Quantity \t Price/Order",
    };
    for (let key in invoice) {
      obj[
        "message"
      ] += `\n${key} \t ${invoice[key].qty} \t ${invoice[key].price} `;
    }
    obj["message"] += `\n Table Number: ${tableRef.current.value}`;
    dispatch(sendOrder(obj));
    setSummary(false);
    setTotal(false);
    setInvoice({});
  };
  const handleChange = (item, val) => {
    setInvoice((prev) => {
      console.log(val === 0);

      prev[item].qty = Number(val);
      return prev;
    });
    setTrigger((prev) => {
      return !prev;
    });
  };
  useEffect(() => {
    const url = APIUrls.getMenu() + id;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          setResponse(data);
          setIsLoading(false);
          console.log(data);
        }
      });
  }, []);

  useEffect(() => {
    setTotal(
      Object.keys(invoice).reduce((result, item) => {
        return result + invoice[item].qty * invoice[item].price;
      }, 0)
    );
  }, [trigger]);
  return (
    <div>
      {isLoading ? (
        <Player
          style={{
            height: "300px",
            marginTop: "91px",
          }}
          src="https://assets10.lottiefiles.com/private_files/lf30_l8csvun7.json"
          autoplay
          loop
        ></Player>
      ) : (
        <div className={classes.View}>
          <ArrowBackIcon
            sx={{ color: "#4b0000", m: "1rem", cursor: "pointer" }}
            fontSize="large"
            onClick={() => {
              navigate("/");
            }}
          />
          <div
            className={`${classes.Header} animate__animated animate__flipInX animate__delay-0s `}
          >
            <img src={response.profile.logo} alt=" " />
            <div className={classes.details}>
              <h1>{response.profile.restname.toUpperCase()}</h1>
              <p>
                {response.profile.address},pincode=
                {response.profile.pincode}{" "}
              </p>
              <ShareIcon sx={{ cursor: "pointer" }} />
            </div>
          </div>
          {Object.keys(response.data).map((item) => (
            <>
              <div
                className={`${classes.Section} animate__animated animate__slideInLeft animate__delay-0s `}
              >
                <h3>{item.toUpperCase()}</h3>
              </div>
              {response.data[item].map((data) => (
                <div
                  className={`${classes.item} animate__animated animate__slideInRight animate__delay-1s `}
                >
                  <p>{data.item}</p>
                  <p>
                    {data.price + " " + data.currency}{" "}
                    {invoice[data.item] === undefined ||
                    invoice[data.item].qty === 0 ? (
                      <AddIcon
                        sx={{ alignSelf: "center" }}
                        onClick={() => {
                          handleOrder(data.item, data.price, data.currency);
                        }}
                      />
                    ) : (
                      <>
                        <input
                          type="number"
                          className={classes.qty}
                          defaultValue={invoice[data.item].qty}
                          min="0"
                          onChange={(e) => {
                            handleChange(data.item, e.target.value);
                          }}
                        />
                      </>
                    )}{" "}
                  </p>
                </div>
              ))}
            </>
          ))}
        </div>
      )}
      {total >= 1 && (
        <div className={classes.summary}>
          {summary && (
            <div
              className={`${classes.list} animate__animated animate__fadeInUp animate__delay-0s `}
            >
              <table>
                <tr>
                  <th>Item</th>
                  <th>Qty.</th>
                  <th>Price</th>
                </tr>
                {Object.keys(invoice).map((data) => {
                  if (invoice[data].qty === 0) {
                    return;
                  }
                  return (
                    <tr>
                      <td>{data}</td>
                      <td>{invoice[data].qty}</td>
                      <td>
                        {invoice[data].price * invoice[data].qty}
                        {" " + currency}
                      </td>
                    </tr>
                  );
                })}
              </table>
              <input
                className={classes.input1}
                ref={tableRef}
                placeholder="Table number"
              />
              <button className={classes.btn1} onClick={handleSendOrder}>
                Place order
              </button>
            </div>
          )}
          <div
            className={`${classes.order} animate__animated animate__fadeInUp animate__delay-0`}
            onClick={() => {
              setSummary(!summary);
            }}
          >
            <div>
              <h2>{total + " " + currency}</h2>
              <p>Order Now</p>
            </div>
            <FastForwardIcon fontSize="large" sx={{ alignSelf: "center" }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default View;
