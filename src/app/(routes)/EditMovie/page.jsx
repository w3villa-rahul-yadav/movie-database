"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileUploader } from "react-drag-drop-files";
import downloadBtn from "../../../assets/images/dowload.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ColorRing } from "react-loader-spinner";

const EditMovieForm = () => {
  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState("");
  const [movieId, setMovieId] = useState(null);
  const fileTypes = ["JPEG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    const movieUrl = new URLSearchParams(window.location.search).get("id");
    setMovieId(movieUrl);
    if (movieUrl) {
      const fetchMovieDetails = async () => {
        try {
          const response = await axios.get(`/api/movies/${movieUrl}`);
          const { title, publishingYear } = response.data.movie;
          setTitle(title);
          setPublishingYear(publishingYear);
          setIsLoading(false);
        } catch (error) {
          console.error(
            "Error fetching movie details:",
            error.response?.data || error.message
          );
          setIsLoading(false);
          // Handle error, e.g., redirect to the movie listing page
        }
      };

      fetchMovieDetails();
    }
  }, [router]);

  const handleChange = (file) => {
    setFile(file);
  };

  const isValidYear = (year) => /^\d{4}$/.test(year);

  const handleEditMovie = async () => {
    setIsLoading(true);
    try {
      // Validate the publishingYear
      if (!isValidYear(publishingYear)) {
        toast.error("Invalid year format. Please enter a 4-digit year.", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsLoading(false);
        return;
      }
      const response = await axios.put(`/api/movies/edit/${movieId}`, {
        title,
        publishingYear,
      });
      if (response.status === 200) {
        toast.success("Movie updated successfully", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsLoading(false);
        router.push("/movielist", { scroll: false });
        // You can add additional logic, such as resetting form fields or updating state
      } else {
        toast.error("Failed to update  movie", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setIsLoading(false);
      }
      console.log("Movie added successfully:", response.data);
      setIsLoading(false);
      // You can add additional logic, such as resetting form fields or updating state
    } catch (error) {
      console.error("Error updating movie:", error.response?.data?.message);
      toast.error(`Error updating movie: ${error.response?.data?.message}`, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push("/movielist", { scroll: false });
  };

  return (
    <div className="new-movie-page">
      <div className="container">
        <div className="page-heading">
          <h1> Edit</h1>
        </div>
        <div className="form-section">
          <div className="row">
            <div className="col-lg-6">
              <div className="file-uploader">
                <div className="file-uploader-area">
                  <FileUploader
                    multiple={true}
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                  />
                  <div className="file-uploader-layer">
                    <div>
                      <Image src={downloadBtn} alt="img" />
                    </div>
                    {file
                      ? `File name: ${file[0].name}`
                      : "Drop other image here"}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="input-area">
                <input
                  type="text"
                  name=""
                  placeholder="Title"
                  id=""
                  onChange={(e) => setTitle(e.target.value)}
                  className="title-input"
                  value={title}
                />
                <input
                  className="year-input"
                  type="text"
                  placeholder="Publishing year"
                  onChange={(e) => setPublishingYear(e.target.value)}
                  value={publishingYear}
                />
                <div className="input-area-btns">
                  <button
                    className="btn btnSecondary w-100"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btnPrimary w-100"
                    onClick={handleEditMovie}
                  >
                    {isLoading ? (
                        <ColorRing
                          visible={true}
                          height="20"
                          width="20"
                          ariaLabel="color-ring-loading"
                          wrapperStyle={{}}
                          wrapperClass="color-ring-wrapper"
                          colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                        />
                      ) : (
                        "Update"
                      )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMovieForm;
