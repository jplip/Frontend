---
title: Player Search
permalink: playersearch.html
---

<body>
    <input type="text" id="inputField" onkeypress="saveInput(event)" placeholder="Enter tag without #">
    <div id="result-container">
        <div id="name">
            <h1></h1>
        </div>
        <div id="trophies">
            <h1></h1>
        </div>
        <div id="playerStats">
        </div>
    </div>
</body>

<style>
    body {
        background-color: black;
        background-image: url("/images/background.jpg");
    }
    
    h1 {
        color: white;
    }
    #result-container {
        background-color: white;
        margin: 2em;
        text-align: center;
        border-radius: 10px;
    }

     {
        border-radius: 0.6em;
        margin: 1em;
        overflow: auto;
    }

   {
        display: flex;
        justify-content: center; /* Center horizontally */
        align-items: center; /* Center vertically */
    }

    {
        display: flex;
        flex-direction: column;
        justify-content: center; /* Center content vertically */
        align-items: center; /* Center content horizontally */
        padding: 10px;
        border: 1px solid black;
        border-radius: 5px;
        background-color: lightgray;
        opacity: 0;
        transition: opacity 0.5s;
        width: 25%;
        margin: 1em;
    }

     {
        opacity: 1; /* Show when 'show' class is added */
    }

   {
        color: black;
        font-size: 3.5em;
    }
    {
        margin: auto;
    }
    {
        margin: 0px 3px 2px 0px;
        width: auto;
        height: auto;
        max-width: 100%;
        max-height: 100%;
    }  
    #playerStats {
        padding: 10px; /* Add some padding for better readability */
    }

    #playerStats table {
        width: 100%; /* Make the table width 100% of its container */
        background-color: grey;
        margin-left: auto;
        margin-right: auto;
        border: 1px solid;
    }

    #playerStats th,
    #playerStats td {
        padding: 5px; /* Add padding to table cells */
        text-align: center;
    }
</style>

<script>
    let isCooldownActive = false; // Track if cooldown is active
    const cooldownDuration = 2000; // Cooldown period in milliseconds
    async function saveInput(event) {
        if (event.keyCode !== 13 || isCooldownActive) return; // Exit if Enter key is not pressed or cooldown is active
        isCooldownActive = true; // Set cooldown active
        const playerStatsDiv = document.getElementById("playerStats");
        while (playerStatsDiv.firstChild) {
            playerStatsDiv.removeChild(playerStatsDiv.firstChild);
        }
        try {
            const inputText = document.getElementById("inputField").value;
            const response = await fetch("https://api.clashroyale.com/v1/players/%23df3fd"), {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ "tag": inputText })
            };
            console.log("data received");
            const result = await response.json();
            // PARSING DATA + DEFINING VARIABLES
            const parsedData = JSON.parse(result);
            console.log(parsedData);
            const { name, trophies, wins, threeCrownWins, 'Three Crown Victories': threeVsThreeVictories, brawlers } = parsedData;
            const nameDiv = document.getElementById("name");
            // NAME
            nameDiv.innerText = name;
            // TROPHIES
            const trophiesDiv = document.getElementById("trophies");
            trophiesDiv.innerHTML = `<img src="/images/trophy2.png" style="width: 20px">${trophies}`;
            // WINS TABLE
            if (!playerStatsDiv.querySelector("table")) {
                const table = document.createElement("table");
                const wins = `<img src="images/wins.png" style="width: 30px">`;
                const threeCrownWins = `<img src="images/duoshowdown.png" style="width: 30px">`;
            
                const headers = [wins + "<br>" + "Wins", threeCrownWins + "<br>" + "Three Crown Wins"];
                table.innerHTML = `
                    <tr>${headers.map(headerText => `<th>${headerText}</th>`).join("")}</tr>
                    <tr>${[wins, threeCrownVictories].map(winCount => `<td>${winCount}</td>`).join("")}</tr>
                `;
                playerStatsDiv.appendChild(table);
            }
        
        }
    }
</script>