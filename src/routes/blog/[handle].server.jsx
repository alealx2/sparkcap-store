import { useRouteParams } from '@shopify/hydrogen';
import { Suspense } from 'react';
import Layout from '../../components/Layout.server';
import PostDetail from '../../components/PostDetail.client';

export default function Article() {
    const { handle } = useRouteParams();    
    return (
        <Layout>
            <Suspense>
                <PostDetail slug={handle}/>
            </Suspense>
        </Layout>
    )
}

