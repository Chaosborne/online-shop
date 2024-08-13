import './scss/App.scss';


function App() {
  const categoryFiller = (
    <div className="app-main__category"><svg width='231'><rect x="0" y="0" width='231' height='214' fill="#808080"/></svg></div>
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
        <div className="container">
          <h2 className="app-main__title">Категории</h2>
          <div className="app-main__categories">
            {categoryFiller}{categoryFiller}{categoryFiller}{categoryFiller}{categoryFiller}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
