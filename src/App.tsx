import {  useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import { Layout, Table, Modal, FormOrder, ContextMenu } from "./components";
import { Calendar } from "./libs";
import { Order } from "./interfacies";
import { initialContextMenu } from "./constants";

export default function App() {
  const [order, setOrder] = useState<Order>();
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [scrolledOrderId, setScrolledOrderId] = useState<string>();
  const [contextMenu, setContextMenu] = useState(initialContextMenu);

  const setYear = (newYear: number) => setSelectedYear(newYear);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => {
    setIsOpenModal(false);
    setOrder(undefined);
  };

  const hadleSubmitOrder = (data: Order) => {
    const serverOrder = {
      id: data.id ?? String(Date.now()),
      color: data.color ?? "",
      customer: data.customer ?? "",
      set: data.set ?? "",
      deadline: data.deadline?.filter(item => item !== null) ?? [],
      comment: data.comment ?? "",
      done: false,
      details: data.details,
      ready: data.ready
    };
    
    if (order) {
      invoke<string>("change_order", {
        orderId: data.id,
        updatedOrder: JSON.stringify(serverOrder),
        year: selectedYear
      })
        .then(response => setOrders(JSON.parse(response)));
    } else {
      invoke<string>("add_order", { order: JSON.stringify(serverOrder), year: selectedYear })
        .then((response) => setOrders(JSON.parse(response)));
    }

    setIsOpenModal(false);
    setOrder(undefined);
  };

  const handleRemoveOrder = (data: Order) => {
    invoke<string>("remove_order", { orderId: data.id, year: selectedYear })
      .then(response => setOrders(JSON.parse(response)));
  };

  const handleEditOrder = (data: Order) => {
    setOrder(data);
    setIsOpenModal(true);
  };

  const handleDoneOrder = (data: Order) => {
    const serverOrder = {
      id: data.id,
      color: data.color ?? "",
      customer: data.customer ?? "",
      set: data.set ?? "",
      deadline: data.deadline?.filter(item => item !== null) ?? [],
      comment: data.comment ?? "",
      done: !data.done,
      details: data.details,
      ready: data.ready
    };
    
    invoke<string>("change_order", {
      orderId: data.id,
      updatedOrder: JSON.stringify(serverOrder),
      year: selectedYear
    })
      .then(response => setOrders(JSON.parse(response)));
  };

  const handleReadyOrder = (data: Order) => {
    const serverOrder = {
      id: data.id,
      color: data.color ?? "",
      customer: data.customer ?? "",
      set: data.set ?? "",
      deadline: data.deadline?.filter(item => item !== null) ?? [],
      comment: data.comment ?? "",
      done: data.done,
      details: data.details,
      ready: !data.ready
    };
    
    invoke<string>("change_order", {
      orderId: data.id,
      updatedOrder: JSON.stringify(serverOrder),
      year: selectedYear
    })
      .then(response => setOrders(JSON.parse(response)));
  };

  const handleCalendarClick = (id: string) => {
    const element = document.getElementById(`orderId-${id}`);

    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setScrolledOrderId(id);
      setTimeout(() => setScrolledOrderId(undefined), 2500);
    }
  };

  const handleClickCtxMenu = (x: number, y: number, order?: Order) => {
    if (order) {
      setContextMenu({ show: true, x, y, order });
    }
  };

  const closeCtxMenu = () => setContextMenu({ show: false, x: 0, y: 0, order: undefined });
  const handleDoneCtxMenu = () => {
    if (contextMenu.order) handleDoneOrder(contextMenu.order);
  };

  const handleDeleteCtxMenu = () => {
    if (contextMenu.order) handleRemoveOrder(contextMenu.order);
  };

  const handleEditCtxMenu = () => {
    if (contextMenu.order) handleEditOrder(contextMenu.order);
  };

  const handleReadyCtxMenu = () => {
    if (contextMenu.order) handleReadyOrder(contextMenu.order);
  };

  useEffect(() => {
    invoke<string>("get_orders", {year: selectedYear})
      .then(response => setOrders(JSON.parse(response)));
  }, [selectedYear]);

  return (
    <Layout onClickOrder={openModal}>
      <>
        <Calendar
          onClickCtxMenu={handleClickCtxMenu}
          onClick={handleCalendarClick}
          orders={orders}
          onChangeYear={setYear}
          year={selectedYear} />

        <Table
          scrolledOrderId={scrolledOrderId}
          orders={orders}
          onRemoveOrder={handleRemoveOrder}
          onReadyOrder={handleReadyOrder}
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

        {contextMenu.show && (
          <ContextMenu
            onDelete={handleDeleteCtxMenu}
            onDone={handleDoneCtxMenu}
            onEdit={handleEditCtxMenu}
            onReady={handleReadyCtxMenu}
            closeCtxMenu={closeCtxMenu}
            ctxMenu={contextMenu}
          />
        )}
      </>
    </Layout>
  );
}
