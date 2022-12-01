import { prisma } from "@/config";
import { Enrollment } from "@prisma/client";

async function findByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId
    },
    include: {
      Room: true
    }
  });
}

const bookingRepository = {
  findByUserId,
};

export default bookingRepository;
