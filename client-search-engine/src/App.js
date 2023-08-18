import "./App.css";
import { Box, Container, IconButton, Image, Tooltip } from "@chakra-ui/react";
import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import Adddoc from "./component/Adddoc.jsx";
import ItemPage from "./component/ItemPage.jsx";
import { useState } from "react";
import axios from "axios";
function App() {
  const [query, setQuery] = useState();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      console.log(query);
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:3000/query",
        { query },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setData(data?.sort((a, b) => b?.score - a?.score));

      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <Container maxW="container.sm" centerContent>
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          w="74%"
          m="40px 0 15px 0"
        >
          <Image h="220px" src="/assets/logo.png" alt="Dan Abramov" />
        </Box>
        <Box
          maxW="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          p={3}
          w="100%"
          m="10px 0 15px 0"
          borderRadius="3xl"
          className="shadow"
        >
          <Box display="flex" alignItems="center">
            <IconButton
              icon={
                <SearchIcon
                  color="rgb(71,144,252)"
                  mr={0}
                  cursor="pointer"
                  isLoading={true}
                />
              }
              isDisabled={query ? false : true}
              isLoading={loading}
              mr={2}
              onClick={fetchData}
            />

            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              required
              style={{ width: "450px" }}
            />
          </Box>
          <Adddoc>
            <Tooltip
              hasArrow
              label="Add doc"
              bg="rgb(71,144,252)"
              placement="top"
              color="white"
            >
              <AddIcon color="rgb(71,144,252)" cursor="pointer" mb={1} />
            </Tooltip>
          </Adddoc>
        </Box>
      </Container>
      <ItemPage value={query} pokemons={data} />
    </div>
  );
}

export default App;
