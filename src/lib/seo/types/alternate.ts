export type AlternateLocaleKey<TLocale extends string> =
  | ('x-default' | TLocale)
  | (string & {});

export type AlternateLocaleOptions<TLocale extends string> = Record<
  AlternateLocaleKey<TLocale>,
  string | URL
>;
