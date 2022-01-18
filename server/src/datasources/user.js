const { DataSource } = require("apollo-datasource");
const isEmail = require("isemail");

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async findOrCreateUser({ email: emailArg } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;

    const users = await this.store.users.findOrCreate({ where: { email } });
    return users && users[0] ? users[0] : null;
  }

  async isBookedForEvent({ eventId }) {
    if (!this.context || !this.context.user) return false;
    const userId = this.context.user.id;
    const found = await this.store.events.findAll({
      where: { userId, eventId },
    });
    return found && found.length > 0;
  }

  async getEventIdsByUser() {
    const userId = this.context.user.id;
    const found = await this.store.events.findAll({
      where: { userId },
    });
    return found && found.length
      ? found.map((l) => l.dataValues.eventId).filter((l) => !!l)
      : [];
  }

  //Book a single event
  async bookEvent({ eventId }) {
    const userId = this.context.user.id;
    const res = await this.store.events.findOrCreate({
      where: { userId, eventId },
    });
    return res && res.length ? res[0].get() : false;
  }

  // Book multiple events (runs bookEvent on multiple event ids)
  async bookEvents({ eventIds }) {
    const userId = this.context.user.id;

    if (!userId) return;

    let results = [];

    // Book event for every event id in the array
    for (const eventId of eventIds) {
      const res = await this.bookEvent({ eventId });
      if (res) results.push(res);
    }

    return results;
  }

  async cancelEvent({ eventId }) {
    const userId = this.context.user.id;
    return !!this.store.events.destroy({ where: { userId, eventId } });
  }
}

module.exports = UserAPI;
