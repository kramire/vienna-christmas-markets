import { PageType } from '../../app.types';

export const footerItemMapping: {
  [key in PageType]: { name: string; fontClasses: string };
} = {
  HOME: {
    name: 'Home',
    fontClasses: 'fa-solid fa-house',
  },
  MARKETS: {
    name: 'Markets',
    fontClasses: 'fa-solid fa-store',
  },
  EVENTS: {
    name: 'Events',
    fontClasses: 'fa-solid fa-mug-hot',
  },
  FAVORITES: {
    name: 'Favorites',
    fontClasses: 'fa-regular fa-heart',
  },
  VISITS: {
    name: 'Visits',
    fontClasses: 'fa-solid fa-tree',
  },
};
