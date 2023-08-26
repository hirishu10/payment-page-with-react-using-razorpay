import React, { useEffect, useState } from "react";
import "./App.css";
import loadScript from "./custom/loadScript";
import axios from "axios";
import StaticPage from "./StaticPage";
import { useNavigate } from "react-router-dom";

const Home = ({ navigation }) => {
  const navigate = useNavigate();
  /**
   * Customer Details state
   */
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerAmount, setCustomerAmount] = useState("");
  // ----------------------------------------------------------------

  /**
   * Tracking Id and status state
   */
  const [trackId, setTrackId] = useState("");
  const [getStatus, setStatus] = useState("");
  const [throwTrackingId, setThrowTrackingId] = useState({
    condition: false,
    uuid: "",
  });
  // ----------------------------------------------------------------

  /**
   * Button State for actions
   */
  const [dataRecieved, setDataRecieved] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);
  const [btnDisabled, seBtnDisabled] = useState(false);
  const [formError, setFormError] = useState("");
  // ----------------------------------------------------------------
  //

  /**
   * status - failed || success
   * message - String
   * paymentDetails - Oject
   *          - name : String
   *          - email : String
   *          - phoneNumber : Number
   *          - amount : Number
   *          - razorpay_order_id : String
   *          - razorpay_payment_id : String
   *          - razorpay_signature : String
   *          - payment_date : Date
   */
  const [fetchPayment, setPaymentDetails] = useState({
    status: "",
    message: "",
    paymentDetails: {
      name: "",
      email: "",
      phoneNumber: "",
      amount: "",
      razorpay_order_id: "",
      razorpay_payment_id: "",
      razorpay_signature: "",
      payment_date: "",
    },
  });

  /**
   * - Snippet for Refreshing the details
   */
  const Refresh_details = () => {
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setCustomerAmount("");
  };

  /**
   * Razorpay Checkout for payment
   */
  const razorpayPopup = () => {
    if (
      customerName !== "" &&
      customerEmail !== "" &&
      customerPhone !== "" &&
      customerPhone.length === 10 &&
      customerAmount !== ""
    ) {
      seBtnDisabled(true);
      loadScript("https://checkout.razorpay.com/v1/checkout.js")
        .then((ok) => {
          // create order and receve the order_id for payment
          axios
            .post("https://rishuapi.vercel.app/api/paymentpage/createOrder", {
              amount: customerAmount * 100, // amount in the smallest currency unit => (INDIAN Currency) => 100paisa is Rs.1 (so you have to multiply the same ammount wiht 100)
              receipt: "order_rcptid_10", // you can automactically change if you can
            })
            .then((res) => {
              const { orderDetails } = res.data;
              const { amount, id, currency } = orderDetails; // Pulling the some data from the orderDetails

              var options = {
                key: "rzp_test_CQhYw03W2mfalF", // Enter the Key ID generated from the Dashboard
                amount: parseInt(amount), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: currency,
                name: "Rishu Chowdhary",
                description: "Please donate thank you :)",
                image:
                  "https://raw.githubusercontent.com/hirishu10/my-assets/main/logo.png",
                order_id: id, //This is a sample Order ID. Pass the `id` obtained in the previous step
                handler: (response) => {
                  const datasend = {
                    name: customerName,
                    email: customerEmail,
                    amount: parseInt(amount),
                    phoneNumber: customerPhone,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                  };
                  pushDataIntoDatabase(datasend); // send the data for adding in the database
                },
                prefill: {
                  name: customerName,
                  email: customerEmail,
                  contact: customerPhone,
                },
                notes: {
                  address: "Please visit https://github.com/hirishu10",
                },
                theme: {
                  color: "#3399cc",
                },
              };
              const paymentScreen = new window.Razorpay(options);
              paymentScreen.open();
              seBtnDisabled(false);
              Refresh_details();
            })
            .catch((err) => {
              alert("server error!");
              seBtnDisabled(false);
            });
        })
        .catch((err) => {
          alert(err);
          seBtnDisabled(false);
        });
    } else {
      seBtnDisabled(false);
      setFormError("Please fill the form carefully");
    }
  };

  /**
   * Connect the database for updating the data
   */
  const pushDataIntoDatabase = (datasend) => {
    seBtnDisabled(true);
    axios
      .post(
        "https://rishuapi.vercel.app/api/paymentpage/paymentData",
        datasend,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((item) => {
        setThrowTrackingId({
          condition: true,
          uuid: item?.data?.data?._id,
        });
        Refresh_details();
        // console.log("item", item);
        navigate("/printBill", { state: item?.data?.data });
        setTimeout(() => {
          seBtnDisabled(false);
        }, [3000]);
      })
      .catch((err) => {
        console.log("err :>> ", err);
        navigate("/error");
      });
  };

  /**
   *
   * @param {*} trackingId - Tracking id which you received after successfully use (Try First)
   *
   * - Track Payment details from the server
   */
  const getPaymentDetails = (trackingId) => {
    axios
      .get(
        `https://rishuapi.vercel.app/api/paymentpage/trackPaymentDetails?id=${trackingId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((item) => {
        // console.log("item", item);// ::Debug
        setStatus(item?.data?.status);
        setPaymentDetails({
          status: item?.data?.status,
          message: item?.data?.message,
          paymentDetails: {
            name: item?.data?.details?.name,
            email: item?.data?.details?.email,
            phoneNumber: item?.data?.details?.phoneNumber,
            amount: item?.data?.details?.amount,
            razorpay_order_id: item?.data?.details?.razorpay_order_id,
            razorpay_payment_id: item?.data?.details?.razorpay_payment_id,
            razorpay_signature: item?.data?.details?.razorpay_signature,
            payment_date: item?.data?.details?.payment_date,
          },
        });
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  };

  /**
   * useEffect helps to render the updated data
   */
  useEffect(() => {}, [btnClicked, dataRecieved]);

  /**
   * Main Function
   */
  return (
    <div>
      <header className="App-header">
        {/*
         *
         * - Throw tracking id after payment done
         *
         */}
        {throwTrackingId.condition ? (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <div className="me-5" style={{ fontSize: 15 }}>
              <strong>{`Payment Tracking Id →   `}</strong>
              {`  ${throwTrackingId.uuid}`}
            </div>
            <button
              type="button"
              className="btn-close h-25"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={(e) => {
                e.preventDefault();
                setThrowTrackingId({
                  condition: false,
                  uuid: "",
                });
              }}
            ></button>
          </div>
        ) : null}
        {/* ------ */}
        {/*
         *
         * - LOGO (Not mandatory)
         *
         */}
        <img
          src="https://raw.githubusercontent.com/hirishu10/my-assets/main/top_log.png"
          width={100}
          height={70}
          alt={"logo"}
          className="logo-design"
        />
        {/* ------- */}

        {/*
         *
         * - First Try and QR-Code
         *
         */}
        <div style={{ display: "flex" }}>
          <div className="btn-design-div me-3">
            <p>
              Payment Page with <code>React</code>
            </p>
            <button
              className="btn-design btn btn-outline-success fw-bold"
              title="Donate"
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#userDetails"
              onClick={(e) => {
                e.preventDefault();
                setThrowTrackingId({
                  condition: false,
                  uuid: "",
                });
              }}
            >
              Try First
              {btnDisabled ? (
                <div
                  className="spinner-border spinner-border-sm ms-1"
                  role="status"
                >
                  <span className="sr-only"></span>
                </div>
              ) : null}
            </button>
            {/*
             *
             * - User modal for taking the input
             *
             */}
            <div
              className="modal fade"
              id="userDetails"
              tabIndex="-1"
              aria-labelledby="userDetailsLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header bg-primary">
                    <h5 className="modal-title" id="userDetailsLabel">
                      User Details
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                      onClick={(e) => {
                        e.preventDefault();
                        Refresh_details();
                        setFormError("");
                      }}
                    ></button>
                  </div>
                  <div className="modal-body">
                    {/* full name */}
                    <div className="input-group mb-3">
                      <span className="input-group-text">Full Name</span>
                      <input
                        type="text"
                        aria-label="Full name"
                        className="form-control"
                        value={customerName}
                        onChange={(e) => {
                          e.preventDefault();
                          setCustomerName(e.target.value);
                          setFormError("");
                        }}
                      />
                    </div>
                    {/* email */}
                    <div className="input-group mb-3">
                      <span className="input-group-text">Email Address</span>
                      <input
                        type="text"
                        aria-label="Email"
                        className="form-control"
                        value={customerEmail}
                        onChange={(e) => {
                          e.preventDefault();
                          setCustomerEmail(e.target.value);
                          setFormError("");
                        }}
                      />
                    </div>
                    {/* phone */}
                    <div className="input-group mb-3">
                      <span className="input-group-text">Phone Number</span>
                      <input
                        type="number"
                        maxLength={10}
                        aria-label="Phone"
                        className="form-control"
                        value={customerPhone}
                        onChange={(e) => {
                          e.preventDefault();
                          setCustomerPhone(e.target.value);
                          setFormError("");
                        }}
                      />
                    </div>
                    {/* amount */}
                    <div className="input-group mb-3">
                      <span className="input-group-text">Amount ₹</span>
                      <input
                        type="number"
                        aria-label="Phone"
                        className="form-control"
                        value={customerAmount}
                        onChange={(e) => {
                          e.preventDefault();
                          setCustomerAmount(e.target.value);
                          setFormError("");
                        }}
                      />
                    </div>
                    {/**************************************************/}
                  </div>
                  <p className="bg-danger text-light">{formError}</p>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                      onClick={(e) => {
                        e.preventDefault();
                        Refresh_details();
                        setFormError("");
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={razorpayPopup}
                      disabled={btnDisabled}
                      data-bs-dismiss={
                        customerName !== "" &&
                        customerEmail !== "" &&
                        customerPhone !== "" &&
                        customerPhone.length === 10 &&
                        customerAmount !== ""
                          ? "modal"
                          : ""
                      }
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/*
             *
             * - User modal end
             *
             */}
          </div>
          {/*
           *
           * - QR-Code Button
           *
           */}
          {/* Button trigger for open QR */}
          <button
            type="button"
            className="btn btn-outline-success"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Click to Scan QR
          </button>
          {/* Modal showing the QR */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-primary text-light">
                  <h5 className="modal-title" id="exampleModalLabel">
                    QR-Code
                  </h5>
                  <button
                    type="button"
                    className="btn-close btn-light"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body ">
                  {/* qr-Code image*/}
                  <div>
                    <img
                      className="qr-code"
                      src="https://raw.githubusercontent.com/hirishu10/my-assets/main/QrCode.jpeg"
                      alt="qr_code"
                    />
                  </div>
                  {/* qr-Code image*/}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-outline-dark "
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/*
           *
           * - QR - Code Ends
           *
           */}
        </div>
        {/*
         *
         * - First Try and QR-Code Ends
         *
         */}
        {/**************************************************/}
        {/*
         *
         * - Rest all the Buttons one by one below
         *
         */}
        <div className="after-header">
          <div
            className="ater-header-each"
            style={{
              borderLeft: "none",
            }}
          >
            <StaticPage
              val={"Button"}
              link={`${"https://razorpay.com/payment-button/pl_J096ecINoT34H7/view/?utm_source=payment_button&utm_medium=button&utm_campaign=payment_button"}`}
            />
          </div>
          {/* ********************* */}
          <div className="ater-header-each">
            <StaticPage val={"Page"} link={"https://rzp.io/l/8rx2IiPu3q"} />
          </div>
          {/* ********************* */}
          <div className="ater-header-each">
            <StaticPage val={"Link"} link={"https://rzp.io/i/uyyHz9B"} />
          </div>
        </div>
        {/* ********************* */}
        <div id="razor-btn">
          <form>
            <script
              src="https://checkout.razorpay.com/v1/payment-button.js"
              data-payment_button_id="pl_J096ecINoT34H7"
              async
            ></script>
          </form>
        </div>
        {/*
         *
         * - Rest all the Buttons one by one below
         *
         */}
        {/**************************************************/}
        {/*
         *
         * - Track Payment Data Feature
         *
         */}
        {/*  Button trigger modal for tracking data*/}
        <button
          type="button"
          className="btn btn-outline-warning mt-5"
          data-bs-toggle="modal"
          data-bs-target="#paymentDetails"
        >
          Track Payment Details
        </button>
        {/* Track payment Modal  */}
        <div
          className="modal fade"
          id="paymentDetails"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header bg-warning text-dark">
                <h5 className="modal-title" id="exampleModalLabel">
                  Payment Details (Try First Database)
                </h5>
                <button
                  type="button"
                  className="btn-close btn-light"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={(e) => {
                    e.preventDefault();
                    setDataRecieved(false);
                    setTrackId("");
                  }}
                ></button>
              </div>
              <div className="modal-body modal-body-custom">
                {/* top */}
                <div className="b-one">
                  <div className="input-group">
                    {/* Find by ID */}
                    <div className="input-group-text">Enter Track Id :</div>
                    <input
                      type="text"
                      className="form-control"
                      id="inlineTrackingId"
                      placeholder="Enter Tracking Number"
                      value={trackId}
                      onChange={(e) => {
                        e.preventDefault();
                        setTrackId(e.target.value);
                      }}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary track-button"
                      onClick={(e) => {
                        e.preventDefault();
                        if (trackId !== "") {
                          setDataRecieved(false);
                          setBtnClicked(true);
                          getPaymentDetails(trackId);
                          setTimeout(() => {
                            setBtnClicked(false);
                            setDataRecieved(true);
                          }, 2000);
                        } else {
                          alert("Please enter valid Tracking Id");
                        }
                      }}
                      disabled={btnClicked}
                    >
                      Track Details
                    </button>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "50%",
                      paddingLeft: 4,
                      paddingRight: 4,
                      display: "flex",
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                        fontSize: 14,
                      }}
                    ></div>
                    <div
                      style={{
                        width: "50%",
                        fontSize: 14,
                        textAlign: "center",
                        paddingTop: 5,
                        color: "black",
                      }}
                    >
                      {/* Displaying documents - {0} */}
                    </div>
                  </div>
                </div>
                {/* top-end */}
                {/* ********************* */}
                {/* bottom */}
                <div className="b-two">
                  {dataRecieved ? (
                    getStatus === "success" ? (
                      // Success
                      <>
                        <div className="alert alert-success" role="alert">
                          {fetchPayment.message}
                        </div>
                        <div className="list-container mb-3">
                          <div className="list-container-child">{`name :  ${fetchPayment?.paymentDetails?.name}`}</div>
                          <div className="list-container-child">{`email : ${fetchPayment?.paymentDetails?.email}`}</div>
                          <div className="list-container-child">{`phoneNumber : ${fetchPayment?.paymentDetails?.phoneNumber}`}</div>
                          <div className="list-container-child">{`amount : ${fetchPayment?.paymentDetails?.amount}`}</div>
                          <div className="list-container-child">{`payment_date : ${fetchPayment?.paymentDetails?.payment_date}`}</div>
                          <div className="list-container-child">{`razorpay_order_id : ${fetchPayment?.paymentDetails?.razorpay_order_id}`}</div>
                          <div className="list-container-child">{`razorpay_payment_id : ${fetchPayment?.paymentDetails?.razorpay_payment_id}`}</div>
                          <div className="list-container-child last-child">{`razorpay_signature : ${fetchPayment?.paymentDetails?.razorpay_signature}`}</div>
                        </div>
                      </>
                    ) : (
                      // Failed
                      <div className="alert alert-danger" role="alert">
                        {fetchPayment.message}
                      </div>
                    )
                  ) : (
                    <div className="list-container-nodata mb-5">
                      {btnClicked ? (
                        <div>
                          <div
                            className="spinner-border spinner-border-sm me-1"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          Getting data from the server.....
                        </div>
                      ) : (
                        `🔍 Please provide valid Tracking Id to fetch the payment details.....`
                      )}
                    </div>
                  )}
                </div>
                {/* bottom -end */}
                {/* ********************* */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-dark "
                  data-bs-dismiss="modal"
                  onClick={(e) => {
                    setDataRecieved(false);
                    setTrackId("");
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Track Payment Data */}
        {/*
         *
         * - Track Payment Data Feature ended
         *
         */}
      </header>
    </div>
  );
};

export default Home;
