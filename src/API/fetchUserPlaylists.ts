import { Playlist } from '../types';

export async function fetchUserPlaylists(token: string): Promise<Playlist[]> {
    const result = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await result.json();
    return data.items as Playlist[];

}export function populatePlaylistUI(playlists: Playlist[]) {
    const container = document.getElementById("playlist-container");
    if (!container) return;

    container.innerHTML = ""; // Clear previous content

    const ul = document.createElement("ul");
    ul.style.listStyle = "none"; // För att kunna visa liten bild i stället för prick. Hämtad av API-anropet
    let lastClickedItem: HTMLElement | null = null;

    playlists.forEach((playlist) => {
        const li = document.createElement("li");
        li.classList.add("playlist-item");

        // bildens egenskaper som ska synas före respektive lista istället för punkt.
        // const img = document.createElement("img");
        // img.src = playlist.images[0]?.url || "https://via.placeholder.com/150";
        // img.alt = `${playlist.name} cover`;
        // img.style.width = "100px";
        // img.style.borderRadius = "8px";
        const link = document.createElement("a");
        // link.href = playlist.external_urls.spotify;
        link.textContent = playlist.name;
        link.target = "_blank"; // Open in a new tab
        link.classList.add("playlist-link"); // Add SCSS class for styling

        const owner = document.createElement("p");
        owner.textContent = `By: ${playlist.owner.display_name}`;
        owner.classList.add("playlist-owner"); // Add SCSS class

        li.addEventListener("click", () => {
            console.log(`Playlist clicked: ${playlist.name}`);

            if (lastClickedItem) {
                lastClickedItem.classList.remove("highlighted");
            }

            // Highlight the clicked item
            li.classList.add("highlighted");
             lastClickedItem = li;
        });

        // li.appendChild(img);
        li.appendChild(link);
        li.appendChild(owner);
        ul.appendChild(li);
    });
    container.appendChild(ul);
}

