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

async function updateBooking(bookingId: number, roomId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      roomId
    }
  });
}

async function findBybookingId(bookingId: number) {
  return prisma.booking.findMany({
    where: {
      id: bookingId
    }
  });
}

const bookingRepository = {
  findByUserId,
  findManyByRoomId,
  insertBooking,
  updateBooking,
  findBybookingId
};

export default bookingRepository;
