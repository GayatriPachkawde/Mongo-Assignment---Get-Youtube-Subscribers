const express = require("express");
const app = express();
const mongoose = require("mongoose");
const subscriberModel = require("./models/subscribers");
const data = require("./data");

const db = mongoose.connection;

app.get("/subscribers", async (req, res) => {
  const subscribers = await subscriberModel.find({});
  res.send(subscribers);
});

app.get("/subscribers/names", async (req, res) => {
  const subscribers = await subscriberModel.find({});

  const names = subscribers.map((subscriber) => {
    return {
      name: subscriber.name,
      subscribedChannel: subscriber.subscribedChannel,
    };
  });

  res.send(names);
});

app.get("/subscribers/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const subscriber = await subscriberModel.findOne({ __id: id });
    if (subscriber == null) {
      res.status(400).send({ message: e });
    } else {
      res.send(subscriber);
    }
  } catch (e) {
    res.status(400).send({ message: e });
  }
});
module.exports = app;
