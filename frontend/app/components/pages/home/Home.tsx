import { FC } from 'react'

import Layout from '@/components/layout/Layout'
import Catalog from '@/components/pages/home/catalog/Catalog'
import Discover from '@/components/pages/home/discover/Discover'
import { IHome } from '@/components/pages/home/home.interface'

const Home: FC<IHome> = () => {
	return (
		<Layout title='Rutube v2.0 | Видеохостинг'>
			<Discover />
			<Catalog />
		</Layout>
	)
}

export default Home
