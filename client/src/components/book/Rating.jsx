import axios from "axios";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateUserAction } from "../../services/actions/UserActions";
import { updateBookAction } from "../../services/actions/BookActions";

const Rating = ({ book, user }) => {
  const dispatch = useDispatch();

  const showRating = () => {
    const filteredRating = user.ratings.filter((IdAndRate) => {
      if (IdAndRate[0] === book._id) {
        return true;
      } else return false;
    });
    if (filteredRating.length === 0) return 0;
    else return filteredRating[0][0];
  };
  const [isRated, setIsRated] = useState(showRating());

  const ratingChanged = async (newRating) => {
    console.log("ratingChanged");
    let newMean;
    let newCounter;
    console.log(isRated);
    if (isRated === 0) {
      console.log("here first", book.rating.counter, newRating);
      newCounter = book.rating.counter + 1;
      newMean = (book.rating.mean + newRating) / newCounter;
    } else {
      const userLastRating = showRating();
      newCounter = book.rating.counter;
      newMean =
        (book.rating.mean - userLastRating + newRating) / book.rating.counter;
    }
    console.log("And here");
    try {
      console.log("oho here: ", newCounter, newMean);
      const updatedRatings = user.ratings.map((IdAndRating) => {
        if (IdAndRating[0] === book._id) {
          return [book._id, newRating];
        } else return IdAndRating;
      });
      const userUpdated = await axios.patch(
        `http://localhost:4000/api/users/${user._id}`,
        { ratings: updatedRatings }
      );
      const bookUpdated = await axios.patch(
        `http://localhost:4000/api/books/${book._id}`,
        { counter: newCounter, mean: newMean }
      );
      Promise.all([userUpdated, bookUpdated]).then((res) => {
        console.log("Here next", res.data);
        dispatch(updateUserAction(res[0].data));
        dispatch(updateBookAction(res[1].data));
        console.log("ADED RATING: ", user.ratings, book.rating);
        setIsRated(showRating());
      });
    } catch (error) {
      console.log("onie");
      console.log(error);
      return error;
    }
    console.log("after all");
    console.log("RATING: ", user, book);
  };

  return (
    <div className=" m-0">
      <ReactStars
        className="m-0"
        count={5}
        onChange={ratingChanged}
        size={35}
        isHalf={true}
        emptyIcon={<i className="far fa-star"></i>}
        halfIcon={<i className="fa fa-star-half-alt"></i>}
        fullIcon={<i className="fa fa-star"></i>}
        activeColor="#ffd700"
        initialValue={showRating()}
      />
      <div>
        Average rating: {book.rating.mean} ({book.rating.counter})
      </div>
    </div>
  );
};

export default Rating;
