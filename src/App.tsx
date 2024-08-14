import './scss/App.scss';


function App() {
  const categoryFiller = (
    <svg width='244' height='200'><rect x="0" y="0" width='244' height='200' fill="#808080"/></svg>
  )
  const productFiller = (
    <svg width='249' height='320'><rect x="0" y="0" width='249' height='320' fill="#808080"/></svg>
  )

  const searchSubmitHandler = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('searchSubmitHandler works')
  }

  return (
    <>
      <header className="app-header">
        <div className="container">
          <div className="app-header__inner">
            <div className="app-header__logo">App header logo</div>
            <form className="app-header__search" onSubmit={searchSubmitHandler}>
              <input className="app-header__search-input" type="text" />
              <button className="app-header__search-btn" type="submit">
                lens img to be here
              </button>
            </form>
            <a href="#" className="app-header__login">Войти</a>
            <a href="#" className="app-header__favourites">Избранное</a>
            <a href="#" className="app-header__cart">Корзина</a>
          </div>
        </div>
      </header>

      <main className="app-main">
        
        <section className="categories">
          <div className="container">
            <h2 className="categories__title">Категории</h2>
            <div className="categories__items">
              {categoryFiller}{categoryFiller}{categoryFiller}{categoryFiller}{categoryFiller}
            </div>
          </div>
        </section>

        <section className="store">
          <div className="container">
            <div className="store__controls">
              <div className="price-sort">Price sort</div>
              <div className="list-tile-toggler">List-tile toggler</div>
            </div>
            <aside className="filter-and-products">
              <div className="filter">
                <div className="filter__title">Filter</div>
                <form action="" className="filter__form">
                  <div className="filter__select">
                    <input type="checkbox" name="apple" id="apple"  />
                    <a href="#">Apple</a>
                  </div>
                  <div className="filter__select">
                    <input type="checkbox" name="samsung" id="samsung"  />
                    <a href="#">Samsung</a>
                  </div>
                  <div className="filter__select">
                    <input type="checkbox" name="xiaomi" id="xiaomi"  />
                    <a href="#">Xiaomi</a>
                  </div>
                  <div className="filter__select">
                    <input type="checkbox" name="realme" id="realme"  />
                    <a href="#">Realme</a>
                  </div>
                  <div className="filter__select">
                    <input type="checkbox" name="oppo" id="oppo"  />
                    <a href="#">Oppo</a>
                  </div>
                </form>
              </div>
              <div className="products">
                {productFiller}{productFiller}{productFiller}{productFiller}{productFiller}
              </div>
            </aside>
          </div>
        </section>

      </main>
    </>
  );
}

export default App;
