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

const trackItems: TrackItem[] = tracks.filter(track => !track.alltime);
const albumItems: AlbumItem[] = albums.filter(album => !album.alltime);

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

export const artistSortedByTracks = () => {
    const artistTracks = tracksForArtist();
    const sortedArtistList = Object.keys(artistTracks).sort((a, b) => {
        return artistTracks[b].length - artistTracks[a].length;
    });
    return sortedArtistList.map(artistName => { 
        return {name: artistName, numberOfSongs: artistTracks[artistName].length};
    });
};

export const countriesSortedByTracks = () => {
    const countryTracks = tracksForCountry();
    const sortedCountryList = Object.keys(countryTracks).sort((a, b) => {
        return countryTracks[b].length - countryTracks[a].length;
    });
    return sortedCountryList.map(countryName => { 
        return {name: countryName, numberOfSongs: countryTracks[countryName].length};
    });
};

export const getArtists = () => {
    return Object.keys(tracksForArtist());
};

export const getArtistData = (artistName) => {
    return tracksForArtist()[artistName].sort((trackA, trackB) => {
        return Number(trackB.pollyear) - Number(trackA.pollyear);
    });
};