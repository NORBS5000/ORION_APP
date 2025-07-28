const express = require('express');
const cors = require('cors');
const messageRoute = require('./routes/messageRoute');
const submitform = require('./routes/extractIdRoute');


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Use routes
app.use('/api', messageRoute);
app.use('/api', submitform);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
