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
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState([]);
  const [error, seterror] = useState([]);

  const [fromdate, setfromdate] = useState();
  const [todate, settodate] = useState();
  const [dublicaterooms, setdublicaterooms] = useState([]);
  const [searchkey, setsearchkey] = useState();
  const [type, settype] = useState("all");

  const getData = async () => {
    try {
      setloading(true);
      const result = await axios.get(
        "https://hotel-booking-app-lemon.vercel.app/api/rooms/getallrooms"
      );

      setrooms(result.data);
      setdublicaterooms(result.data);
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

  function filterByDate(dates) {
    setfromdate(moment(dates[0]).format("DD-MM-YYYY"));
    settodate(moment(dates[1]).format("DD-MM-YYYY"));

    var temprooms = [];
    var availability = false;
    for (const room of dublicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            ) &&
            moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromdate,
              booking.todate
            )
          ) {
            if (
              moment(dates[0].format("DD-MM-YYYY")) !== booking.fromdate &&
              moment(dates[0].format("DD-MM-YYYY")) !== booking.todate &&
              moment(dates[1].format("DD-MM-YYYY")) !== booking.fromdate &&
              moment(dates[1].format("DD-MM-YYYY")) !== booking.todate
            ) {
              availability = true;
            }
          }
        }
      }

      if (availability == true || room.currentbookings.length == 0) {
        temprooms.push(room);
      }

      setrooms(temprooms);
    }
  }

  function filterBySearch() {
    const temprooms = dublicaterooms.filter((room) =>
      room.name.toLowerCase().includes(searchkey.toLowerCase())
    );

    setrooms(temprooms);
  }

  function filterByType(e) {
    settype(e);

    if (e !== "all") {
      const temprooms = dublicaterooms.filter(
        (room) => room.type.toLowerCase() == e.toLowerCase()
      );

      setrooms(temprooms);
    } else {
      setrooms(dublicaterooms);
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
                <Room room={room} fromdate={fromdate} todate={todate} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Homescreen;
