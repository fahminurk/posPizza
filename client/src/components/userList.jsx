import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { DeleteUser } from "../components/deleteUser";
import { EditUser } from "../components/editUser";
export default function UserList({ users }) {
  const [editUserId, setEditUserId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar_url, setAvatar_url] = useState(null);
  const [phone, setPhone] = useState(null);
  const [role, setRole] = useState(null);
  const [password, setPassword] = useState(null);

  const modalEdit = useDisclosure();
  const modalDelete = useDisclosure();

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th w={"5%"}>No</Th>
            <Th w={"5%"}>Image</Th>
            <Th w={"30%"}>Name</Th>
            <Th w={"15%"}>role</Th>
            <Th w={"25%"}>email</Th>
            <Th w={"20%"}> phone</Th>
            <Th>edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users?.map((val) => (
            <Tr key={val.id}>
              <Td>{val.id}</Td>
              <Td>
                <Avatar src={val.avatar_url} size={"md"} />
              </Td>
              <Td>{val.name}</Td>
              <Td>{val.role}</Td>
              <Td>{val.email}</Td>
              <Td>{val.phone}</Td>
              <Td>
                <Flex justifyContent={"space-between"}>
                  <Button
                    aria-label="edit"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditUserId(val.id);

                      setName(val.name);
                      setEmail(val.email);
                      setPhone(val.phone);
                      setAvatar_url(val.avatar_url);
                      setPassword(val.password);
                      setRole(val.role);
                      modalEdit.onOpen();
                    }}
                  >
                    {<EditIcon />}
                    <EditUser
                      id={editUserId}
                      isOpen={modalEdit.isOpen}
                      onClose={modalEdit.onClose}
                      name={name}
                      email={email}
                      avatar_url={avatar_url}
                      phone={phone}
                      password={password}
                      role={role}
                    />
                  </Button>
                  <Button
                    onClick={() => {
                      setDeleteUserId(val.id);

                      modalDelete.onOpen();
                    }}
                    aria-label="Delete"
                    size="sm"
                    variant="ghost"
                  >
                    {<DeleteIcon />}
                    <DeleteUser
                      id={deleteUserId}
                      isOpen={modalDelete.isOpen}
                      onClose={modalDelete.onClose}
                    />
                  </Button>
                </Flex>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}