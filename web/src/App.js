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
        var dom = new DOMParser().parseFromString(text,"text/html")
        console.log(dom.getElementById("results"));
        let jobArray = []
        var resultArray = dom.getElementById("results").getElementsByClassName("jobsearch-result");
        for (let i = 0 ; i < resultArray.length; i ++){
            let job = resultArray.item(i)
            console.log(job)
            const title = job.getElementsByClassName("PaidJob-inner").item(0).getElementsByTagName("a").item(1).innerText;
            const description = job.getElementsByClassName("PaidJob-inner").item(0).innerText
            const time = job.getElementsByTagName("time").item(0).innerText
            jobArray.push({title: title,description:description, time:time})
        }
        setScrape(JSON.stringify(jobArray))
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
