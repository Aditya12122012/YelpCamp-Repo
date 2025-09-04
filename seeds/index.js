const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');
const Campground = require('../models/campground');
const Review = require('../models/review');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    await Review.deleteMany({});
    for (let i=0; i<300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 1600) + 800;
        const camp = new Campground({
            author: '68960a00167adb75c9731fed',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda doloremque, exercitationem officiis harum incidunt ut quibusdam qui soluta error minima voluptatibus vero consectetur! Doloribus veritatis vitae ratione nostrum, odit animi.",
            price,
            geometry: {
                "type": "Point",
                "coordinates": [
                    cities[random1000].longitude,
                    cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/djqmpv58p/image/upload/v1756106495/YelpCamp/ckkprddwv4jfc1fmpn7s.jpg',
                    filename: 'YelpCamp/ckkprddwv4jfc1fmpn7s',
                },
                {
                    url: 'https://res.cloudinary.com/djqmpv58p/image/upload/v1756106495/YelpCamp/e3czl2snlwu0mfdxg3hc.jpg',
                    filename: 'YelpCamp/e3czl2snlwu0mfdxg3hc',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})