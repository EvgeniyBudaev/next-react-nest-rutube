import { FC } from 'react'
import {IVideo} from "@/types/video.interface";
import VideoItem from '@/components/ui/video-item/VideoItem'
import Heading from "@/components/ui/heading/Heading";
import styles from './Catalog.module.scss'

interface ICatalog {
	newVideos?: IVideo[]
	removeHandler?: (videoId: number) => void
	isUpdateLink?: boolean
}

const Catalog: FC<ICatalog> = ({newVideos, removeHandler, isUpdateLink}) => {
	return (
		<div className={styles.recommended}>
			<div className={styles.top_block}>
				<Heading title={removeHandler ? 'Мои видео' : 'рекомендации'} />
			</div>

			<div className={styles.catalog}>
				{newVideos && newVideos.map(video => (
					<VideoItem item={video} key={video.id} removeHandler={removeHandler} isUpdateLink={isUpdateLink} />
				))}
			</div>
		</div>
	)
}

export default Catalog
