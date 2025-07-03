const body = document.body;
    Object.assign(body.style, {
        height: "100vh",
        margin: "0",
        padding: "100px",
        backgroundImage: 'url("https://files.catbox.moe/xpxc9c.jpg")',
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        textAlign: "center"
    });

    const title = document.createElement("h1");
    title.textContent = "Rick and Morty Universe: Reveal Any Character's Origin World";
    Object.assign(title.style, {
        fontFamily: '"Creepster", sans-serif',
        fontWeight: "400",
        fontSize: "80px",
        color: "#a6ff00",
        WebkitTextStroke: "4px #3B0157",
        margin: "0"
    });
    body.append(title);

    const container = document.createElement("div");
    Object.assign(container.style, {
        display: "inline-block",
        marginTop: "50px"
    });
    body.append(container);

    const input = document.createElement("input");
    input.setAttribute("type", "text");
    input.setAttribute("placeholder", "Enter any character name");
    Object.assign(input.style, {
        border: "4px solid #3b0157",
        borderRadius: "6px",
        width: "250px",
        height: "35px",
        background: "#fdf6a3",
        padding: "10px 30px",
        color: "#5c2d7a",
        fontSize: "18px",
        fontWeight: "400",
        fontFamily: '"Orbitron", sans-serif'
    });
    container.append(input);

    const style = document.createElement("style");
    style.textContent = `
        input::placeholder {
            color: #5c2d7a;
            font-size: 14px;
            font-family: "Orbitron", sans-serif;
            opacity: 0.8;
        }
        input:focus {
            outline: none;
        }
    `;
    document.head.appendChild(style);

    const search = document.createElement("button");
    search.textContent = "Search";
    Object.assign(search.style, {
        border: "4px solid #3b0157",
        borderRadius: "12px",
        boxShadow: "3px 3px 0 0 #3b0157",
        background: "#a6ff00",
        fontFamily: '"Orbitron", sans-serif',
        fontWeight: "600",
        fontSize: "20px",
        color: "#3b0157",
        padding: "10px 25px",
        marginLeft: "30px"
    });
    container.append(search);

    const message = document.createElement("p");
    Object.assign(message.style, {
        color: "#00f2ff",
        textShadow: "1px 1px 1px #3b0157",
        fontFamily: '"Rajdhani", sans-serif',
        fontSize: "18px",
        fontWeight: "600",
        marginTop: "10px"
    });
    container.append(message);

    input.addEventListener("input", () => {
        search.disabled = false;
        message.textContent = "";
    });

    search.addEventListener("click", () => {
        const character = input.value;
        if (character.trim() === "") {
            message.textContent = "Please enter a character name.";
            return;
        }

        search.disabled = true;

        const oldInfo = document.querySelector(".info");
        if (oldInfo) oldInfo.remove();

        const fetchCharacter = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", `https://rickandmortyapi.com/api/character/?name=${character}`);
            xhr.send();
            xhr.onload = () => {
                const data = JSON.parse(xhr.response);
                resolve(data);
            };
            xhr.onerror = () => reject("error");
        });

        fetchCharacter
            .then((data) => {
                if (!data.results || data.results.length === 0) {
                    message.textContent = "No character found with this name.";
                    return;
                }

                const characterData = data.results.find(char => char.name.toLowerCase() === character.toLowerCase());
                if (!characterData) {
                    message.textContent = "No exact match found for this name.";
                    return;
                }

                const origin = characterData.origin.url;
                if (!origin) {
                    message.textContent = "This character has no origin data.";
                    return;
                }

                const fetchLocation = new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.open("GET", origin);
                    xhr.send();
                    xhr.onload = () => {
                        const dataLocation = JSON.parse(xhr.response);
                        resolve(dataLocation);
                    };
                    xhr.onerror = () => reject("error");
                });

                fetchLocation
                    .then((dataLocation) => {
                        const locationContainer = document.createElement("div");
                        locationContainer.classList.add("info");
                        Object.assign(locationContainer.style, {
                            border: "4px solid #3b0157",
                            borderRadius: "16px",
                            width: "400px",
                            background: "#caffbf",
                            padding: "30px",
                            boxShadow: "3px 3px 0 0 #3b0157",
                            textAlign: "left",
                            margin: "50px auto 0 auto",
                            display: "block"
                        });
                        body.insertBefore(locationContainer, null);

                        const text = document.createElement("p");
                        text.textContent = "Origin Details";
                        Object.assign(text.style, {
                            color: "#3b0157",
                            fontFamily: '"Rajdhani", sans-serif',
                            fontWeight: "600",
                            fontSize: "20px",
                            padding: "0",
                            margin: "0",
                            marginBottom: "15px"
                        });
                        locationContainer.append(text);

                        const locationTitle = document.createElement("p");
                        locationTitle.textContent = dataLocation.name;
                        Object.assign(locationTitle.style, {
                            color: "#3b0157",
                            fontFamily: '"Rajdhani", sans-serif',
                            fontWeight: "600",
                            fontSize: "18px",
                            padding: "0",
                            margin: "0"
                        });
                        locationContainer.append(locationTitle);

                        const locationType = document.createElement("p");
                        locationType.textContent = `Type: ${dataLocation.type}`;
                        Object.assign(locationType.style, {
                            color: "#3b0157",
                            fontFamily: '"Rajdhani", sans-serif',
                            fontWeight: "500",
                            fontSize: "18px",
                            padding: "0",
                            margin: "0"
                        });
                        locationContainer.append(locationType);

                        const locationDimension = document.createElement("p");
                        locationDimension.textContent = `Dimension: ${dataLocation.dimension}`;
                        Object.assign(locationDimension.style, {
                            color: "#3b0157",
                            fontFamily: '"Rajdhani", sans-serif',
                            fontWeight: "500",
                            fontSize: "18px",
                            padding: "0",
                            margin: "0"
                        });
                        locationContainer.append(locationDimension);

                        const locationResidents = document.createElement("p");
                        locationResidents.textContent = `Residents Number: ${dataLocation.residents.length}`;
                        Object.assign(locationResidents.style, {
                            color: "#3b0157",
                            fontFamily: '"Rajdhani", sans-serif',
                            fontWeight: "500",
                            fontSize: "18px",
                            padding: "0",
                            margin: "0"
                        });
                        locationContainer.append(locationResidents);

                        const locationUrl = document.createElement("a");
                        locationUrl.textContent = `Link`;
                        locationUrl.href = dataLocation.url;
                        Object.assign(locationUrl.style, {
                            color: "#3b0157",
                            fontFamily: '"Rajdhani", sans-serif',
                            fontWeight: "600",
                            fontSize: "18px",
                            padding: "0",
                            margin: "0"
                        });
                        locationContainer.append(locationUrl);
                    })
                    .catch(() => {
                        message.textContent = "Failed to load location data.";
                    });
            })
            .catch(() => {
                message.textContent = "Failed to fetch character data.";
            });
    });
    
