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

async function findManyByRoomId(roomId: number) {
  return prisma.booking.findMany({
    where: {
      roomId
    },
    include: {
      Room: true,
      User: true
    }
  });
}

async function insertBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      roomId,
      userId
    }
  });
}

const bookingRepository = {
  findByUserId,
  findManyByRoomId,
  insertBooking
};

export default bookingRepository;
