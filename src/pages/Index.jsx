import { Box, Container, Flex, Heading, Input, SimpleGrid, Text, VStack, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Index = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://sheetdb.io/api/v1/o88mcqdvgzk1f")
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error("Error fetching cities:", error));
  }, []);

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Flex as="nav" bg="blue.500" p={4} justifyContent="space-between" alignItems="center">
        <Heading color="white">NomadRank</Heading>
      </Flex>
      <Box bgImage="url('/images/tropical-beach.jpg')" bgSize="cover" bgPosition="center" p={10} textAlign="center">
        <Heading color="white" mb={4}>Find Your Best City as a Digital Nomad</Heading>
        <Text color="white" fontSize="lg">Explore top cities around the world based on digital nomad friendliness.</Text>
      </Box>
      <Container maxW="container.xl" p={4}>
        <Input placeholder="Search cities..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} mb={4} />
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
          {filteredCities.map(city => (
            <Box key={city.id} p={5} shadow="md" borderWidth="1px" borderRadius="lg">
              <Heading fontSize="xl">{city.name}</Heading>
              <Text>{city.country}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Index;