import { tracks, albums } from "./original_data.js";

type TrackItem = {
    "alltime": boolean,
    "artist": string,
    "country": string | undefined,
    "id": string | undefined,
    "pollyear": number,
    "position": number,
    "releaseyear": string | undefined,
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
        if (track.hasOwnProperty(feature)) {
            if (track[feature].toString() in result) {
                result[track[feature].toString()].push(track);
            } else {
                result[track[feature].toString()] = [track];
            }
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

export const getYears = () => {
    return albums.filter(album => !album.alltime).map(album => album.year).sort((yearA, yearB) => {
        return Number(yearB) - Number(yearA);
    });
};

export const getTracksForYear = (year) => {
    return tracks.filter(track => track.pollyear == year).sort((trackA, trackB) => {
        return trackA.position - trackB.position;
    }).slice(0, 100);
};

export const getDataForYear = (year) => {
    const yearTracks = getTracksForYear(year);
    const result = {};
    yearTracks.forEach(track => {
        if (track.artist in result) {
            result[track.artist].push(track);
        } else {
            result[track.artist] = [track];
        }
    });
    return Object.keys(result).map(artistName => {
        return { name: artistName, numberOfSongs: result[artistName].length };
    })
}