import { Axios } from "./Axios";

export const fetchDormitoryCounts = async (dormLocations) => {
  const results = await Promise.all(
    dormLocations.map((dorm) => Axios.get(`/main?dormitory=${dorm.name}`))
  );

  const countData = results.reduce((acc, result, index) => {
    acc[dormLocations[index].name] = result.data.data.count;
    return acc;
  }, {});

  return countData;
};
