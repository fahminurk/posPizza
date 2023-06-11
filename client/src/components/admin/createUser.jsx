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
  useToast,
} from "@chakra-ui/react";
import iconphoto from "../../assets/icon.png";
import { useEffect, useRef, useState } from "react";
import { api } from "../../api/api";

export function CreateUser(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
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
        toast({
          title: "All data must be filled",
          position: "top",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      } else if (user.name.length < 6) {
        toast({
          title: "name to short, must be 6 character or more",
          position: "top",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      } else if (
        !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i.test(user.email)
      ) {
        toast({
          title: "format email not invalid",
          position: "top",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      } else if (isNaN(user.phone)) {
        toast({
          title: "phone must be number",
          position: "top",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      } else if (user.phone.length < 8) {
        toast({
          title: "phone number less than 8 digit",
          position: "top",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      } else if (user.phone.length > 12) {
        toast({
          title: "phone number cant be more than 12",
          position: "top",
          status: "warning",
          duration: 2000,
          isClosable: true,
        });
      } else {
        const formData = new FormData();
        formData.append("avatar", SelectedFile);
        formData.append("name", user.name);
        formData.append("password", user.password);
        formData.append("role", user.role);
        formData.append("email", user.email);
        formData.append("phone", user.phone);

        await api.post("/users/register", formData);
        toast({
          title: `berhasil membuat ${user.role} baru`,
          position: "top",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        props.fetch();
        props.onClose();
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
