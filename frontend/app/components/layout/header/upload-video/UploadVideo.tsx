import {FC, useState} from 'react'
import {videoApi} from "@/store/api/video.api";
import stylesIcon from '../icons-right/IconsRight.module.scss'
import {HiUpload} from "react-icons/all";
import UploadModal from "@/components/layout/header/upload-video/upload-video-form/upload-modal/UploadModal";

const UploadVideo: FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [videoId, setVideoId] = useState(0)

	const [createVideo, {isLoading}] = videoApi.useCreateVideoMutation()

	return (
		<>
			<button
				className={stylesIcon.button}
				disabled={isLoading}
				onClick={() => {
					createVideo()
						.unwrap()
						.then(id => {
							setVideoId(+id)
							setIsOpen(true)
						})
				}}
			>
				<HiUpload />
			</button>
			<UploadModal isOpen={isOpen} setIsOpen={setIsOpen} videoId={videoId} />
		</>
	)
}

export default UploadVideo
