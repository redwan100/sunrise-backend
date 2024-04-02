import QueryBuilder from "../../builder/QueryBuilder";
import { peopleSearchableFields } from "./people.constant";
import People from "./people.model";

const getAllPeopleFromDB = async (query: Record<string, unknown>) => {
  const peopleQuery = new QueryBuilder(People.find(), query)
    .search(peopleSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await peopleQuery.modelQuery;

  return result;
};

export const PeopleService = {
  getAllPeopleFromDB,
};
