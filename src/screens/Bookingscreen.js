import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Swal from "sweetalert2";
import Carousel from "react-bootstrap/Carousel";
import styled from "styled-components";

const Container = styled.div`
  margin: 5rem;
`;

const RowContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3rem;
  border: 1px solid;
  border-radius: 4px;
  padding: 50px;
  min-width: 1000px;
  gap: 20px;
`;

const RoomDetails = styled.div`
  width: 50%;
  text-align: left;

  img {
    width: 100%;
  }
`;

const BookingDetails = styled.div`
  width: 50%;
  text-align: right;
`;

const BookingAmount = styled.div`
  text-align: right;
`;

const RightText = styled.div`
  text-align: right;
`;

const PayButton = styled.button`
  color: white;
  padding: 10px 20px;
  margin-top: 1rem;
  background: black;
  border: none;
  border-radius: 4px;
`;

function Bookingscreen(props) {
  const { roomid, fromDate, toDate } = useParams();

  const totaldays =
    moment
      .duration(
        moment(toDate, "DD-MM-YYYY").diff(moment(fromDate, "DD-MM-YYYY"))
      )
      .asDays() + 1;

  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [user, setUser] = useState();
  const [room, setroom] = useState();
  const [totalamount, settotalamount] = useState();

  const getData = async () => {
    try {
      setloading(true);
      const data = (
        await axios.post(
          "https://hotel-booking-app-lemon.vercel.app/api/rooms/getroombyid",
          { roomid }
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
    const username = JSON.parse(localStorage.getItem(`currentUser`));
    if (username) {
      setUser(username);
    } else {
      alert("You are not login");
      window.location.href = "/home";
    }
    getData();
  }, []);

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem(`currentUser`)).data._id,
      fromDate,
      toDate,
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
    <Container>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error message="Something went wrong" />
      ) : (
        <RowContainer>
          <RoomDetails>
            <h1>{room.name}</h1>
            <Carousel>
              {room.imageurls.map((url) => {
                return (
                  <Carousel.Item>
                    <img
                      className="d-block w-100 bigimg"
                      src={url}
                      alt="First slide"
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </RoomDetails>
          <BookingDetails>
            <div>
              <h1>Booking Details</h1>
              <hr />
              <b>
                <p>Name: {user.data.name}</p>
                <p>From: {fromDate}</p>
                <p>To: {toDate}</p>
                <p>Max Count: {room.maxcount}</p>
              </b>
            </div>
            <BookingAmount>
              <h1>Amount</h1>
              <hr />
              <b>
                <p>Total days: {totaldays}</p>
                <p>Rent per day: {room.rentperday}</p>
                <p>Total amount: {totalamount}</p>
              </b>
            </BookingAmount>
            <RightText>
              <PayButton onClick={bookRoom}>Pay Now</PayButton>
            </RightText>
          </BookingDetails>
        </RowContainer>
      )}
    </Container>
  );
}

export default Bookingscreen;
