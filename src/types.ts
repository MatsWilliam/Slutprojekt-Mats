export interface UserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: {
        filter_enabled: boolean;
        filter_locked: boolean;
    };
    external_urls: { spotify: string; };
    followers: { href: string; total: number; };
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}
interface Image {
    url: string;
    height: number;
    width: number;
}

export interface Playlist {
    id: string;
    name: string;
    description: string;
    tracks: { total: number; };
    images: { url: string; }[];
    owner: {
        display_name: string;
        id: string;
    };
    // external_urls: {
    //     spotify: string;
    // };
}
// interface AudioFeatures {
//     id: string;
//     danceability: number;
//     energy: number;
//     tempo: number;
//     valence: number;
// }
interface Track {
    id: string;
    name: string;
    artists: Artist[];
    album: {
        id: string;
        name: string;
        images: { url: string; }[];
    };
    external_urls: {
        spotify: string;
    };
}
interface Artist {
    id: string;
    name: string;
}
// export interface AudioFeaturesResponse {
//     audio_features: AudioFeatures[];
// }
export interface PlaylistTrackItem {
    track: Track;
}
export interface PlaylistTracksResponse {
    items: PlaylistTrackItem[];
}
