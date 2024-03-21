import User from "../modules/user/user.model";

const findLastAdmin = async () => {
  const lastAdmin = await User.findOne(
    {
      role: "admin",
    },
    { id: 1, _id: 0 },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  return lastAdmin?.id ? lastAdmin.id.substring(6) : undefined;
};

const generateAdminId = async () => {
  const current = (await findLastAdmin()) || "0";

  let increment = (Number(current) + 1).toString().padStart(4, "0");
  increment = `A-${new Date().getFullYear()}${increment}`;

  return increment;
};

export default generateAdminId;
