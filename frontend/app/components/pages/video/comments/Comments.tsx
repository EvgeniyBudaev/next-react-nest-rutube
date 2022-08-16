import {FC} from 'react'
import {IComment} from "@/types/comment.interface";
import {useAuth} from "@/hooks/useAuth";
import CommentItem from "@/components/pages/video/comments/CommentItem";
import AddCommentForm from "@/components/pages/video/comments/AddComment";
import styles from './Comments.module.scss'

interface IComments {
    comments: IComment[]
    videoId: number
}

const Comments: FC<IComments> = ({comments, videoId}) => {
    const {user} = useAuth()

    return (
        <div className={styles.comments}>
            <h2>Комментарии</h2>
            <div className={styles.line}>
                {comments.length ? (
                    <div className={styles.grid}>
                        {comments.map(comment => (
                            <CommentItem comment={comment} key={comment.id} />
                        ))}
                    </div>
                ): (
                    <p>Комментариев не найдено!</p>
                )}

                <div className={styles.bottomForm}>
                    {user  && <AddCommentForm videoId={videoId} />}
                </div>
            </div>
        </div>
    )
}

export default Comments