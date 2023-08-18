import React, { useEffect, useState } from "react";
import {
  Text,
  //   Button,
  Container,
  Heading,
  Box,
  Stack,
  CardBody,
  Card,
  CardHeader,
} from "@chakra-ui/react";
import {
  Paginator,
  Previous,
  usePaginator,
  Next,
  PageGroup,
} from "chakra-paginator";

const ItemPage = ({ value, pokemons }) => {
  let arr = value?.split(" ");
  if (arr?.length > 0) {
    arr = arr.map((item) => item.replace('"', ""));
    // arr[0] = arr[0].replace('"', "");
    // arr[arr.length-1] = arr[arr.length-1].replace('"', "");
  }
  const [y, setY] = useState(null);
  const [data, setData] = useState([]);
  const outerLimit = 2;
  const innerLimit = 2;

  const {
    isDisabled,
    pagesQuantity,
    currentPage,
    setCurrentPage,
    pageSize,
    offset, // you may not need this most of the times, but it's returned for you anyway
  } = usePaginator({
    total: pokemons?.length,
    initialState: {
      pageSize: 10,
      currentPage: 1,
      isDisabled: false,
    },
  });

  const baseStyles = {
    w: 7,
    fontSize: "sm",
  };

  const normalStyles = {
    ...baseStyles,
    _hover: {
      bg: "rgb(71,144,252)",
    },
  };

  const activeStyles = {
    ...baseStyles,
    bg: "rgb(71,144,252)",
  };

  const separatorStyles = {
    w: 7,
    bg: "gray.200",
  };

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage);
    console.log("request new data with ->", nextPage);
  };

  useEffect(() => {
    setData(
      pokemons.slice(
        offset,
        offset + pageSize > pokemons.length
          ? pokemons.length
          : offset + pageSize
      )
    );
    setY(data?.map((item) => item?.content?.split(" ")));
  }, [offset, pageSize, data]);
  return (
    <>
      {pokemons.length > 0 ? (
        <>
          {y ? (
            <>
              <Container centerContent mt={3}>
                {" "}
                <Text fontSize="xm" as="u">
                  Relevent Documents: {pokemons?.length}.
                </Text>
              </Container>
              <Paginator
                isDisabled={isDisabled}
                activeStyles={activeStyles}
                innerLimit={innerLimit}
                currentPage={currentPage}
                outerLimit={outerLimit}
                normalStyles={normalStyles}
                separatorStyles={separatorStyles}
                pagesQuantity={pagesQuantity}
                onPageChange={handlePageChange}
              >
                <Container
                  display="flex"
                  justifyContent="space-between"
                  w="full"
                  p={4}
                >
                  <Previous>Previous</Previous>
                  <PageGroup isInline align="center" />
                  <Next>Next</Next>
                </Container>
              </Paginator>
              <Stack maxW="60%" m="auto" mt={0} mb={5}>
                {data?.map((item, indx) => (
                  <Card key={indx} mb={2} variant="elevated">
                    <CardHeader pb={0}>
                      <Heading size="md" fontSize="md">
                        Score: {parseInt(item?.score * 100)}%
                      </Heading>
                    </CardHeader>

                    <CardBody>
                      <Stack pt={0}>
                        <Box>
                          {y[indx]?.map((term, i) => (
                            <Text display="inline" fontSize="md" key={i}>
                              {arr?.find((e) =>
                                e.startsWith(term.toLowerCase())
                              ) ||
                              arr?.find((e) =>
                                term.startsWith(e.toLowerCase())
                              ) ? (
                                <span
                                  style={{
                                    background: "yellow",
                                    margin: "0px 3px",
                                  }}
                                >
                                  {term}
                                </span>
                              ) : (
                                <span
                                  style={{
                                    margin: "0px 3px",
                                  }}
                                >
                                  {term?.includes("-")
                                    ? `${term.split("-")[0]}_${
                                        term.split("-")[1]
                                      }`
                                    : term}
                                </span>
                              )}
                            </Text>
                          ))}
                        </Box>
                      </Stack>
                    </CardBody>
                  </Card>
                ))}
              </Stack>
            </>
          ) : null}
        </>
      ) : (
        <Text color="rgb(71,144,252)" align="center">
          No Result
        </Text>
      )}{" "}
    </>
  );
};

export default ItemPage;
