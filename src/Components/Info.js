import React from "react";

const Info = ({
  lat1,
  long1,
  lat2,
  long2,
  handleChangeLat,
  handleChangeLong,
  ...props
}) => {
  return (
    <div {...props}>
      <p>Location :</p>
      <p>
        {lat1} - {long1}
      </p>
      <p>Port :</p>
      <p>
        {lat2} - {long2}
      </p>
      <input onChange={handleChangeLat} type="text" name="lat2" value={lat2} />{" "}
      |
      <input
        onChange={handleChangeLong}
        type="text"
        name="long2"
        value={long2}
      />
    </div>
  );
};

export default Info;
