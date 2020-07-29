import { useState, useEffect } from "react";

const useLocation = () => {
  const [lat1, setLat1] = useState(null);
  const [long1, setLong1] = useState(null);
  const [lat2, setLat2] = useState(48.8505344);
  const [long2, setLong2] = useState(2.3822335999999997);

  const [distance, setDistance] = useState(null);

  const handleChangeLat = (event) => {
    setLat2(event.target.value);
  };

  const handleChangeLong = (event) => {
    setLong2(event.target.value);
  };
  // ** Definition des fonctions

  // * Get data location
  const getCoordinates = (position) => {
    setLat1(position.coords.latitude);
    setLong1(position.coords.longitude);
  };

  // * Errors for location

  const handleLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("ton esquif n'est pas autorisé a utilisé le radar");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Actuellement, le port est introuvable");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  };

  // *Format numbers **
  const numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // * Calcul distance
  const measure = (la1, lo1, la2, lo2) => {
    // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    console.log(la1, lo1);
    var dLat = (la2 * Math.PI) / 180 - (la1 * Math.PI) / 180;
    var dLon = (lo2 * Math.PI) / 180 - (lo1 * Math.PI) / 180;
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((la1 * Math.PI) / 180) *
        Math.cos((la2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    const result = d * 1000;
    const formatResult = numberWithSpaces(Math.round(result)); // meters
    setDistance(formatResult);
  };

  // 1. Vérification si navigateur géolocalise

  const getLocation = () => {
    console.log("searching location...");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getCoordinates,
        handleLocationError
      );
    } else {
      alert("ton esquif n'est pas autorisé a utilisé son radar");
    }
  };
  // 2/ Get distance

  useEffect(() => {
    if (lat1) {
      measure(lat1, long1, lat2, long2);
    }
    // eslint-disable-next-line
  }, [lat1, long1, lat2, long2]);

  return {
    handleChangeLat,
    handleChangeLong,
    lat1,
    long1,
    lat2,
    long2,
    getLocation,
    distance,
  };
};

export default useLocation;
