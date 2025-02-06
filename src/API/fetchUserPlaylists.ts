import { Playlist } from '../types';
import { fetchPlaylistTracks } from './fetchPlaylistTracks';

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

    container.innerHTML = ""; // rensar  !!! Ta inte bort

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


