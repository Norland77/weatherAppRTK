import {Outlet} from 'react-router-dom'
import styles from './layout.module.scss'
import {type FC} from 'react'
const Layout: FC = () => {
  return (
    <div className={styles.layout}>
      <Outlet />
    </div>
  )
}

export default Layout
