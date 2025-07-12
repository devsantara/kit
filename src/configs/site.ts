/**
 * Site configuration
 *
 * @description
 * This file contains the web application's site configuration,
 * including metadata, and other relevant information that globally applies to the site.
 * It is used to set up the site's identity.
 */

import type { Metadata } from 'next';

export const siteConfig = {
  name: 'Devsantara/Kit',
  tagline: 'The Blueprint for Your Next Big Idea',
  description: 'Next.js boilerplate for fast, scalable web app development. Includes modern tools, production-ready setup, and optimized performance out of the box.',
  keywords: ['@devsantara/kit', 'next.js template', 'next.js boilerplate', 'react template', 'react boilerplate', 'web development kit'],
  links: {
    website: 'https://kit.devsantara.com',
    github: 'https://github.com/devsantara',
    repository: 'https://github.com/devsantara/kit',
    x: 'https://x.com/devsantara_hq',
  },
};

export const siteMetadata: Metadata = {
  title: {
    template: `%s - ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    title: {
      template: `%s - ${siteConfig.name}`,
      default: siteConfig.name,
    },
    description: siteConfig.description,
    images: [
      {
        url: 'https://assets.devsantara.com/kit/opengraph-site.jpg',
        width: 2800,
        height: 1600,
      },
    ],
  },
};
