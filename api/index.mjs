import express from 'express'
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
const port = 5000;

 app.use(cors());

app.get('/:page', async (req, res) => {
    const page = req.params.page
    const fetchRes = await fetch("https://www.jobindex.dk/jobsoegning?page="+page+"&q=transport")
    const text = await fetchRes.text();
    res.send(text)
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
