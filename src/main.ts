import { fetchProfile, populateProfileUI } from './API/fetchProfile';
import { fetchUserPlaylists, populatePlaylistUI } from './API/fetchUserPlaylists';
import { getAccessToken } from './helpers/getAccessToken';
import { redirectToAuthCodeFlow } from './helpers/redirectToAuthCodeFlow';
import './style.scss'
import './types'

export const clientId = "daac43f3995c48e8ab08bfbefbb1991e";
const params = new URLSearchParams(window.location.search);
export const code = params.get("code");

if (!code) {
    redirectToAuthCodeFlow(clientId);
} else {
    const accessToken = await getAccessToken(clientId, code);
    const profile = await fetchProfile(accessToken);
    const playlists = await fetchUserPlaylists(accessToken);
    console.log(profile);
    console.log(playlists);
    populateProfileUI(profile);
    populatePlaylistUI(playlists, accessToken);
}

