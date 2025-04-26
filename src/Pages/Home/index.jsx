import React, { useEffect } from 'react'

import { Button, Card, InputNumber, Modal } from 'antd'

import { useDispatch, useSelector } from 'react-redux';
import { getLaptops, postToCart } from '../../redux/laptops/actions';

import images from '../../assets/photos';

import styles from "./index.module.scss";
import { Link } from 'react-router-dom';
import { formatNumber } from '../../config';

const { Meta } = Card;

const truncatedText = (text) => text.slice(0, 40) + (text.length > 40 ? '...' : '');

function Home() {
  const dispatch = useDispatch()

  const laptops = useSelector(store => store.laptops.laptops)
  const search = useSelector(store => store.laptops.search)

  const [modal2Open, setModal2Open] = React.useState(false)
  const [count, setCount] = React.useState(1)

  useEffect(() => {
    dispatch(getLaptops())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const setToCart = (store) => {
    dispatch(postToCart({ ...store, count }))
    setCount(1)
  }

  return (
    <div className={styles.root}>
      {
        (search.length ? search : laptops)?.map(item => (
          <Link to={"/product/" + item.id} key={item.key}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={images[item.imageKey]} />}
            >
              <Meta
                title={item.title}
                description={
                  <div>
                    {truncatedText(item?.description ?? "") + formatNumber(item?.price) + " сом"}

                    <Button
                      onClick={(e) => {
                        e.preventDefault()
                        setModal2Open(item)
                      }}
                      style={{ width: "100%", marginTop: "4px" }}
                      size='large'
                      type="primary"
                    >
                      <span style={{ fontSize: "18px" }}>Добавить в корзину</span>
                    </Button>
                  </div>
                }
              />
            </Card>
          </Link>
        ))
      }


      <Modal
        title="Выберите количество"
        centered
        open={modal2Open}
        onOk={() => {

          setToCart(modal2Open)
          setModal2Open(false)
        }}
        onCancel={() => {
          setModal2Open(false)
          setCount(1)
        }}
        okText={"Добавить в корзину"}
        cancelText={"Отмена"}
      >
        Количество: <InputNumber width={"100%"} size="large" min={1} max={1000} defaultValue={count} onChange={setCount} />
      </Modal>
    </div>
  )
}

export default Home