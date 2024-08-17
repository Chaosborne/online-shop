import styles from "./Main.module.scss";
import Categories from "../Categories/Categories";
import ProductsSection from "../Store/ProductsSection";

const Main = () => {
      return (
        <main className={styles[`app-main`]}>
            <Categories />
            <ProductsSection />
        </main>
      )

}

export default Main;