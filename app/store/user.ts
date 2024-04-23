


export const fetchProducts = () => async (dispatch: any) => {
  const response = await fetch('https://api.example.com/products');
  const products = await response.json();
  dispatch({ type: 'SET_PRODUCTS', payload: products });
};
