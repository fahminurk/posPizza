import { useSelector } from "react-redux";
import { Avatar, Box, Center, Flex, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import moment from "moment";

export default function NavbarCashier() {
  const userSelector = useSelector((state) => state.auth);
  return (
    <>
      <Center position={"fixed"} zIndex={2}>
        <Box
          pl={"112px"}
          w={"100vw"}
          // maxW={"1119px"}
          h={"75px"}
          border={"solid"}
          borderColor={"#CDD5DF"}
          bg={"white"}
        >
          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            m={"13px 15px"}
            // bg={"white"}
          >
            <Input w={"30%"} />

            <Flex gap={3} alignItems={"center"}>
              <Box flexDir={"column"} fontSize={"sm"}>
                <Box fontWeight={"bold"}>{userSelector.name}</Box>
                <Box float={"right"} color={"gray"}>
                  {userSelector.role}
                </Box>
              </Box>
              <Box>
                <Avatar src={userSelector.avatar_url} w={"40px"} h={"40px"} />
              </Box>
            </Flex>
          </Flex>
        </Box>
      </Center>
    </>
  );
}
