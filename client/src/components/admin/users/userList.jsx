import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Switch,
  useDisclosure,
} from "@chakra-ui/react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { api } from "../../../api/api";
import { DeleteUser } from "./deleteUser";
import { EditUser } from "./editUser";
export default function UserList({ users }) {
  const [editUserId, setEditUserId] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);

  const modalEdit = useDisclosure();
  const modalDelete = useDisclosure();

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th w={"5%"}>No</Th>
            <Th w={"5%"}>Image</Th>
            <Th w={"25%"}>Name</Th>
            <Th w={"15%"}>role</Th>
            <Th w={"20%"}>email</Th>
            <Th w={"20%"}> phone</Th>
            <Th w={"10%"}>Status</Th>
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
                <Switch
                  defaultChecked={val?.status == "AVAILABLE" ? true : false}
                  colorScheme="teal"
                />
              </Td>
              <Td>
                <Flex justifyContent={"space-between"}>
                  <Button
                    aria-label="edit"
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditUserId(val.id);
                      modalEdit.onOpen();
                    }}
                  >
                    {<EditIcon />}
                    <EditUser
                      id={editUserId}
                      isOpen={modalEdit.isOpen}
                      onClose={modalEdit.onClose}
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
