"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileUploader } from "react-drag-drop-files";
import downloadBtn from "../../../assets/images/dowload.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ColorRing } from "react-loader-spinner";

const AddMovieForm = () => {
  const [title, setTitle] = useState("");
  const [publishingYear, setPublishingYear] = useState(null);
  const fileTypes = ["JPEG", "PNG", "GIF"];
  const [file, setFile] = useState(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (file) => {
    setFile(file);
  };

  const isValidYear = (year) => /^\d{4}$/.test(year);

  const handleAddMovie = async () => {
    setIsLoading(true);
    try {
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
      const response = await axios.post("/api/movies/add", {
        title,
        publishingYear,
      });
      if (response.status === 200) {
        toast.success("Movie added successfully", {
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
        setTitle("");
        setPublishingYear(null);
        // You can add additional logic, such as resetting form fields or updating state
      } else {
        toast.error("Failed to add movie", {
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
      console.error(
        "Error adding movie:",
        error.response?.data || error.message
      );
      toast.error("Error adding movie", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const handleCancel = () => {
    router.push("/movielist", { scroll: false });
  };

  return (
    <div className="new-movie-page">
      <ColorRing
        visible={true}
        height="0"
        width="0"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
      <div className="container">
        <div class="page-heading">
          <h1>Create a new movie</h1>
        </div>

        <div className="form-section">
          <div className="row f-direction_R_md">
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
              <div className="input-area-btns d-none-desk mb-5">
                <div className="row">
                  <div className="col-6">
                    <button
                      className="btn btnSecondary w-100"
                      onClick={handleAddMovie}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      className="btn btnPrimary w-100"
                      onClick={handleAddMovie}
                    >
                      {isLoading ? (
                      <ColorRing
                        visible={true}
                        height="30"
                        width="35"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                      />
                    ) : (
                      "Submit"
                    )}
                    </button>
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
                />
                <input
                  className="year-input"
                  type="text"
                  placeholder="Publishing year"
                  onChange={(e) => setPublishingYear(e.target.value)}
                />
                <div className="input-area-btns d-none-md">
                  <button
                    className="btn btnSecondary w-100"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btnPrimary w-100"
                    onClick={handleAddMovie}
                  >
                    {isLoading ? (
                      <ColorRing
                        visible={true}
                        height="30"
                        width="35"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
                      />
                    ) : (
                      "Submit"
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

export default AddMovieForm;
