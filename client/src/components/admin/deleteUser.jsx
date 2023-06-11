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
import { api } from "../../api/api";
import { useEffect } from "react";

export function DeleteUser(props) {
  //   console.log(props);
  const deleteUser = async () => {
    await api.delete("/users/" + props.id);
    alert("deleted");
    props.fetch();
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
            <Button
              onClick={() => {
                deleteUser();
                props.onClose();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
