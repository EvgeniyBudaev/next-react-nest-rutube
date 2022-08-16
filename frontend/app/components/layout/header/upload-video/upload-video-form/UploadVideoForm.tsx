import {FC} from 'react'
import {Controller} from 'react-hook-form'
import {useUploadVideoForm} from "@/hooks/useUploadVideoForm";
import SuccessMessage from "@/components/layout/header/upload-video/upload-video-form/SuccessMessage";
import Field from "@/components/ui/field/Field";
import TextArea from "@/components/ui/text-area/TextArea";
import TogglePublic from "@/components/layout/header/upload-video/upload-video-form/toggle-public/TogglePublic";
import {IMediaResponse} from "@/services/media/media.interface";
import UploadField from "@/components/ui/upload-field/UploadField";
import VideoInformation
    from "@/components/layout/header/upload-video/upload-video-form/video-information/VideoInformation";
import FooterForm from "@/components/layout/header/upload-video/upload-video-form/footer-form/FooterForm";
import styles from  '../UploadVideo.module.scss'

interface IUploadVideoForm {
    videoId: number
    handleCloseModal: () => void
}

const UploadVideoForm: FC<IUploadVideoForm> = ({videoId, handleCloseModal}) => {
    const {form, status, media} = useUploadVideoForm({
        videoId,
        handleCloseModal
    })

    return (
        <>
            <form
                onSubmit={form.handleSubmit(form.onSubmit)}
                className='flex flex-wrap'
            >
                {status.isSuccess && <SuccessMessage />}
                {status.isChosen ? (
                    <>
                        <div className='w-7/12 pr-6 pt-3'>
                            <Field
                                {...form.register('name', {
                                    required: 'Название обязательно!'
                                })}
                                placeholder='Name'
                                error={form.errors.name}
                            />
                            <TextArea
                                {...form.register('description', {
                                    required: 'Описание обязательно!'
                                })}
                                placeholder='Description'
                                error={form.errors.description}
                            />
                            <div className='mt-8'>
                                <Controller
                                    control={form.control}
                                    name='thumbnailPath'
                                    render={({field: {onChange}}) => (
                                        <UploadField
                                            folder='thumbnails'
                                            onChange={(value: IMediaResponse) => {
                                                onChange(value.url)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            <Controller
                                control={form.control}
                                name='isPublic'
                                render={({field: {onChange, value}}) => (
                                    <TogglePublic
                                        clickHandler={() => {
                                            onChange(!value)
                                        }}
                                        isEnabled={!!value}
                                    />
                                )}
                            />
                        </div>
                        <div className='w-5/12 p-3  pl-10'>
                            <VideoInformation
                                fileName={media.videoFileName}
                                videoId={videoId}
                                isUploaded={status.isUploaded}
                                thumbnailPath={media.thumbnailPath}
                            />
                        </div>

                        <FooterForm isUploaded={status.isUploaded} percent={status.percent} />
                    </>
                ) : (
                    <div className={styles.uploadScreen}>
                        <Controller
                            control={form.control}
                            name='videoPath'
                            render={() => (
                                <UploadField
                                    title='Сначала загрузи видео'
                                    onChange={media.handleUploadVideo}
                                    setValue={status.setProgressPercentage}
                                    setIsChosen={status.setIsChosen}
                                />
                            )}
                        />
                    </div>
                )}
            </form>
        </>
    )
}

export default UploadVideoForm