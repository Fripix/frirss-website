import common from './en/common.json';
import home from './en/home.json';
import features from './en/features.json';
import installation from './en/installation.json';
import faq from './en/faq.json';
import docs from './en/docs.json';
import seo from './en/seo.json';
import reader from './en/reader.json';
import config from '../config/locales.json';
import type { PageId } from '../config/routes';
export const reference = {
  common,
  home,
  features,
  installation,
  faq,
  docs,
  seo,
  reader,
};
export type Dictionary = typeof reference;
export const languages = config.languages.filter((l) => l.active && l.ready);
const modules = import.meta.glob('./*/*.json', { eager: true, import: 'default' });
export function dictionary(lang: string): Dictionary {
  if (!languages.some((l) => l.code === lang))
    throw new Error(`Inactive or unknown language: ${lang}`);
  const result: Record<string, unknown> = {};
  for (const domain of Object.keys(reference)) {
    const value = modules[`./${lang}/${domain}.json`];
    if (!value) throw new Error(`Missing translation: ${lang}/${domain}.json`);
    result[domain] = value;
  }
  return result as Dictionary;
}
export function asset(path: string) {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}
export function route(lang: string, page: PageId = 'home') {
  const slug = dictionary(lang).seo[page].slug;
  return asset(`${lang}/${slug ? `${slug}/` : ''}`);
}
export function format(text: string, params: Record<string, string>) {
  return text.replace(/\{(\w+)\}/g, (_, key: string) => {
    if (!(key in params)) throw new Error(`Missing parameter: ${key}`);
    return params[key];
  });
}
