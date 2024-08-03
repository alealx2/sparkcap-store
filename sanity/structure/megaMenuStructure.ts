import {CubeIcon} from '@sanity/icons'
import {ListItemBuilder} from 'sanity/structure';
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Header')
    .icon(CubeIcon)
    .schemaType('megaMenu')
    .child(S.documentTypeList('megaMenu'))
)
