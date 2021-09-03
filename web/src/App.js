import './App.css';
import {useState} from "react";
import {Button, Grid, TextField} from "@material-ui/core";
// import {JSDOM} from "jsdom";

function App() {
    const [page, setPage] = useState(1);
    const [scrape, setScrape] = useState("");
    async function scrapeUrl() {
        const res = await fetch("http://localhost:5000/"+page)
        const text = await res.text();
        //setScrape(text);
        //let dom = new JSDOM(text);
        //setScrape(dom.window.document.querySelector("results").innerHTML);

    }

    return (
        <div className="App">
            <Grid container>
                <Grid item xs={1}> </Grid>
                <Grid item xs={10} >
                    <TextField fullWidth value={page} onChange={(e)=>setPage(e.target.value)} />
                    <Button onClick={scrapeUrl}>Scrape</Button>
                </Grid>
                <Grid item xs={1}> </Grid>
                <Grid item xs={1}> </Grid>
                <Grid item xs={10}>
                        <TextField fullWidth multiline minRows={6} value={scrape}></TextField>
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
