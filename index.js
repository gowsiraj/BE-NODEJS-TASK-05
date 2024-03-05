import express from "express";
import fs from "fs";
import { format } from "date-fns";

const app = express();
const PORT = 4000;

app.listen(PORT, () => {
    console.log(`app is running in the port ${PORT}`);
});

app.get('/write', (req, res) => {
    let today = format(new Date(), "dd-mm-yyyy-HH-mm-ss");
    const filePath = `Time/${today}.txt`;
    // Writing the file
    fs.writeFileSync(filePath, `${today}`, "utf8");
    // Sending a response
    res.status(200).json(`${today}`);
});

app.get('/read', (req, res) => {
    let today = format(new Date(), "dd-mm-yyyy-HH-mm-ss");
    const filePath = `Time/${today}.txt`;
    try {
        // Reading the file
        let readData = fs.readFileSync(filePath, "utf8");
        res.status(200).send(readData);
    } catch (error) {
        // Handle file not found or other errors
        console.error(error);
        res.status(404).json({ error: 'File not found or could not be read' });
    }
});

app.get('/readAll', (req, res) => {
    const folderPath = 'Time';
    const fileNames = fs.readdirSync(folderPath);
    const fileNamesWithoutExtension = fileNames.map(fileName => fileName.replace('.txt', ''));
    const responseString = fileNamesWithoutExtension.join(', ');
    res.status(200).send(`<h1 style="text-align:center">Have a Good Day!</h1><br><p style="text-align:center">${responseString}</p>`);
});



