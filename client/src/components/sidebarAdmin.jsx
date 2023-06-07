import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  Image,
} from "@chakra-ui/react";
import logo from "../assets/logo PIZZA PIZZAZZ.png";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineFastfood, MdOutlineInventory2 } from "react-icons/md";
import {
  AiOutlineFolderOpen,
  AiOutlineSetting,
  AiOutlineLogout,
} from "react-icons/ai";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiUserSettingsLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function SidebarAdmin() {
  const dispatch = useDispatch();
  return (
    <>
      <Flex
        flexDir={"column"}
        width={"200px"}
        h={"100vh"}
        position={"fixed"}
        zIndex={3}
        bg={"white"}
        // alignItems={"center"}
        border={"solid"}
        borderColor={"#CDD5DF"}
      >
        <Center>
          <Image src={logo} w={"100px"} mt={6} mb={5} />
        </Center>

        <Flex flexDir={"column"} gap={5} p={3}>
          <Box fontWeight={"bold"}>manage</Box>

          <Link to="/dashboardAdmin">
            <ButtonGroup isAttached variant="outline" w={"100%"}>
              <IconButton icon={<RxDashboard />} />
              <Button
                w={"100%"}
                alignItems={"center"}
                gap={2}
                p={2}
                borderRadius={5}
                _hover={{ bg: "#B42318", color: "white" }}
                cursor={"pointer"}
                bg={"#E3E8EF"}
              >
                Dashboard
              </Button>
            </ButtonGroup>
          </Link>

          <Link to="/products">
            <ButtonGroup isAttached variant="outline" w={"100%"}>
              <IconButton icon={<MdOutlineFastfood />} />
              <Button
                w={"100%"}
                alignItems={"center"}
                gap={2}
                p={2}
                borderRadius={5}
                _hover={{ bg: "#B42318", color: "white" }}
                cursor={"pointer"}
                bg={"#E3E8EF"}
              >
                Product
              </Button>
            </ButtonGroup>
          </Link>

          <Link to="/categories">
            <ButtonGroup isAttached variant="outline" w={"100%"}>
              <IconButton icon={<AiOutlineFolderOpen />} />
              <Button
                w={"100%"}
                alignItems={"center"}
                gap={2}
                p={2}
                borderRadius={5}
                _hover={{ bg: "#B42318", color: "white" }}
                cursor={"pointer"}
                bg={"#E3E8EF"}
              >
                Categories
              </Button>
            </ButtonGroup>
          </Link>

          <Link to="">
            <ButtonGroup isAttached variant="outline" w={"100%"}>
              <IconButton icon={<MdOutlineInventory2 />} />
              <Button
                w={"100%"}
                alignItems={"center"}
                gap={2}
                p={2}
                borderRadius={5}
                _hover={{ bg: "#B42318", color: "white" }}
                cursor={"pointer"}
                bg={"#E3E8EF"}
              >
                Inventory
              </Button>
            </ButtonGroup>
          </Link>

          <Link to="/report">
            <ButtonGroup isAttached variant="outline" w={"100%"}>
              <IconButton icon={<HiOutlineDocumentReport />} />
              <Button
                w={"100%"}
                alignItems={"center"}
                gap={2}
                p={2}
                borderRadius={5}
                _hover={{ bg: "#B42318", color: "white" }}
                cursor={"pointer"}
                bg={"#E3E8EF"}
              >
                Report
              </Button>
            </ButtonGroup>
          </Link>
        </Flex>

        <Flex flexDir={"column"} gap={5} p={3}>
          <Box fontWeight={"bold"}>Preference</Box>

          <Link to="/adminSettings">
            <ButtonGroup isAttached variant="outline" w={"100%"}>
              <IconButton icon={<RiUserSettingsLine />} />
              <Button
                w={"100%"}
                alignItems={"center"}
                gap={2}
                p={2}
                borderRadius={5}
                _hover={{ bg: "#B42318", color: "white" }}
                cursor={"pointer"}
                bg={"#E3E8EF"}
              >
                Admin Settings
              </Button>
            </ButtonGroup>
          </Link>

          <Link to="">
            <ButtonGroup isAttached variant="outline" w={"100%"}>
              <IconButton icon={<AiOutlineSetting />} />
              <Button
                w={"100%"}
                alignItems={"center"}
                gap={2}
                p={2}
                borderRadius={5}
                _hover={{ bg: "#B42318", color: "white" }}
                cursor={"pointer"}
                bg={"#E3E8EF"}
              >
                General
              </Button>
            </ButtonGroup>
          </Link>

          <Link to="">
            <ButtonGroup isAttached variant="outline" w={"100%"} mt={"50px"}>
              <IconButton icon={<AiOutlineLogout />} />
              <Button
                w={"100%"}
                alignItems={"center"}
                gap={2}
                p={2}
                borderRadius={5}
                _hover={{ bg: "#B42318", color: "white" }}
                cursor={"pointer"}
                bg={"#E3E8EF"}
                onClick={() => {
                  localStorage.removeItem("user");
                  dispatch({
                    type: "logout",
                  });
                }}
              >
                Logout
              </Button>
            </ButtonGroup>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}
