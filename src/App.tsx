import { useState } from "react";
import { Layout, Table, Modal } from "./components";
import { Calendar } from "./libs";
import { Order } from "./interfacies";

const orders: Array<Order> = [
  {
    id: "123",
    color: "red",
    customer: "Иван Ёклмнов",
    set: "Pretty Girls",
    deadline: [new Date("2023-05-05"), new Date("2023-05-20")],
    comment:
      "Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum",
    done: false,
    details: [
      {
        count: 3,
        description: "3 фото Girls",
        sum: 100
      },
      {
        count: 2,
        description: "2 фото Boys",
        sum: 100
      }
    ]
  },
  {
    id: "124",
    color: "blue",
    customer: "Иван Ёклмнов",
    set: "Pretty Girls",
    deadline: [new Date("2023-05-20"), new Date("2023-05-25")],
    comment: "Душнила 123 123 comment test",
    done: false,
    details: [
      {
        count: 1,
        description: "1 фото Girls",
        sum: 100
      },
    ]
  }
];

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
          title='Test modal' >
          <div>Hello world!</div>
        </Modal>
      </>
    </Layout>
  );
}
