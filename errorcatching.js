async function saveUser(database, user) {
  try {
    await database.insert(user);
  } catch (error) {
    console.log("Something went wrong");
  }

  return true;
}
