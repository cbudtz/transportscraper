import express from 'express'
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5000;

 app.use(cors());
 app.use(express.static("static"))
 app.use(express.json());

app.post('/', async (req, res) => {
    const url = await req.body.url
    console.log(url)
    const fetchRes = await fetch(url)
    const text = await fetchRes.text();
    res.send(text)
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
    //console.log(process.env)
})
