export interface TwitterOptions {
  title?: string;
  description?: string;
  site?: string;
  siteId?: string;
  creator?: string;
  creatorId?: string;
  image?: {
    url: string | URL;
    alt?: string;
  };
  card?: TwitterCardProperty;
}

type TwitterCardProperty =
  | { name: 'summary' }
  | { name: 'summary_large_image' }
  | {
      name: 'player';
      properties: TwitterPlayerProperty[];
    }
  | {
      name: 'app';
      properties: TwitterAppProperty[];
    };

type TwitterPlayerProperty =
  | { name: 'twitter:player'; content: string | URL }
  | { name: 'twitter:player:width'; content: number }
  | { name: 'twitter:player:height'; content: number }
  | { name: 'twitter:player:stream'; content: string | URL };

type TwitterAppProperty =
  | { name: 'twitter:app:name:iphone'; content: string }
  | { name: 'twitter:app:id:iphone'; content: string | number }
  | { name: 'twitter:app:url:iphone'; content: string | URL }
  | { name: 'twitter:app:name:ipad'; content: string }
  | { name: 'twitter:app:id:ipad'; content: string | number }
  | { name: 'twitter:app:url:ipad'; content: string | URL }
  | { name: 'twitter:app:name:googleplay'; content: string }
  | { name: 'twitter:app:id:googleplay'; content: string }
  | { name: 'twitter:app:url:googleplay'; content: string | URL };
