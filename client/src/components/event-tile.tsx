import React from "react";
import { Link } from "react-router-dom";

interface EventTileProps {
  event: any;
}

const EventTile: React.FC<EventTileProps> = ({ event }) => {
  const { id, name, Venue, image } = event;
  return (
    <div className="min-w-120px block m-auto text-black p-5 mb-5 items-center text-center justify-items-center">
      <Link to={`/event/${id}`}>
        <div className="h-48">
          <img className="max-w-full max-h-full" src={image} alt="event" />
        </div>
        <h3>{id ? name : ""}</h3>
        <h5>{Venue && Venue.name}</h5>
      </Link>
    </div>
  );
};

export default EventTile;
