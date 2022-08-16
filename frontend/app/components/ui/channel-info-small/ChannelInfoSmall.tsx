import {FC} from 'react'
import {IUser} from "@/types/user.interface";
import UserAvatar from "@/components/ui/user-avatar/UserAvatar";
import {formatNumberToK} from "@/utils/format-number-to-k";
import styles from './ChannelInfoSmall.module.scss'

interface IChannelInfoSmall {
    channel: IUser
    message?: string
}

const ChannelInfoSmall: FC<IChannelInfoSmall> = ({channel, message}) => {
    return (
        <div className={styles.profile_info}>
            {channel.avatarPath && <UserAvatar user={channel} />}

            <div>
                <div className={styles.name}>{channel.name}</div>
                <div className={styles.subscribers_count}>
                    {message || (formatNumberToK(channel.subscribersCount) + ' subscribers')}
                </div>
            </div>
        </div>
    )
}

export default ChannelInfoSmall