export const extractUser = (object: any) => {
  const {
    userId,
    role,
    username,
    name,
    lastname,
    picture,
    email,
    contactNumber,
    deleted,
    ...rest
  } = object;
  const user = {
    userId,
    role,
    username,
    name,
    lastname,
    picture,
    email,
    contactNumber,
    deleted,
  };

  return { user, otherInfo: rest };
};
