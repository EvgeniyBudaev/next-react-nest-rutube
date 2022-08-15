import {FC} from 'react'
import styles from './VideoItem.module.scss'
import {formatNumberToK} from "@/utils/format-number-to-k";
import dayjs from "dayjs";

interface IVideoStatistics {
    views: number;
    createdAt?: string
}

import relativeItem from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeItem)

const VideoStatistics: FC<IVideoStatistics> = ({views, createdAt}) => {
    return (
        <div className={styles.number_info}>
            <div className={styles.views}>{formatNumberToK(views)} views</div>
            {!!createdAt && (
                <>
                    <div className='mx-2'>.</div>
                    <div className={styles.date}>
                        {/* показываем сколько прошло времени от текущего времени */}
                        {dayjs(new Date(createdAt)).fromNow()}
                    </div>
                </>
            )}
        </div>
    )
}

export default VideoStatistics
