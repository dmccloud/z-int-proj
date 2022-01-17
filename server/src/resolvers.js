module.exports = {
  Query: {
    events: (_, { pageNum }, { dataSources }) =>
      dataSources.eventAPI.getAllEvents({ pageNum: pageNum }),
    event: (_, { id }, { dataSources }) =>
      dataSources.eventAPI.getEventById({ eventId: id }),
    me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser(),
  },
  Event: {
    isBooked: async (event, _, { dataSources }) => {
      return dataSources.userAPI.isBookedForEvent({ eventId: event.id });
    },
  },
  User: {
    events: async (_, __, { dataSources }) => {
      const eventIds = await dataSources.userAPI.getEventIdsByUser();
      if (!eventIds.length) {
        return [];
      }
      // look up those events by their ids
      return dataSources.eventAPI.getEventsByIds({ eventIds });
    },
  },
  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) {
        user.token = Buffer.from(email).toString("base64");
        return user;
      }
    },
    bookEvents: async (_, { eventIds }, { dataSources }) => {
      const results = await dataSources.userAPI.bookEvents({ eventIds });
      const events = await dataSources.eventAPI.getEventsByIds({ eventIds });
      console.log(results);

      return {
        success: results && results.length === eventIds.length,
        message:
          results.length === eventIds.length
            ? "events successfully booked"
            : `the following events could not be booked: ${eventIds.filter(
                (id) => !results.incluedes(id)
              )}`,
        events,
      };
    },
    cancelEvent: async (_, { eventId }, { dataSources }) => {
      const result = await dataSources.userAPI.cancelEvent({ eventId });

      if (!result) {
        return {
          success: false,
          message: "failed to cancel event",
        };
      }

      const event = await dataSources.eventAPI.getEventById({ eventId });
      return {
        success: true,
        message: `event has been cancelled `,
        events: [event],
      };
    },
  },
};
