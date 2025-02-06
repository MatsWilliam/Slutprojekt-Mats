import { Playlist, PlaylistTrackItem, PlaylistTracksResponse } from '../types';

export async function fetchUserPlaylists(token: string): Promise<Playlist[]> {
    const result = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await result.json();
    return data.items as Playlist[];
}

export function populatePlaylistUI(playlists: Playlist[], accessToken: string) {
    const container = document.getElementById("playlist-container");
    if (!container) return;

    container.innerHTML = ""; // rensar bara !!! Ta inte bort

    const ul = document.createElement("ul");
    ul.style.listStyle = "none"; // För att kanske visa liten bild i stället för prick. Hämtad av API-anropet
    let lastClickedItem: HTMLElement | null = null;

    playlists.forEach((playlist) => {
        const li = document.createElement("li");
        li.classList.add("playlist-item");
        const link = document.createElement("a");
        link.textContent = playlist.name;
        link.target = "_blank"; // Open in a new tab
        link.classList.add("playlist-link");

        const owner = document.createElement("p");
        owner.textContent = `By: ${playlist.owner.display_name}`;
        owner.classList.add("playlist-owner");

        li.addEventListener("click", () => {
            console.log(`Playlist clicked: ${playlist.name}`);

            if (lastClickedItem) {
                lastClickedItem.classList.remove("highlighted");
            }
            li.classList.add("highlighted");
             lastClickedItem = li;
             fetchPlaylistTracks(playlist.id, accessToken);
        });

        li.appendChild(link);
        li.appendChild(owner);
        ul.appendChild(li);
    });
    container.appendChild(ul);
}

async function fetchPlaylistTracks(playlistId: string, accessToken: string): Promise<void> {
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {"Authorization": `Bearer ${accessToken}`, "Content-Type": "application/json"
            }
        });
        if (!response.ok) {
            throw new Error(`Error fetching tracks: ${response.statusText}`);
        }
        const data: PlaylistTracksResponse = await response.json();

        const validTracks: PlaylistTrackItem[] = data.items.filter(item => item.track !== null);  // ger felmeddelande om det finns tomma listor. 
        if (validTracks.length === 0) {
            console.warn("No valid tracks found in playlist.");
            return;
        }
        populateTracksUI(validTracks, accessToken);

        console.log("Fetched Playlist Tracks:", data);  // Detta är en sökningsfunktion för att leta efter track-value som är null.
        data.items.forEach((item, index) => {
            if (!item.track) {
                console.warn(`Warning: Track at index ${index} is null!`, item);
            }
        });

        // // Extract track IDs to fetch audio features
        // const trackIds = validTracks.map(item => item.track.id).join(",");
        // if (trackIds.length > 0) {
        //     await fetchAudioFeatures(trackIds, accessToken, validTracks);
        // }
    } catch (error) {
        console.error("Failed to fetch playlist tracks:", error);
    }
}

export function populateTracksUI(tracks: PlaylistTrackItem[], accessToken: string) {
    const container = document.getElementById("tracks-container");
    if (!container) return;

    container.innerHTML = ""; // Clear previous content

    const ul = document.createElement("ul");
    ul.classList.add("track-list");

    let lastClickedTrack: HTMLElement | null = null;

    tracks.forEach((trackItem) => {
        if (!trackItem.track) return; // Skip if track is null

        const li = document.createElement("li");
        li.classList.add("track-item");

        // Track Name
        const trackName = document.createElement("span");
        trackName.textContent = trackItem.track.name;
        trackName.classList.add("track-name");

        // Artist Name
        const artistName = document.createElement("span");
        artistName.textContent = ` - ${trackItem.track.artists.map(a => a.name).join(", ")}`;
        artistName.classList.add("artist-name");

        li.appendChild(trackName);
        li.appendChild(artistName);
        ul.appendChild(li);

        // Add click event to highlight selected track
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

// async function fetchAudioFeatures(trackIds: string, accessToken: string, tracks: PlaylistTrackItem[]): Promise<void> {
//     const url = `https://api.spotify.com/v1/audio-features?ids=${trackIds}`;
//     try {
//         const response = await fetch(url, {
//             method: "GET",
//             headers: {
//                 "Authorization": `Bearer ${accessToken}`,
//                 "Content-Type": "application/json"
//             }
//         });
//         if (!response.ok) {
//             throw new Error(`Error fetching audio features: ${response.statusText}`);
//         }
//         const data: AudioFeaturesResponse = await response.json();
//         console.log("Tracks with Audio Features:");
//         tracks.forEach((item, index) => {
//             const track = item.track;
//             const features = data.audio_features.find(f => f.id === track.id);
//             if (features) {
//                 console.log(`${index + 1}. ${track.name} - ${track.artists.map(a => a.name).join(", ")}`);
//                 console.log(`   🎵 Danceability: ${features.danceability}`);
//                 console.log(`   ⚡ Energy: ${features.energy}`);
//                 console.log(`   🎶 Tempo: ${features.tempo} BPM`);
//                 console.log(`   😃 Valence: ${features.valence}`);
//             }
//         });
//     } catch (error) {
//         console.error("Failed to fetch audio features:", error);
//     }
// }

