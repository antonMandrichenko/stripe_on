import { IResolvers } from "apollo-server-express";
import * as bcript from "bcryptjs";
import { User } from "./entity/User";

export const resolvers: IResolvers = {
  Query: {
    hello: () => "hi"
  },
  Mutation: {
    register: async (_, { email, password }) => {
      const hashedPassword = await bcript.hash(password, 10);
      await User.create({
        email,
        password: hashedPassword
      }).save();
      return true;
    },
    login: async (_, { email, password }, {req}) => {
      console.log(req)
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return null;
      }

      const comparePassword = await bcript.compare(password, user.password);
      if (!comparePassword) {
        return null;
      }
      return user;
    }
  }
};
