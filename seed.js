import mongoose from 'mongoose';
import User from './models/User.js';
import Article from './models/Article.js';

// Sample data
const users = [
    {
        firstName: "Tony",
        lastName: "Iommi",
        bands: ["Black Sabbath", "Heaven and Hell"],
        instrument: "guitar",
        albums: [
            { title: "Vol 4", year: 1972 },
            { title: "Master of Reality", year: 1971 }
        ],
        birthday: "1950-12-09"
    },
    {
        firstName: "Ozzy",
        lastName: "Osbourne",
        bands: ["Black Sabbath"],
        instrument: "vocals",
        albums: [
            { title: "Paranoid", year: 1970 },
            { title: "Blizzard of Ozz", year: 1980 }
        ],
        birthday: "1948-12-03"
    }
];

const articles = [
    {
        title: "The Power of Heavy Metal",
        author: null, // Set in seed function after User creation
        keywords: ["music", "rock", "guitar"],
        category: "Music",
        comments: []
    },
    {
        title: "Top 10 Rock Albums",
        author: null, // Set in seed function after User creation
        keywords: ["rock", "albums", "top"],
        category: "Music",
        comments: []
    }
];

// Seed function
async function seedDatabase() {
    try {
        await mongoose.connect(process.env.DB_URI);

        // Clear existing data
        await User.deleteMany({});
        await Article.deleteMany({});

        console.log("Existing data cleared.");

        // Insert users and store references
        const createdUsers = await User.insertMany(users);
        console.log("Users seeded:", createdUsers);

        // Assign the first user's ID as the author for each article
        articles.forEach(article => {
            article.author = createdUsers[0]._id;
        });

        // Insert articles with author IDs set
        const createdArticles = await Article.insertMany(articles);
        console.log("Articles seeded:", createdArticles);

        console.log("Database seeding completed successfully.");
        mongoose.connection.close();
    } catch (error) {
        console.error("Error seeding database:", error);
        mongoose.connection.close();
    }
}

// Run the seed function
seedDatabase();
