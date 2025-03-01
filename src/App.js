

import React, { useState, useEffect } from "react";
import axios from "axios";
import NewsList from "./components/NewsList";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";
import LanguageSwitcher from "./components/LanguageSwitcher";
import { FaSun, FaMoon, FaCloudSun } from "react-icons/fa"; // Importing icons for visual enhancement

const App = () => {
  const [news, setNews] = useState([]); // Initialize as an empty array
  const [weather, setWeather] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [language, setLanguage] = useState("en");
  const [location, setLocation] = useState("India");
  const [isDarkMode, setIsDarkMode] = useState(false); // State for theme toggle
  const [greeting, setGreeting] = useState("");
  const [greetingIcon, setGreetingIcon] = useState(null); // State for greeting icon

  const GNEWS_API = "bd7cdecc4eeea729ccf1bbc593f169c0";
  const OPENWEATHER_API = "19a05712dab46130b9be66beb8103115";

  // Get the user's location (City) and determine the greeting based on time of day
  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          // Fetch weather data
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API}`
          );
          setWeather(weatherResponse.data);

          // Fetch news data
          const newsResponse = await axios.get(
            `https://gnews.io/api/v4/top-headlines?lang=${language}&country=in&token=${GNEWS_API}`
          );
          if (newsResponse.data && newsResponse.data.articles) {
            setNews(newsResponse.data.articles); // Safely set the articles
          } else {
            setNews([]); // Set an empty array if no articles found
          }

          // Determine the local time and set a greeting
          const localTime = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
          const hours = localTime.getHours();
          if (hours >= 0 && hours < 12) {
            setGreeting("Good Morning");
            setGreetingIcon(<FaSun className="text-yellow-400 text-4xl" />);
          } else if (hours >= 12 && hours < 17) {
            setGreeting("Good Afternoon");
            setGreetingIcon(<FaCloudSun className="text-yellow-500 text-4xl" />);
          } else {
            setGreeting("Good Evening");
            setGreetingIcon(<FaMoon className="text-blue-500 text-4xl" />);
          }
        });
      }
    };
    getLocation(); // Invoke the async function
  }, [language]);

  // Fetch news data based on the search query
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const newsResponse = await axios.get(
          `https://gnews.io/api/v4/search?q=${searchQuery}&lang=${language}&token=${GNEWS_API}`
        );

        if (newsResponse.data && newsResponse.data.articles) {
          setNews(newsResponse.data.articles);
        } else {
          setNews([]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]); // Fallback to an empty array on error
      }
    };

    if (searchQuery) {
      fetchNews();
    } else {
      const newsResponse = axios.get(
        `https://gnews.io/api/v4/top-headlines?lang=${language}&country=in&token=${GNEWS_API}`
      );

      newsResponse.then((response) => {
        if (response.data && response.data.articles) {
          setNews(response.data.articles);
        } else {
          setNews([]);
        }
      });
    }
  }, [searchQuery, language]);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div
      className={`min-h-screen p-6 ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">NEWSIFY</h1>

          {/* Greeting with animation */}
          {greeting && (
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-2 px-6 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 animate__animated animate__fadeIn animate__delay-1s">
                <h2 className="text-3xl font-semibold">{greeting}</h2>
              </div>
              <div className="flex justify-center items-center">
                {greetingIcon}
              </div>
            </div>
          )}

          <div className="flex items-center space-x-4">
            <LanguageSwitcher setLanguage={setLanguage} />
            <button
              onClick={toggleDarkMode}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>

        <SearchBar setSearchQuery={setSearchQuery} />

        {weather && <WeatherCard weather={weather} />}

        {/* Pass the news to the NewsList component */}
        <NewsList articles={news} />
      </div>
    </div>
  );
};

export default App;
