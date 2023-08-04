import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import Swal from "sweetalert2";

function Bookingscreen(props) {
  const { roomid } = useParams();
  const { fromdate } = useParams();
  const { todate } = useParams();
  const totaldays =
    moment
      .duration(
        moment(todate, "DD-MM-YYYY").diff(moment(fromdate, "DD-MM-YYYY"))
      )
      .asDays() + 1;

  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [room, setroom] = useState();
  const [totalamount, settotalamount] = useState();

  const getData = async () => {
    try {
      setloading(true);
      const data = (
        await axios.post(
          "https://hotel-booking-app-lemon.vercel.app/api/rooms/getroombyid",
          { roomid: roomid }
        )
      ).data;
      settotalamount(totaldays * data.rentperday);
      setroom(data);
      setloading(false);
      seterror(false);
    } catch (error) {
      seterror(true);
      console.log(error);
      setloading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem(`currentUser`)).data._id,
      fromdate,
      todate,
      totalamount,
      totaldays,
    };

    try {
      setloading(true);
      const result = await axios.post(
        "https://hotel-booking-app-lemon.vercel.app/api/bookings/bookroom",
        bookingDetails
      );
      setloading(false);
      console.log(result);
      Swal.fire("Congratulations", "Your Room Booked Successfully").then(
        (result) => {
          window.location.href = "/profile";
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="m-5">
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message="Something went wrong" />
      ) : (
        <div>
          <div className="row continer justify-content-center m-6 bs">
            <div className="col-md-5 textleft">
              <h1 className="textleft">{room.name}</h1>
              <img src={room.imageurls[0]} className="bigimg" />
            </div>
            <div className="col-md-6">
              <div className="textright">
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>
                    Name:{" "}
                    {JSON.parse(localStorage.getItem(`currentUser`)).data.name}
                  </p>
                  <p>From : {fromdate}</p>
                  <p>To: {todate}</p>
                  <p>Max Count: {room.maxcount}</p>
                </b>
              </div>
              <div className="textright">
                <h1>Amount</h1>
                <hr />
                <b>
                  <p>Total days : {totaldays}</p>
                  <p>Rent per day : {room.rentperday}</p>
                  <p>Total amount: {totalamount}</p>
                </b>
              </div>
              <div className="textright">
                <button className="btn-primary btn" onClick={bookRoom}>
                  Pay Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Bookingscreen;
