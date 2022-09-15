import "./movies.style.css";
import Slider from "react-slick";
import { BsFillPlayFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getNowPlayingMovies } from "../store/actions";
import { useEffect, useState } from "react";

function MoviesSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  const { NetflixNowPlayings } = useSelector((state) => state.infoMovies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNowPlayingMovies());
  }, [dispatch]);

  const [show, setShow] = useState(true);
  return (
    <div className="w-full bg-black text-white overflow-x-hidden overflow-y-hidden">
      <Slider {...settings}>
        {NetflixNowPlayings &&
          NetflixNowPlayings.length > 0 &&
          NetflixNowPlayings.map((movie, index) => (
            <div key={index} className="relative w-full h-screen">
              <div
                className="detail relative h-screen"
                style={
                  movie
                    ? {
                        backgroundImage: `url(http://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                        backgroundSize: "cover",
                      }
                    : {}
                }
              >
                <div className="item-content absolute left-16">
                  <h1 className="text-white text-4xl select-none">
                    {movie.title} || {movie.name}
                  </h1>
                  <p className="text-white pt-10 w-full select-none">
                    {movie.overview}
                  </p>
                  <div className="text-white pt-10 flex">
                    {!show ? (
                      <button className="p-2 text-black flex items-center bg-white rounded text-base w-32">
                        <AiFillCloseCircle className="text-base mr-1" />
                        Close
                      </button>
                    ) : (
                      <button className="p-2 text-black flex items-center bg-white rounded text-base w-32">
                        <BsFillPlayFill className="text-base mr-1" />
                        Play Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
}

export default MoviesSlider;
