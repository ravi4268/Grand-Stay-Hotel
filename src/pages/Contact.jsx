import React, { useEffect, useRef, useState } from "react";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3001/api/contact";

function Contact() {
  const didFetch = useRef(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "Regular Guest",
    email: "",
    phone: "",
    notes: "",
  });

  const [editId, setEditId] = useState(null);

  const getContacts = async () => {
    try {
      await fetch(API_URL);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    getContacts();
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        editId ? `${API_URL}/${editId}` : API_URL,
        {
          method: editId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (result.success) {
        setFormData({
          name: "",
          role: "Regular Guest",
          email: "",
          phone: "",
          notes: "",
        });

        setEditId(null);

        getContacts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-form-card">
        <h2>{editId ? "Update Contact" : "Add New Contact"}</h2>

        <form onSubmit={handleSubmit} className="contact-entry-form">
          <div className="input-box">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Role</label>

            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="Regular Guest">Regular Guest</option>
              <option value="VIP Guest">VIP Guest</option>
              <option value="Vendor">Vendor</option>
            </select>
          </div>

          <div className="input-box">
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-box">
            <label>Phone</label>

            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="input-box">
            <label>Notes</label>

            <textarea
              rows="4"
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
            />
          </div>

          <button className="submit-btn" type="submit">
            {editId ? "Update Contact" : "Save Contact"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;