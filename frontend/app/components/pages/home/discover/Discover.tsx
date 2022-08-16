import { FC } from 'react'
import {IVideo} from "@/types/video.interface";
import LargeVideoItem from "@/components/ui/video-item/LargeVideoItem";
import styles from './Discover.module.scss'

interface IDiscover {
	topVideo?: IVideo
	randomVideo?: IVideo
}

const Discover: FC<IDiscover> = ({topVideo, randomVideo}) => {
	return (
		<div className={styles.discover}>
			<div className={styles.top_video}>
				{topVideo && <LargeVideoItem video={topVideo} />}
			</div>

			<div className={styles.random_video}>
				{randomVideo && <LargeVideoItem video={randomVideo} />}
			</div>
		</div>
	)
}

export default Discover
