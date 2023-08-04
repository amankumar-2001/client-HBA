import React, { useEffect, useState } from 'react'
import { Tabs } from 'antd';
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";
import Swal from "sweetalert2";
import { Tag, Divider } from "antd";

const { TabPane } = Tabs;

function Profilescreen() {

    const user = JSON.parse(localStorage.getItem("currentUser"));
    useEffect(() => {
        if (!user) {
            window.location.href = '/login';
        }

    }, [])

    console.log(user)
    return (
        <div>
            <div className="example m-3">
                <Tabs defaultActiveKey="1">
                    <TabPane className='bs tabPane' tab="Profile" key="1">
                        <h1>My Profile</h1>
                        <hr />
                        <h2>Name : {user.data.name}</h2>
                        <h2>Email : {user.data.email}</h2>
                        <h2>isAdmin : {user.data.isAdmin ? "YES" : "NO"}</h2>
                    </TabPane>
                    <TabPane className='bs' tab="Bookings" key="2">
                        <MyBookings />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default Profilescreen;


export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentUser")).data;
    const [bookings, setbookings] = useState([]);
    const [isloading, setisloading] = useState(false);
    const [haserror, sethaserror] = useState();
    const getData = async () => {
        try {
            setisloading(true);
            const data = await (await axios.post("http://localhost:4000/api/bookings/getbookingsbyuserid", { userid: user._id, })).data;

            console.log(data);
            setbookings(data);
            setisloading(false);
        } catch (error) {
            console.log(error);
            setisloading(false);
            sethaserror(error);
        }
    }

    useEffect(() => {
        getData();
    }, []);



    async function cancelBooking(bookingid, roomid) {
        try {
            setisloading(true);
            const result = await (
                await axios.post("http://localhost:4000/api/bookings/cancelbooking", { bookingid, roomid })
            ).data;
            console.log(result);
            setisloading(false);
            Swal.fire("Congrats", "Your has been cancelled", "success").then((result) => {
                window.location.reload();
            }
            );
        } catch (error) {
            console.log(error);
            setisloading(false);
            Swal.fire("Oops", "Something went wrong", "error");
        }
    }
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    {isloading && <Loader />}
                    {bookings &&
                        bookings.map((booking) => {
                            return (
                                <div className="bs mt-5 fdirc">
                                    <h1>{booking.room}</h1>
                                    <p>
                                        <b>BookingID</b> : {booking._id}
                                    </p>
                                    <p>
                                        <b>CheckIn</b> : {booking.fromdate}
                                    </p>
                                    <p>
                                        <b>CheckOut</b> : {booking.todate}
                                    </p>
                                    <p>
                                        <b>Amount</b> : {booking.totalamount}
                                    </p>
                                    <p>
                                        <b>Status</b> :{" "}
                                        {booking.status == "cancelled" ? (
                                            <Tag color="RED">CANCELLED</Tag>
                                        ) : (
                                            <Tag color="green">CONFIRMED</Tag>
                                        )}
                                    </p>

                                    {booking.status !== "cancelled" && (
                                        <div className="text-right">
                                            <button
                                                className="btn btn-primary"
                                                onClick={() => {
                                                    cancelBooking(booking._id, booking.roomid);
                                                }}
                                            >
                                                CANCEL BOOKING
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

 