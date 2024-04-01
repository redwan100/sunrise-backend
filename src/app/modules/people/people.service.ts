import People from "./people.model";

const getAllPeopleFromDB = async (query: Record<string, unknown>) => {
  let search = "";
  const limit: number = Number(query?.limit) || 10;
  const page = query?.page || 1;

  if (query.searchTerm) {
    search = query.searchTerm as string;
  }

  const queryObj = { ...query };

  const peopleSearchQuery = ["name.firstName", "name.lastName"];

  const searchQuery = People.find({
    $or: peopleSearchQuery.map((field) => ({
      [field]: {
        $regex: search,
        $options: "i",
      },
    })),
  });

  const excludeFields = ["searchTerm", "page", "limit", "sort"];
  excludeFields.forEach((field) => delete queryObj[field]);

  const filterQuery = searchQuery.find(queryObj).populate("user");

  let sort = "-createdAt";
  if (query.sort) {
    sort = query.sort as string;
  }

  const sortQuery = filterQuery.sort(sort);
  const limitQuery = await sortQuery.limit(limit);

  return limitQuery;
};

export const PeopleService = {
  getAllPeopleFromDB,
};
