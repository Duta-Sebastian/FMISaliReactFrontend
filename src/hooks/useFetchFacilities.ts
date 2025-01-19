import { useEffect, useState} from "react";

const useFetchFacilities = () => {
    const [facilities, setFacilities] = useState<string[]>([]);

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

                setFacilities(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFacilities();
    }, []);
    return facilities;
};

export default useFetchFacilities