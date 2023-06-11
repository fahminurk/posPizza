import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../../api/api";

export function EditCategory(props) {
  const [category, setCategory] = useState({
    name: "",
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempCategory = { ...category };
    tempCategory[id] = value;
    setCategory(tempCategory);
  };

  const editCategory = async () => {
    if (!category.name) {
      alert("isi semua");
    } else {
      await api.patch("/categories/" + props.id, category);
      alert("berhasil mengubah category");
      props.fetchCategories();
    }
  };
  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onClose={() => {
          props.onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              Name
              <Input id="name" onChange={inputHandler} />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              variant="ghost"
              onClick={() => {
                editCategory();
                props.onClose();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
