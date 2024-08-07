import {ListItemBuilder, StructureResolver} from 'sanity/structure';
import collections from './collectionStructure'
import colorThemes from './colorThemeStructure'
import megaMenu from './megaMenuStructure'
import footerMenu from './footerMenuStructure'
import home from './homeStructure'
import pages from './pageStructure'
import blog from './blogStructure'
import products from './productStructure'
import settings from './settingStructure'
import storeInfo from './storeInfoStructure'

/**
 * Structure overrides
 *
 * Sanity Studio automatically lists document types out of the box.
 * With this custom structure we achieve things like showing the `home`
 * and `settings` document types as singletons, and grouping product details
 * and variants for easy editorial access.
 *
 * You can customize this even further as your schema types progress.
 * To learn more about structure builder, visit our docs:
 * https://www.sanity.io/docs/overview-structure-builder
 */

// If you add document types to structure manually, you can add them to this function to prevent duplicates in the root pane
const hiddenDocTypes = (listItem: ListItemBuilder) => {
  const id = listItem.getId()

  if (!id) {
    return false
  }

  return ![
    'collection',
    'colorTheme',
    'megaMenu',
    'footerMenu',
    'home',
    'media.tag',
    'page',
    'blog',
    'product',
    'productVariant',
    'settings',
    'storeInfo',
  ].includes(id)
}

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      megaMenu(S, context),
      footerMenu(S, context),
      S.divider(),
      home(S, context),
      pages(S, context),
      blog(S, context),
      S.divider(),
      collections(S, context),
      products(S, context),
      S.divider(),
      colorThemes(S, context),
      S.divider(),
      settings(S, context),
      storeInfo(S, context),
      S.divider(),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ])
