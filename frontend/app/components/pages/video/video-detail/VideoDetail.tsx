import {FC} from  'react'
import {IVideo} from "@/types/video.interface";
import {IUser} from "@/types/user.interface";
import {videoApi} from "@/store/api/video.api";
import ChannelInfoSmall from "@/components/ui/channel-info-small/ChannelInfoSmall";
import SubscribeButton from "@/components/ui/subscribe-button/SubscribeButton";
import {RiHeart2Fill} from "react-icons/ri";
import {HiCalendar} from "react-icons/hi";
import {IoEyeSharp} from "react-icons/all";
import {formatNumberToK} from "@/utils/format-number-to-k";
import dayjs from "dayjs";
import styles from './VideoDetail.module.scss'

interface IVideoDetail {
    video: IVideo
    channel: IUser
}

const VideoDetail: FC<IVideoDetail> = ({video, channel}) => {
    const [updateLike, { isLoading: isLikeLoading }] = videoApi.useUpdateLikesMutation()

    return (
        <div className={styles.detail}>
            <div>
                <ChannelInfoSmall channel={channel} />
                <h1>{video.name}</h1>
                <article className={styles.article}>{video.description}</article>
            </div>
            <div className='pt-2'>
                <div className={styles.wrapper_button}>
                    {video.user?.id && (
                        <SubscribeButton channelIdForSubscribe={video.user.id} />
                    )}
                    <button
                        className={styles.likeButton}
                        disabled={isLikeLoading}
                        onClick={() => updateLike(video.id)}
                    >
                        <RiHeart2Fill />
                        Лайк
                    </button>
                </div>

                <div className={styles.number_info}>
                    <div>
                        <IoEyeSharp />
                        <span>{formatNumberToK(video.views)} views</span>
                    </div>
                    <div>
                        <RiHeart2Fill />
                        <span>{formatNumberToK(video.likes)} likes</span>
                    </div>
                    <div>
                        <HiCalendar />
                        <span>{dayjs(new Date(video.createdAt)).fromNow()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoDetail