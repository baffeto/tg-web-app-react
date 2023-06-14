import React, { useState } from "react";
import './ProductList.css'
import ProductItem from "../ProductItem/ProductItem";
import useTelegram from '../../hooks/useTelegram'

const products = [
    {id: '1', title: 'Джинсы', price: 500, description: "Синий цвет, прямые"},
    {id: '2', title: 'Джинсы 2', price: 300, description: "Красный цвет, прямые"},
    {id: '3', title: 'Джинсы 3', price: 600, description: "Синий цвет, непрямые"},
    {id: '4', title: 'Джинсы 4', price: 1200, description: "Желтый цвет, прямые"},
    {id: '5', title: 'Джинсы 5', price: 6500, description: "Голубой цвет, прямые"},
    {id: '6', title: 'Джинсы 6', price: 2500, description: "Черный цвет, непрямые"},
]

const getTotalPrice = (items = []) => {
    return items.reduce((acc, item) => {
        return acc += item.price
    });

}


const ProductList = () => {
    const [addedItems, setAddedItems] = useState([]);
    const {tg} = useTelegram();

    const onAdd = (product) => {
        const alreadyAdded = addedItems.find(item => item.id === product.id)
        let newItems = [];

        if(alreadyAdded) {
            newItems = addedItems.filter(item => item.id !== product.id);
        } else {
            newItems = [...addedItems, product];
        }

        setAddedItems(newItems);

        if(newItems.length === 0) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
            tg.MainButton.setParams({
                text: `Купить ${getTotalPrice(newItems)}`
            })
        }
    }

    return (
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