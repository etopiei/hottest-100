import { tracks, albums } from "./original_data.js";

type TrackItem = {
    "alltime": boolean,
    "artist": string,
    "country": string,
    "id": string,
    "pollyear": number,
    "position": number,
    "releaseyear": string,
    "track": string
};

type AlbumItem = {
    "year": number,
    "alltime": boolean,
    "alltimedescription": string,
    "colorRGB": string,
};

type KeyedTrackItemObject = { [key: string]: TrackItem[]; };

const trackItems: TrackItem[] = tracks;
const albumItems: AlbumItem[] = albums;

const trackByFeature = (feature: string): KeyedTrackItemObject => {
    const result: KeyedTrackItemObject = {};

    trackItems.forEach(track => {
        if (track[feature].toString() in result) {
            result[track[feature].toString()].push(track);
        } else {
            result[track[feature].toString()] = [track];
        }
    });

    return result;
};

const tracksForArtist = () => {
    return trackByFeature('artist');
};

const tracksForCountry = () => {
    return trackByFeature('country');
};

const tracksByReleaseYear = () => {
    return trackByFeature('releaseyear');
};

const artistSortedByTracks = () => {
    const artistTracks = tracksForArtist();
    return Object.keys(artistTracks).sort((a, b) => {
        return artistTracks[b].length - artistTracks[a].length;
    });
}

console.log(artistSortedByTracks());