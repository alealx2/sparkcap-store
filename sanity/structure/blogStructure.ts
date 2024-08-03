import {BookIcon} from '@sanity/icons'
import {ListItemBuilder} from 'sanity/structure';
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Blog')
    .icon(BookIcon)
    .schemaType('blog')
    .child(S.documentTypeList('blog'))
)
