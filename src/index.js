const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

const port = process.env.PORT || 8000;

// set the uri value
const uri = process.env.DB_URL;

// connect to the uri
async function main() {
  await mongoose.connect(uri);
}

main()
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  })
  .catch((err) => console.log(err));
