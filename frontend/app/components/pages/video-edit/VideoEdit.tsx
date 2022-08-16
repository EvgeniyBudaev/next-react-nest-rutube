import {FC, useEffect} from "react";
import {useRouter} from "next/router";
import {videoApi} from "@/store/api/video.api";
import {SubmitHandler, useForm, Controller} from "react-hook-form";
import {IVideoDto} from "@/types/video.interface";
import Layout from "@/components/layout/Layout";
import Loader from "@/components/ui/loader/Loader";
import Field from "@/components/ui/field/Field";
import TextArea from "@/components/ui/text-area/TextArea";
import UploadField from "@/components/ui/upload-field/UploadField";
import {IMediaResponse} from "@/services/media/media.interface";
import TogglePublic from "@/components/layout/header/upload-video/upload-video-form/toggle-public/TogglePublic";
import VideoInformation
    from "@/components/layout/header/upload-video/upload-video-form/video-information/VideoInformation";
import Button from "@/components/ui/button/Button";


const VideoEdit: FC = () => {
    const {query, push} =  useRouter()
    const videoId = Number(query.id)
    const {data, isLoading} = videoApi.useGetVideByIdQuery(videoId, {
        skip: !videoId
    })

    const {
        register,
        formState: {errors},
        control,
        handleSubmit,
        watch,
        setValue
    }= useForm<IVideoDto>({
        mode: 'onChange'
    })

    useEffect(()=> {
        if (!watch('name') && data) {
            setValue('name', data.name)
            setValue('description', data.description)
            setValue('videoPath', data.videoPath)
            setValue('thumbnailPath', data.thumbnailPath)
            setValue('isPublic', data.isPublic)
        }
    }, [data])

    const [updateVideo, {isLoading: isUpdateLoading}] = videoApi.useUpdateVideoMutation()

    const onSubmit: SubmitHandler<IVideoDto> = data => {
        updateVideo({ ...data, id:  videoId })
            .unwrap()
            .then(() => {
                //toastr.success('Статус', 'Видео обновлено!')
                push('/studio')
            })
    }

    return (
        <Layout title='Video editing'>
            <div>
                {isLoading ? (
                    <Loader count={5} />
                ) : (
                    <form  onSubmit={handleSubmit(onSubmit)} className='flex flex-wrap'>
                        <div className='w-7/12 pr-6 pt-8'>
                            <Field
                                {... register('name', {
                                    required: 'Name is required'
                                })}
                                placeholder='Name'
                                error={errors.name}
                            />
                            <TextArea
                                {... register('description', {
                                    required: 'Description is required'
                                })}
                                placeholder='Description'
                                error={errors.description}
                            />
                            <div className='mt-8'>
                                <Controller
                                    control={control}
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
                            <div className='mt-8'>
                                <span className='text-white mb-2 block'>Видео: </span>
                                <Controller
                                    control={control}
                                    name='videoPath'
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
                                control={control}
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
                        <div className='w-5/12 p-3 pl-10'>
                            <VideoInformation
                                fileName=''
                                videoId={videoId}
                                isUploaded
                                thumbnailPath={watch('thumbnailPath')}
                            />
                        </div>

                        <div className='mt-10'>
                            <Button>{isUpdateLoading ? 'Ожидайте...' : 'Сохранить'}</Button>
                        </div>
                    </form>
                )}
            </div>
        </Layout>
    )
}

export default VideoEdit