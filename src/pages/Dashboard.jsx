import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

function Dashboard() {
    // const navigate = useNavigate();
  const [urls, setUrls] = useState([]);
  const [originalUrl, setOriginalUrl] = useState("");
//    const [urls, setUrls] = useState([]);
   const navigate = useNavigate();

  useEffect(() => {
    fetchUrls();
  }, []);

  const fetchUrls = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/url/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUrls(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const createShortUrl = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");

    await API.post(
      "/url/shorten",
      {
        url: originalUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Short URL Created ");

    setOriginalUrl("");

    fetchUrls();

  } catch (error) {
    console.log(error);
  }
};

const deleteUrl = async (id) => {
  try {
    const token = localStorage.getItem("token");

    await API.delete(`/url/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    toast.success("URL Deleted Successfully ");

    fetchUrls();

  } catch (error) {
    console.log(error);
  }
};


const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};
  return (
   <div className="container mt-5 text-center">
     <button
  onClick={handleLogout}
  className="btn btn-dark logout-btn"
>
  Logout
</button>
<h3 className="dashboard-title">
  URL Shortener Dashboard
</h3>
     <form
  onSubmit={createShortUrl}
  className="d-flex justify-content-center align-items-center gap-2 mb-4"
>
  <input
    type="text"
    className="form-control custom-input"
    style={{ width: "400px" }}
    placeholder="Enter URL"
    value={originalUrl}
    onChange={(e) => setOriginalUrl(e.target.value)}
  />

  <button
    type="submit"
    className="btn btn-primary custom-btn"
  >
    Shorten URL
  </button>
</form>

<br />

      {urls.map((url) => (
  <div
    key={url.id}
    className="card shadow mb-3"
    className="card shadow mb-3 mx-auto"
className="form-control custom-input"
  >
    <div className="card-body">
          <p>
            <strong>Original URL:</strong> {url.original_url}
          </p>

          <p>
  <strong>Short URL:</strong>{" "}
  <a
    href={`http://localhost:5000/${url.short_code}`}
    target="_blank"
    rel="noreferrer"
  >
    {`http://localhost:5000/${url.short_code}`}
  </a>
</p>

<button
  className="btn btn-success me-2"
  onClick={() =>
    navigator.clipboard.writeText(
      `http://localhost:5000/${url.short_code}`
    )
  }
>
  Copy URL
</button>

          <p>
            <strong>Clicks:</strong> {url.clicks}
          </p>
<button
  className="btn btn-danger"
  onClick={() => deleteUrl(url.id)}
>
  Delete
</button>

          <hr />
        </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;