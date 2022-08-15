import {FC} from 'react'
import cn from 'classnames'
import Link from 'next/link'
import Image from  'next/image'
import {IoIosCheckmarkCircle} from 'react-icons/io'
import {IUser} from "@/types/user.interface";
import styles from './UserAvatar.module.scss'

interface IUserAvatar {
    user: IUser;
    isWhite?:  boolean
}

const UserAvatar: FC<IUserAvatar> = ({user, isWhite}) => {
    return (
        <Link  href={`/c/${user.id}`}>
            <a>
                <span className={cn(styles.avatar, {[styles.white]: isWhite})}>
                    <Image
                        width={45}
                        height={45}
                        alt={user.name}
                        src={user.avatarPath  || ''}
                    />
                    {user.isVerified  &&  (
                        <span className={styles.isVerified}>
                            <IoIosCheckmarkCircle />
                        </span>
                    )}
                </span>
            </a>
        </Link>
    )
}

export default UserAvatar