import React, { useEffect, useState } from "react";
import "./ContactPayment.css";

const API_URL = "http://localhost:3001/api/contact";

function ContactPayment() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch(API_URL);
      const result = await res.json();

      if (result.success) {
        setContacts(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Delete Contact?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        fetchContacts();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="contact-payment-container">
      <h1 className="title">📞 Contact Details</h1>

      <div className="contact-grid">
        {contacts.map((item) => (
          <div className="contact-card" key={item._id}>
            <h2>{item.name}</h2>

            <p>
              <strong>Email:</strong> {item.email}
            </p>

            <p>
              <strong>Subject:</strong> {item.subject}
            </p>

            <p>
              <strong>Message:</strong> {item.message}
            </p>

            <button
              className="delete-btn"
              onClick={() => deleteContact(item._id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContactPayment;