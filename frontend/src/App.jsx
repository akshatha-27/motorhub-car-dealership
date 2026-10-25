import { useEffect, useRef, useState } from "react";
import "./App.css";

const API = "http://localhost:5000/api";

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [userRole, setUserRole] = useState(
    () => localStorage.getItem("role") || "",
  );
  const [adminForm, setAdminForm] = useState({
    make: "",
    model: "",
    category: "SUV",
    price: "",
    quantity: "",
  });

  const [editingId, setEditingId] = useState(null);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  };

  async function loadVehicles() {
    if (!token) return;

    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search.trim()) params.set("search", search.trim());
      if (category) params.set("category", category);

      const response = await fetch(`${API}/vehicles?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      console.log("Vehicles from API:", data);

      if (!response.ok)
        throw new Error(data.message || "Could not load inventory");
      setVehicles(data);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (token) loadVehicles();
  }, [token, search, category]);

  async function login(event) {
    event.preventDefault();
    setMessage("");

    try {
      const endpoint = isRegister ? "register" : "login";

      const body = isRegister ? { name, email, password } : { email, password };

      const response = await fetch(`${API}/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("username", data.user.name);
      setToken(data.token);
      setUserRole(data.user.role);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function restockVehicle(vehicleId) {
    const amount = Number(window.prompt("How many units do you want to add?"));

    if (!Number.isInteger(amount) || amount <= 0) {
      setMessage("Please enter a valid positive whole number.");
      return;
    }

    try {
      const response = await fetch(`${API}/vehicles/${vehicleId}/restock`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: amount }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not restock vehicle");
      }

      setMessage("Vehicle restocked successfully!");
      await loadVehicles();

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function deleteVehicle(vehicleId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this vehicle?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API}/vehicles/${vehicleId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not delete vehicle");
      }

      setMessage("Vehicle deleted successfully!");
      await loadVehicles();
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function saveVehicle(event) {
    event.preventDefault();
    setMessage("");

    try {
      const isEditing = Boolean(editingId);
      const response = await fetch(
        isEditing ? `${API}/vehicles/${editingId}` : `${API}/vehicles`,
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...adminForm,
            price: Number(adminForm.price),
            quantity: Number(adminForm.quantity),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not save vehicle");
      }

      setMessage(
        isEditing
          ? "Vehicle updated successfully!"
          : "Vehicle added successfully!",
      );
      setAdminForm({
        make: "",
        model: "",
        category: "SUV",
        price: "",
        quantity: "",
      });
      setEditingId(null);
      await loadVehicles();

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function purchase(vehicleId) {
    try {
      const response = await fetch(`${API}/vehicles/${vehicleId}/purchase`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Purchase failed");
      }

      await loadVehicles();
      setMessage("Purchase successful!");

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setMessage(error.message);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!token) {
    return (
      <main className="page">
        <section className="login-card">
          <p className="eyebrow">DEALERSHIP PORTAL</p>
          <h1>Car Inventory</h1>
          <p className="muted">Sign in to browse available vehicles.</p>

          <form onSubmit={login}>
            {isRegister && (
              <>
                <label>Name</label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </>
            )}
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button type="submit" className="primary full-width">
              {isRegister ? "Create account" : "Sign in"}
            </button>

            <button
              type="button"
              className="secondary full-width"
              onClick={() => {
                setIsRegister(!isRegister);
                setMessage("");
              }}
            >
              {isRegister
                ? "Already have an account? Sign in"
                : "New here? Create an account"}
            </button>
          </form>

          {message && <p className="message">{message}</p>}
        </section>
      </main>
    );
  }

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  return (
    <main className="page">
      <header className="topbar">
        <div className="page-heading">
          <span className="brand-icon">🚘</span>
          <h1>MotorHub</h1>
          <p>Discover vehicles. Manage inventory. Drive forward.</p>
        </div>

        <div className="header-controls">
          <input
            type="search"
            placeholder="Search vehicles..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter by category"
          >
            <option value="">All categories</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="MUV">MUV</option>
            <option value="Hatchback">Hatchback</option>
            <option value="Coupe">Coupe</option>
            <option value="Electric">Electric</option>
          </select>

          <button
            type="button"
            className="secondary header-refresh"
            onClick={loadVehicles}
          >
            Refresh
          </button>

          <div className="user-menu-container" ref={userMenuRef}>
            <button
              type="button"
              className="user-icon-button"
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              aria-label="Open user menu"
              aria-expanded={isUserMenuOpen}
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21v-2a8 8 0 0 1 16 0v2" />
              </svg>
            </button>

            {isUserMenuOpen && (
              <div className="user-dropdown">
                <p className="user-dropdown-name">
                  {localStorage.getItem("username") ||
                    localStorage.getItem("name") ||
                    JSON.parse(localStorage.getItem("user") || "{}").username ||
                    JSON.parse(localStorage.getItem("user") || "{}").name ||
                    "User"}
                </p>

                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {message && <p className="message">{message}</p>}

      {userRole === "admin" && (
        <section className="admin-panel">
          <div className="admin-panel-header">
            <div>
              <h2>{editingId ? "Edit Vehicle" : "Manage Inventory"}</h2>
              <p className="muted">
                Add new vehicles, update details, or manage stock levels.
              </p>
            </div>

            <span className="admin-badge">ADMIN</span>
          </div>

          <form onSubmit={saveVehicle} className="admin-form">
            <input
              placeholder="Make (e.g. Toyota)"
              value={adminForm.make}
              onChange={(e) =>
                setAdminForm({ ...adminForm, make: e.target.value })
              }
              required
            />

            <input
              placeholder="Model (e.g. Corolla)"
              value={adminForm.model}
              onChange={(e) =>
                setAdminForm({ ...adminForm, model: e.target.value })
              }
              required
            />

            <select
              value={adminForm.category}
              onChange={(e) =>
                setAdminForm({ ...adminForm, category: e.target.value })
              }
            >
              <option value="SUV">SUV</option>
              <option value="MUV">MUV</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="Coupe">Coupe</option>
              <option value="Electric">Electric</option>
            </select>

            <input
              type="number"
              placeholder="Price (₹)"
              min="0"
              step="0.01"
              value={adminForm.price}
              onChange={(e) =>
                setAdminForm({ ...adminForm, price: e.target.value })
              }
              required
            />

            <input
              type="number"
              placeholder="Stock quantity"
              min="0"
              step="1"
              value={adminForm.quantity}
              onChange={(e) =>
                setAdminForm({ ...adminForm, quantity: e.target.value })
              }
              required
            />

            <button type="submit" className="primary">
              {editingId ? "Save Changes" : "Add Vehicle"}
            </button>

            {editingId && (
              <button
                type="button"
                className="secondary"
                onClick={() => {
                  setEditingId(null);
                  setAdminForm({
                    make: "",
                    model: "",
                    category: "SUV",
                    price: "",
                    quantity: "",
                  });
                }}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </section>
      )}

      <div className="inventory-heading">
        <h2>Available Vehicles</h2>
        <span>{vehicles.length} results</span>
      </div>

      {loading ? (
        <p className="muted">Loading inventory...</p>
      ) : vehicles.length === 0 ? (
        <section className="empty-state">
          <h3>No vehicles found</h3>
          <p>Try another search or category.</p>
        </section>
      ) : (
        <section className="vehicle-grid">
          {vehicles.map((vehicle) => (
            <article className="vehicle-card" key={vehicle._id}>
              <div className="vehicle-art">
                <img
                  src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=900&q=80"
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="vehicle-image"
                />
              </div>

              <div className="vehicle-content">
                <span className="category-tag">{vehicle.category}</span>

                <h3>
                  {vehicle.make} {vehicle.model}
                </h3>

                <p className="stock">
                  {vehicle.quantity > 0
                    ? `${vehicle.quantity} in stock`
                    : "Out of stock"}
                </p>

                {userRole === "admin" && (
                  <div className="admin-actions">
                    <button
                      className="secondary"
                      onClick={() => {
                        setEditingId(vehicle._id);
                        setAdminForm({
                          make: vehicle.make,
                          model: vehicle.model,
                          category: vehicle.category,
                          price: String(vehicle.price),
                          quantity: String(vehicle.quantity),
                        });
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="secondary"
                      onClick={() => deleteVehicle(vehicle._id)}
                    >
                      Delete
                    </button>

                    <button
                      className="secondary"
                      onClick={() => restockVehicle(vehicle._id)}
                    >
                      Restock
                    </button>
                  </div>
                )}

                <div className="vehicle-footer">
                  <strong>
                    {Number(vehicle.price).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 0,
                    })}
                  </strong>

                  <button
                    className="primary"
                    disabled={
                      localStorage.getItem("role") === "admin" ||
                      vehicle.quantity === 0
                    }
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to purchase ${vehicle.make} ${vehicle.model}?`,
                        )
                      ) {
                        purchase(vehicle._id);
                      }
                    }}
                  >
                    Purchase
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default App;
