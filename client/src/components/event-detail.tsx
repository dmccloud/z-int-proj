import React from "react";
type EventDetailProps = {
  id: any;
  name: any;
  Venue: any;
  start: any;
  image: any;
};

const EventDetail: React.FC<EventDetailProps> = ({
  id,
  name,
  Venue,
  start,
  image,
}) => (
  <div className="h-80 mb-10 block m-auto items-center text-center">
    <img className="max-h-64" src={image} alt="artist" />
    <h3>{name}</h3>
    <h4>({Venue.name && Venue.address})</h4>
    <h5>{Venue.city}</h5>
  </div>
);

export default EventDetail;
