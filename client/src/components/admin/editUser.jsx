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
import iconphoto from "../../assets/icon.png";
import { useEffect, useRef, useState } from "react";
import { api } from "../../api/api";

export function EditUser(props) {
  const [SelectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    phone: "",
    role: "",
  });
  const [image, setImage] = useState(iconphoto);

  console.log(user);

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    console.log(tempUser);
    setUser(tempUser);
  };

  //
  const editUser = async () => {
    try {
      if (
        !(
          user.name &&
          user.password &&
          user.email &&
          user.phone &&
          user.role &&
          SelectedFile
        )
      ) {
        alert("isi semua");
      } else {
        const formData = new FormData();
        formData.append("avatar", SelectedFile);

        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("role", user.role);
        formData.append("phone", user.phone);
        await api.patch("/users/" + props.id, formData);

        alert("berhasil mengubah user");
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
      <Modal
        isOpen={props.isOpen}
        onClose={() => {
          setImage(iconphoto);
          props.onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Input
                accept="image/png, image/jpeg"
                onChange={handleFile}
                ref={inputFileRef}
                type="file"
                display="none"
                // id="product_url"
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
              <Select id="role" onChange={inputHandler}>
                <option>ADMIN</option>
                <option>CASHIER</option>
              </Select>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" onClick={editUser}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
