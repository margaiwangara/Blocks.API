const express = require('express');

const app = express();

// PORT
const PORT = parseInt(process.env.PORT || 5000, 10);

app.listen(PORT, () =>
  console.log(`App running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
