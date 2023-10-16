import { get } from "lodash";
import { useFetch } from "hook";
import { FiSearch } from "assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { Input, Select, Button } from "components/field";
import { PRODUCT_DATA, CHANGE_INPUT, LOADER } from "store/actions";

const index = () => {
  const { useGet } = useFetch;
  const dispatch = useDispatch();
  const { searchValue, products } = useSelector((state) => state);

  const postProductSearch = (e) => {
    e.preventDefault();
    const data = useGet({ api: `/products?search=${searchValue.trim()}` }).then(
      (response) => {
        if (get(response, "status") === 200) {
          dispatch(LOADER());
          dispatch(PRODUCT_DATA(get(response, "data.data")));
        }
      }
    );
  };

  function sortFunction(array = []) {
    array = [...array].reverse();

    dispatch(PRODUCT_DATA(array));
    return array;
  }

  return (
    <>
      <form className="form" onSubmit={(e) => postProductSearch(e)}>
        <label htmlFor="#" className="form-label">
          <Input
            type="text"
            value={searchValue}
            onChange={(e) => dispatch(CHANGE_INPUT(e.target.value))}
            className="form-label__search"
            placeholder="Search for a site…"
          />
          <Button className="form-label-btn" type="submit">
            <FiSearch className="form-label-btn__icon" />
          </Button>
        </label>
        <Select
          className="form-label-select"
          onChange={(e) => sortFunction(products, e.target.value)}
        >
          <option className="form-label-select__option">A-Z</option>
          <option className="form-label-select__option" value="z-a">
            Z-A
          </option>
        </Select>
      </form>
    </>
  );
};

export default index;
