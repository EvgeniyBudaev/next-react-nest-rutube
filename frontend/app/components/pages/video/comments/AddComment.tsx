import {FC} from 'react'
import {ICommentDto} from "@/types/comment.interface";
import {SubmitHandler, useForm} from "react-hook-form";
import {commentApi} from "@/store/api/comment.api";
import Field from "@/components/ui/field/Field";
import {MdSend} from "react-icons/md";
import styles  from  './Comments.module.scss'

interface IAddCommentForm {
    videoId: number
}

const AddCommentForm: FC<IAddCommentForm> = ({videoId}) => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm<ICommentDto>({
        mode: 'onChange'
    })

    const [writeComment, { isLoading }] = commentApi.useCreateCommentMutation()

    const onSubmit: SubmitHandler<ICommentDto> = async data => {
        writeComment({ ...data, videoId })
            .unwrap()
            .then(() => reset())
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className='relative'>
                <Field
                    {...register('message', {
                    required: 'Сщщбщение обязательно!'
                })}
                    placeholder='Введите комментарий'
                    error={errors.message}
                />

                <button className='text-xl absolute right-2 top-1.5 text-purple' disabled={isLoading}>
                    <MdSend />
                </button>
            </div>
        </form>
    )
}

export default AddCommentForm