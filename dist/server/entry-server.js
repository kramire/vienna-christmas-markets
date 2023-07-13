import { render as render$1 } from "preact-render-to-string";
import Router, { Route } from "preact-router";
import { useState, useEffect, useMemo } from "preact/hooks";
import { Link } from "preact-router/match";
import { jsxs, jsx, Fragment } from "preact/jsx-runtime";
const HomeImage = "/assets/Saint-Stephens-Cathedral-with-Christmas-Tree.f11fce7a.webp";
const ChristmasMug = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAD2ElEQVR4nO2ab0gTYRzHf2jZi/5QL61X9gcSwiioSMwXSfaiIAgttyUpZmwRUm/qTbGKst0NKtCWIgRpf257IZT2DxJdI6LQFxKFTpO8Nf+03pTkm3S/eOadTbd5d/tzd7rnC1922+65u+/nnud3d88GQEVFRUVFRUVFRUVFNV9WVxYwTgYYbgRYJ+rMfmA5W+gYUyaWs+kgqIQ5W+oAMLo883PNcKOpA8CSbqZ7AN/Tewgw3M3UAbC6sgQI/vQsgmGqDyDaxxEvjiBafNob1JYjgCj66miaA3AEtO8JmgOwj6cpgJ5JxKkgYvekxgBiFkfuL7CcD1jnQ7A/3pN0ANM4I/KqTwBzLpFBYJy3weXKTBqAcOkewP9ecUdzAOah32ho2BUyWVYXgBPB9iRfQwBBNLUcxZIbEDJZJp+pCoDhWjQDcPLF9dnwoslnSkOf6pvA8g88Gj0Dsa8C1s5lwHCXIgE4eU0AVH18jSW1mREASmozsOp9u+zwlb0BNLj7Z73gwTY2Lo96dVAbwOnPXjxmXxsZXnApuwZPf/oi68yHh5cEQBRtGKgNwNCwM2Z40WQdqe2Qbq8bANMK7gMMTQXSAJoKJLdDxrxuAPQId4LkNfEa0CZrG/PDawrAEeaEawCzWlYNWJQAzEMTWHZ3m+QQOF6/Fc1Dv5YegHJXtWR40WTdpQegtUY+gNaapQfAQmvARDrXgCCaHpXKHgKm5iMLPhwpBhCazU7RrbBDBoCKN/dkhxdN2iQFwMxzwOWUPQw5BNctAKCy6370m59Yrs0MtVEEQPHjsPNBUgGwCidFO6pgjpW0TRgAmRpjXXuTCuCCfxEBYLlbCYUnCg9/JY4fRtrPb5gNT5ZVAZDMSdG6HzhNur3SMy/6WkcbPj+3PmSyLLstH4wE0NUnNS0+DCzXDDbXbkiWLD4ciSd4oq72/onWA8ZAbZl5fKZqeD4YCm969zUCgNHjfak6gDM8GpIRLHxiM9rYlmOje7BCdQBWxAwzjz2JhJ8/sRlXeI+3lxwLaCHLMG608Dge75lPNLzB3f/zROfAZtBSZ79hjsWH3UoBRJvYVHrmK7oGt4AeZJ0ZDmUWHz41+9Bv4XFKCoDSMW90900Z3vaPGT3eV2TMa9btqaioqKjkaQUArAOAbADIAYBcANgBAOSPCfsAoBAA9gNAEQAcFHxYsPi+SFinUGiTL2wjV9hmtrAPsi/NtQoANgEA+SNScVgYtVws7Jscw0q1w28HgEMahI5lcix5agLIS3cAIHQ7LYfAAS2HAERRrCJIJiPDiyBxrCIofi8WQdI2pUXwHyfv+j0GGrkfAAAAAElFTkSuQmCC";
const ChristmasLights = "/assets/christmas-lights.23731493.svg";
const ChristmasPresent = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADEElEQVR4nO2Y70sUQRjHx4oCxYxe9bawF+GP9MpO8IJIT09n7maULqK/ICoIeh9CIr1KigoiKJMMQnRGJSzpB+ibDAohSt94ndwK+UI9f6UGp0/M2m17qwfrdbeutF94uOXmmdnvZ+e7e8sh5MiRI0eOLBegLMzrg4Sz15izScLZChZ0lAh6z9/jP5xsGu5sOIIFva/2crZCBP1BBH0l15JrWuK9sbFxF+bsOREMNiss6C/M2bUEQ4CyCGfX5ViyeUTQdrl2xgFIV/2V5CZ0IJw9UCHU3WIPzcwhgl7OPABnwzqTT3Bnw1FvvzfH31Vfjjl7QThb0+1GE+GsWTPI2Zrskb2kl2T7e/z5mLNW3fiwFQCL2gl7SbZx3M8ZJYLOrgPStTgQ5iyKuwMBY7+335ujA1jMPICgI7oTXgp2BPcaewLdgdKzrTXzpTdPgazKp9XzdYKWGPt8fb59mLOruh39lnEALOgtM3mWxotvuNRyNZWZyD+TF6Q54wC+Pt9+zNnXtANw9iXQHchFVogKegBz1kIEHceCxjYzVNlWoxqXVdVWk+yRG/uzxu2qjmBe2o2OFaK6UAFSQoUItlrlLZ6ESmWNUAFSxopQbcoAqZpPG0ChWpHUAVI/aToBwAEIOTvg2Z4IxQWnEWy1jI/MVNZA6dJ/BRCrQDB9EsFgVR6MuHarJY/ld3LM1gALbgTfi5JnOVy03mNLgAW3+ZvSLASyCkBGQ15do9G4NtsJM3FCVgHIfMfNTVx0wzx/DONnDmkA4YqDMPvsDkycP6H1yTlgFwDl+F+A5c+DqunVhTkNYHVuRv1cGnqn9ck5YBcAfXwidfmw2N8BRi0NvQXlXElCjMCOABMXymD508BGgI/vQWkotieAoovQ0oc3quHY1KRmPhadUj9/Dry0Z4SmdTexjEn0UTOE3bmJN3H7XYgEjml9M2U7/THqsREA7PQfMtBBhHfqqwQYX+aq82DUtUcteSwzbyY2sN0A9nyd9iDFcgDPP/wbsQGgAtXKBS0D8KAIeJAvbQCOHDly5Agl0W+nJj2PluliwAAAAABJRU5ErkJggg==";
var ResultType = /* @__PURE__ */ ((ResultType2) => {
  ResultType2["MARKET"] = "MARKET";
  ResultType2["EVENT"] = "EVENT";
  return ResultType2;
})(ResultType || {});
var Routes = /* @__PURE__ */ ((Routes2) => {
  Routes2["HOME"] = "/";
  Routes2["MARKETS"] = "/markets";
  Routes2["EVENTS"] = "/events";
  Routes2["FAVORITES"] = "/favorites";
  Routes2["VISITS"] = "/visits";
  return Routes2;
})(Routes || {});
const Home = () => {
  return jsxs("div", {
    class: "flex flex-col gap-5 md:gap-12 pb-5 md:py-5",
    children: [jsxs("div", {
      class: "flex flex-col-reverse md:flex-row items-center justify-end md:justify-start md:gap-20",
      children: [jsx("div", {
        class: "md:flex-1",
        children: jsx("div", {
          class: "py-8 w-full h-full",
          style: {
            backgroundColor: "rgb(238 193 32)"
          },
          children: jsx("img", {
            width: "90%",
            height: "auto",
            alt: "Saint Stephan's Cathedral and Christmas",
            class: "md:relative",
            style: {
              width: "100%",
              height: "auto",
              objectFit: "contain",
              boxShadow: "rgb(0 0 0 / 48%) 0px 2px 5px 1px",
              left: "20px"
            },
            loading: "eager",
            src: HomeImage
          })
        })
      }), jsx("div", {
        class: "md:flex-1 py-8 px-3 md:px-5",
        children: jsx("h1", {
          class: "text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 text-center",
          children: "Discover the magic of Christmas in Vienna"
        })
      })]
    }), jsxs("div", {
      class: "flex flex-col md:flex-row justify-around gap-8 md:gap-12 px-6 md:px-0",
      children: [jsx(Link, {
        href: Routes.MARKETS,
        children: jsxs("div", {
          class: "group flex-1 flex flex-col gap-3 items-center peer",
          children: [jsx("img", {
            src: ChristmasMug,
            width: 48,
            height: 48
          }), jsx("h2", {
            class: "text-xl font-bold group-hover:underline",
            children: "Traditional Markets"
          }), jsx("p", {
            class: "text-center",
            children: "Enjoy the seasonal delicacies, including the famous punch and mulled wine."
          })]
        })
      }), jsx(Link, {
        href: Routes.EVENTS,
        children: jsxs("div", {
          class: "group flex-1 flex flex-col gap-3 items-center",
          children: [jsx("img", {
            src: ChristmasLights,
            width: 48,
            height: 48
          }), jsx("h2", {
            class: "text-xl font-bold group-hover:underline",
            children: "Pop up Events"
          }), jsx("p", {
            class: "text-center",
            children: "Check out festive popup restaurants, bars, and curling venues around the city."
          })]
        })
      }), jsx(Link, {
        href: Routes.VISITS,
        children: jsxs("div", {
          class: "group flex-1 flex flex-col gap-3 items-center",
          children: [jsx("img", {
            src: ChristmasPresent,
            width: 48,
            height: 48
          }), jsx("h2", {
            class: "text-xl font-bold group-hover:underline",
            children: "Track your Progress"
          }), jsx("p", {
            class: "text-center",
            children: "Interested in visiting over 15 Christmas markets in Vienna? Track your progress!"
          })]
        })
      })]
    })]
  });
};
const getNavigatorLocation = async () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((geoPosition) => {
      const position = {
        lat: geoPosition.coords.latitude,
        lng: geoPosition.coords.longitude
      };
      resolve(position);
    }, () => {
      reject();
    });
  });
};
const LocationIcon = "/assets/location.3ba297f4.svg";
const CalendarIcon = "/assets/calendar.68389089.svg";
const ClockIcon = "/assets/clock.e89f1ab2.svg";
const InfoIcon = "/assets/info.b1cb4ba7.svg";
const localizeDate = (date, language) => {
  if (typeof date === "string") {
    const dateFromString = new Date(date);
    return dateFromString.toLocaleDateString(language);
  }
  return date.toLocaleDateString(language);
};
const colors = {
  darkGreen: "rgb(9, 46, 11)",
  text: "rgb(20 20 20)"
};
const theme = {
  colors
};
const weekDays = ["M", "T", "W", "R", "F", "S", "S"];
const NEAR_ME_KM_DISTANCE_AWAY = 2;
const GOOGLE_MAPS_LINK = "https://www.google.com/maps/search/?api=1";
const IMG_SRC_1 = "/assets/Musuem-Quartier-Christmas-market.9182e100.webp";
const IMG_SRC_3 = "/assets/Tuerkenschanzpark-Christmas-market.0294fb4e.webp";
const IMG_SRC_4 = "/assets/Saint-Stephens-Cathedral-at-Christmas.ee07f359.webp";
const IMG_SRC_5 = "/assets/Genuss-Christmas-market.8dfe8f7c.webp";
const IMG_SRC_6 = "/assets/Altes-AKH-Christmas-market.37f8abb0.webp";
const IMG_SRC_8 = "/assets/Maria-Theresien-Platz-Christmas-market.eff8848c.webp";
const IMG_SRC_12 = "/assets/Liechtenstein-Christmas-market.c3d2564d.webp";
const IMG_SRC_14 = "/assets/Karlsplatz-Christmas-market.c0212736.webp";
const IMG_SRC_16 = "/assets/Schoenbrunn-Christmas-market.ed9bb010.webp";
const IMG_SRC_17 = "/assets/Rathaus-Christmas-market.5153f9ac.webp";
const IMG_SRC_18 = "/assets/Prater-Christmas-market.4cf43e8c.webp";
const MAX_CONTENT_WIDTH = 1130;
const HEADER_HEIGHT = 56;
const FAVORITED_MARKETS_LOCAL_STORAGE_KEY = "favoritedMarkets";
const resultToImgUrlMapping = {
  1: IMG_SRC_1,
  3: IMG_SRC_3,
  4: IMG_SRC_4,
  5: IMG_SRC_5,
  6: IMG_SRC_6,
  8: IMG_SRC_8,
  12: IMG_SRC_12,
  14: IMG_SRC_14,
  16: IMG_SRC_16,
  17: IMG_SRC_17,
  18: IMG_SRC_18
};
const CardImage = ({
  imgSrc,
  altText
}) => {
  if (imgSrc) {
    return jsx("img", {
      src: imgSrc,
      alt: altText,
      width: "100%",
      height: "256px",
      class: "w-full h-64 object-cover border border-solid border-gray-300"
    });
  }
  return jsx("div", {
    class: "w-full h-64 border border-solid border-gray-300 bg-gray-200"
  });
};
const FilledHeartIcon = "/assets/filledHeart.6f618532.svg";
const EmptyHeartIcon = "/assets/emptyHeart.c5e8aa72.svg";
const FavoriteButton = ({
  isFavorite,
  handleClick
}) => jsx("img", {
  onClick: handleClick,
  src: isFavorite ? FilledHeartIcon : EmptyHeartIcon,
  alt: isFavorite ? "Favorite Venue" : "Not a favorited venue",
  loading: "lazy",
  width: "20px",
  height: "20px",
  style: {
    marginTop: "6px",
    width: "20px",
    height: "20px",
    outline: "none"
  }
});
const ResultCard = ({
  result,
  isFavorite,
  toggleFavoriteResult
}) => {
  const [language, setLanguage] = useState("en-GB");
  const {
    id,
    name,
    type,
    coordinates,
    district,
    start,
    end,
    times,
    website
  } = result;
  const imgSrc = resultToImgUrlMapping[id];
  useEffect(() => {
    setLanguage(navigator.language);
  }, []);
  return jsxs("li", {
    class: "gap-3 w-full relative",
    style: {
      boxShadow: "rgb(223 220 220 / 55%) 0px 1px 6px 2px"
    },
    children: [jsx(CardImage, {
      imgSrc,
      altText: name
    }), jsxs("div", {
      class: "flex flex-col justify-between w-full px-4 py-6 gap-3",
      children: [jsxs("div", {
        class: "flex justify-between gap-3",
        children: [jsx("h3", {
          class: "text-xl font-semibold",
          style: {
            color: theme.colors.darkGreen
          },
          children: type === ResultType.MARKET ? `${id}. ${name}` : name
        }), jsx(FavoriteButton, {
          isFavorite,
          handleClick: () => toggleFavoriteResult(id)
        })]
      }), jsxs("div", {
        class: "flex items-center gap-4",
        children: [jsx("img", {
          src: LocationIcon,
          loading: "lazy",
          alt: "district location",
          width: 16,
          height: 16
        }), jsx("a", {
          href: `${GOOGLE_MAPS_LINK}&query=${coordinates.lat},${coordinates.lng}`,
          target: "_blank",
          "aria-label": "Google maps link",
          children: jsx("p", {
            class: "decoration-solid cursor-pointer",
            children: district
          })
        })]
      }), start && end && jsxs("div", {
        class: "flex items-center gap-4",
        children: [jsx("img", {
          src: CalendarIcon,
          loading: "lazy",
          alt: "calendar",
          width: 16,
          height: 16
        }), jsxs("p", {
          children: [localizeDate(start, language), " - ", localizeDate(end, language)]
        })]
      }), jsxs("div", {
        class: "flex gap-4",
        children: [jsx("img", {
          src: ClockIcon,
          loading: "lazy",
          alt: "clock",
          width: 16,
          height: 16,
          class: "mt-2"
        }), jsx("div", {
          class: "h-24 flex flex-col flex-wrap gap-x-6",
          children: times.map((time, timeIdx) => jsxs("div", {
            class: "flex gap-3 text-sm",
            children: [jsx("p", {
              class: "w-3.5 text-center",
              children: weekDays[timeIdx]
            }), Array.isArray(time) ? jsx("p", {
              class: "text-sm",
              children: `${time[0]} - ${time[1]}`
            }) : jsx("p", {
              class: "text-sm",
              children: "Closed"
            })]
          }, `${id}_${timeIdx}`))
        })]
      }), website && jsxs("div", {
        class: "flex items-center gap-4",
        children: [jsx("img", {
          src: InfoIcon,
          loading: "lazy",
          alt: "info",
          width: 16,
          height: 16
        }), jsx("a", {
          href: website,
          target: "_blank",
          alt: `Homepage for the ${name} event.`,
          children: "Website"
        })]
      })]
    })]
  }, id);
};
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const RADIANS = 6371;
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = RADIANS * c;
  return distance;
};
const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180);
};
const useLocalStorage = () => {
  const getItem = (key) => {
    return localStorage.getItem(key);
  };
  const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };
  return {
    getItem,
    setItem
  };
};
const FilterItem = ({
  label,
  isSelected,
  handleClick,
  isLoading
}) => jsx("button", {
  onClick: handleClick,
  style: {
    height: "34px",
    minWidth: "80px",
    padding: "0px 8px",
    borderRadius: "20px",
    border: "1px solid",
    borderColor: theme.colors.darkGreen,
    color: isSelected ? "white" : theme.colors.darkGreen,
    background: isSelected || isLoading ? theme.colors.darkGreen : "white",
    fontSize: "14px",
    fontFamily: "sans-serif"
  },
  children: isLoading ? jsx("span", {
    class: "loader"
  }) : label
});
const Map$1 = "/assets/mapicon.bd5b145f.svg";
const List = "/assets/listicon.d189aefe.svg";
const Filters = ({
  activeFilters,
  toggleFilter,
  isLoadingLocation,
  showMap,
  toggleMap
}) => {
  const isFavoritesPage = window.location.pathname === Routes.FAVORITES;
  return jsxs("div", {
    class: "flex flex-wrap md:flex-nowrap justify-between w-full gap-3",
    children: [jsxs("div", {
      class: "flex gap-3",
      style: {
        color: theme.colors.darkGreen
      },
      children: [jsx(FilterItem, {
        label: "Open Now",
        isSelected: activeFilters.openNow,
        handleClick: toggleFilter("openNow")
      }), jsx(FilterItem, {
        label: "Near Me",
        isSelected: activeFilters.nearMe,
        handleClick: toggleFilter("nearMe"),
        isLoading: isLoadingLocation
      }), !isFavoritesPage && jsx(FilterItem, {
        label: "My Favorites",
        isSelected: activeFilters.favorited,
        handleClick: toggleFilter("favorited")
      })]
    }), jsxs("div", {
      class: "flex gap-2 items-center",
      style: {
        color: theme.colors.darkGreen
      },
      children: [jsx("div", {
        onClick: toggleMap,
        class: "text-xl cursor-pointer",
        children: showMap ? jsx("img", {
          src: List,
          width: 20,
          height: 20,
          loading: "lazy",
          alt: "name"
        }) : jsx("img", {
          src: Map$1,
          width: 20,
          height: 20,
          loading: "lazy",
          alt: "name"
        })
      }), jsx("p", {
        class: "text-sm md:text-base",
        children: showMap ? "View List" : "View Map"
      })]
    })]
  });
};
const getIsOpen = (startDate, endDate, times) => {
  const now = new Date();
  const localizedDateString = now.toLocaleString("en-US", {
    timeZone: "Europe/Vienna"
  });
  const localizedDate = new Date(localizedDateString);
  const dow = localizedDate.getDay();
  const dowAdjusted = dow === 0 ? 6 : dow - 1;
  const todayTimes = times[dowAdjusted];
  if (!todayTimes)
    return null;
  if (formatAsDate(startDate) > localizedDate || formatAsDate(endDate) < localizedDate) {
    return false;
  }
  const [startTime, endTime] = todayTimes;
  const localizedTimeString = now.toLocaleTimeString("en-GB", {
    timeZone: "Europe/Vienna"
  });
  return startTime < localizedTimeString && localizedTimeString < endTime;
};
const formatAsDate = (date) => {
  if (typeof date === "string") {
    return new Date(date);
  }
  return date;
};
const Map = ({
  results
}) => {
  const [map, setMap] = useState(null);
  const [mapMarkers, setMapMarkers] = useState(null);
  useEffect(() => {
    const map2 = L.map("map", {
      center: [48.2089366, 16.3625921],
      zoom: 13
    });
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map2);
    setMap(map2);
  }, []);
  useEffect(() => {
    if (!map && !mapMarkers) {
      setMapMarkers(L.layerGroup([]));
    }
  }, [map]);
  useEffect(() => {
    if (!map && !mapMarkers)
      return;
    mapMarkers.clearLayers();
    results.forEach((result) => {
      const marker = L.marker([result.coordinates.lat, result.coordinates.lng]).bindPopup(`${result.id}. ${result.name}`);
      mapMarkers.addLayer(marker);
    });
    map.addLayer(mapMarkers);
  }, [map, mapMarkers, results]);
  return jsx("div", {
    id: "map",
    style: {
      height: "70%",
      zIndex: 1
    }
  });
};
const HeaderText = () => {
  switch (window.location.pathname) {
    case Routes.MARKETS:
      return jsx("h1", {
        class: "text-xl sm:text-3xl md:text-4xl font-bold text-gray-800",
        children: "Christmas Markets in Vienna"
      });
    case Routes.EVENTS:
      return jsx("h1", {
        class: "text-xl sm:text-3xl md:text-4xl font-bold text-gray-800",
        children: "Christmas Events in Vienna"
      });
    case Routes.FAVORITES:
      return jsx("h1", {
        class: "text-xl sm:text-3xl md:text-4xl font-bold text-gray-800",
        children: "Your Christmas Favorites"
      });
    case Routes.HOME:
    case Routes.VISITS:
    default:
      return null;
  }
};
const ResultList = ({
  results,
  favorites,
  setFavorites,
  deviceLocation,
  setDeviceLocation
}) => {
  const [activeFilters, setActiveFilters] = useState({
    openNow: false,
    favorited: false,
    nearMe: false
  });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const {
    setItem
  } = useLocalStorage();
  const toggleMap = () => setShowMap((prev) => !prev);
  const toggleFilter = (filterKey) => () => {
    setActiveFilters({
      ...activeFilters,
      [filterKey]: !activeFilters[filterKey]
    });
  };
  const toggleFavoriteResult = (marketId) => () => {
    const isFavorite = favorites.includes(marketId);
    let newFavorites;
    if (isFavorite) {
      newFavorites = favorites.filter((id) => id !== marketId);
    } else {
      newFavorites = favorites.concat(marketId);
    }
    setFavorites(newFavorites);
    setItem(FAVORITED_MARKETS_LOCAL_STORAGE_KEY, newFavorites);
  };
  const filterResults = (results2) => {
    let newResults = results2;
    if (activeFilters.openNow) {
      newResults = newResults.filter((result) => {
        if (!result.start || !result.end) {
          return false;
        }
        return getIsOpen(result.start, result.end, result.times);
      });
    }
    if (activeFilters.favorited) {
      newResults = newResults.filter((result) => favorites.includes(result.id));
    }
    if (activeFilters.nearMe && deviceLocation) {
      newResults = newResults.filter((result) => {
        const distanceAway = getDistanceFromLatLonInKm(result.coordinates.lat, result.coordinates.lng, deviceLocation.lat, deviceLocation.lng);
        return distanceAway <= NEAR_ME_KM_DISTANCE_AWAY;
      });
    }
    return newResults;
  };
  const shownResults = filterResults(results);
  useEffect(() => {
    const getResult = async () => {
      try {
        setIsLoadingLocation(true);
        const result = await getNavigatorLocation();
        if (result) {
          setDeviceLocation(result);
          setIsLoadingLocation(false);
        }
      } catch {
        setActiveFilters({
          ...activeFilters,
          nearMe: false
        });
        setIsLoadingLocation(false);
      }
    };
    if (activeFilters.nearMe && !deviceLocation) {
      getResult();
    }
  }, [activeFilters.nearMe]);
  useEffect(() => {
    setActiveFilters({
      openNow: false,
      favorited: false,
      nearMe: false
    });
    setShowMap(false);
  }, []);
  return jsx("div", {
    class: "h-full flex flex-col gap-1 md:gap-3",
    children: showMap ? jsxs(Fragment, {
      children: [jsx("div", {
        class: "px-6 py-4",
        children: jsx(Filters, {
          activeFilters,
          toggleFilter,
          isLoadingLocation,
          showMap,
          toggleMap
        })
      }), jsx(Map, {
        results: shownResults
      })]
    }) : jsx("div", {
      className: "animate-slide-in",
      class: " w-full flex flex-col gap-3 px-6 lg:px-0 py-4 overflow-scroll",
      children: jsxs("div", {
        class: "w-full flex flex-col gap-6 md:gap-9 m-auto",
        children: [jsxs("div", {
          class: "flex flex-col gap-3 md:gap-4",
          children: [jsxs("div", {
            class: "flex flex-col gap-1 md:gap-3",
            children: [jsx(HeaderText, {}), jsxs("p", {
              children: [shownResults.length, " ", shownResults.length === 1 ? "result" : "results", " found", activeFilters.nearMe && deviceLocation && ` within ${NEAR_ME_KM_DISTANCE_AWAY}km`]
            })]
          }), jsx(Filters, {
            activeFilters,
            toggleFilter,
            isLoadingLocation,
            showMap,
            toggleMap
          })]
        }), jsx("ul", {
          class: "list-none grid justify-between p-0 m-0 gap-7 gap-y-9",
          style: {
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))"
          },
          children: shownResults.map((result, idx) => jsx(ResultCard, {
            result,
            isFavorite: favorites.includes(result.id),
            toggleFavoriteResult
          }, idx))
        })]
      })
    })
  });
};
const Flex = ({
  children,
  ref,
  onClick,
  className,
  style,
  ...rest
}) => {
  return jsx("div", {
    ref,
    onClick,
    className,
    style: {
      display: "flex",
      ...rest,
      ...style
    },
    children
  });
};
function buildSquares(items) {
  const itemCount = items.length;
  const MAX_COLS = 5;
  let squares = [];
  for (let i = 0; squares.flat().length < itemCount; i += MAX_COLS) {
    squares.push(items.slice(i, i + MAX_COLS));
  }
  const leftoverSquares = squares.length % MAX_COLS;
  if (leftoverSquares > 0) {
    let lastRow = squares[squares.length - 1];
    for (let i = leftoverSquares; i < MAX_COLS; i++) {
      lastRow.push(null);
    }
    squares.pop();
    squares.push(lastRow);
  }
  return squares;
}
const SurpriseImage = "/assets/christmas-sparkler.5ec6e501.webp";
const hasStarted = (startDate) => {
  if (!startDate)
    return false;
  const today = new Date();
  if (typeof startDate === "string") {
    const startDateFromString = new Date(startDate);
    return startDateFromString < today;
  }
  return startDate < today;
};
const CircleCheckSolid = "/assets/circleCheckSolid.ec03a2f5.svg";
const CircleCheck = "/assets/circleCheck.25a078b1.svg";
const VISITED_MARKETS_LOCAL_STORAGE_KEY = "visitedMarkets";
const VisitProgress = ({
  markets
}) => {
  const [visitedMarketsIds, setVisitedMarketsIds] = useState([]);
  const squares = useMemo(() => buildSquares(markets), [markets]);
  const {
    getItem,
    setItem
  } = useLocalStorage();
  const checkHasVisitedMarket = (marketId) => visitedMarketsIds.includes(marketId);
  const handleOrnamentClick = (ornamentId) => () => {
    if (!ornamentId || !visitedMarketsIds)
      return;
    const market = markets.find((market2) => market2.id === ornamentId);
    if (!market || !market.start || !market.end) {
      return;
    }
    if (hasStarted(market.start)) {
      let newVisitedMarketIds = [];
      if (visitedMarketsIds.includes(ornamentId)) {
        newVisitedMarketIds = visitedMarketsIds.filter((id) => id !== ornamentId);
        setVisitedMarketsIds(newVisitedMarketIds);
      } else {
        newVisitedMarketIds = visitedMarketsIds.concat(ornamentId);
        setVisitedMarketsIds(newVisitedMarketIds);
      }
      setItem(VISITED_MARKETS_LOCAL_STORAGE_KEY, newVisitedMarketIds);
    }
  };
  useEffect(() => {
    const storedVisitedMarkets = getItem(VISITED_MARKETS_LOCAL_STORAGE_KEY);
    const marketIds = markets.map((market) => market.id);
    if (storedVisitedMarkets) {
      const parsedData = JSON.parse(storedVisitedMarkets);
      const visitedMarketsIds2 = marketIds.filter((marketId) => parsedData.includes(marketId));
      setVisitedMarketsIds(visitedMarketsIds2);
    } else {
      setVisitedMarketsIds([]);
    }
  }, []);
  return jsxs(Flex, {
    className: "animate-slide-in",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "12px",
    children: [jsxs(Flex, {
      flexDirection: "column",
      gap: "12px",
      style: {
        margin: "24px",
        fontSize: "13px",
        lineHeight: "20px"
      },
      children: [jsx("h2", {
        style: {
          fontSize: "16px",
          textAlign: "center"
        },
        children: "Visit the markets to reveal the image!"
      }), jsxs("div", {
        style: {
          maxWidth: "100%"
        },
        children: [jsx("p", {
          children: "Rules:"
        }), jsxs("ul", {
          style: {
            paddingLeft: "20px",
            margin: "8px 0px"
          },
          children: [jsx("li", {
            style: {
              marginBottom: "8px"
            },
            children: "When you visit a market, click its corresponding box on the grid."
          }), jsx("li", {
            children: "You can only click the ornament after that market has opened this season."
          })]
        })]
      })]
    }), jsx(Flex, {
      className: "image-reveal",
      flexDirection: "column",
      alignItems: "center",
      style: {
        backgroundImage: `url(${SurpriseImage})`,
        backgroundSize: "100vw",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100vw",
        height: "412px"
      },
      children: squares.map((branch, idx) => jsx("div", {
        style: {
          display: "flex"
        },
        children: branch.map((ornament) => {
          const hasVisited = ornament === null || ornament && visitedMarketsIds.includes(ornament.id);
          return jsx(Flex, {
            justifyContent: "center",
            alignItems: "center",
            onClick: handleOrnamentClick(ornament == null ? void 0 : ornament.id),
            style: {
              width: "calc(100vw / 5)",
              height: "calc(412px / 4)",
              backgroundColor: hasVisited ? "transparent" : "white",
              transition: "background-color 1s ease",
              cursor: "pointer",
              "-webkit-tap-highlight-color": "transparent"
            },
            children: !hasVisited ? jsx("p", {
              style: {
                fontSize: "24px",
                fontWeight: !hasVisited ? "semi-bold" : "inherit"
              },
              children: ornament == null ? void 0 : ornament.id
            }) : null
          });
        })
      }, idx))
    }), jsxs("div", {
      className: "result-item",
      style: {
        margin: "24px",
        fontSize: "13px",
        lineHeight: "20px"
      },
      children: [jsx("h3", {
        style: {
          textDecoration: "underline"
        },
        children: "Legend"
      }), jsx(Flex, {
        flexDirection: "column",
        gap: "12px",
        children: markets.map((market) => {
          const hasVisited = checkHasVisitedMarket(market.id);
          return jsxs(Flex, {
            gap: "16px",
            children: [jsxs("p", {
              style: {
                flexBasis: "24px",
                textAlign: "center"
              },
              children: [market.id, "."]
            }), jsxs("div", {
              style: {
                flex: 1
              },
              children: [jsx("p", {
                children: market.name
              }), jsx("p", {
                style: {
                  fontSize: "11px"
                },
                children: market.district
              })]
            }), jsx("div", {
              onClick: handleOrnamentClick(market.id),
              style: {
                flexBasis: "16px",
                cursor: "pointer",
                "-webkit-tap-highlight-color": "transparent"
              },
              children: jsx("img", {
                src: hasVisited ? CircleCheckSolid : CircleCheck,
                width: 16,
                height: 16,
                loading: "lazy",
                alt: "name"
              })
            })]
          }, market.id);
        })
      })]
    })]
  });
};
const data = [
  {
    id: 1,
    name: "Winter MQ",
    district: "1070",
    coordinates: {
      lat: 48.202836,
      lng: 16.358979
    },
    start: "11/10/2022",
    end: "12/23/2022",
    times: [
      [
        "16:00",
        "23:00"
      ],
      [
        "16:00",
        "23:00"
      ],
      [
        "16:00",
        "23:00"
      ],
      [
        "16:00",
        "23:00"
      ],
      [
        "16:00",
        "23:00"
      ],
      [
        "14:00",
        "23:00"
      ],
      [
        "14:00",
        "23:00"
      ]
    ],
    website: "http://www.mqw.at",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 2,
    name: "Weihnachtsmarkt am Spittelberg",
    district: "1070",
    coordinates: {
      lat: 48.203344,
      lng: 16.355455
    },
    start: "11/11/2022",
    end: "12/23/2022",
    times: [
      [
        "14:00",
        "21:00"
      ],
      [
        "14:00",
        "21:00"
      ],
      [
        "14:00",
        "21:00"
      ],
      [
        "14:00",
        "21:00"
      ],
      [
        "14:00",
        "21:30"
      ],
      [
        "10:00",
        "21:30"
      ],
      [
        "10:00",
        "21:00"
      ]
    ],
    website: "https://spittelberg.at/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 3,
    name: "Weihnachtsmarkt im T\xFCrkenschanzpark",
    district: "1180",
    coordinates: {
      lat: 48.234781,
      lng: 16.333768
    },
    start: "11/11/2022",
    end: "12/23/2022",
    times: [
      [
        "15:00",
        "21:00"
      ],
      [
        "15:00",
        "21:00"
      ],
      [
        "15:00",
        "21:00"
      ],
      [
        "15:00",
        "21:00"
      ],
      [
        "15:00",
        "21:00"
      ],
      [
        "12:00",
        "21:00"
      ],
      [
        "12:00",
        "21:00"
      ]
    ],
    website: "https://www.weihnachtimpark.at/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 4,
    name: "Weihnachtsdorf am Stephansplatz",
    district: "1010",
    coordinates: {
      lat: 48.20824,
      lng: 16.37247
    },
    start: "11/11/2022",
    end: "12/26/2022",
    times: [
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ]
    ],
    website: "https://www.weihnachtsdorf.at/stephansplatz/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 5,
    name: "Advent-Genussmarkt bei der Oper",
    district: "1010",
    coordinates: {
      lat: 48.202518,
      lng: 16.371
    },
    start: "11/11/2022",
    end: "12/31/2022",
    times: [
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ]
    ],
    website: "http://www.adventgenussmarkt.at/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 6,
    name: "Weihnachtsdorf am Campus der Universit\xE4t Wien",
    district: "1090",
    coordinates: {
      lat: 48.215582,
      lng: 16.352607
    },
    start: "11/11/2022",
    end: "12/23/2022",
    times: [
      [
        "14:00",
        "22:00"
      ],
      [
        "14:00",
        "22:00"
      ],
      [
        "14:00",
        "22:00"
      ],
      [
        "14:00",
        "23:00"
      ],
      [
        "14:00",
        "23:00"
      ],
      [
        "11:00",
        "23:00"
      ],
      [
        "11:00",
        "20:00"
      ]
    ],
    website: "https://www.weihnachtsdorf.at/campus-universitaet-wien/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 7,
    name: "Weihnachtsmarkt Am Hof",
    district: "1010",
    coordinates: {
      lat: 48.210857,
      lng: 16.367494
    },
    start: "11/11/2022",
    end: "12/23/2022",
    times: [
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ]
    ],
    website: "https://www.weihnachtsmarkt-hof.at/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 8,
    name: "Weihnachtsdorf Maria-Theresien-Platz",
    district: "1010",
    coordinates: {
      lat: 48.204682,
      lng: 16.361063
    },
    start: "11/16/2022",
    end: "12/26/2022",
    times: [
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "22:00"
      ],
      [
        "11:00",
        "22:00"
      ],
      [
        "11:00",
        "21:00"
      ]
    ],
    website: "https://www.weihnachtsdorf.at/weihnachtsdorf-maria-theresien-platz/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 9,
    name: "Weihnacht im Wald",
    district: "1020",
    coordinates: {
      lat: 48.207493,
      lng: 16.401838
    },
    start: "11/17/2022",
    end: "12/31/2022",
    times: [
      null,
      null,
      null,
      [
        "16:00",
        "21:00"
      ],
      [
        "16:00",
        "21:00"
      ],
      [
        "16:00",
        "21:00"
      ],
      [
        "16:00",
        "21:00"
      ]
    ],
    website: " https://www.weihnachtimwald.com/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 10,
    name: "Weihnachtsmarkt in den Blumeng\xE4rten Hirschstetten",
    district: "1220",
    coordinates: {
      lat: 48.238924,
      lng: 16.474131
    },
    start: "11/17/2022",
    end: "12/23/2022",
    times: [
      null,
      null,
      null,
      [
        "10:00",
        "20:00"
      ],
      [
        "10:00",
        "20:00"
      ],
      [
        "10:00",
        "20:00"
      ],
      [
        "10:00",
        "20:00"
      ]
    ],
    website: "https://www.wien.gv.at/umwelt/parks/blumengaerten-hirschstetten/weihnachten.html",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 11,
    name: "Weihnachtsdorf Schloss Belvedere",
    district: "1030",
    coordinates: {
      lat: 48.191807,
      lng: 16.380843
    },
    start: "11/18/2022",
    end: "12/26/2022",
    times: [
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "11:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ]
    ],
    website: "https://www.weihnachtsdorf.at/schloss-belvedere/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 12,
    name: "Advent im Gartenpalais Liechtenstein",
    district: "1090",
    coordinates: {
      lat: 48.22227,
      lng: 16.359773
    },
    start: "11/18/2022",
    end: "12/23/2022",
    times: [
      [
        "13:00",
        "21:00"
      ],
      [
        "13:00",
        "21:00"
      ],
      [
        "13:00",
        "21:00"
      ],
      [
        "13:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ]
    ],
    website: "https://www.adventimgartenpalais.at/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 13,
    name: "Altwiener Christkindlmarkt Freyung",
    district: "1010",
    coordinates: {
      lat: 48.211618,
      lng: 16.36557
    },
    start: "11/18/2022",
    end: "12/23/2022",
    times: [
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ]
    ],
    website: "https://altwiener-markt.at/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 14,
    name: "Art Advent - Kunst & Handwerk am Karlsplatz",
    district: "1040",
    coordinates: {
      lat: 48.19861,
      lng: 16.371617
    },
    start: "11/18/2022",
    end: "12/23/2022",
    times: [
      [
        "12:00",
        "20:00"
      ],
      [
        "12:00",
        "20:00"
      ],
      [
        "12:00",
        "20:00"
      ],
      [
        "12:00",
        "20:00"
      ],
      [
        "12:00",
        "20:00"
      ],
      [
        "12:00",
        "20:00"
      ],
      [
        "12:00",
        "20:00"
      ]
    ],
    website: "https://divinaart.at/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 15,
    name: "Almadvent",
    district: "1020",
    coordinates: {
      lat: 48.217274,
      lng: 16.40742
    },
    start: "11/18/2022",
    end: "12/23/2022",
    times: [
      [
        "14:00",
        "22:00"
      ],
      [
        "14:00",
        "22:00"
      ],
      [
        "14:00",
        "22:00"
      ],
      [
        "14:00",
        "22:00"
      ],
      [
        "14:00",
        "22:00"
      ],
      [
        "14:00",
        "22:00"
      ],
      [
        "11:00",
        "21:00"
      ]
    ],
    website: "https://www.almadvent.at/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 16,
    name: "Kultur- und Weihnachtsmarkt Schloss Sch\xF6nbrunn",
    district: "1130",
    coordinates: {
      lat: 48.186191,
      lng: 16.312962
    },
    start: "11/19/2022",
    end: "1/4/2023",
    times: [
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ],
      [
        "10:00",
        "21:00"
      ]
    ],
    website: "https://www.schoenbrunn.at/veranstaltungen/alle-veranstaltungen/event/kultur-und-weihnachtsmarkt-schloss-schoenbrunn",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 17,
    name: "Wiener Christkindlmarkt auf dem Rathausplatz",
    district: "1010",
    coordinates: {
      lat: 48.210641,
      lng: 16.358914
    },
    start: "11/19/2022",
    end: "12/26/2022",
    times: [
      [
        "10:00",
        "21:30"
      ],
      [
        "10:00",
        "21:30"
      ],
      [
        "10:00",
        "21:30"
      ],
      [
        "10:00",
        "21:30"
      ],
      [
        "10:00",
        "21:30"
      ],
      [
        "10:00",
        "21:30"
      ],
      [
        "10:00",
        "21:30"
      ]
    ],
    website: "https://www.christkindlmarkt.at/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 18,
    name: "Wintermarkt am Riesenradplatz",
    district: "1020",
    coordinates: {
      lat: 48.216976,
      lng: 16.396323
    },
    start: "11/19/2022",
    end: "1/8/2023",
    times: [
      [
        "12:00",
        "22:00"
      ],
      [
        "12:00",
        "22:00"
      ],
      [
        "12:00",
        "22:00"
      ],
      [
        "12:00",
        "22:00"
      ],
      [
        "12:00",
        "22:00"
      ],
      [
        "11:00",
        "22:00"
      ],
      [
        "11:00",
        "22:00"
      ]
    ],
    website: "https://www.wintermarkt.at/",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 19,
    name: "Ottakringer Weihnachtszauber",
    district: "1160",
    coordinates: {
      lat: 48.212359,
      lng: 16.3242538
    },
    start: "11/24/2022",
    end: "12/23/2022",
    times: [
      null,
      null,
      null,
      [
        "15:00",
        "22:00"
      ],
      [
        "15:00",
        "22:00"
      ],
      [
        "11:00",
        "22:00"
      ],
      [
        "11:00",
        "20:00"
      ]
    ],
    website: "https://www.vienna.at/neuer-christkindlmarkt-in-wien-der-ottakringer-weihnachtszauber/7723477",
    imgUrl: "",
    type: "MARKET"
  },
  {
    id: 20,
    name: "Badeschiff ParadEis",
    district: "1010",
    coordinates: {
      lat: 48.21163,
      lng: 16.381463
    },
    start: "11/1/2022",
    end: "03/31/2023",
    times: [
      [
        "16:00",
        "22:00"
      ],
      [
        "16:00",
        "22:00"
      ],
      [
        "16:00",
        "22:00"
      ],
      [
        "16:00",
        "22:00"
      ],
      [
        "16:00",
        "22:00"
      ],
      [
        "12:00",
        "22:00"
      ],
      [
        "12:00",
        "22:00"
      ]
    ],
    website: "https://www.badeschiff.at/#eisstock",
    imgUrl: "",
    type: "EVENT"
  },
  {
    id: 21,
    name: "Winter in the City",
    district: "1010",
    coordinates: {
      lat: 48.20794,
      lng: 16.374048
    },
    start: "11/4/2022",
    end: "12/31/2022",
    times: [
      [
        "16:00",
        "20:00"
      ],
      [
        "16:00",
        "20:00"
      ],
      [
        "16:00",
        "20:00"
      ],
      [
        "16:00",
        "20:00"
      ],
      [
        "14:00",
        "20:00"
      ],
      [
        "14:00",
        "20:00"
      ],
      [
        "14:00",
        "20:00"
      ]
    ],
    website: "http://www.winterinthecity.at/",
    imgUrl: "",
    type: "EVENT"
  },
  {
    id: 22,
    name: "Punsch am Wasser",
    district: "1210",
    coordinates: {
      lat: 48.241072,
      lng: 16.398425
    },
    start: "11/04/2022",
    end: "12/18/2022",
    times: [
      null,
      null,
      null,
      [
        "15:00",
        "21:00"
      ],
      [
        "15:00",
        "21:00"
      ],
      [
        "15:00",
        "21:00"
      ],
      [
        "15:00",
        "21:00"
      ]
    ],
    website: "https://viennawurstelstand.com/event/punsch-am-wasser/",
    imgUrl: "",
    type: "EVENT"
  },
  {
    id: 23,
    name: "Urban apr\xE8s ski - Atmosphere Rooftop Bar",
    district: "1010",
    coordinates: {
      lat: 48.2022967,
      lng: 16.3764527
    },
    start: "11/07/2022",
    end: "12/31/2022",
    times: [
      [
        "16:00",
        "20:00"
      ],
      [
        "16:00",
        "20:00"
      ],
      [
        "16:00",
        "20:00"
      ],
      [
        "16:00",
        "20:00"
      ],
      [
        "16:00",
        "20:00"
      ],
      [
        "16:00",
        "20:00"
      ],
      [
        "16:00",
        "20:00"
      ]
    ],
    website: "https://www.ritzcarlton.com/de/hotels/europe/vienna/dining/atmosphere-rooftop-bar",
    imgUrl: "",
    type: "EVENT"
  },
  {
    id: 24,
    name: "k.u.k. Weihnachtsmarkt am Michaelerplatz",
    district: "1010",
    coordinates: {
      lat: 48.2079208,
      lng: 16.3668509
    },
    start: "11/11/2022",
    end: "1/6/2023",
    times: [
      [
        "10:00",
        "20:00"
      ],
      [
        "10:00",
        "20:00"
      ],
      [
        "10:00",
        "20:00"
      ],
      [
        "10:00",
        "20:00"
      ],
      [
        "10:00",
        "20:00"
      ],
      [
        "10:00",
        "20:00"
      ],
      [
        "10:00",
        "20:00"
      ]
    ],
    website: "https://kuk-weihnachtsmarkt.at/en/home-en/",
    imgUrl: "",
    type: "EVENT"
  },
  {
    id: 25,
    name: "IKEA Weihnachtsmarkt",
    district: "1150",
    coordinates: {
      lat: 48.1957757,
      lng: 16.3380544
    },
    start: "11/18/2022",
    end: "12/23/2022",
    times: [
      [
        "16:00",
        "20:00"
      ],
      [
        "16:00",
        "20:00"
      ],
      [
        "16:00",
        "20:00"
      ],
      [
        "16:00",
        "20:00"
      ],
      [
        "14:00",
        "20:00"
      ],
      [
        "14:00",
        "20:00"
      ],
      null
    ],
    website: "https://www.ikea.com/at/de/stores/wien-westbahnhof/events-und-aktivitaeten-im-ikea-einrichtungshaus-wien-westbahnhof-pub404b7a70",
    imgUrl: "",
    type: "EVENT"
  },
  {
    id: 26,
    name: "Punsch im Winterwonderland",
    district: "1220",
    coordinates: {
      lat: 48.2320506,
      lng: 16.4341442
    },
    start: "11/18/2022",
    end: "12/23/2022",
    times: [
      null,
      null,
      null,
      null,
      [
        "16:00",
        "21:00"
      ],
      [
        "16:00",
        "21:00"
      ],
      [
        "15:00",
        "21:00"
      ],
      null
    ],
    website: "https://www.dasbootshaus.at/",
    imgUrl: "",
    type: "EVENT"
  },
  {
    id: 27,
    name: "Klyo Punschterrassen",
    district: "1010",
    coordinates: {
      lat: 48.21164,
      lng: 16.383692
    },
    start: "11/19/2022",
    end: "12/23/2022",
    times: [
      [
        "17:00",
        "22:00"
      ],
      [
        "17:00",
        "22:00"
      ],
      [
        "17:00",
        "22:00"
      ],
      [
        "17:00",
        "22:00"
      ],
      [
        "17:00",
        "22:00"
      ],
      [
        "17:00",
        "22:00"
      ],
      [
        "17:00",
        "22:00"
      ]
    ],
    website: "https://klyo.at/urania-wien/",
    imgUrl: "",
    type: "EVENT"
  },
  {
    id: 28,
    name: "Pop Up Wintermarket @ Lucullus",
    district: "1030",
    coordinates: {
      lat: 48.198788,
      lng: 16.385051
    },
    start: "11/21/2022",
    end: "12/22/2022",
    times: [
      [
        "16:00",
        "21:00"
      ],
      [
        "16:00",
        "21:00"
      ],
      [
        "16:00",
        "21:00"
      ],
      [
        "16:00",
        "21:00"
      ],
      [
        "16:00",
        "21:00"
      ],
      null,
      null
    ],
    website: null,
    imgUrl: "",
    type: "EVENT"
  },
  {
    id: 29,
    name: "Kleinod Wintergarten",
    district: "1010",
    coordinates: {
      lat: 48.2031461,
      lng: 16.3783354
    },
    start: null,
    end: null,
    times: [
      null,
      [
        "17:00",
        "24:00"
      ],
      [
        "17:00",
        "24:00"
      ],
      [
        "17:00",
        "02:00"
      ],
      [
        "17:00",
        "02:00"
      ],
      [
        "17:00",
        "02:00"
      ],
      null
    ],
    website: "https://www.kleinod-stadtgarten.wien/",
    imgUrl: "",
    type: "EVENT"
  }
];
const Pages = () => {
  const [favorites, setFavorites] = useState([]);
  const [deviceLocation, setDeviceLocation] = useState(void 0);
  const {
    getItem
  } = useLocalStorage();
  const results = data;
  const marketResults = results.filter((result) => result.type === ResultType.MARKET);
  const eventResults = results.filter((result) => result.type === ResultType.EVENT);
  const favoriteResults = results.filter((result) => favorites.includes(result.id));
  useEffect(() => {
    const storedFavoritedMarkets = getItem(FAVORITED_MARKETS_LOCAL_STORAGE_KEY);
    if (storedFavoritedMarkets) {
      setFavorites(JSON.parse(storedFavoritedMarkets));
    }
  }, []);
  return jsxs(Router, {
    children: [jsx(Route, {
      path: "/markets",
      component: () => jsx(ResultList, {
        results: marketResults,
        favorites,
        setFavorites,
        deviceLocation,
        setDeviceLocation
      })
    }), jsx(Route, {
      path: "/events",
      component: () => jsx(ResultList, {
        results: eventResults,
        favorites,
        setFavorites,
        deviceLocation,
        setDeviceLocation
      })
    }), jsx(Route, {
      path: "/favorites",
      component: () => jsx(ResultList, {
        results: favoriteResults,
        favorites,
        setFavorites,
        deviceLocation,
        setDeviceLocation
      })
    }), jsx(Route, {
      path: "/visits",
      component: () => jsx(VisitProgress, {
        markets: marketResults
      })
    }), jsx(Route, {
      path: "/",
      component: Home
    })]
  });
};
const Menu = "/assets/menu.ece19ba9.svg";
const Close = "/assets/close.af04f3fc.svg";
const menuItems = [{
  name: "Home",
  to: Routes.HOME
}, {
  name: "Markets",
  to: Routes.MARKETS
}, {
  name: "Events",
  to: Routes.EVENTS
}, {
  name: "Favorites",
  to: Routes.FAVORITES
}, {
  name: "Visits",
  to: Routes.VISITS
}];
const NavigationMenu = ({
  isOpen,
  handleClose
}) => jsxs(Fragment, {
  children: [isOpen && jsx("div", {
    class: "fixed inset-0 bg-black bg-opacity-50 z-50",
    onClick: handleClose
  }), jsxs("div", {
    class: "fixed left-0 top-0 h-full w-4/5 sm:w-2/5 md:w-1/5 bg-white z-50 transform transition-transform ease-in-out duration-300",
    style: {
      transform: isOpen ? "translateX(0)" : "translateX(-100%)",
      transition: "transform 300ms ease-in-out"
    },
    children: [jsx("div", {
      class: "flex justify-end w-full p-6 pb-1",
      children: jsx("img", {
        src: Close,
        width: 24,
        height: 16,
        onClick: handleClose
      })
    }), jsx("ul", {
      class: "flex flex-col px-6 sticky top-0 z-1 bg-white",
      children: menuItems.map((item) => jsx(Link, {
        href: item.to,
        children: jsx("li", {
          onClick: handleClose,
          class: "p-2 hover:cursor-pointer",
          children: jsx("p", {
            class: "text-lg font-semibold",
            children: item.name
          })
        }, item.name)
      }))
    })]
  })]
});
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return jsxs(Fragment, {
    children: [jsx("div", {
      class: "w-full py-2 px-6 sticky top-0 z-10 bg-white",
      style: {
        boxShadow: "0 1px 2px rgba(0,0,0,.18)",
        height: `${HEADER_HEIGHT}px`
      },
      children: jsxs("div", {
        class: "flex justify-between items-center h-full",
        style: {
          maxWidth: `${MAX_CONTENT_WIDTH}px`,
          margin: "0 auto"
        },
        children: [jsx("img", {
          src: Menu,
          width: 24,
          height: 16,
          onClick: toggleMenu
        }), jsx(Link, {
          href: Routes.HOME,
          children: jsx("p", {
            class: "flex-1",
            children: "Christmas in Vienna"
          })
        }), jsx("div", {})]
      })
    }), jsx(NavigationMenu, {
      isOpen: isMenuOpen,
      handleClose: toggleMenu
    })]
  });
};
function App() {
  return jsxs("div", {
    style: {
      width: "100%",
      position: "fixed",
      overflowY: "scroll",
      inset: 0
    },
    children: [jsx(Header, {}), jsx("div", {
      style: {
        maxWidth: `${MAX_CONTENT_WIDTH}px`,
        height: `calc(100% - ${HEADER_HEIGHT}px)`,
        margin: "0 auto"
      },
      children: jsx(Pages, {})
    })]
  });
}
function render(context) {
  const html = render$1(jsx(App, {}), context);
  return `<!DOCTYPE html><html><body>${html}</body></html>`;
}
export {
  render
};
