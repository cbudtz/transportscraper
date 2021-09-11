import './App.css';
import {useState} from "react";
import {Button, Grid, TextField} from "@material-ui/core";
import * as jsonexport from "jsonexport/dist"

const BASE_URL = process.env.NODE_ENV==="development" ? "http://localhost:5000/" : "/"

function App() {
    const [url, setUrl] = useState("https://www.jobindex.dk/jobsoegning?q=transport")
    const [page, setPage] = useState(1);
    const [scrape, setScrape] = useState("");
    async function scrapeUrl() {
        let jobArray = []
        for (let i=page;i <200;i++ ) {
            const res = await fetch(BASE_URL ,{
                method:"POST",
                body:JSON.stringify({url:url+"&page=" + i} ),
                headers: {"Content-Type":"application/json"}
            })
            const text = await res.text();
            var dom = new DOMParser().parseFromString(text, "text/html")
      //      console.log(dom.getElementById("results"));

            var resultArray = dom.getElementById("results").getElementsByClassName("jobsearch-result");
            if (resultArray.length<1) {break;}
            for (let i = 0; i < resultArray.length; i++) {
                let job = resultArray.item(i)
                console.log(job)
                let title = job.getElementsByClassName("PaidJob-inner")?.item(0)?.getElementsByTagName("a").item(1).innerText;
                title = title || job.getElementsByClassName("jix_robotjob-inner").item(0)?.getElementsByTagName("a").item(0).innerText.trim();
                let description = job.getElementsByClassName("PaidJob-inner")?.item(0)?.innerText;
                description = description || job.getElementsByClassName("jix_robotjob-inner").item(0)?.innerText.trim();
                const time = job.getElementsByTagName("time")?.item(0)?.innerText
                let id = job.getElementsByTagName("div")?.item(0).getAttribute("data-beacon-tid").trim()
                jobArray.push({id: id, title: title, description: description, time: time})
            }
            setPage(page+i)
        }
        setScrape(JSON.stringify(jobArray))
        const repJSON = JSON.parse(JSON.stringify(jobArray).replace("\n\n","  "))
        await jsonexport(repJSON,{rowDelimiter: ";"},(err,csv)=>{
            if (err) return console.error(err);
            console.log(csv)
            setScrape(csv)
        })
        setPage(1)
    }

    function saveTextAsFile(textToWrite, fileNameToSaveAs)
    {
        var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        if (window.webkitURL != null)
        {
            // Chrome allows the link to be clicked
            // without actually adding it to the DOM.
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
        }

        downloadLink.click();
    }

    return (
        <div className="App">
            <Grid container>
                <Grid item xs={1}> </Grid>
                <Grid item xs={10} >
                    <TextField label={"Url"}fullWidth value={url} onChange={(e)=>setUrl(e.target.value)}/>
                    <Button onClick={scrapeUrl}>Scrape</Button>
                    <div>Scraping page: {page}</div>
                </Grid>
                <Grid item xs={1}> </Grid>
                <Grid item xs={1}> </Grid>
                <Grid item xs={10}>
                    <Button onClick={()=>saveTextAsFile(scrape,"scrape.csv")}>Download as csv (separated by ";")</Button>
                </Grid>
                <Grid item xs={1}> </Grid>
                <Grid item xs={1}> </Grid>

                <Grid item xs={10} >
                    <pre style={{whiteSpace:"pre-wrap",wordWrap:"break-word"}}>{scrape}</pre>
                </Grid>

            </Grid>
        </div>
    );
}

export default App;
