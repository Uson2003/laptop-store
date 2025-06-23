import React, { useEffect } from 'react'
import { Button, Card, InputNumber, Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { getLaptops, postToCart } from '../../redux/laptops/actions';
import images from '../../assets/photos';
import styles from "./index.module.scss";
import { Link } from 'react-router-dom';
import { formatNumber } from '../../config';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FaInstagram, FaTiktok, FaYoutube, FaWhatsapp } from 'react-icons/fa';

const { Meta } = Card;

const truncatedText = (text) => text.slice(0, 40) + (text.length > 40 ? '...' : '');

const sliderItems = [
  { id: 1, image: images["1"], title: "Добро пожаловать!" },
  { id: 2, image: images["2"], title: "Лучшая техника здесь" },
  { id: 3, image: images["3"], title: "Скидки до 50%" },
  { id: 4, image: images["4"], title: "Новинки сезона" },
  { id: 5, image: images["5"], title: "Топовые модели" },
  { id: 6, image: images["6"], title: "Акции и предложения" },
  { id: 7, image: images["7"], title: "Техника для дома" },
  { id: 8, image: images["8"], title: "Гарантия качества" },
  { id: 9, image: images["9"], title: "Скидки для студентов" },
  { id: 10, image: images["10"], title: "Компьютеры и ноутбуки" },
  { id: 11, image: images["11"], title: "Аксессуары и периферия" },
  { id: 12, image: images["12"], title: "Игровая техника" },
  { id: 28, image: images["28"], title: "Техника для авто" },
  { id: 29, image: images["29"], title: "Распродажа недели" },
  { id: 30, image: images["30"], title: "Профессиональная техника" },
  { id: 31, image: images["31"], title: "Умный дом" },
  { id: 32, image: images["32"], title: "Игровые аксессуары" },
  { id: 33, image: images["33"], title: "Эксклюзивные модели" },
  { id: 34, image: images["34"], title: "Техника для путешествий" },
  { id: 35, image: images["35"], title: "Геймерские новинки" },
  { id: 36, image: images["36"], title: "Техника для творчества" },
  { id: 37, image: images["37"], title: "Мобильные устройства" },
  { id: 38, image: images["38"], title: "Летние скидки" },
  { id: 39, image: images["39"], title: "Экономия и качество" },
  { id: 40, image: images["40"], title: "Гарантия и сервис" },
  { id: 41, image: images["41"], title: "Лучшие отзывы" },
  { id: 42, image: images["42"], title: "Новые поступления" },
  { id: 43, image: images["43"], title: "Профессиональный выбор" },
  { id: 44, image: images["44"], title: "Лучшие аксессуары" },
  { id: 45, image: images["45"], title: "Техника для учебы" },
  { id: 46, image: images["46"], title: "Скидки на электронику" },
  { id: 47, image: images["47"], title: "Гаджеты будущего" },
  { id: 48, image: images["48"], title: "Техника с доставкой" },
  { id: 49, image: images["49"], title: "Лучшие предложения сегодня" },
];


// Кастомные стрелки для слайдера
function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ 
        ...style, 
        display: "block", 
        right: 10, 
        zIndex: 1,
        background: "rgba(0,0,0,0.5)",
        borderRadius: "50%",
        width: 30,
        height: 30,
        lineHeight: "30px",
        textAlign: "center",
        color: "white",
        fontSize: 20,
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      ›
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ 
        ...style, 
        display: "block", 
        left: 10, 
        zIndex: 1,
        background: "rgba(0,0,0,0.5)",
        borderRadius: "50%",
        width: 30,
        height: 30,
        lineHeight: "30px",
        textAlign: "center",
        color: "white",
        fontSize: 20,
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      ‹
    </div>
  );
}

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
    <div 
      className={styles.root} 
      style={{ 
        background: "linear-gradient(135deg, #d3d3d3 0%, #f9f9f9 100%)",
        minHeight: "100vh",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      {/* Слайдер */}
      <div style={{ width: "700px", height: "500px", margin: "0 auto 40px auto" }}>
        <Slider
          dots={true}
          infinite={true}
          speed={500}
          slidesToShow={1}
          slidesToScroll={1}
          autoplay={true}
          autoplaySpeed={3000}
          nextArrow={<NextArrow />}
          prevArrow={<PrevArrow />}
        >
          {sliderItems.map(item => (
            <div key={item.id}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "500px", objectFit: "cover", borderRadius: "10px" }}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Товары */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20 }}>
        {(search.length ? search : laptops)?.map(item => (
          <Link to={"/product/" + item.id} key={item.key}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt="example" src={images[item.imageKey]} style={{ height: 200, objectFit: 'cover' }} />}
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
        ))}
      </div>

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

      {/* Подвал */}
      <footer style={{
        backgroundColor: "#1e1e2f",
        color: "white",
        padding: "20px 0",
        marginTop: 40,
        textAlign: "center",
        marginLeft: "-20px",
        marginRight: "-20px",
      }}>
        <div style={{ marginBottom: 12 }}>
          <strong>© 2025 Все права защищены</strong>
        </div>
        <div style={{ marginBottom: 12 }}>
          Контакты: +996 123 456 789 | email@example.com
        </div>
        <div style={{ fontSize: 24, display: "flex", justifyContent: "center", gap: 20 }}>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: "white" }}>
            <FaInstagram />
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" style={{ color: "white" }}>
            <FaTiktok />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" style={{ color: "white" }}>
            <FaYoutube />
          </a>
          <a href="https://wa.me/996123456789" target="_blank" rel="noreferrer" style={{ color: "white" }}>
            <FaWhatsapp />
          </a>
        </div>
      </footer>
    </div>
  )
}

export default Home
