import React, { useEffect, useState } from "react";
import axios from "axios";
import Room from "../components/Room";
import { DatePicker } from "antd";
import "antd/dist/antd.min.css";
import moment from "moment";
import Loader from "../components/Loader";
import Error from "../components/Error";
import Form from "react-bootstrap/Form";
const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState([]);
  const [error, setError] = useState([]);

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [dublicateRooms, setDublicateRooms] = useState([]);
  const [searchkey, setsearchkey] = useState();
  const [type, settype] = useState("all");

  const getData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        "https://hotel-booking-app-lemon.vercel.app/api/rooms/getallrooms"
      );

      setRooms(result.data);
      setDublicateRooms(result.data);
      setLoading(false);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  function filterByDate(dates) {
    setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));

    var temprooms = [];
    var availability = false;
    for (const room of dublicateRooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            ) &&
            moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            )
          ) {
            if (
              moment(dates[0].format("DD-MM-YYYY")) !== booking.fromDate &&
              moment(dates[0].format("DD-MM-YYYY")) !== booking.toDate &&
              moment(dates[1].format("DD-MM-YYYY")) !== booking.fromDate &&
              moment(dates[1].format("DD-MM-YYYY")) !== booking.toDate
            ) {
              availability = true;
            }
          }
        }
      }

      if (availability == true || room.currentbookings.length == 0) {
        temprooms.push(room);
      }

      setRooms(temprooms);
    }
  }

  function filterBySearch() {
    const temprooms = dublicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );

    setRooms(temprooms);
  }

  function filterByType(e) {
    settype(e);

    if (e !== "all") {
      const temprooms = dublicateRooms.filter(
        (room) => room.type.toLowerCase() == e.toLowerCase()
      );

      setRooms(temprooms);
    } else {
      setRooms(dublicateRooms);
    }
  }
  return (
    <div className="container">
      <div className="row mt-5 bs filter">
        <div className="col-md-3">
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Rooms"
            value={searchkey}
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className="col-md-3">
          <Form.Select
            aria-label="Default select example"
            value={type}
            onChange={(e) => {
              filterByType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="non-delux">Non-Delux</option>
          </Form.Select>
        </div>
      </div>
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <div className="col-md-9 mt-4" key={room._id}>
                <Room room={room} fromDate={fromDate} toDate={toDate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
