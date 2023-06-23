import {  useState } from "react";
import { Layout, Table, Modal, FormOrder } from "./components";
import { Calendar } from "./libs";
import { Order } from "./interfacies";

export default function App() {
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isOpenModal, setIsOpenModal] = useState(false);

  const setYear = (newYear: number) => setSelectedYear(newYear);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const hadleSubmitOrder = (data: Order) => {
    if (order) {
      setOrders(orders => orders.map(item =>
        (item.id === data.id) ? { ...item, ...data } : item
      ));
    } else {
      setOrders(orders => [
        ...orders,
        {...data, id: String(Date.now()), done: false}
      ]);
    }
    setIsOpenModal(false);
  };

  const handleRemoveOrder = (data: Order) => {
    setOrders(orders => orders.filter(item => item.id !== data.id));
  };

  const handleEditOrder = (data: Order) => {
    setOrder(data);
    setIsOpenModal(true);
  };

  const handleDoneOrder = (data: Order) => {
    setOrders(orders => orders.map(item =>
      (item.id === data.id && !item.done) ? {...item, done: true} : item
    ));
  };

  return (
    <Layout onClickOrder={openModal}>
      <>
        <Calendar
          orders={orders}
          onChangeYear={setYear}
          year={selectedYear} />

        <Table
          orders={orders}
          onRemoveOrder={handleRemoveOrder}
          onEditOrder={handleEditOrder}
          onDoneOrder={handleDoneOrder} />

        <Modal
          isOpen={isOpenModal}
          onClose={closeModal}
          title={order ? "Редактировать заказ" : "Новый заказ"} >
          <FormOrder
            onSubmit={hadleSubmitOrder}
            editedOrder={order} />
        </Modal>
      </>
    </Layout>
  );
}
