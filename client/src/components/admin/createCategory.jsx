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
  useDisclosure,
  Box,
  Image,
  Input,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../../api/api";

export function CreateCategory(props) {
  const [category, setCategory] = useState({
    name: "",
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempCategory = { ...category };
    tempCategory[id] = value;
    console.log(tempCategory);
    setCategory(tempCategory);
  };

  const newCategory = async () => {
    if (!category.name) {
      alert("isi semua");
    } else {
      await api.post("/categories", category);
      props.fetchCategories();
      alert("berhasil menambahkan category");
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
          <ModalHeader>New Category</ModalHeader>
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
                newCategory();
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
