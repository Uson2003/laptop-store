import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { Input, Button } from 'antd';
import Cart from '../../Pages/Cart';
import styles from "./index.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { onSearch } from '../../redux/laptops/laptopsSlice';

const { Search } = Input;

function HeaderL() {
  const dispatch = useDispatch();
  const laptops = useSelector(store => store.laptops.laptops);

  const [categoryVisible, setCategoryVisible] = useState(false);

  const categories = ['Компьютер', 'Монитор', 'Мышка', 'Клавиатура', 'Наушники'];

  const onSearchI = (value) => {
    const filtered = laptops.filter(product =>
      product.title && product.title.toLowerCase().includes(value.toLowerCase())
    );
    dispatch(onSearch(filtered));
  };

  const onFilterCategory = (category) => {
    const filtered = laptops.filter(product =>
      product.category && product.category.toLowerCase() === category.toLowerCase()
    );
    dispatch(onSearch(filtered));
  };

  return (
    <Header style={{ position: "sticky", top: 0, left: 0, zIndex: 1 }}>
      <div className={styles.root}>
        <Link to="/" className={styles.logo}>Uson</Link>

        <div className={styles.searchBar}>
          <Search
            placeholder="Поиск"
            onChange={e => onSearchI(e.target.value)}
            onSearch={onSearchI}
            style={{ width: 200 }}
            allowClear
          />
        </div>

        <div className={styles.rightBar} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ position: 'relative' }}>
            <Button onClick={() => setCategoryVisible(!categoryVisible)}>Каталог</Button>

            {categoryVisible && (
              <div
                style={{
                  position: 'absolute',
                  top: '40px',
                  right: 0,
                  background: 'white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  borderRadius: 4,
                  padding: 8,
                  zIndex: 10,
                  minWidth: 140,
                }}
              >
                {categories.map(category => (
                  <div
                    key={category}
                    onClick={() => onFilterCategory(category)}
                    style={{
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderRadius: 4,
                      userSelect: 'none',
                    }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {category}
                  </div>
                ))}
              </div>
            )}
          </div>

          <Cart />
        </div>
      </div>
    </Header>
  );
}

export default HeaderL;


