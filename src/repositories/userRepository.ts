import prisma from "../database/db";

async function getByUsername(username: string) {
  return await prisma.user.findUnique({
    where: {
      username: username
    }
  })
}

const usersRepo = {
  getByUsername
}

export default usersRepo;