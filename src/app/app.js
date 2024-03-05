const express = require('express');
const sonar = require('sonar-express');

const app = express();
const port = process.env.PORT || 3000;



app.use(express.json());
app.use(sonar());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
