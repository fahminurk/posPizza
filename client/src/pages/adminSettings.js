import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Box,
  Switch,
  Button,
  ButtonGroup,
  IconButton,
  Input,
  useDisclosure,
  InputGroup,
  InputLeftElement,
  Avatar,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { FiSearch } from "react-icons/fi";
import { AiOutlinePlus } from "react-icons/ai";
import { api } from "../api/api";
import React, { useEffect, useState } from "react";
import NavbarAdmin from "../components/admin/navbarAdmin";
import SidebarAdmin from "../components/admin/sidebarAdmin";
import { CreateUser } from "../components/admin/createUser";
import { EditUser } from "../components/admin/editUser";
import { DeleteUser } from "../components/admin/deleteUser";
import { RiArrowDropUpLine, RiArrowDropDownLine } from "react-icons/ri";

export default function AdminSettings() {
  const [user, setUser] = useState([]); // menyimpan data dari database
  const [editId, setEditId] = useState(null); // menyimpan id u/ di pass ke editmodal
  const [deleteId, setDeleteId] = useState(null); // menyimpan id u/ di pass ke deletemodal
  const createModal = useDisclosure();
  const editModal = useDisclosure();
  const deleteModal = useDisclosure();

  const [currentPage, setCurrentPage] = useState(1); // page pada saat pertama kali
  const [itemsPerPage] = useState(5); // brp data/item per page

  const indexOfFirstItem = currentPage * itemsPerPage - itemsPerPage;
  // misal: indexOfFirstItem = 1 * 5 - 5 = 0, dimulai dari index ke 0 untuk page 1
  //      : indexOfFirstItem = 2 * 5 - 5 = 5, dimulai dari index ke 5 untuk page 2, dan seterusnya

  useEffect(() => {
    fetchUsers();
  }, []);

  //
  async function fetchUsers(search = "", sortby, sortdir) {
    const response = await api.get("/users", {
      params: {
        search,
        sortby,
        sortdir,
      },
    });
    const data = response.data;
    setUser(data);
  }

  //
  function paginate(array, page_size, page_number) {
    return array.slice((page_number - 1) * page_size, page_number * page_size);
    //(1-1)*5, 1*5 = index 0 sampai index 5, jadi di halaman pertama memunculkan dari index ke 0 - 5
    //(2-1)*5, 2*5 = index 5 sampai index 10 jadi di halaman kedua memunculkan dari index ke 5 - 10
  }
  const currentItems = paginate(user, itemsPerPage, currentPage);
  // currentItems = paginate(category, 5, 1)

  //
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(user.length / itemsPerPage); i++) {
    // i = 1 <= math.ceil(9/5) dibulatkan ke atas
    // 1 <= 2
    // 2 <= 2
    //stop
    pageNumbers.push(i);
  }

  const sortHandler = (sortby, sortdir) => {
    fetchUsers("", sortby, sortdir);
  };

  return (
    <>
      <NavbarAdmin />
      <SidebarAdmin />
      <Box bg={"#EEF2F6"} minH={"745px"} pt={"88px"} pl={"200px"}>
        <Box w={"100%"} p={5}>
          <Box mb={5} fontWeight={"bold"}>
            USERS
          </Box>
          <Flex justifyContent={"space-between"} mb={5}>
            <Box id="input">
              <InputGroup>
                <InputLeftElement>
                  <FiSearch />
                </InputLeftElement>
                <Input
                  bg={"white"}
                  placeholder="Search User"
                  type="text"
                  onChange={(e) => {
                    fetchUsers(e.target.value);
                  }}
                />
              </InputGroup>
            </Box>

            <ButtonGroup
              isAttached
              variant="outline"
              onClick={createModal.onOpen}
            >
              <IconButton
                icon={<AiOutlinePlus />}
                bg={"#B42318"}
                color={"white"}
              />
              <Button bg={"white"}>User</Button>
              <CreateUser
                isOpen={createModal.isOpen}
                onClose={createModal.onClose}
                fetch={fetchUsers}
              />
            </ButtonGroup>
          </Flex>

          <Box bg={"white"} w={"100%"} borderRadius={5} p={3}>
            <Box minH={"417px"}>
              <Table>
                <Thead>
                  <Tr>
                    <Th w={"5%"}>No</Th>
                    <Th w={"5%"}>Image</Th>
                    <Th w={"25%"}>
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        Name
                        <Flex flexDir={"column"}>
                          <IconButton
                            variant="ghost"
                            colorScheme="teal"
                            aria-label="Call Sage"
                            fontSize="20px"
                            size="2px"
                            icon={<RiArrowDropUpLine />}
                            onClick={() => sortHandler("name", "ASC")}
                          />
                          <IconButton
                            variant="ghost"
                            colorScheme="teal"
                            aria-label="Call Sage"
                            fontSize="20px"
                            size="2px"
                            icon={<RiArrowDropDownLine />}
                            onClick={() => sortHandler("name", "DESC")}
                          />
                        </Flex>
                      </Flex>
                    </Th>
                    <Th w={"15%"}>
                      <Flex
                        justifyContent={"space-between"}
                        alignItems={"center"}
                      >
                        role
                        <Flex flexDir={"column"}>
                          <IconButton
                            variant="ghost"
                            colorScheme="teal"
                            aria-label="Call Sage"
                            fontSize="20px"
                            size="2px"
                            icon={<RiArrowDropUpLine />}
                            onClick={() => sortHandler("role", "ASC")}
                          />
                          <IconButton
                            variant="ghost"
                            colorScheme="teal"
                            aria-label="Call Sage"
                            fontSize="20px"
                            size="2px"
                            icon={<RiArrowDropDownLine />}
                            onClick={() => sortHandler("role", "DESC")}
                          />
                        </Flex>
                      </Flex>
                    </Th>
                    <Th w={"20%"}>email</Th>
                    <Th w={"20%"}> phone</Th>
                    <Th w={"30%"}>Status</Th>
                    <Th w={"15%"}>edit</Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {currentItems.map((val, index) => (
                    <Tr key={val.id}>
                      <Td>{indexOfFirstItem + index + 1}</Td>
                      <Td>
                        <Avatar src={val.avatar_url} size={"md"} />
                      </Td>
                      <Td>{val.name}</Td>

                      <Td>{val.role}</Td>
                      <Td>{val.email}</Td>
                      <Td>{val.phone}</Td>
                      <Td>
                        <Switch
                          defaultChecked={val?.status === "AVAILABLE"}
                          colorScheme="teal"
                        />
                      </Td>
                      <Td>
                        <Flex justifyContent={"space-evenly"}>
                          <Button
                            aria-label="edit"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditId(val.id);
                              editModal.onOpen();
                            }}
                          >
                            {<EditIcon />}
                            <EditUser
                              id={editId}
                              isOpen={editModal.isOpen}
                              onClose={editModal.onClose}
                              fetch={fetchUsers}
                            />
                          </Button>
                          <Button
                            aria-label="Delete"
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setDeleteId(val.id);
                              deleteModal.onOpen();
                            }}
                          >
                            {<DeleteIcon />}
                            <DeleteUser
                              id={deleteId}
                              isOpen={deleteModal.isOpen}
                              onClose={deleteModal.onClose}
                              fetch={fetchUsers}
                            />
                          </Button>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Box display="flex" justifyContent="center" mt={4}>
                {pageNumbers.map((number) => (
                  <Button
                    key={number}
                    size="sm"
                    bg={number === currentPage ? "#B42318" : "white"}
                    color={number == currentPage ? "white" : "#B42318"}
                    onClick={() => setCurrentPage(number)}
                    mr={2}
                  >
                    {number}
                  </Button>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
