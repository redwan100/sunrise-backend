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

const getSinglePeopleFromDB = async (id: string) => {
  const result = await People.findById(id).populate("user");
  return result;
};

const updateSinglePeopleIntoDB = async (
  id: string,
  payload: Record<string, unknown>,
) => {
  const result = await People.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deletePeopleIntoDB = async (
  id: string,
) => {
  const result = await People.findByIdAndUpdate(id, {isDeleted:true}, {new:true});
  return result;
};

export const PeopleService = {
  getAllPeopleFromDB,
  getSinglePeopleFromDB,
  updateSinglePeopleIntoDB,
  deletePeopleIntoDB,
};
