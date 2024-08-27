import Head from "next/head";

import Layout from "@/Components/layout.jsx";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useState } from "react";

import InputField from "@/Components/InputField";
import ButtonCom from "@/Components/ButtonCom";
import { BasicButton } from "@/Components/BasicButton";
import server from "@/Methods/Server";
import Toast from "@/Components/Tost";
import { ArrowCircleUp2 } from "iconsax-react";
import { ArrowCircleDown2 } from "iconsax-react";

import { colors } from '../Methods/colors.js';
import { formatNumber } from "@/Methods/formateNumber.js";
import { nepaliDateConveter } from "@/Methods/nepaliDate.js";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Home() {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [formType, setFormType] = useState("");
  const [open, setOpen] = useState(false);
  const [transaction, setTransactino] = useState([]);

  const handleOpen = (type) => {
    setFormType(type);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const [addIncome, setIncome] = useState({
    price: "",
    description: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setIncome((prevIncome) => ({
      ...prevIncome,
      [name]: value,
    }));
  };
  const handelSubmit = async () => {
    // Log form type
    try {
      const data = {
        price: parseFloat(addIncome.price),
        types: formType,
        description: addIncome.description,
      };
      console.log("Data=", data);
      const response = await server.post(`api/income`, data);
      if (response.status === 200) {
        setOpen(false);
        <Toast message={`${response.data.message}`} status="success" />;
      } else {
        <Toast message={`${response.data.message}`} status="error" />;
        console.log(message);
      }
    } catch (error) {
      <Toast message={`${error}`} status="error" />;
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetchTransaction();
    fetchCount();

  }, []);
  const [countData, setCountData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0
  });
  const fetchCount = async () => {
    try {
      const res = await server.get("/api/count?count=incomeexp");
      if (res.status === 200) {
        setCountData(res.data.data);
        console.log("res=", res.data.data);
      } else {

      }
    } catch (error) {

    }
  }
  const [loading, setLoading] = useState(true);
  const fetchTransaction = async () => {
    try {
      const res = await server.get("/api/income");
      if (res.status === 200) {
        setTransactino(res.data.data);
        console.log(res.data.data);
        setLoading(false);
      } else {
        console.log("error", res.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const rentrunDiv = () => {
    switch (formType) {
      case "income":
        return (
          <>
            <InputField
              id="price"
              label="Price"
              variant="outlined"
              name="price"
              value={addIncome.price}
              onChange={handleInputChange}
            />
            <InputField
              id="description"
              label="Description"
              variant="outlined"
              name="description"
              value={addIncome.description}
              onChange={handleInputChange}
            />

            <BasicButton
              onClick={handleClose}
              variant="outlined"
              color="primary"
            >
              Close
            </BasicButton>

            <BasicButton
              onClick={handelSubmit}
              variant="outlined"
              color="secondary"
            >
              Send
            </BasicButton>
          </>
        );
      case "expense":
        return (
          <>
            <InputField
              id="price"
              label="Price"
              variant="outlined"
              name="price"
              value={addIncome.price}
              onChange={handleInputChange}
            />
            <InputField
              id="description"
              label="Description"
              variant="outlined"
              name="description"
              value={addIncome.description}
              onChange={handleInputChange}
            />

            <BasicButton
              onClick={handleClose}
              variant="outlined"
              color="primary"
            >
              Close
            </BasicButton>

            <BasicButton
              onClick={handelSubmit}
              variant="outlined"
              color="secondary"
            >
              Send
            </BasicButton>
          </>
        );
      case "view_income":
        return (
          <>
            <h1>View Income</h1>
            <div className="custom_card">
              <div className="custom_carddetails">
                <div className="custome_card_top">
                  <p className="">Total Balance</p>
                  <h1> {formatNumber(countData.totalBalance)}</h1>

                </div>
                <div className="card_buttom">
                  <div className="card_left">
                    <div className="card_contain">
                      <div className="flex">
                        <div className="card_icon">
                          <ArrowCircleUp2 color="#008000" />
                        </div>
                        <div className="card_name">
                          <p className="flex">Income</p>
                        </div>
                      </div>

                      <div>
                        <h3>{formatNumber(countData.totalExpense)}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="card_right">
                    <div className="card_contain">
                      <div className="flex">
                        <div className="card_icon">
                          <ArrowCircleDown2 color={`${colors.red}`} />
                        </div>
                        <div className="card_name">
                          <p>Expenses</p>
                        </div>
                      </div>
                      <div>
                        <h3>{formatNumber(countData.totalExpense)}</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <BasicButton
              onClick={handleClose}
              variant="outlined"
              color="primary"
            >
              Close
            </BasicButton>
          </>
        );
      case "view_expense":
        return (
          <>
            <h1>View Expense</h1>
            <BasicButton
              onClick={handleClose}
              variant="outlined"
              color="primary"
            >
              Close
            </BasicButton>
          </>
        );
      case "test":
        return (
          <>
            <h1>View Income</h1>
            <BasicButton
              onClick={handleClose}
              variant="outlined"
              color="primary"
            >
              Close
            </BasicButton>
          </>
        );
      case "test":
        return (
          <>
            <h1>View Income</h1>
            <BasicButton
              onClick={handleClose}
              variant="outlined"
              color="primary"
            >
              Close
            </BasicButton>
          </>
        );
      case "test":
        return (
          <>
            <h1>View Income</h1>
            <BasicButton
              onClick={handleClose}
              variant="outlined"
              color="primary"
            >
              Close
            </BasicButton>
          </>
        );
    }
  };
  return (
    <>
      <Head>
        <title>Income Expense Tracker</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <>

        <Layout>

          <div className="custom_card">
            <div className="custom_carddetails">
              <div className="custome_card_top">
                <p className="">Total Balance</p>
                <h1> {formatNumber(countData.totalBalance)}</h1>

              </div>
              <div className="card_buttom">
                <div className="card_left">
                  <div className="card_contain">
                    <div className="flex">
                      <div className="card_icon">
                        <ArrowCircleUp2 color="#008000" />
                      </div>
                      <div className="card_name">
                        <p className="flex">Income</p>
                      </div>
                    </div>

                    <div>
                      <h3>{formatNumber(countData.totalExpense)}</h3>
                    </div>
                  </div>
                </div>
                <div className="card_right">
                  <div className="card_contain">
                    <div className="flex">
                      <div className="card_icon">
                        <ArrowCircleDown2 color={`${colors.red}`} />
                      </div>
                      <div className="card_name">
                        <p>Expenses</p>
                      </div>
                    </div>
                    <div>
                      <h3>{formatNumber(countData.totalExpense)}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="buttons">
            <BasicButton
              onClick={() => handleOpen("income")}
              variant="outlined"
              color="primary"
            >
              Add Income
            </BasicButton>
            <BasicButton
              onClick={() => handleOpen("expense")}
              variant="outlined"
              color="primary"
            >
              Add Expenses
            </BasicButton>
            <BasicButton
              onClick={() => handleOpen("view_income")}
              variant="outlined"
              color="primary"
            >
              View Income
            </BasicButton>
            <BasicButton
              onClick={() => handleOpen("view_expense")}
              variant="outlined"
              color="primary"
            >
              View Expenses
            </BasicButton>
          </div>
          <div className="transaction">
            {loading ? (
              <>
                <p>Loading...</p>
              </>
            ) : (
              <>
                {transaction &&
                  transaction.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="list_show flex justify-between items-center p-5"
                      >
                        <div className="left_show">
                          <h3>{item.description}</h3>
                          <p>{nepaliDateConveter(item.createdAt)}</p>

                        </div>
                        <div className="right_show">
                          <p className={`font-extrabold ${item.types == "expense" ? "text-red-500" : "text-green-500"}`}>
                            {formatNumber(item.price)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
          <div className="add_income">
            <div>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {/* form in Add Income */}

                    {rentrunDiv()}
                  </Typography>
                  {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor
                    ligula.
                  </Typography> */}
                </Box>
              </Modal>
            </div>
          </div>
        </Layout>
      </>
    </>
  );
}
