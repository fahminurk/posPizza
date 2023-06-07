import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
  Box,
  Flex,
} from "@chakra-ui/react";
import { api } from "../api/api";

export function DeleteCategory(props) {
  const deleteCategory = async () => {
    await api.delete("/categories/" + props.id);
    alert("succes");
    props.onClose();
  };
  return (
    <>
      <Modal onClose={props.onClose} size={"xs"} isOpen={props.isOpen}>
        <ModalOverlay />
        <ModalContent mt={"300px"}>
          <ModalHeader>Konfirmasi Hapus Data </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Apakah anda yakin akan menghapus data dengan id {props.id}?
          </ModalBody>
          <ModalFooter gap={5}>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button onClick={deleteCategory}>Delete</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
