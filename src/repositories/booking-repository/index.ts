import { prisma } from "@/config";

async function findByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId
    },
    select: {
      id: true,
      Room: true
    }
  });
}

const bookingRepository = {
  findByUserId,
};

export default bookingRepository;
