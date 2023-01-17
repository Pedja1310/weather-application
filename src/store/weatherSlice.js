import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// https://api.darksky.net/forecast/5c5dddd8536ffa58ce50ae7aeef7adab/44.66278,20.93?units=si&exclude=minutely,flags,reports,alerts

// https://cors-anywhere.herokuapp.com/

export const getWeatherForecast = createAsyncThunk(
  "weather/fetchWeather",
  async (latLng) => {
    const { lat, lng } = latLng;
    const response = await axios.get(
      `https://proxy.cors.sh/https://api.darksky.net/forecast/5c5dddd8536ffa58ce50ae7aeef7adab/${lat},${lng}?units=si&exclude=minutely,flags,reports,alerts`,
      {
        headers: {
          "x-cors-api-key": "temp_149e848ef480c5d5004107a7122c2605",
        },
      }
    );
    return response.data;
  }
);

export const getUserCity = createAsyncThunk(
  "city/reverseGeocodeCity",
  async (latLng) => {
    const { lat, lng } = latLng;
    const response = await axios.get(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
    );

    return response.data;
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    data: {
      currently: {},
      hourly: {},
      daily: {},
    },
    loading: "",
    city: "",
    country: "",
    coordinates: {},
  },
  reducers: {
    setCoordinates(state, action) {
      state.coordinates = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getWeatherForecast.pending, (state, action) => {
        state.loading = "loading";
      })
      .addCase(getWeatherForecast.fulfilled, (state, action) => {
        state.loading = "success";
        state.data = { ...action.payload };
      })
      .addCase(getWeatherForecast.rejected, (state, action) => {
        state.loading = "failed";
      })
      .addCase(getUserCity.fulfilled, (state, action) => {
        state.city = action.payload.city;
        state.country = action.payload.countryName;
      });
  },
});

export const { setCoordinates } = weatherSlice.actions;

export const selectCoordinates = (state) => state.weather.coordinates;

export const selectCity = (state) => state.weather.city;

export const selectCountry = (state) => state.weather.country;

export const selectCurrently = (state) => state.weather.data.currently;

export const selectHourly = (state) => state.weather.data.hourly;

export const selectDaily = (state) => state.weather.data.daily;

export default weatherSlice.reducer;
