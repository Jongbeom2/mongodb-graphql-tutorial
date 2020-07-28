const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(process.env.PORT || 4000, () => console.log(`Server ready ${process.env.PORT || 4000}`));