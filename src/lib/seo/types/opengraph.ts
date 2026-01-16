export interface OpenGraphOptions {
  title?: string;
  description?: string;
  url?: string;
  locale?: string;
  image?: {
    url: string | URL;
    alt?: string;
    type?: string;
    width?: number;
    height?: number;
  };
  type?: OpenGraphTypeProperty;
}

type OpenGraphTypeProperty =
  | { name: 'article'; properties: ArticleMetadataProperty[] }
  | { name: 'book'; properties: BookMetadataProperty[] }
  | { name: 'music.song'; properties: MusicSongMetadataProperty[] }
  | { name: 'music.album'; properties: MusicAlbumMetadataProperty[] }
  | { name: 'music.playlist'; properties: MusicPlaylistMetadataProperty[] }
  | {
      name: 'music.radio_station';
      properties: MusicRadioStationMetadataProperty[];
    }
  | { name: 'profile'; properties: ProfileMetadataProperty[] }
  | { name: 'video.tv_show'; properties: VideoTvShowMetadataProperty[] }
  | { name: 'video.other'; properties: VideoOtherMetadataProperty[] }
  | { name: 'video.movie'; properties: VideoMovieProperty[] }
  | { name: 'video.episode'; properties: VideoEpisodeMetadataProperty[] }
  | { name: 'website' };

type ArticleMetadataProperty =
  | { name: 'article:published_time'; content: string }
  | { name: 'article:modified_time'; content: string }
  | { name: 'article:expiration_time'; content: string }
  | { name: 'article:author'; content: string }
  | { name: 'article:section'; content: string }
  | { name: 'article:tag'; content: string };

type BookMetadataProperty =
  | { name: 'book:isbn'; content: string }
  | { name: 'book:release_date'; content: string }
  | { name: 'book:author'; content: string }
  | { name: 'book:tag'; content: string };

type ProfileMetadataProperty =
  | { name: 'profile:first_name'; content: string }
  | { name: 'profile:last_name'; content: string }
  | { name: 'profile:username'; content: string }
  | { name: 'profile:gender'; content: string };

type MusicSongMetadataProperty =
  | { name: 'music:duration'; content: string }
  | { name: 'music:album'; content: string }
  | { name: 'music:album:disc'; content: string }
  | { name: 'music:album:track'; content: string }
  | { name: 'music:musician'; content: string };

type MusicAlbumMetadataProperty =
  | { name: 'music:song'; content: string }
  | { name: 'music:song:disc'; content: string }
  | { name: 'music:song:track'; content: string }
  | { name: 'music:musician'; content: string }
  | { name: 'music:release_date'; content: string };

type MusicPlaylistMetadataProperty =
  | { name: 'music:song'; content: string }
  | { name: 'music:song:disc'; content: string }
  | { name: 'music:song:track'; content: string }
  | { name: 'music:creator'; content: string };

interface MusicRadioStationMetadataProperty {
  name: 'music:creator';
  content: string;
}

type VideoMovieProperty =
  | { name: 'video:actor'; content: string }
  | { name: 'video:actor:role'; content: string }
  | { name: 'video:director'; content: string }
  | { name: 'video:writer'; content: string }
  | { name: 'video:duration'; content: string }
  | { name: 'video:release_date'; content: string }
  | { name: 'video:tag'; content: string };

type VideoEpisodeMetadataProperty =
  | { name: 'video:actor'; content: string }
  | { name: 'video:actor:role'; content: string }
  | { name: 'video:director'; content: string }
  | { name: 'video:writer'; content: string }
  | { name: 'video:duration'; content: string }
  | { name: 'video:release_date'; content: string }
  | { name: 'video:tag'; content: string }
  | { name: 'video:series'; content: string };

type VideoTvShowMetadataProperty =
  | { name: 'video:actor'; content: string }
  | { name: 'video:actor:role'; content: string }
  | { name: 'video:director'; content: string }
  | { name: 'video:writer'; content: string }
  | { name: 'video:duration'; content: string }
  | { name: 'video:release_date'; content: string }
  | { name: 'video:tag'; content: string };

type VideoOtherMetadataProperty =
  | { name: 'video:actor'; content: string }
  | { name: 'video:actor:role'; content: string }
  | { name: 'video:director'; content: string }
  | { name: 'video:writer'; content: string }
  | { name: 'video:duration'; content: string }
  | { name: 'video:release_date'; content: string }
  | { name: 'video:tag'; content: string };
