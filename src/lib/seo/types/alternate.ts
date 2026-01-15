type DefaultLang = 'x-default';

type HrefLang = DefaultLang | (string & {});

export interface AlternateLanguageOptions {
  hrefLang: HrefLang;
  href: string | URL;
}
