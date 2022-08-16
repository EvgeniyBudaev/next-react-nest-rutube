import {FC, useEffect} from 'react'
import cn from 'classnames'
import Layout from "@/components/layout/Layout";
import VideoPlayer from "@/components/pages/video/video-player/VideoPlayer";
import {useRouter} from "next/router";
import {videoApi} from "@/store/api/video.api";
import {IVideo} from "@/types/video.interface";
import Comments from "@/components/pages/video/comments/Comments";
import VideoDetail from "@/components/pages/video/video-detail/VideoDetail";
import {IUser} from "@/types/user.interface";
import styles from './Video.module.scss'

const Video: FC = () => {
    const {query} = useRouter()
    const {data: video = {} as IVideo} = videoApi.useGetVideByIdQuery(
        Number(query.id),
        {
            skip: !query?.id
        }
    )

    const [updateViews] = videoApi.useUpdateViewsMutation()

    useEffect(() => {
        if (query.id) updateViews(Number(query.id))
    }, [query.id])

    return (
        <Layout title={video.name}>
            <div className={styles.layout}>
                <VideoPlayer videoPath={video.videoPath} />
                <Comments comments={video.comments || []} videoId={video.id} />
            </div>
            <div className={cn(styles.layout, 'mt-7')}>
                <VideoDetail video={video} channel={video.user || ({} as IUser)} />
                <div></div>
            </div>
        </Layout>
    )
}

export default Video