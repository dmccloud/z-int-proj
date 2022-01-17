const { RESTDataSource } = require("apollo-datasource-rest");
require("dotenv").config();

class EventAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `https://app.ticketmaster.com/discovery/v2/`;
  }
  eventReducer(event) {
    console.log("reducing event");
    return {
      id: event.id,
      name: event.name,
      url: event.url,
      image: event.images.filter((im) => im.ratio === "16_9")[0].url,
      start: event.dates.start.dateTime,
      Venue: {
        name: event._embedded.venues[0].name,
        address: event._embedded.venues[0].address.line1,
        city: event._embedded.venues[0].city.name,
        lat: event._embedded.venues[0].location.latitude,
        lon: event._embedded.venues[0].location.longitude,
      },
    };
  }

  async getAllEvents({ pageNum = 0 }) {
    const response = await this.get(
      `events.json?apikey=${
        process.env.API_KEY
      }&city=Salt+Lake+City&radius100&sort=date,asc&page=${pageNum ?? 0}`
    );

    const responseArray = response._embedded.events;

    return Array.isArray(responseArray)
      ? responseArray.map((event) => {
          return this.eventReducer(event);
        })
      : [];
  }

  async getEventById({ eventId }) {
    const response = await this.get(
      `events/${eventId}.json?apikey=${process.env.API_KEY}`
    );
    return this.eventReducer(response);
  }

  async getEventsByIds({ eventIds }) {
    return Promise.all(
      eventIds.map((eventId) => this.getEventById({ eventId }))
    );
  }
}

module.exports = EventAPI;
