// import { publicProcedure } from './../trpc';
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const idSchema = z.object({ id: z.string()})

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
})

const userUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),

}) 

export const postRouter = createTRPCRouter({
  //get all users
  getall: publicProcedure.query(({ctx}) => {
    return ctx.prisma.user.findMany();
  }),

  //get use by id
  getOne: publicProcedure
    .input(idSchema)
    .query(({input, ctx}) => {
      return ctx.prisma.user.findUnique({
        where: idSchema.parse(input),
      });
    }),

  //create a user
  createUser: publicProcedure
      .input(userSchema)
      .mutation(({input, ctx})=>{
        return ctx.prisma.user.create({
          data: userSchema.parse(input),
        });
      }),

  //update a user    
  updateUser: publicProcedure
      .input(userUpdateSchema)
      .mutation(({input, ctx})=>{
        return ctx.prisma.user.update({
          where: {
            id: input.id.toString(),
          },
          data: userUpdateSchema.parse(input),
        });

      }),

  // delete a user    
  deleteUser: publicProcedure
      .input(idSchema)
      .mutation((input, ctx)=>{
        return ctx.prisma.user.delete({
          where: idSchema.parse(input),
        });

      })

});
