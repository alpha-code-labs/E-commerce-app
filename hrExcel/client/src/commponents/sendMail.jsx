import React, { useState } from "react";

const SendWelcomeMessage = () => {
  const [emailList, setEmailList] = useState([]);

  const addEmail = () => {
    const emailInput = document.getElementById("email");
    const email = emailInput.value.trim();

    if (email !== "" && isValidEmail(email)) {
      setEmailList((prevEmailList) => [...prevEmailList, email]);
      emailInput.value = "";
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const displayEmailList = () => {
    return emailList.map((email, index) => (
      <li key={index}>{email}</li>
    ));
  };

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  
    // Test the email against the pattern
    return emailPattern.test(email);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (emailList.length === 0) {
      alert("Please add at least one email address.");
      return;
    }

    try {
      const response = await fetch("/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: emailList }),
      });

      if (response.ok) {
        alert("Welcome message sent successfully!");
        setEmailList([]); // Clear the email list
      } else {
        alert("Failed to send welcome message.");
      }
    } catch (error) {
      console.error("Error sending welcome message:", error);
      alert("Error sending welcome message. Please try again.");
    }
  };

  return (
    <div>
      <h1>Send Welcome Message</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter Email:</label>
        <input type="email" id="email" name="email" required />
        <button type="button" onClick={addEmail}>Add Email</button>
        <button type="submit">Send Welcome Message</button>
      </form>
      <ul>{displayEmailList()}</ul>
    </div>
  );
};

export default SendWelcomeMessage;
