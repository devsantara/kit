export interface ViewportOptions {
  width?: string | number;
  height?: string | number;
  initialScale?: number;
  minimumScale?: number;
  maximumScale?: number;
  userScalable?: boolean;
  viewportFit?: 'auto' | 'cover' | 'contain';
  interactiveWidget?: 'resizes-visual' | 'resizes-content' | 'overlays-content';
}

export type ColorSchemeOptions =
  | 'normal'
  | 'light'
  | 'dark'
  | 'light dark'
  | 'dark light'
  | 'only light';

export interface RobotOptions {
  index?: boolean;
  follow?: boolean;
  noarchive?: boolean;
  nosnippet?: boolean;
  noimageindex?: boolean;
  nocache?: boolean;
  notranslate?: boolean;
  indexifembedded?: boolean;
  nositelinkssearchbox?: boolean;
  unavailable_after?: string;
  'max-video-preview'?: number | string;
  'max-image-preview'?: 'none' | 'standard' | 'large';
  'max-snippet'?: number;
}

export interface IconOptions {
  icon?: Icon[];
  shortcut?: Icon[];
  apple?: Icon[];
  other?: Icon[];
}

interface Icon {
  url: string | URL;
  type?: string;
  sizes?: string;
  color?: string;
  /** defaults to rel="icon" unless superseded by Icons map */
  rel?: string;
  media?: string;
  /**
   * @see https://developer.mozilla.org/docs/Web/API/HTMLImageElement/fetchPriority
   */
  fetchPriority?: 'high' | 'low' | 'auto';
}
