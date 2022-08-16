import { FC } from 'react'
import Skeleton, {SkeletonProps} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Loader: FC<SkeletonProps> = (props) => {
    return <Skeleton className='rounded-xl h-8 my-1' baseColor='#2D2C35' highlightColor='#355340' {...props} />
}

export default Loader