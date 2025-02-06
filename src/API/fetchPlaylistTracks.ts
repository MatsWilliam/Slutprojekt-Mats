import { PlaylistTracksResponse, PlaylistTrackItem } from '../types';

export async function fetchPlaylistTracks(playlistId: string, accessToken: string): Promise<void> {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`Error fetching tracks: ${response.statusText}`);
        }
        const data: PlaylistTracksResponse = await response.json();

        const validTracks: PlaylistTrackItem[] = data.items.filter(item => item.track !== null); // ger felmeddelande om vald lista saknar tracks. 
        if (validTracks.length === 0) {
            console.warn("No valid tracks found in playlist.");
            return;
        }
        populateTracksUI(validTracks);

        console.log("Fetched Playlist Tracks:", data); // Detta är en sökfunktion för att leta efter track-value som är null.
        data.items.forEach((item, index) => {
            if (!item.track) {
                console.warn(`Warning: Track at index ${index} is null!`, item);
            }
        });

        // // Track IDs för att fetcha audio features - Inte tillåtet längre.
        // const trackIds = validTracks.map(item => item.track.id).join(",");
        // if (trackIds.length > 0) {
        //     await fetchAudioFeatures(trackIds, accessToken, validTracks);
        // }

    } catch (error) {
        console.error("Failed to fetch playlist tracks:", error);
    }
}export function populateTracksUI(tracks: PlaylistTrackItem[]) {
    const container = document.getElementById("tracks-container");
    if (!container) return;

    container.innerHTML = ""; // Rensar bort det som finns i config-state

    const ul = document.createElement("ul");
    ul.classList.add("track-list");

    let lastClickedTrack: HTMLElement | null = null;

    tracks.forEach((trackItem) => {
        if (!trackItem.track) return; // accepterar bara typad struktur dvs inte null. Kanske onödig med tanke på validTracks-kontrollen. 

        const li = document.createElement("li");
        li.classList.add("track-item");

        // Track Name
        const trackName = document.createElement("span");
        trackName.textContent = trackItem.track.name;
        trackName.classList.add("track-name");

        const artistName = document.createElement("span");
        artistName.textContent = ` - ${trackItem.track.artists.map(a => a.name).join(", ")}`;
        artistName.classList.add("artist-name");

        li.appendChild(trackName);
        li.appendChild(artistName);
        ul.appendChild(li);

// Här ska kortet som visar låtens detaljer kunna kopplas till.
        li.addEventListener("click", () => {
            if (lastClickedTrack) {
                lastClickedTrack.classList.remove("highlighted");
            }
            li.classList.add("highlighted");
            lastClickedTrack = li;

            console.log(`Track clicked: ${trackItem.track.name}`);
        });
    });

    container.appendChild(ul);
}

