import { useState, useEffect } from "react";
import dataLocations from "../data/dataLocations";

const useLocation = () => {
  const location = dataLocations.locations[1];
  const [lat1, setLat1] = useState(null);
  const [long1, setLong1] = useState(null);
  const [lat2, setLat2] = useState(location.latitude);
  const [long2, setLong2] = useState(location.longitude);
  const [howFar, setHowFar] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

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
        alert("Actuellement, le port est introuvable");
        break;
      case error.UNKNOWN_ERROR:
        alert("Actuellement, le port est introuvable");
        break;
      default:
        alert("Actuellement, le port est introuvable");
    }
  };

  // *Format numbers **
  const numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Verify distance
  const verifyDistance = (d) => {
    if (d) {
      setIsLoading(false);
      if (d > 10000) {
        setHowFar(10000);
      } else if (d > 1000) {
        setHowFar(1000);
      } else if (d > 100) {
        setHowFar(100);
      } else if (d > 10) {
        setHowFar(10);
      }
    } else {
      console.log("non il n y a pas de distance");
      setHowFar(null);
    }
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
    setTimeout(() => {
      verifyDistance(result);
      const formatResult = numberWithSpaces(Math.round(result)); // meters
      setDistance(formatResult);
    }, 5000);
  };

  // 1. Vérification si navigateur géolocalise

  const getLocation = () => {
    console.log("searching location...");
    if (!distance) {
      setIsLoading(true);
    }
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
    location,
    howFar,
    isLoading,
  };
};

export default useLocation;
