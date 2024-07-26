import { Suspense} from 'react';
import Layout from '../components/Layout.server';
import ArticleGridItem from '../components/ArticleGridItem.client';

export default function Blog() {
    return (
        <Layout>
            <Suspense>
                <div className="container">
                    <div className="article-grid">
                        <ArticleGridItem/>
                    </div>
                </div>
            </Suspense>
        </Layout>
    )
}