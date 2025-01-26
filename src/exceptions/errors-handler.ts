import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

// Define the type of the error parameter as Prisma.PrismaClientKnownRequestError | Prisma.PrismaClientUnknownRequestError | Prisma.PrismaClientRustPanicError | Prisma.PrismaClientInitializationError
// Define the return type as void, since the function does not return anything
export function handleError(e: any, message = ''): void {
  if (e instanceof Prisma.PrismaClientKnownRequestError) {
    // The .code property can be accessed in a type-safe manner
    switch (e.code) {
      case 'P2002':
        // Handle the unique constraint violation
        throw new HttpException(
          message ? message : 'this data is already taken',
          HttpStatus.BAD_REQUEST,
        );
        break;
      case 'P2025':
        // Handle the not found error
        throw new HttpException('not found', HttpStatus.NOT_FOUND);
        break;
      case 'P2010':
        // Handle the invalid JSON error
        throw new HttpException('invalid json', HttpStatus.BAD_REQUEST);
        break;
      case 'P2016':
        // Handle the missing required value error
        throw new HttpException('you missed a value', HttpStatus.BAD_REQUEST);
        break;
      // Add more cases for other error codes
      default:
        // Handle any other known request errors
        throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  } else if (e instanceof Prisma.PrismaClientUnknownRequestError) {
    // Handle the unknown request error
  } else if (e instanceof Prisma.PrismaClientRustPanicError) {
    // Handle the rust panic error
  } else if (e instanceof Prisma.PrismaClientInitializationError) {
    // Handle the initialization error
  } else {
    // Handle any other errors

    throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
  }
}
// try {
//   // Perform some Prisma Client operations
// } catch (e) {
//   // Call the error handler function
//   handleError(e);
// }
