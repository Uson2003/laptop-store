import React from 'react'

import { Link } from 'react-router-dom';

import { Header } from 'antd/es/layout/layout';
import { Input } from 'antd';

import Cart from '../../Pages/Cart';

import styles from "./index.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { onSearch } from '../../redux/laptops/laptopsSlice';

const { Search } = Input;

function HeaderL() {
  const dispatch = useDispatch()
  const store = useSelector(store => store.laptops.laptops)

  const onSearchI = (value, _e, info) => {
    dispatch(onSearch(store?.filter(product =>
      product.title.toLowerCase().includes(value.toLowerCase())
    )))

  };

  return (
    <Header style={{ position: "sticky", top: "0", left: "0", zIndex: 1 }}>
      <div className={styles.root}>
        <Link to={"/"} className={styles.logo}>
          Uson
        </Link>
        <div className={styles.rightBar}>
          <Cart />
          <div className={styles.searchBar}>
            <Search
              placeholder="Поиск"
              onChange={e => onSearchI(e.target.value)}
              onSearch={onSearchI}
              style={{ width: 200 }}
            />
          </div>
        </div>

      </div>

    </Header>
  )
}

export default HeaderL