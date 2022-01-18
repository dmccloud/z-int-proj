import React from "react";

const EventDetail: React.FC<any> = ({ id, Venue, name }) => (
  <div className="h-365 mb-4">
    <h3>
      {Venue.name} ({name})
    </h3>
    <h5>{Venue.address}</h5>
  </div>
);

export default EventDetail;
