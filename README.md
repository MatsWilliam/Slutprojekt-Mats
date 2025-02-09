# Slutprojekt-Mats

Detta är examinationsunderlaget för kursen fördjupning JS/TS med SCSS.

## En Spotify webbapplikation för visning av spellistor.

Appen visar en användares profil och spellistor samt listornas spår. Tanken är att kunna hantera sorteringen i listorna.

Det är ett work in progress.

Projektet använder och eller har för avsikt att använda följande endpoints:  
https://api.spotify.com/v1/me
https://api.spotify.com/v1/me/playlists
https://api.spotify.com/v1/playlists/{playlist_id}/tracks
https://api.spotify.com/v1/tracks
https://api.spotify.com/v1/audio-features?ids={track_id}%{track_id}...
https://api.spotify.com/v1/tracks?ids={track_id}%{track_id}...

Projektet kan inte hämta audio features och sortera efter de egenskaperna sedan den endpointen fasats ut av Spotify.

## Installera och bidra

Utöver Git behöver du Node.js installerat.

Du behöver även vara innehavare av Spotify premium och ha tillgång till Spotifys developer plattform. Läs mer här: https://developer.spotify.com/documentation/web-api

1. Klona repot:  
   `git clone https://github.com/MatsWilliam/Slutprojekt-Mats`
2. Gå till projektmappen:  
   `cd Slutprojekt-Mats`
3. Installera beroenden:  
   `npm install`
4. Starta developer server:  
   `npm run dev`

## Tech i projektet

- TypeScript
- SCSS
- Vite

## Kontakt

https://github.com/MatsWilliam
![alt text](image.png)

www.linkedin.com/in/mats-blomqvist-mats-william
