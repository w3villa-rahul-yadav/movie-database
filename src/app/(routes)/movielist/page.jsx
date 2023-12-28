"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import { ColorRing } from "react-loader-spinner";
import { FaEdit } from "react-icons/fa";

const Movielist = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch("/api/movies/list");
        const data = await response.json();
        setMovies(data?.movies);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const [itemOffset, setItemOffset] = useState(0);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const itemsPerPage = 8;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = movies?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(movies?.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % movies?.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {isLoading ? (
        <div className="loader-box">
          <ColorRing
            visible={true}
            height="200"
            width="200"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#2BD17E", "#2BD17E", "#2BD17E", "#2BD17E", "#2BD17E"]}
          />
        </div>
      ) : movies?.length > 0 ? (
        <div className="container">
          <div className="page-heading">
            <h1>
              My movies
              <Link href="/AddNewMovie">
                <img src="/add-white.svg" alt="" />
              </Link>
            </h1>
            <div>
              <div className="logoutBtn">
                <a className="text-white text-dec-none" href="/login">
                  <div>
                    <span className="d-none-sm">Logout</span>
                    <img className="ml-10 " src="/logout-white.svg" alt="" />
                  </div>
                </a>
              </div>
            </div>
          </div>
          {/* movies card Loop should start from columns */}
          <div className="row">
            {currentItems &&
              currentItems.map((movie) => (
                <div className="col-xl-3 col-sm-6 col-6" key={movie._id}>
                  <div className="cards">
                    <Image
                      src="/movie-poster.png"
                      alt=""
                      width={100}
                      height={100}
                    />
                    <div className="cards_titles-box">
                      <div className="cards_titles">
                        <div className="cards_titles_heading">
                          {movie?.title}
                        </div>
                        <div className="cards_titles_subheading">
                          {movie?.publishingYear}
                        </div>
                      </div>
                        <Link
                          href={`/EditMovie?id=${encodeURIComponent(movie._id)}`}
                        >
                          {" "}
                          <div className="editIcon">
                            <FaEdit />
                          </div>
                        </Link>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={2}
            pageCount={pageCount}
            previousLabel="Prev"
            renderOnZeroPageCount={null}
            className="movie-paginate"
          />
          {/* Pagination code should run here */}
        </div>
      ) : (
        <div className="no-movies">
          <div>
            <h1>Your movie list is empty</h1>
            <button className="btn btnPrimary">Add a new movie</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Movielist;
