import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import s from './SearchSuggestions.module.scss';
import generateProductSlug from '../../../helpers/generateProductSlug';
import { IProduct } from '../../../constants/interfaces/IProduct';

type SearchSuggestionsProps = {
  matchingItems: IProduct[];
  hideWhenClick: () => void;
  suggestionsListRef: React.RefObject<HTMLUListElement>;
};

const SearchSuggestions: FC<SearchSuggestionsProps> = ({ matchingItems, hideWhenClick, suggestionsListRef }) => {
  if (matchingItems.length === 0) return null;

  return (
    <ul className={s.SearchSuggestionsList} ref={suggestionsListRef}>
      {matchingItems.map(item => {
        const productSlug = generateProductSlug(item.itemBrand, item.itemName);
        return (
          <li key={item.id} id={item.id} onClick={hideWhenClick}>
            <Link className={s.SearchSuggestionsLink} to={`/product/${productSlug}`}>
              {`${item.itemBrand} ${item.itemName}`}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchSuggestions;
