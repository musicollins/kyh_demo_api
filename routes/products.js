//Importing express to use router
const express = require("express");
//Importing pool from databse to be able to write queries
const pool = require("../db");
//Calling Router's Constructor to use router's properties (attributes)
const router = express.Router();

/**
 * Status Codes => General Information
 * 1xx informational response – the request was received, continuing process
    2xx successful – the request was successfully received, understood, and accepted
    3xx redirection – further action needs to be taken in order to complete the request
    4xx client error – the request contains bad syntax or cannot be fulfilled
    5xx server error – the server failed to fulfil an apparently valid request
 */

    /**
     * Get All Entries
     */
    router.get("/", async function (req, res) {
        /**
         * Performing a querty in the database to retrieve all entries
         * Consulting the database is an asynchronous operation
         */
        try {
            const sqlQuery = "SELECT * FROM product";
            const rows = await pool.query(sqlQuery);
            res.status(200).json(rows);
        } catch (error) {
            res.status(400).send(error.message);
        }
    });
    
    /**
     * Get an entry by id (id is contained in the request's params property)
     */

router.get("/:id", async function (req, res) {
  try {
    const sqlQuery = "Select * from product where id = ?";
    const rows = await pool.query(sqlQuery, req.params.id);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

    /**
     * Using POST to create an entry in the database
     */
router.post("/create", async function (req, res) {
    /**
     * Destructuring request's body into the properties that are sent by client (postman, frontend site)
     */
  const { Title, Genre, Synopsis, ImgUrl } = req.body;

  try {
    const sqlQuery =
      "Insert into product (title, genre, synopsis, imgurl) values (?, ?, ?, ?)";
      /**
       * The query method in "pool" can receive various arguments.
       * in this case an array with the values is sent.
       */
    const result = await pool.query(sqlQuery, [Title, Genre, Synopsis, ImgUrl]);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/**
 * Export router as module to then be required in server.js 
 * where it will be used.
 */
module.exports = router;

/**
 * Hard Coded objects to be used with no database
 * 
 * let products = [
    {
      MovieId: 1,
      Title: "The Shining",
      Genre: "Horror",
      Synopsis:
        "Writer Jack Torrance takes a job as a winter caretaker of the Overlook Hotel in the remote Colorado mountains. He moves in, along with his wife Wendy and son Danny, in the hope that the isolation will cure his writer’s block. But as the weather isolates them, Jack descends into madness. And then apparitions from the hotel’s past appear, imploring Jack to kill his family.",
      ImgUrl: "https://pics.filmaffinity.com/the_shining-453129380-large.jpg",
    },
    {
      MovieId: 2,
      Title: "Ran",
      Genre: "Drama",
      Synopsis:
        "A reinterpretation of William Shakespeare's 'King Lear'. The Lear counterpart is an elderly 16th-century warlord (Tatsuya Nakadai), who announces that he's about to divide his kingdom equally among his three sons. In his dotage, he falls prey to the false flattery of his treacherous sons (Akira Terao and Jinpachi Nezu), while banishing his youngest son (Daisuke Ryu), the only member of the family who loves him enough to tell him the unvarnished truth. Thanks to his foolish pride, his domain collapses under its own weight as the sons battle each other over total control.",
      ImgUrl: "https://pics.filmaffinity.com/ran-397228667-large.jpg",
    },
    {
      MovieId: 3,
      Title: "Fight Club",
      Genre: "Action",
      Synopsis:
        "A nameless disillusioned young urban male (Edward Norton) fights insomnia by attending disease support groups until he meets a kindred spirit -and soap salesman (Brad Pitt). Together they form Fight Club, where young men can exert their frustrations and angst upon one another.",
      ImgUrl: "https://pics.filmaffinity.com/fight_club-320750671-large.jpg",
    },
    {
      MovieId: 4,
      Title: "The Adventures of Picasso",
      Genre: "Comedy",
      Synopsis:
        "Already in his childhood, Pablo Picasso shows talent for painting and is sent to the Academy of Arts in Madrid. He becomes a painter but has to live in Paris in poverty. But one day he is discovered by a rich American millionaire and starts to earn money. But he wastes his talent by painting plates. He meets the famous people of the 1920s; Gertrude Stein, Alice B. Toklas, Appolinaire, Hitler and Churchill",
      ImgUrl:
        "https://pics.filmaffinity.com/picassos_aventyr-145972801-large.jpg",
    },
    {
      MovieId: 5,
      Title: "The Hateful Eight",
      Genre: "Thriller",
      Synopsis:
        "In THE HATEFUL EIGHT, set or eight or twelve years after the Civil War, a stagecoach hurtles through the wintry Wyoming landscape. The passengers, bounty hunter John Ruth (Russell) and his fugitive Daisy Domergue (Leigh), race towards the town of Red Rock where Ruth, known in these parts as “The Hangman,” will bring Domergue to justice.",
      ImgUrl:
        "https://pics.filmaffinity.com/the_hateful_eight-549467052-large.jpg",
    },
  ];
 */
