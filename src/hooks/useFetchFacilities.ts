import { useEffect, useState} from "react";

const useFetchFacilities = () => {
    const [facilities, setFacilities] = useState<string[]>([]);

    const transformStrings = (input: string[]): string[] => {
        return input.map(str =>
            str.replace(/(?<!^)([A-Z])/g, match => ` ${match.toLowerCase()}`)
        );
    };

    useEffect(() => {
        const fetchFacilities = async () => {
            try {
                const response = await fetch('https://localhost:7057/api/facilities/getAllFacilityTypes');
                if (!response.ok) {
                    throw new Error(`Failed to fetch facilities. Status: ${response.statusText}`);
                }
                const data = await response.json();
                if (data.length === 0) {
                    throw new Error(`Failed to fetch facilities. Status: ${response.statusText}`);
                }
                setFacilities(transformStrings(data));
            } catch (error) {
                console.error(error);
            }
        };
        fetchFacilities().then(() => console.log("Fetched facilities"));
    }, []);
    return facilities;
};

export default useFetchFacilities