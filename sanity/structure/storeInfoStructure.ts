import {ListItemBuilder} from 'sanity/structure';
import defineStructure from '../utils/defineStructure'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Store info')
    .schemaType('storeInfo')
    .child(S.editor().title('Store Info').schemaType('storeInfo').documentId('storeInfo'))
)
