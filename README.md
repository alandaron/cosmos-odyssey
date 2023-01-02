# Veebirakendus Cosmos Odyssey
Veebirakendus “Cosmos Odyssey” kuvab meie päikesesüsteemis olevatele klientidele parimaid pakkumisi. Kliendid saavad reisida teekonna-põhiste hindade järgi.
Peale põhjalikku kaalumist, saavad kliendid broneerida enda nimele kindla teekonnaga reisi.

## Server (Express.js)
Server kasutab andmebaasiks MongoDB-d. Enne serveri käivitamist tuleks luua MongoDB URI formaadis:
> mongodb+srv://<user>:<passowrd>@cluster0.mungu.mongodb.net/cosmosOdyssey?retryWrites=true&w=majority

Seejärel luua serveri kausta .env fail ja sinna sisse lisada enda MongoDB URI formaadis:
> DB="mongodb+srv://<user>:<passowrd>@cluster0.mungu.mongodb.net/cosmosOdyssey?retryWrites=true&w=majority"

Samuti tuleks lisada enda front-endi domeen CORS'i nimekirja index.js failis:
````
app.use(
	cors({
		origin: [
			"http://localhost:5173",
			"https://cosmos-odyssey-react.vercel.app",
		],
	})
);
````

### Serveri käivitamine
Serveri käivitamiseks tuleb sisestada järgmised käsklused:
1. > cd server
2. > npm install
3. > npm start

Server on edukalt käivitatud, kui konsooli kirjutatakse:
> Server Started at 3000

## Client (React + Vite)
Rakenduse front-end on tehtud React'is. 

### Rakenduse käivitamine
Selle käivitamiseks tuleb sisestada järgmised käsklused:
1. > cd client
2. > npm install
3. > npm run dev

Rakendus on edukalt käivitatud kui konsooli kirjutatakse:
````
  VITE v4.0.3  ready in 1287 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
  ````
