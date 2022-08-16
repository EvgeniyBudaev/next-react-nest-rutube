import {FC} from 'react'
import {IVideo} from "@/types/video.interface";
import Layout from "@/components/layout/Layout";
import Catalog from "@/components/pages/home/catalog/Catalog";

interface ITrending {
    topVideos: IVideo[]
}

const Trending: FC<ITrending> = ({topVideos}) => {
    return (
        <Layout title='Тренды'>
            <Catalog newVideos={topVideos} />
        </Layout>
    )
}

export default Trending
