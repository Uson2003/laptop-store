import React, { useEffect } from 'react'

import { Button, Image, InputNumber, Modal, Spin } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getLaptopById, postToCart } from '../../redux/laptops/actions'

import images from '../../assets/photos';

import styles from "./index.module.scss";
import { formatNumber } from '../../config'


const descriptionLines = (desc) => desc.split('\n').map((line, index) => (
    <React.Fragment key={index}>
        {line}
        <br />
    </React.Fragment>
));

function Product() {
    const { id } = useParams()
    const dispatch = useDispatch()

    const [modal2Open, setModal2Open] = React.useState(false)
    const [count, setCount] = React.useState(1)

    const store = useSelector(store => store.laptops.product)
    const isLoading = useSelector(store => store.laptops.isLoading)

    useEffect(() => {
        dispatch(getLaptopById(id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const setToCart = () => {
        dispatch(postToCart({ ...store, count }))
        setCount(1)
    }

    if (isLoading) {
        return <Spin size="large" className={styles.isLoading} />
    }

    return (
        <div className={styles.root}>
            <div className={styles.image}>
                <Image
                    width={400}
                    src={images[store.imageKey]}
                />
            </div>
            <div className={styles.desc}>
                <h2 className={styles.title}>
                    {store?.title}
                </h2>
                <div className={styles.description}>
                    {descriptionLines(store?.description ?? "")}
                </div>
            </div>
            <div className={styles.price}>
                <h1 className={styles.priceStyles}>
                    <div className={styles.priceValue}>
                        {formatNumber(store?.price ?? 0)} сом
                        <Button onClick={() => setModal2Open(true)} style={{ width: "100%", marginTop: "4px" }} size='large' type="primary">
                            <span style={{ fontSize: "18px" }}>Добавить в корзину</span>
                        </Button>
                    </div>
                </h1>
            </div>
            <Modal
                title="Выберите количество"
                centered
                open={modal2Open}
                onOk={() => {
                    setModal2Open(false)
                    setToCart()
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

export default Product