import './App.css';

import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Header from "./Layout/Header";
// import Footer from "./Layout/Footer";
import { Layout, theme } from 'antd';
import Cart from './Pages/Cart';
import Product from './Pages/Product';

function App() {
  const {
    token: { colorText },
  } = theme.useToken();

  return (
    <div className="App">
      <Layout style={{ color: colorText + " !important", position: "relative" }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="*" element={<Home />} />
        </Routes>
        {/* <Footer /> */}
      </Layout>
    </div>
  );
}

export default App;
