import React from "react";
import { useLocation } from "react-router-dom";
// import "../styles/printbill.css";
import "../styles/test.css";
import { getCustomDTFormatter } from "@hirishu10/simple-date-time";

export default function PrintBill() {
  const location = useLocation();
  // console.log("location", location);
  const { state } = location;

  return (
    <div className="mainParent">
      <div className="childParent">
        <div className="parernt">
          <header>
            <h1 className="h1">Test Invoice</h1>
            <address
            // contentEditable
            >
              <p>{state?.name ? state?.name : ""}</p>
              <p>
                {"101 E. Chapman Ave"}
                <br />
                {"Orange, CA 92866"}
              </p>
              <p>(+91) {state?.phoneNumber ? state?.phoneNumber : ""}</p>
            </address>
            <span>
              <img
                alt=""
                src="https://raw.githubusercontent.com/hirishu10/my-assets/main/top_log.png"
              />
              {/* <input type="file" accept="image/*" /> */}
            </span>
          </header>
          <article>
            <h1 className="h1">Recipient</h1>
            <address>
              <p>
                {"Test Company"}
                <br />
                {"C/O Rishu Chowdhary"}
              </p>
            </address>
            <table className="table meta">
              <tr>
                <th>
                  <span>Invoice #</span>
                </th>
                <td>
                  <span>{"123xxx"}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <span>Date</span>
                </th>
                <td>
                  <span>
                    {getCustomDTFormatter().format("MMp dt yyyy", { dt: ", " })}
                  </span>
                </td>
              </tr>
              <tr>
                <th>
                  <span>Amount Due</span>
                </th>
                <td>
                  <span id="prefix">₹</span>
                  <span>{`${state?.amount ? state?.amount : "0"}.00`}</span>
                </td>
              </tr>
            </table>
            <table className="table inventory">
              <thead>
                <tr>
                  <th>
                    <span>Particulars</span>
                  </th>
                  <th>
                    <span>Description</span>
                  </th>
                  <th>
                    <span>Amount</span>
                  </th>
                  <th>
                    <span>Quantity</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {/* <a className="cut">-</a> */}
                    <span>{"Test Account Particulars"}</span>
                  </td>
                  <td>
                    <span>{"Test Account Description"}</span>
                  </td>
                  <td>
                    <span data-prefix>₹</span>
                    <span>{`${state?.amount ? state?.amount : "0"}.00`}</span>
                  </td>
                  <td>
                    <span>1</span>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* <a className="add">+</a> */}
            <table className="table balance">
              <tr>
                <th>
                  <span>Total</span>
                </th>
                <td>
                  <span data-prefix>₹</span>
                  <span>{`${state?.amount ? state?.amount : "0"}.00`}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <span>Amount Paid</span>
                </th>
                <td>
                  <span>₹</span>
                  <span>{`${state?.amount ? state?.amount : "0"}.00`}</span>
                </td>
              </tr>
              <tr>
                <th>
                  <span>Balance Due</span>
                </th>
                <td>
                  <span>₹</span>
                  <span>0.00</span>
                </td>
              </tr>
            </table>
          </article>
          <aside>
            <h1 className="h1">
              <span>Additional Notes</span>
            </h1>
            <div
              style={{
                // backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p>
                This invoice is only for testing purpose, above details is not
                true.
              </p>
            </div>
          </aside>
          <div
            className="noprint"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "200px",
            }}
          >
            <button
              style={{
                padding: "5px 15px",
                background: "none",
                border: "1px solid silver",
                boxShadow: "0px 0px 2px 1px black",
              }}
              onClick={() => {
                window?.print();
              }}
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
