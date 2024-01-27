import React, {useState} from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [language, setLanguage] = useState('schlachter');
    const [verse, setVerse] = useState('');
    const [verseText, setVerseText] = useState('');

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value);
    };

    const handleVerseChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVerse(event.target.value);
    };

    const cleanVerseText = (text: string) => {
        return text.replace(/<FR>|<Fr>/g, '');
    };

    const fetchVerse = () => {
        const url = `https://query.getbible.net/v2/${language}/${verse}`;
        axios.get(url)
            .then(response => {
                // Extracting verse text from response
                const key = Object.keys(response.data)[0]; // Assuming the key is dynamic
                const verseData = response.data[key].verses[0].text;
                setVerseText(cleanVerseText(verseData));
            })
            .catch(error => {
                console.error('Error fetching verse:', error);
                setVerseText('Error fetching verse');
            });
    };

    return (
        <div className="app-container">
            <div className="header">
                <img src="logo512.png" alt="a golden cross" className="header-image"/>
                <h1 className="title">Ask the Bible</h1>
            </div>


            <select className="form-control" value={language} onChange={handleLanguageChange}>
                <option value="schlachter">German</option>
                <option value="kjv">English</option>
                <option value="ls1910">French</option>
                <option value="zhuromsky">Russian</option>
            </select>

            <input
                className="form-control"
                type="text"
                value={verse}
                onChange={handleVerseChange}
                placeholder="Enter Verse (e.g., John 3:16)"
            />
            <button className="button" onClick={fetchVerse}>Fetch Verse</button>

            <div className="verse-display">
                {verseText}
            </div>
        </div>
    );
}

export default App;
