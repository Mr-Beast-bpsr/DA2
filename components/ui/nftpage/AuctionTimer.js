import React, { useState, useEffect } from "react";

const AuctionTimer = ({
  auction,
  setAuction,
  setAuctionEnd,
  setEnded,
  setEndAuction,endAuction
}) => {

  useEffect(() => {
    if (auction != null) {
      // console.log(auction)
      // setEndAuction(auction[0].endDate)
      let interval;
      let date = new Date(auction.endDate).toDateString();
      setEndAuction(date.toString());
      let dates = new Date().getTime();
      let datesec = new Date(auction.endDate).getTime();

      let secs = datesec - dates;
      if (distance <= 0) {
        setEndAuction("Auction ended");
        setAuctionEnd(auction);
        console.log(auction)
        setAuction(null);
        setEnded(true);

        return;
      }

      interval = setInterval(() => {
        setDistance(secs - 1);
      }, 1000);
      // setDistance() ;
      notALoop(distance);

      // console.log(days,hours,minutes,seconds)
    }

    return () => clearInterval(interval);
  }, [auction, distance]);
  function notALoop(distance) {
    // if (auction){
    if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
      setEndAuction("Auction ended");
      // return;
    }

    // const distance = datesec - dates;
    // Time calculations for days, hours, minutes and seconds
    setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
    setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
    setSeconds(Math.floor((distance % (1000 * 60)) / 1000));

    // console.log(days,hours,minutes,seconds)n
  }

  return (
    <div className="collect-center">
      <div className="ends">
        <h6 className="act-text">  {auction != null && auction.auctionType == 1
                              ? "Sale   ends on"
                              : "Auction ends on"}{" "}
                          {" :"}        {endAuction} </h6> <span style={{ fontSize: "1.4rem" }}>
                     
                          </span>
      </div>
      <div className="num-title">
        <div className="num-text">
          <h2>{days} </h2>
          <h5>Days</h5>
        </div>
        <div className="sem">
          <h2>:</h2>
        </div>

        <div className="num-text">
          <h2>{hours} </h2>
          <h5>Hours</h5>
        </div>
        <div className="sem">
          <h2>:</h2>
        </div>

        <div className="num-text">
          <h2>{minutes}</h2>
          <h5>Mins</h5>
        </div>

        <div className="sem">
          <h2>:</h2>
        </div>

        <div className="num-text">
          <h2>{seconds}</h2>
          <h5>Seconds</h5>
        </div>
      </div>
    </div>
  );
};

export default AuctionTimer;
