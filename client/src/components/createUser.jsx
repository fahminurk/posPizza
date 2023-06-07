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
  Avatar,
} from "@chakra-ui/react";
import iconphoto from "../assets/icon.png";
import { useEffect, useRef, useState } from "react";
import { api } from "../api/api";

export function CreateUser(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [SelectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    role: "",
  });
  const [image, setImage] = useState(null);
  console.log(image);
  //input
  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    console.log(tempUser);
    setUser(tempUser);
  };

  // function new product
  const newUser = async () => {
    try {
      if (
        !(
          user.name &&
          user.password &&
          user.role &&
          user.email &&
          user.phone &&
          SelectedFile
        )
      ) {
        alert("isi semua");
      } else {
        const formData = new FormData();
        formData.append("avatar", SelectedFile);
        formData.append("name", user.name);
        formData.append("password", user.password);
        formData.append("role", user.role);
        formData.append("email", user.email);
        formData.append("phone", user.phone);

        await api.post("/users/register", formData);

        alert(`berhasil membuat ${user.role} baru`);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleFile = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <Modal isOpen={props.isOpen} onClose={props.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Input
                accept="image/png, image/jpeg"
                onChange={handleFile}
                ref={inputFileRef}
                type="file"
                display="none"
              />
              <Avatar
                src={image}
                w={"100px"}
                h={"100px"}
                onClick={() => {
                  inputFileRef.current.click();
                }}
              />
              <Flex flexDir={"column"} w={"70%"}>
                FullName
                <Input id="name" onChange={inputHandler} />
                Password
                <Input id="password" onChange={inputHandler} />
              </Flex>
            </Flex>
            <Box>
              email
              <Input id="email" onChange={inputHandler} />
            </Box>
            <Box>
              phone
              <Input id="phone" onChange={inputHandler} />
            </Box>
            <Box pt={5}>
              <Select
                placeholder="pilih role"
                id="role"
                onChange={inputHandler}
              >
                <option>ADMIN</option>
                <option>CASHIER</option>
              </Select>
            </Box>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={() => props.onClose()}>
          Close
        </Button> */}

            <Button
              bg={"#B42318"}
              color={"white"}
              variant="ghost"
              _hover={{ color: "black", bg: "#EEF2F6" }}
              onClick={() => {
                newUser();
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
