import React, { useEffect } from 'react'

import { CloseOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Drawer, Image, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFromCart, getCart } from '../../redux/laptops/actions';

import images from '../../assets/photos';

import styles from "./index.module.scss";
import { formatNumber, getTotalSum } from '../../config';



function Cart() {
    const dispatch = useDispatch()
    const store = useSelector(store => store.laptops.cart)
    const [isOpen, setIsOpen] = React.useState(false)
    const [modal2Open, setModal2Open] = React.useState(false)

    const onClose = () => setIsOpen(false)
    const onOpen = () => {
        setIsOpen(true)
        setModal2Open(false)
    }

    useEffect(() => {
        dispatch(getCart())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDelete = (id) => dispatch(deleteFromCart(id))

    const onBuy = () => {
        onClose()
        setModal2Open(true)
    }

    const clearCart = () => {
        store.forEach(item => dispatch(deleteFromCart(item.id)))
        setModal2Open(false)
    }

    return (
        <React.Fragment>
            <Button
                onClick={onOpen}
                shape="circle"
                icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />}
            />
            <Drawer title="Корзина" onClose={onClose} open={isOpen}>
                <div className={styles.root}>
                    {store?.length ? store?.map(item => (
                        <div key={item.id} className={styles.cartItem}>
                            <Image style={{ width: "40px", height: "40px" }} src={images[item.imageKey]} />
                            <span className={styles.span}>{item.title}</span>
                            <div className={styles.priceToSell}>{
                                formatNumber(item.price * item.count)} сом
                                <div>
                                    <CloseOutlined onClick={() => onDelete(item.id)} />
                                </div>
                            </div>
                        </div>
                    )) : <div style={{ textAlign: "center" }}>Пусто</div>}
                    {store?.length ? <div className={styles.buyButton}>
                        <Button
                            size='large'
                            type="primary"
                            style={{ width: (375 - 32) + "px" }}
                            onClick={onBuy}
                        >
                            <span className={styles.totalSumPrice}>К оплате {formatNumber(getTotalSum(store.map(item => item.price)))} сом</span>
                        </Button>
                    </div> : null}
                </div>
            </Drawer>

            <Modal
                title="Выберите количество"
                centered
                open={modal2Open}
                onOk={clearCart}
                onCancel={onOpen}
                okText={"Отправил"}
                cancelText={"Отмена"}
            >
                <div>Номер реквизитов <span>**** **** **** ****</span></div>
                <div>
                    Переведите и отправьте свои данные на What's App 0703 777 746
                </div>
            </Modal>
        </React.Fragment>
    )
}

export default Cart