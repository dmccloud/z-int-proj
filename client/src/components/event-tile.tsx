import React from "react";
import { Link } from "@reach/router";

interface EventTileProps {
  event: any;
}

const EventTile: React.FC<EventTileProps> = ({ event }) => {
  const { id, name, Venue } = event;
  return (
    <Link className="block h-193 mt-auto" to={`/event/${id}`}>
      <div className="px-auto rounded text-white bg-slate-800">
        <h3>{name}</h3>
        <h5>{Venue.address}</h5>
      </div>
    </Link>
  );
};

export default EventTile;
