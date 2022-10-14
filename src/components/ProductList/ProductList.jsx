import React from 'react';
import './ProductList.css';
import ProductItem from '../ProductItem/ProductItem';
import { useTelegram } from '../../hooks/useTelegram';
import { useCallback, useEffect } from 'react';

const products = [
   {id: '1', title: 'Гитара Джингл', price: 8000, description: 'синяя джингл'},
   {id: '2', title: 'Гитара Kerma', price: 6000, description: 'акустик джингл'},
   {id: '3', title: 'Гитара Eart', price: 9500, description: 'стратокастер джингл'},
   {id: '4', title: 'Гитара без грифа', price: 8000, description: 'падук джингл'},
   {id: '5', title: 'Гитара лес пол', price: 8000, description: 'джингл'},
   {id: '6', title: 'Гитара суперрстрат', price: 8000, description: 'синяя джингл'},
   {id: '7', title: 'Гитара люлюколе', price: 12000, description: 'белая джингл'},
   {id: '8', title: 'Педаль', price: 10000, description: 'джингл'},
]

const getTotalPrice = (items) => {
   return items.reduce((acc,item) => {
      return acc += item.price
   }, 0)
}

const ProductList = () => {
   const [addedItems, setAddedItems] = useState([]);
   const {tg, queryId} = useTelegram();

   const onSendData = useCallback(() => {
      const data = {
         products: addedItems,
         totalPrice: getTotalPrice(addedItems),
         queryId,
      }
      fetch('https://localhost:8000', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(data)
      })
   }, []);

   useEffect(() => {
      tg.onEvent('mainButtonClicked', onSendData)
      return () => {
         tg.offEvent('mainButtonClicked', onSendData)
      }
   }, [onSendData]);

   const onAdd = (product) => {
      const alreadyAdded = addedItems.find(item => item.id === product.id);
      let newItems = [];

      if (alreadyAdded) {
         newItems = addedItems.filter(item => item.id !== product.id)
      } else {
         newItems[...addedItems, product]
      }

      setAddedItems(newItems)

      if (newItems.length === 0) {
         tg.MainButton.hide()
      } else {
         tg.MainButton.show()
         tg.MainButton.setParams({
            text: `Купить ${getTotalPrice(newItems)}`
         })
      }
   }

   return(
      <div className={'list'}>
         {products.map(item => (
            <ProductItem
               product={item}
               onAdd={onAdd}
               className={'item'}
            />
         ))}
      </div>
   );
};

export default ProductList;