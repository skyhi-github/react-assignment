import React, { useState, useCallback, JSX } from 'react';

interface ModalProps {
  id: string;
  onClose: () => void;
  children?: React.ReactNode;
}

function Modal({ id, onClose, children }: ModalProps): JSX.Element { // Function declaration
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>{id}</h3>
          <button onClick={onClose} className="modal-close-button">Close</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}

function NestedModals(): JSX.Element { // Function declaration
  const [modalStack, setModalStack] = useState<string[]>([]);

  const openModal = useCallback((modalId: string) => {
    setModalStack([...modalStack, modalId]);
  }, [modalStack]);

  function closeModal(): void { // Function declaration
    if (modalStack.length > 0) {
      setModalStack(modalStack.slice(0, -1));
    }
  }

  const getOpenModals = useCallback(() => {
    return modalStack;
  }, [modalStack]);

  const openModals = getOpenModals();

  return (
    <div>
      <button onClick={() => openModal("Modal 1")}>Open Modal 1</button>
      <button onClick={() => openModal("Modal 2")}>Open Modal 2</button>
      <button onClick={() => openModal("Modal 3")}>Open Modal 3</button>

      {openModals.map((modalId) => (
        <Modal key={modalId} id={modalId} onClose={closeModal}>
          Content for {modalId}
        </Modal>
      ))}
    </div>
  );
}

export default NestedModals;