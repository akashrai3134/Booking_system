import { Modal } from "antd";
import PropTypes from 'prop-types';

const DeleteTheatreModal = ({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  setSelectedTheatre,
  handleDelete,
}) => {


  const handleCancel = () => {
    setIsDeleteModalOpen(false);
    setSelectedTheatre(null);
  };
  
  return (
    <>
      <Modal
        title="Delete Theatre?"
        open={isDeleteModalOpen}
        onOk={handleDelete}
        onCancel={handleCancel}
      >
        <p className="pt-3 fs-18">
          Are you sure you want to delete this theatre?
        </p>
        <p className="pb-3 fs-18">
          This action can't be undone and you'll lose this theatre data.
        </p>
      </Modal>
    </>
  );
};

DeleteTheatreModal.propTypes = {
    isDeleteModalOpen: PropTypes.bool.isRequired,
    setIsDeleteModalOpen: PropTypes.func.isRequired,
    selectedTheatre: PropTypes.object,
    setSelectedTheatre: PropTypes.func.isRequired,
};
  
export default DeleteTheatreModal;