import {CubeIcon} from '@sanity/icons'
import {ListItemBuilder} from 'sanity/structure';
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Footer')
    .icon(CubeIcon)
    .schemaType('footerMenu')
    .child(S.documentTypeList('footerMenu'))
)
