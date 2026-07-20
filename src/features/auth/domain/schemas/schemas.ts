import { z } from "zod";

//AUTH USER SCHEMA
export const CarrierSchema = z.object({
    "carrierId": z.number(),
    "function": z.string(),
    "carrierName": z.string(),
    "code": z.string(),
});

export const AuthUserSchema = z.object({
    "id": z.number(),
    "name": z.string(),
    "lastName": z.string(),
    "fullName": z.string(),
    "email": z.string(),
    "role": z.string(),
    "profilePicture": z.null(),
    "token": z.string(),
    "refreshToken": z.string(),
    "carrier": CarrierSchema,
});