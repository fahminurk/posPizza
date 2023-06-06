import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { api } from "../api/api";
export function SearchBarProduct(props) {
  const [input, setInput] = useState("");
  console.log(props);
  return (
    <InputGroup>
      <InputLeftElement>
        <FiSearch />
      </InputLeftElement>
      <Input
        bg={"white"}
        placeholder="Search Product"
        type="text"
        onChange={(e) => {
          props.fetchProduct(1, props.category, e.target.value);
        }}
      />
    </InputGroup>
  );
}
