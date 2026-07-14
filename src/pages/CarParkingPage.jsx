import React, { useEffect, useRef, useState } from "react";

const API_URL = "http://localhost:3001/api/parking";

function CarParkingPage() {
  const [vehicles, setVehicles] = useState([]);
  const didFetch = useRef(false);

  const [formData, setFormData] = useState({
    ownerName: "",
    vehiclePlate: "",
    parkingSlot: "",
    entryTime: "",
  });

  const [editId, setEditId] = useState(null);
  const [isMonitoringActive, setIsMonitoringActive] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const getVehicles = async () => {
    try {
      const res = await fetch(API_URL);
      const result = await res.json();

      if (result.success === true) {
        setVehicles(result.data);
      }
    } catch (error) {
      console.log("GET Error:", error);
    }
  };

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    getVehicles();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editId ? `${API_URL}/${editId}` : API_URL;
    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const result = await res.json();

    if (result.success === true) {
      if (editId) {
        setVehicles((prev) =>
          prev.map((item) => (item._id === editId ? result.data : item))
        );
      } else {
        setVehicles((prev) => [result.data, ...prev]);
      }

      setFormData({
        ownerName: "",
        vehiclePlate: "",
        parkingSlot: "",
        entryTime: "",
      });

      setEditId(null);
    }
  };

  const handleEdit = (vehicle) => {
    setEditId(vehicle._id);
    setFormData({
      ownerName: vehicle.ownerName || "",
      vehiclePlate: vehicle.vehiclePlate || "",
      parkingSlot: vehicle.parkingSlot || "",
      entryTime: vehicle.entryTime || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this vehicle?")) return;

    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const result = await res.json();

    if (result.success === true) {
      setVehicles((prev) => prev.filter((item) => item._id !== id));
    }
  };

  return (
    <div className="parking-page">
      <div className="parking-header">
        <div>
          <h2>🚗 Hotel Parking Management</h2>
          <p>Track guest vehicles and parking CCTV.</p>
        </div>
        <span className="parking-summary-pill">{vehicles.length} vehicles</span>
      </div>

      <div className="parking-stats-grid">
        <div className="parking-stat-card">
          <h3>Cars tracked</h3>
          <p>{vehicles.length}</p>
        </div>

        <div className="parking-stat-card">
          <h3>Open slots</h3>
          <p>{Math.max(20 - vehicles.length, 0)}</p>
        </div>

        <div className="parking-stat-card">
          <h3>Camera</h3>
          <p>{isCameraOn ? "Online" : "Offline"}</p>
        </div>
      </div>

      <form className="parking-form" onSubmit={handleSubmit}>
        <div className="people-form-group">
          <label>Owner Name</label>
          <input
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
            placeholder="Owner Name"
            required
          />
        </div>

        <div className="people-form-group">
          <label>Vehicle Plate</label>
          <input
            name="vehiclePlate"
            value={formData.vehiclePlate}
            onChange={handleChange}
            placeholder="RJ25 AB 1234"
            required
          />
        </div>

        <div className="people-form-group">
          <label>Parking Slot</label>
          <input
            name="parkingSlot"
            value={formData.parkingSlot}
            onChange={handleChange}
            placeholder="A-12"
            required
          />
        </div>

        <div className="people-form-group">
          <label>Entry Time</label>
          <input
            name="entryTime"
            value={formData.entryTime}
            onChange={handleChange}
            placeholder="10:30 AM"
            required
          />
        </div>

        <button className="people-submit-btn" type="submit">
          {editId ? "Update Vehicle" : "Add Vehicle"}
        </button>
      </form>

      <section className="cctv-section">
        <div className="cctv-header">
          <div>
            <p className="section-label">Security overview</p>
            <h3>Parking CCTV</h3>
          </div>

          <div className="cctv-controls">
            <button
              type="button"
              className="cctv-toggle-main"
              onClick={() => setIsMonitoringActive(!isMonitoringActive)}
            >
              {isMonitoringActive ? "Pause Monitoring" : "Resume Monitoring"}
            </button>

            <span className="cctv-live-pill is-active">
              {isMonitoringActive ? "● Monitoring active" : "● Monitoring paused"}
            </span>
          </div>
        </div>

        <div className="cctv-stats-grid">
          <div className="cctv-stat-card">
            <strong>1</strong>
            <span>Parking camera</span>
          </div>

          <div className="cctv-stat-card">
            <strong>{isMonitoringActive ? "98%" : "72%"}</strong>
            <span>Signal stability</span>
          </div>

          <div className="cctv-stat-card">
            <strong>{isMonitoringActive ? "2" : "0"}</strong>
            <span>Alerts today</span>
          </div>
        </div>

        <div className="cctv-fullview-card">
          <div
            className={`cctv-fullview-viewport parking-view ${
              isCameraOn && isMonitoringActive ? "" : "cctv-viewport-off"
            }`}
          >
            <span className="cctv-badge">Parking View</span>
            <span className="cctv-live-dot">
              {isCameraOn && isMonitoringActive ? "● LIVE" : "● OFF"}
            </span>
            <span className="cctv-timestamp">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>

            <div className="cctv-fullview-overlay">
              <h4>Entry lane and gate monitoring</h4>
              <p>Parking camera feed is active.</p>
            </div>
          </div>
        </div>

        <div className="cctv-grid">
          <article className="cctv-card cctv-card-active">
            <div
              className={`cctv-viewport parking-view ${
                isCameraOn && isMonitoringActive ? "" : "cctv-viewport-off"
              }`}
            >
              <span className="cctv-badge">Parking</span>

              <button type="button" className="cctv-corner-btn cctv-top-btn">
                Open View
              </button>

              <button
                type="button"
                className="cctv-toggle-btn cctv-corner-btn cctv-bottom-btn"
                onClick={() => setIsCameraOn(!isCameraOn)}
              >
                {isCameraOn ? "Camera On" : "Camera Off"}
              </button>
            </div>

            <div className="cctv-card-body">
              <h4>Parking entrance</h4>
              <p>Vehicle and pedestrian tracking across the hotel parking area.</p>
            </div>
          </article>
        </div>
      </section>

      <div className="parking-grid">
        {vehicles.length === 0 ? (
          <div className="empty-state">No vehicles found.</div>
        ) : (
          vehicles.map((vehicle) => (
            <div key={vehicle._id} className="parking-card">
              <div className="parking-card-icon">🚗</div>

              <div className="parking-card-body">
                <h3>{vehicle.ownerName}</h3>
                <p>Plate: {vehicle.vehiclePlate}</p>
                <p>Slot: {vehicle.parkingSlot}</p>
                <p>Entry: {vehicle.entryTime}</p>
                <span className="parking-status">Parked</span>

                <div className="parking-actions">
                  <button onClick={() => handleEdit(vehicle)}>Edit</button>
                  <button
                    className="parking-delete-btn"
                    onClick={() => handleDelete(vehicle._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CarParkingPage;