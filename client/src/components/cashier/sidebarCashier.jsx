import { Center, Flex, IconButton, Image, Tooltip } from "@chakra-ui/react";
import logo from "../../assets/logo PIZZA PIZZAZZ.png";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { AiOutlineLogout } from "react-icons/ai";
export default function SidebarCashier() {
  const dispatch = useDispatch();
  return (
    <>
      <Flex
        flexDir={"column"}
        width={"112px"}
        h={"100vh"}
        position={"fixed"}
        zIndex={3}
        bg={"white"}
        // alignItems={"center"}
        border={"solid"}
        borderColor={"#CDD5DF"}
        gap={5}
      >
        <Center>
          <Image src={logo} w={"80px"} m={5} />
        </Center>

        <Center>
          <Flex flexDir={"column"} gap={10} m={5}>
            <Link to="/dashboardCashier">
              <Tooltip label="Dashboard">
                <IconButton size={"lg"} icon={<RxDashboard />} />
              </Tooltip>
            </Link>

            <Link to="/dashboardCashier">
              <Tooltip label="Report">
                <IconButton size={"lg"} icon={<HiOutlineDocumentReport />} />
              </Tooltip>
            </Link>
          </Flex>
        </Center>

        <Center mt={"350px"}>
          <Link to="">
            <Tooltip label="Log out">
              <IconButton
                size={"lg"}
                icon={<AiOutlineLogout />}
                onClick={() => {
                  localStorage.removeItem("user");
                  dispatch({
                    type: "logout",
                  });
                }}
              />
            </Tooltip>
          </Link>
        </Center>
      </Flex>
    </>
  );
}
