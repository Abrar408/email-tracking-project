const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*',
}))

app.get('/id', (req, res) => {
    console.log('req received')
    res.status(200).send('987654')
})
app.listen(3000,()=>{
    console.log('listening on port 3000');
})