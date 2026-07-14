import React, { useEffect, useRef, useState } from "react";

const API_URL = "http://localhost:3001/api/contact";

function Contact() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const didFetch = useRef(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "Regular Guest",
    email: "", 
    phone: "",
    notes: "",
  });

  const [editId, setEditId] = useState(null);

  // GET
  const getContacts = async () => {
    try {
      const res = await fetch(API_URL);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const result = await res.json();

      if (result.success) {
        setContacts(result.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    getContacts();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // POST & PUT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId ? `${API_URL}/${editId}` : API_URL;
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        getContacts();

        setFormData({
          name: "",
          role: "Regular Guest",
          email: "",
          phone: "",
          notes: "",
        });

        setEditId(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);

    setFormData({
      name: item.name,
      role: item.role,
      email: item.email,
      phone: item.phone,
      notes: item.notes,
    });
  };

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Delete Contact?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        getContacts();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const filteredContacts = contacts.filter(
    (item) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="contact-page">
  <div className="contact-form-card">

    <h2>Add New Contact</h2>

    <form onSubmit={handleSubmit} className="contact-entry-form">

      <div className="input-box">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter Full Name"
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
          placeholder="Enter Email"
        />
      </div>

      <div className="input-box">
        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter Phone Number"
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
          placeholder="Enter Notes"
        />
      </div>

      <button type="submit" className="submit-btn">
        {editId ? "Update Contact" : "Save Contact"}
      </button>

    </form>

  </div>
</div>
  );
}

export default Contact;