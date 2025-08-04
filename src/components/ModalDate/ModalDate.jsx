import { useState } from "react";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import "react-modal/";
const DatePickerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <button onClick={openModal}>Открыть календарь</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Выбор даты"
      >
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          inline // Отображение календаря как inline
        />
        <button onClick={closeModal}>Закрыть</button>
      </Modal>
    </div>
  );
};

export default DatePickerModal;
