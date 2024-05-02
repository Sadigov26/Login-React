import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./Hero.module.css";

const Hero = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://northwind.vercel.app/api/categories");
      const data = response.data[0]; // Assuming the response is an array and you want to pre-fill with the first item
      setFullName(data.fullName || "");
      setEmail(data.email || "");
      setMessage(data.message || "");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async () => {
    if (!fullName || !email || !message) {
      setFormError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await axios.post("https://northwind.vercel.app/api/categories", {
        fullName,
        email,
        message
      });
      console.log("Response:", response.data); // Logging the response from the API
      // Optionally, you can reset the form fields here
      setFullName("");
      setEmail("");
      setMessage("");
      setFormError("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className={style.hero}>
      <div className={style.heroContainer}>
        <div className={style.inputTop}>
          <h1>Contact Us</h1>
        </div>
        <div className={style.inputName}>
          <div>
            <label htmlFor="firstName">First name</label>
            <input type="text" id="firstName" name="firstName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div>
            <label htmlFor="lastName">Last name</label>
            <input type="text" id="lastName" name="lastName" />
          </div>
        </div>
        <div className={style.inputemail}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={style.inputMesaj}>
          <label htmlFor="message">Leave us a few words</label>
          <textarea id="message" name="message" rows="4" cols="50" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        <div className={style.inputBtn}>
          {formError && <p>{formError}</p>}
          <button onClick={handleSubmit} disabled={!fullName || !email || !message}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
