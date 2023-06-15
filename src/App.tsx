import { useState } from "react";
import { Layout, Table, Modal, FormOrder } from "./components";
import { Calendar } from "./libs";
import { orders } from "./data";

export default function App() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isOpenModal, setIsOpenModal] = useState(false);

  const setYear = (newYear: number) => setSelectedYear(newYear);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return (
    <Layout onClickOrder={openModal}>
      <>
        <Calendar onChangeYear={setYear} year={selectedYear} />
        <Table orders={orders} />

        <Modal
          isOpen={isOpenModal}
          onClose={closeModal}
          title='Новый заказ' >
          <FormOrder />
        </Modal>
      </>
    </Layout>
  );
}
